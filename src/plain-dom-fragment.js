import React from 'react';
import innerHTMLToNodes from './lib/innerhtml-to-nodes';

export default class PlainDOMFragment extends React.PureComponent {
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
				const parentNode = this.previousSibling.parentNode;
				const oldNodes = nodesWeakMap.get(this) || [];
				const newNodes = innerHTML ? innerHTMLToNodes(innerHTML) : [];

				oldNodes.forEach(oldNode => {
					if (oldNode.parentNode) {
						oldNode.parentNode.removeChild(oldNode);
					}
				});

				const documentFragment = document.createDocumentFragment();

				newNodes.forEach(newNode => {
					documentFragment.appendChild(newNode);
				});

				parentNode.insertBefore(documentFragment, this.previousSibling.nextSibling);

				nodesWeakMap.set(this, newNodes);
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
