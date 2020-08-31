// 递归 不是数据结构，是一种方法使操作树和图数据结构变得更简单

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
// 计算斐波那契数函数改良
export function fibonacciMemoization() {
  const memo = [0, 1];
  const fibonacci = (n: number) => {
  if (memo[n] != null) return memo[n];
    memo[n] = fibonacci(n - 1) + fibonacci(n - 2);
    return memo[n];
  };
  return fibonacci;
} 

console.log(fibonacciMemoization()(9));

