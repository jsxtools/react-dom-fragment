// return innerHTML as an array of nodes
export default (innerHTML, parentNode) => {
	const element = parentNode.cloneNode();

	element.innerHTML = innerHTML;

	return Array.prototype.slice.call(element.childNodes);
};
