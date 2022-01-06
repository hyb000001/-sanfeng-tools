/**
 * 判断是否为 身份证号
 * @param {string} cardNumber 身份证号
 * @returns {boolean} true || false
 */
function validateIdCard(cardNumber: string): boolean {
    if (cardNumber.length !== 18) {
      return false;
    }
    let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    let verifyList = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    let sum = 0;
  
    for (let index = 0; index < 17; index++) {
      sum += parseInt(cardNumber[index]) * factor[index];
    }
  
    let checkDigit = sum % 11;
  
    return verifyList[checkDigit] === cardNumber[17].toLocaleUpperCase();
}

/**
 * 判断是否为 企业统一社会信用代码
 * @param {string} cardNumber 身份证号
 * @returns {boolean} true || false
 */
function validateOrgCode(orgCode: string): boolean {
  /* eslint-disable */
  const mapStr1 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const firstKeys = [3, 7, 9, 10, 5, 8, 4, 2];
  const mapStr2 = '0123456789ABCDEFGHJKLMNPQRTUWXY';
  const secondKeys = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];

  /* eslint-enable */
  function calc(code: string, array1: string, array2: number[], b: number) {
    let count = 0;
    for (let i = 0; i < array2.length; i++) {
      const a = code[i];
      count += array2[i] * array1.indexOf(a);
    }
    const remainder = count % b;
    return remainder === 0 ? 0 : b - remainder;
  }

  /**
   * 统一社会信用代码由十八位的阿拉伯数字或大写英文字母（不使用I、O、Z、S、V）组成。
   * 第1位：登记管理部门代码（共一位字符）
   * 第2位：机构类别代码（共一位字符）
   * 第3位~第8位：登记管理机关行政区划码（共六位阿拉伯数字）
   * 第9位~第17位：主体标识码（组织机构代码）（共九位字符）
   * 第18位：校验码（共一位字符）
   */
  const code = orgCode.toUpperCase();
  if (code.length !== 18) {
    return false;
  }

  let reg = /^\w\w\d{6}\w{9}\w$/;
  if (!reg.test(code)) {
    return false;
  }

  /**
   * 主体标识码校验位
   */
  const firstKey = calc(code.substring(8), mapStr1, firstKeys, 11);
  let firstWord:number | string = '';
  if (firstKey < 10) {
    firstWord = firstKey;
  } else if (firstKey === 10) {
    firstWord = 'X';
  } else if (firstKey === 11) {
    firstWord = '0';
  }
  if (firstWord.toString() !== code.substring(16, 17)) {
    return false;
  }

  /**
   * 校验码
   */
  const secondKey = calc(code, mapStr2, secondKeys, 31);
  const secondWord = mapStr2.substring(secondKey, secondKey + 1);
  if (!secondWord || secondWord !== code.substring(17, 18)) {
    return false;
  }
  const word = code.substring(0, 16) + firstWord + secondWord;
  return code === word;
}

/**
 * 判断是否为 手机号
 * @param {string} phoneNumber 手机号码
 * @returns {boolean} true || false
 */
function validatePhoneNumber(phoneNumber: string): boolean {
  const phoneRegExp = /^[1][3,4,5,7,8][0-9]{9}$/
  return phoneRegExp.test(phoneNumber)
}

/**
 * 判断是否为 姓名
 * @param {string} userName 用户名
 * @returns {boolean} true || false
 */
function validateUserName(userName: string): boolean {
  const userNameRegExp = /^[u4e00-u9fa5]{2,4}$/
  return userNameRegExp.test(userName)
}

// 导出
export {
  validateIdCard,
  validateOrgCode,
  validatePhoneNumber,
  validateUserName
} 
  