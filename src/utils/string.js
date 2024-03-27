/**
 * @param {string} originalString 原始字符串
 * @param {number} index 要被替换的位置
 * @param {string} replacement 替换的字符
 * @returns {string} 结果字符串
 */
export function replaceAt(originalString, index, replacement) {
  return originalString.substring(0, index) + replacement + originalString.substring(index + 1);
}

/**
 * @returns {string} UUID
 */
export function UUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}