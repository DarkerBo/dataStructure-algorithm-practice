// 栈  [栈底, 栈顶]

/* 这里讲一个栈算法的分支：单调栈和应用实践
什么是单调栈
单调栈的定义：单调栈即满足单调性的栈结构。与单调队列相比，其只在一端进行进出。

如何使用单调栈
单调栈分为单调递增栈和单调递减栈，顾名思义，就是栈内元素是升序还是降序排列的，也涉及到出栈的逻辑。

如下图，分别插入6,10,3,7,4,12的时候，单调递增栈和单调递减栈的情况分别是样子的：

需要入栈的元素: 6, 10, 3, 7, 4, 12
1. 单调递增栈：
(1) 栈为空，6入栈  [6]
(2) 与栈顶元素6相比，10 > 6，6出栈，10入栈  [10]
(3) 与栈顶元素10相比，3 < 10，3入栈  [10, 3]
(4) 与栈顶元素3相比，7 > 3，3出栈，7入栈  [10, 7]
(5) 与栈顶元素6对比，4 < 7，4入栈  [10, 7, 4]
(6) 与栈顶元素4对比，12 > 4，4出栈，继续
    与栈顶元素7对比，12 > 7，7出栈，继续
    与栈顶元素710对比，12 > 10，10出栈，此时栈为空，12入栈  [12]


2. 单调递减栈：
(1) 栈为空，6入栈  [6]
(2) 与栈顶元素6相比，10 > 6，10入栈  [6, 10]
(3) 与栈顶元素10相比，3 < 10，10出栈，继续，
    与栈顶元素6相比入栈，3 < 6，6出栈，3入栈  [3]
(4) 与栈顶元素3相比，7 > 3，3出栈，7入栈  [3, 7]
(5) 与栈顶元素7对比，4 < 7，7出栈，4入栈  [3, 4]
(6) 与栈顶元素4对比，12 > 4，12入栈  [3, 4, 12]


单调栈有什么应用？
能表示入栈元素左边第一个比它的元素
能表示入栈元素左边第一个比它的元素

我们拿上面图的单调递增栈来举例说明：
源数组：[6, 10, 3, 7, 4, 12]

处理元素	单调栈内	找到元素	补充说明
  6	        [6]	     无	     栈为空，说明左边没有比它大的了
  10	      [10]	   无	     栈顶元素6比自己(10)小，为了维持单调递减，6出栈，10入栈
  3	      [10, 3]	   10	     3比10小，直接入栈
  7	      [10, 7]	   10	     7比3大，为了不保证递减，3出栈，7入栈
  4	     [10, 7, 4]	 7	     4比7小，直接入栈
  12	      [12]	   无	     12比栈里所有元素都大，弹完后栈空，找不到比自己大的。

按照这个原理，大家可以自己推一下递增栈查找第一个小元素。

https://www.jianshu.com/p/6bbd3653a57f

*/


// 小试牛刀：给定数组arr，要求输出这样的数组 result，result[i] 是 arr[i] 左边第一个比 arr[i] 大的元素，若不存在则 result[i] = arr[i]。
function monotoneIncStack(arr: number[] | null) {
  if (arr === null) return;

  const len = arr.length;
  const result: number[] = [];
  const stack: number[] = [];

  for (let i = 0; i < len; i++) {
    while (stack.length > 0 && stack[0] > arr[i]) stack.shift();
    result[i] = stack.length === 0 ? arr[i] : stack[0];
    stack.push(arr[i]);
  }

  return result;
}