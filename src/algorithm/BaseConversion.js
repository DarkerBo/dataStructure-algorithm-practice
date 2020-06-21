import { ObjectStack } from '../DataStructure/Stack';

function decimalToBinary(decNumber) {
  let number = decNumber;
  const resultArr = new ObjectStack();
  const resultStr = '';
  while(number > 0) {
    const num = Math.floor(number % 2);
    resultArr.push(num);
    number = Math.floor(number / 2);
  }

  while(!resultArr.isEmpty()) {
    resultStr += resultArr.pop();
  }

  return resultStr;

}

decimalToBinary(100);
