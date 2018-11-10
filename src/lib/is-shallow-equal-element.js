import isShallowEqualElementTag from './is-shallow-equal-element-tag';

// return whether 2 nodes are shallow equal elements
export default (nodeA, nodeB) =>
	// both nodes are elements with the same tag
	isShallowEqualElementTag(nodeA, nodeB) &&
	// both elements have the same attributes
	nodeA.attributes.length === nodeB.attributes.length &&
	Array.prototype.slice.call(nodeA.attributes).every(
		(attribute, index) => attribute.isEqualNode(nodeB.attributes[index])
	);
