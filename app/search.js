import { data } from "../data";
import { searchBinary } from "./searchBinary";
import DecoratedSeries from "./DecoratedSeries";
import DataReader from "./DataReader";

/**
 * Perform search inside a Date set between
 * @param {string=} startDate Extended stringified Date, representing the beginning of a temporal interval
 * @param {string=} endDate Extended stringified Date, representing the end of a temporal interval
 */
export function search(startDate, endDate) {
  const scoreSeries = (new DataReader(data)).getScore();

  const getVal = (_) => new Date(_).getTime();
  const compare = (a, b) => getVal(b) - getVal(a);

  // check wether end_date comes before start_date
  if (compare(startDate, endDate) < 0) return [];

  const startIndex = startDate
    ? searchBinary(scoreSeries, [0, scoreSeries.length - 1], startDate, compare)
    : 0;

  const endIndex = endDate
    ? searchBinary(scoreSeries, [0, scoreSeries.length - 1], endDate, compare)
    : scoreSeries.length - 1;

  return new DecoratedSeries(
    scoreSeries.slice(startIndex, endIndex + 1),
    startIndex
  );
}

/**
 * Retrieve extra data from selected input
 * @param {array} series DecoratedSeries containing source data
 * @param {number} i the position of the element in `series` array
 */
export function getExtra(series, i) {
  const extraSeries = (new DataReader(data)).getExtra();
  
  return extraSeries[series.getItemAbsoluteIndex(i)].y;
}
