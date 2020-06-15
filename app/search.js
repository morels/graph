import { data } from "../data";

export function search(startDate, endDate) {
  const scoreSeries = data.data[0]?.details.filter((_) => _.key === "score")[0]
    ?.series;

  const getVal = (_) => new Date(_).getTime();

  /**
   * Performs binary search over a sorted array
   *
   * It operates over indexes without creating any other overstructure for
   * processing data.
   *
   * @param {array[Object]} sortedArr input data containing a sorted array of series
   * @param {[number, number]} indexes the tuple representing the start and the end of the sub-array to search within
   * @param {Object} item the item whose position to look for
   */
  function searchIndex(sortedArr, indexes, item) {
    const [startIndex, endIndex] = [...indexes];
    const nodeIndex = Math.floor((endIndex - startIndex) / 2) + startIndex;
    const left = () => [startIndex, nodeIndex];
    const right = () => [nodeIndex + 1, endIndex];

    if (
      getVal(sortedArr[nodeIndex].x) === getVal(item) ||
      startIndex === endIndex
    )
      return nodeIndex;

    return searchIndex(
      sortedArr,
      getVal(sortedArr[nodeIndex].x) > getVal(item) ? left() : right(),
      item
    );
  }

  const startIndex = startDate
    ? searchIndex(scoreSeries, [0, scoreSeries.length - 1], startDate)
    : 0;

  const endIndex = endDate
    ? searchIndex(scoreSeries, [0, scoreSeries.length - 1], endDate)
    : scoreSeries.length - 1;

  return scoreSeries.slice(startIndex, endIndex + 1);
}
