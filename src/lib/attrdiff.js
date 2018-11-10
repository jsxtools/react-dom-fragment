export default (nodeA, nodeB) => {
	// remove unused attributes
	Array.prototype.forEach.call(nodeA.attributes, attribute => {
		if (!(attribute.name in nodeB.attributes)) {
			nodeA.removeAttribute(attribute.name);
		}
	});

	// update changed attributes
	Array.prototype.forEach.call(nodeB.attributes, attribute => {
		if (Object(nodeA.attributes[attribute.name]).value !== attribute.value) {
			nodeA.setAttribute(attribute.name, attribute.value);
		}
	});
};
