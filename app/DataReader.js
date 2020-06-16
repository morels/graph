/**
 * Read data from API
 */
export default class DataReader {
  constructor(jsonData) {
    this.score = jsonData.data[0]?.details.filter(
      (_) => _.key === "score"
    )[0]?.series;
    this.extra = jsonData.data[0]?.details.filter(
      (_) => _.key === "extra"
    )[0]?.series;
  }

  getScore() {
    return this.score;
  }

  getExtra() {
    return this.extra;
  }
}
