export default class DecoratedSeries {
  constructor(series, baseIndex) {
    this.series = series;
    this.baseIndex = baseIndex;
  }

  getItem(i) {
    this.series[i];
  }

  getItemAbsoluteIndex(i) {
    return i + this.baseIndex;
  }
}
