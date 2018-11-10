import domdiff from 'domdiff';
import React from 'react';
import compare from './lib/compare';
import innerHTMLToNodes from './lib/innerhtml-to-nodes';

export default class ReactDOMFragment extends React.PureComponent {
	constructor() {
		super();

		this.element = React.createRef();

		this.componentDidMount = function () {
			this.previousSibling = Object(this.element.current).previousSibling;

			this.forceUpdate();
		};

		this.componentDidUpdate = function () {
			const innerHTML = Object(this.props.dangerouslySetInnerHTML).__html;
			const shouldUpdateInnerHTML =
				this.previousSibling &&
				this.previousInnerHTML !== innerHTML;

			if (shouldUpdateInnerHTML) {
				this.previousInnerHTML = innerHTML;
				const parentNode = this.previousSibling.parentNode;
				const oldNodes = nodesWeakMap.get(this) || [];
				const newNodes = innerHTML ? innerHTMLToNodes(innerHTML, parentNode) : [];
				const lastSibling = oldNodes[oldNodes.length - 1] || this.previousSibling;
				const nextSibling = lastSibling.nextSibling;
				const options = { before: this.previousSibling.nextSibling, compare };

				domdiff(parentNode, oldNodes, newNodes, options);

				const childNodes = Array.prototype.slice.call(parentNode.childNodes);
				const startIndex = childNodes.indexOf(this.previousSibling) + 1;
				const endIndex = childNodes.indexOf(nextSibling);
				const nextNodes = childNodes.slice(startIndex, endIndex);

				nodesWeakMap.set(this, nextNodes);
			}
		};

		this.render = function () {
			return Object(this.props.dangerouslySetInnerHTML).__html
				? React.createElement(React.Fragment, null, '', !this.previousSibling && React.createElement('meta', { ref: this.element }))
			: this.props.children;
		};
	}
}

const nodesWeakMap = new WeakMap();
