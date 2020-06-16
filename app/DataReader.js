/**
 * Read data from API
 */
export default class DataReader {
  static getScore(jsonData) {
    return jsonData.data[0]?.details.filter((_) => _.key === "score")[0]
      ?.series;
  }

  static getExtra(jsonData) {
    return jsonData.data[0]?.details.filter((_) => _.key === "extra")[0]
      ?.series;
  }
}
