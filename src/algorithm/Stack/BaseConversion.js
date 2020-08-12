// 《学习JavaScript数据结构与算法》（第三版）的栈章节 -- 进制转换题目
const { ObjectStack } = require('../../dataStructure/Stack');

// 二进制转换
function decimalToBinary(decNumber) {
  let num = decNumber;
  const stack = new ObjectStack();
  let result = '';

  while(num > 0) {
    const _num = Math.floor(num % 2);
    stack.push(_num);
    num = Math.floor(num / 2);
  }
  while(!stack.isEmpty()) {
    result += stack.pop();
  }

  return result;
}

// 2到35进制转换
function baseConverter(decNumber, base) {
  let num = decNumber;
  const stack = new ObjectStack();
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';

  while(num > 0) {
    const _num = Math.floor(num % base);
    stack.push(_num);
    num = Math.floor(num / base);
  }

  while(!stack.isEmpty()) {
    result += digits[stack.pop()];
  }

  return result;
}

module.exports = {
  decimalToBinary,
  baseConverter,
}
