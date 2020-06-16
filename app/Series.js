import { searchBinary } from "./searchBinary";
import DataReader from "./DataReader";

/**
 * Perform search inside a Date set between
 * @param {string=} startDate Extended stringified Date, representing the beginning of a temporal interval
 * @param {string=} endDate Extended stringified Date, representing the end of a temporal interval
 */
export default class Series {
  constructor(scoreSeries, extra, startIndex, endIndex) {
    this.scoreSeries = scoreSeries;
    this.extra = extra;
    this.startIndex = startIndex ?? 0;
    this.endIndex = endIndex ?? this.scoreSeries.length - 1;
  }

  static fromJson(jsonData) {
    const scoreSeries = DataReader.getScore(jsonData);
    const extra = DataReader.getExtra(jsonData);
    const startIndex = 0;
    const endIndex = scoreSeries.length - 1;
    return new this(scoreSeries, extra, startIndex, endIndex);
  }

  *[Symbol.iterator]() {
    let index = 0;
    while (index + this.startIndex < this.endIndex) yield scoreSeries(index++);
  }

  getItems() {
    return this.scoreSeries.slice(this.startIndex, this.endIndex + 1);
  }

  search(startDate, endDate) {
    const getVal = (_) => new Date(_).getTime();
    const compare = (a, b) => getVal(b) - getVal(a);

    // check wether end_date comes before start_date
    if (compare(startDate, endDate) < 0)
      throw new Error(
        "Error. Start date must be less than or equal to End date"
      );

    this.startIndex = startDate
      ? searchBinary(
          this.scoreSeries,
          [0, this.scoreSeries.length - 1],
          startDate,
          compare
        )
      : 0;

    this.endIndex = endDate
      ? searchBinary(
          this.scoreSeries,
          [0, this.scoreSeries.length - 1],
          endDate,
          compare
        )
      : this.scoreSeries.length - 1;

    return new Series(
      this.scoreSeries,
      this.extra,
      this.startIndex,
      this.endIndex
    );
  }

  /**
   * Retrieve extra data from selected input
   * @param {number} i the position of the element in `series` array
   */
  getExtra(i) {
    return this.extra[i + this.startIndex].y;
  }
}
