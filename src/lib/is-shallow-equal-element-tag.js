// return whether 2 nodes are elements with the same tag
export default (nodeA, nodeB) =>
	// both nodes are matching tags
	Object(nodeA).nodeType === 1 &&
	nodeA.tagName === Object(nodeB).tagName;
