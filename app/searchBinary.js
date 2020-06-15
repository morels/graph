/**
 * Performs binary search over a sorted array, treated as a balanced binary tree.
 *
 * It operates over indexes without creating any other overstructure for
 * processing data.
 *
 * @param {array[Object]} sortedArr input data containing a sorted array of series
 * @param {[number, number]} indexes the tuple representing the start and the end of the sub-array to search within
 * @param {Object} target the target item whose position to look for
 */
export function searchBinary(sortedArr, indexes, target, compare) {
  const [startIndex, endIndex] = [...indexes];
  const nodeIndex = Math.floor((endIndex - startIndex) / 2) + startIndex;
  const left = () => [startIndex, nodeIndex];
  const right = () => [nodeIndex + 1, endIndex];
  const isLeaf = () => startIndex === endIndex;
  if (compare(sortedArr[nodeIndex].x, target) === 0 || isLeaf())
    return nodeIndex;

  return searchBinary(
    sortedArr,
    compare(sortedArr[nodeIndex].x, target) < 0 ? left() : right(),
    target,
    compare
  );
}
