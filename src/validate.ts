/**
 * 判断是否为身份证号
 * @param {string} identityCardNumber 身份证号
 * @returns {boolean} true || false
 */
function validateIdCard(identityCardNumber: string): boolean {
    if (identityCardNumber.length !== 18) {
      return false;
    }
    let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    let verifyList = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    let sum = 0;
  
    for (let index = 0; index < 17; index++) {
      sum += parseInt(identityCardNumber[index]) * factor[index];
    }
  
    let checkDigit = sum % 11;
  
    return verifyList[checkDigit] === identityCardNumber[17].toLocaleUpperCase();
}

// 导出
export {
    validateIdCard
}
  