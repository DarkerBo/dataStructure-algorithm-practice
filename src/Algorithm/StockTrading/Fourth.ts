// LeetCode第 188 题，买卖股票的最佳时机 IV
/*
给定一个整数数组 prices ，它的第 i 个元素 prices[i] 是一支给定的股票在第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。

注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 

示例 1：

输入：k = 2, prices = [2,4,1]
输出：2
解释：在第 1 天 (股票价格 = 2) 的时候买入，在第 2 天 (股票价格 = 4) 的时候卖出，这笔交易所能获得利润 = 4-2 = 2 。
示例 2：

输入：k = 2, prices = [3,2,6,5,0,3]
输出：7
解释：在第 2 天 (股票价格 = 2) 的时候买入，在第 3 天 (股票价格 = 6) 的时候卖出, 这笔交易所能获得利润 = 6-2 = 4 。
     随后，在第 5 天 (股票价格 = 0) 的时候买入，在第 6 天 (股票价格 = 3) 的时候卖出, 这笔交易所能获得利润 = 3-0 = 3 。

*/

/* k = any number

有了上一题 k = 2 的铺垫，这题应该和上一题的第一个解法没啥区别。但是出现了一个超内存的错误，原来是传入的 k 值会非常大，dp 数组太大了。现在想想，交易次数 k 最多有多大呢？
一次交易由买入和卖出构成，至少需要两天。所以说有效的限制 k 应该不超过 n/2，如果超过，就没有约束作用了，相当于 k = +infinity。这种情况是之前解决过的。
直接把之前的代码重用：
*/

// k大于交易天数的一半时，相当于无限次交易
function maxProfitFourth(prices: number[]): number {
  const n = prices.length;
  const dp = Array.from(new Array(n), () => new Array(2));

  for (let i = 0; i < n; i++) {
    if (i === 0) {
      dp[i][0] = 0;
      dp[i][1] = -prices[i];
      continue;
    }

    const temp = dp[i-1][0];

    dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i]);
    dp[i][1] = Math.max(dp[i-1][1], temp - prices[i]);
  }

  return dp[n-1][0];
}


// DP写法
function maxProfitFourthByDP(k: number, prices: number[]): number {
  const n = prices.length;
  if (k === 0 || n === 0) return 0;

  if (k > n / 2) {
    return maxProfitFourth(prices);
  }

  const dp = Array.from(new Array(n), () => Array.from(new Array(k + 1), () => new Array(2)));

  for (let i = 0; i < n; i++) {
    for (let j = k; j > 0; j--) {
      // base case
      if (i === 0) {
        dp[i][j][0] = 0;
        dp[i][j][1] = -prices[i];
        continue;
      }

      const temp = j - 1 === 0 ? 0 : dp[i-1][j-1][0];

      dp[i][j][0] = Math.max(dp[i-1][j][0], dp[i-1][j][1] + prices[i]);
      dp[i][j][1] = Math.max(dp[i-1][j][1], temp - prices[i]);
    }
  }

  console.log(dp);

  return dp[n-1][k][0];
}

// console.log(maxProfitFourthByDP(2, [2,4,1]));
// console.log(maxProfitFourthByDP(2, []));
console.log(maxProfitFourthByDP(0, [1, 3]));

// 状态机写法（不建议，因为多了一层循环遍历k来声明变量）
function maxProfitFourthByVariable(k: number, prices: number[]): number {
  const n = prices.length;
  if (k > n / 2) {
    return maxProfitFourth(prices);
  }

  // 这里循环遍历k，dp_k_0 就为0，dp_k_1就为-Infinity

  // 双重循环遍历 n 和 k，然后 max 比较，最后返回 dp_k_0

  // 这个没有意义，只是为了返回需要number类型的
  return 0;
}

