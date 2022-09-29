/**
 * 数字或字符串智能去掉末尾0
 * 如果小数点会转换为字符串
 * @param value
 * @returns
 */
function toNum(value: string | number) {
  let oValue = value + "";
  let end: any = null;
  if (oValue.includes(".")) {
    for (let i = oValue.length - 1; i > 0; i--) {
      if (oValue.charAt(i) === "0") {
        end = i;
      } else {
        if (oValue.charAt(i) === ".") {
          end = i;
          break;
        } else {
          break;
        }
      }
    }
  }
  if (end) {
    // slice 前包后不包
    return oValue.slice(0, end);
  }
  // 如果没有小数 那么返回原值
  return value;
}

export default {
  toNum,
};
