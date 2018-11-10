import attrdiff from './attrdiff';
import domdiff from 'domdiff';
import isShallowEqualElementTag from './is-shallow-equal-element-tag';
import isShallowEqualText from './is-shallow-equal-text';
import textdiff from './textdiff';

// return whether 2 elements are the same, conditionally patching their children
export default function compare(nodeA, nodeB) {
	if (nodeA.isEqualNode(nodeB)) {
		// stop merging nodes that are equal
		return true;
	}

	if (isShallowEqualElementTag(nodeA, nodeB)) {
		// merge the attributes of elements with matching tags
		attrdiff(nodeA, nodeB);

		if (nodeA.isEqualNode(nodeB)) {
			// stop merging nodes that are equal after merging their attributes
			return true;
		}

		// merge the trees of elements with matching tags
		domdiff(
			nodeA,
			Array.prototype.slice.call(nodeA.childNodes),
			Array.prototype.slice.call(nodeB.childNodes),
			{ compare }
		);

		// stop merging nodes that are equal after merging trees
		return true;
	}


	if (isShallowEqualText(nodeA, nodeB)) {
		// merge text
		textdiff(nodeA, nodeB);

		// stop merging nodes that are equal after merging text
		return true;
	}

	// otherwise, merge elements
	return false;
}
