// 斐波那契数列问题来详解动态规划的基本原理。主要是让你明白什么是重叠子问题
// （斐波那契数列没有求最值，所以严格来说不是动态规划问题）

// 例子1：计算一个数的阶乘 如!5
export function factorial (num: number): number {
  if (num === 1 || num === 0) {
    return 1;
  }

  return num * factorial(num - 1);
}

console.log(factorial(5));

// 例子2：斐波那契数列 它是一个由 0、1、1、2、3、5、8、13、21、34
// 等数组成的序列。数 2 由 1 + 1 得到，数 3 由 1 + 2 得到，数 5 由 2 + 3 得到，以此类推。
// 定义：(1)位置 0 的斐波那契数是零 
// (2) 1 和 2 的斐波那契数是 1 
// (3) n（此处 n > 2）的斐波那契数是（n - 1）的斐波那契数加上（n - 2）的斐波那契数。

// 计算斐波那契数
export function fibonacci(n: number): number {
  if (n < 1) return 0;
  if (n <= 2) return 1;
  return fibonacci(n - 2) + fibonacci(n - 1);
}

console.log(fibonacci(9));

// 还有另一种写 fibonacci 函数的方法，叫作记忆化。记忆化是一种保存前一个结果的值的
// 优化技术，类似于缓存。如果我们分析在计算 fibonacci(5)时的调用，会发现 fibonacci(3)
// 被计算了两次，因此可以将它的结果存储下来，这样当需要再次计算它的时候，我们就已经有它的结果了
// 计算斐波那契数函数改良（备忘录做法）
export function fibonacciMemoization(n: number) {
  const memo = [0, 1];
  const fibonacci = (n: number) => {
  if (memo[n] != null) return memo[n];
    memo[n] = fibonacci(n - 1) + fibonacci(n - 2);
    return memo[n];
  };
  return fibonacci(n);
} 

// 我们可以把这个「备忘录」独立出来成为一张表，就叫做 DP table 吧，在这张表上完成「自底向上」的推算
export function fibonacciDptable(n: number) {
  const dp: number[] = new Array(n + 1).fill(0);
  dp[1] = dp[2] = 1;
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

// 这个例子的最后，讲一个细节优化。细心的读者会发现，根据斐波那契数列的状态转移方程，当前状态只和之前的两个状态有关，其实并不需要那么长的一个 DP table 来存储所有的状态，只要想办法存储之前的两个状态就行了。所以，可以进一步优化，把空间复杂度降为 O(1)：
export function fibonacciCompress(n: number) {
  if (n < 1) return 0;
  if (n <= 2) return 1;

  let prev = 1, cur = 1;
  for (let i = 3; i <= n; i++) {
    const sum = prev + cur;
    prev = cur;
    cur = sum;
  }

  return cur;
}

console.log(fibonacciCompress(9));

