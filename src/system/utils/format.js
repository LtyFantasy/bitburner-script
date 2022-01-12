
export default class Format {

  /**
   * 格式化金额
   * @param {number} value 
   */
  static money(value) {

    if (value >= 1e12) {
      return `${(value / 1e12).toFixed(2)} t`;
    } else if (value >= 1e9) {
      return `${(value / 1e9).toFixed(2)} b`;
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(2)} m`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)} k`;
    } else {
      return `${value}`;
    }
  }
}