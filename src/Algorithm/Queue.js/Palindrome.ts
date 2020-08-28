// 《学习JavaScript数据结构与算法》（第三版）的双端队列章节 -- 检测回文
// 回文是正反都能读通的单词、词组、数或一系列字符的序列，例如 madam 或 racecar
// 有不同的算法可以检查一个词组或字符串是否为回文。最简单的方式是将字符串反向排列并
// 检查它和原字符串是否相同。如果两者相同，那么它就是一个回文。我们也可以用栈来完成，但
// 是利用数据结构来解决这个问题的最简单方法是使用双端队列。
import { ObjectDeque } from '../../DataStructure/Queue';

export function palindromeChecker(str: string): boolean {
  if (!str) return false;

  const deque = new ObjectDeque<string>();
  // 这一步是将字符串全部转化为小写，并且兼容了有单词间隔的句子split(' ')中间有个空格
  const lowestStr = str.toLocaleLowerCase().split(' ').join('');
  for (let i = 0; i < lowestStr.length; i ++) {
    deque.addBack(lowestStr[i]);
  }

  let fontItem;
  let backItem;
  let isEqual = true;

  while(deque.getSize() > 1 && isEqual) {
    fontItem = deque.removeFront();
    backItem = deque.removeBack();
    if (fontItem !== backItem) {
      isEqual = false;
    }
  }

  return isEqual;
}

console.log('a', palindromeChecker('a'));
console.log('aa', palindromeChecker('aa'));
console.log('kayak', palindromeChecker('kayak'));
console.log('level', palindromeChecker('level'));
console.log('Was it a car or a cat I saw', palindromeChecker('Was it a caror a cat I saw'));
console.log('Step on no pets', palindromeChecker('Step on no pets'));
