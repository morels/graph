import { data } from "../data";
import { searchBinary } from "./searchBinary";

export function search(startDate, endDate) {
  const scoreSeries = data.data[0]?.details.filter((_) => _.key === "score")[0]
    ?.series;

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

  return scoreSeries.slice(startIndex, endIndex + 1);
}
