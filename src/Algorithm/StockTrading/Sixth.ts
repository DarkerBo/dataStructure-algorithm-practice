// LeetCode第 714 题，买卖股票的最佳时机含手续费
/*
给定一个整数数组 prices，其中第 i 个元素代表了第 i 天的股票价格 ；非负整数 fee 代表了交易股票的手续费用。

你可以无限次地完成交易，但是你每笔交易都需要付手续费。如果你已经购买了一个股票，在卖出它之前你就不能再继续购买股票了。

返回获得利润的最大值。

注意：这里的一笔交易指买入持有并卖出股票的整个过程，每笔交易你只需要为支付一次手续费。

示例 1:

输入: prices = [1, 3, 2, 8, 4, 9], fee = 2
输出: 8
解释: 能够达到的最大利润:  
在此处买入 prices[0] = 1
在此处卖出 prices[3] = 8
在此处买入 prices[4] = 4
在此处卖出 prices[5] = 9
总利润: ((8 - 1) - 2) + ((9 - 4) - 2) = 8.
*/

/* 思路：k = +infinity with fee
每次交易要支付手续费，只要把手续费从利润中减去即可。改写方程：
dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])
dp[i][1] = max(dp[i-1][1], dp[i-1][0] - prices[i] - fee)
解释：相当于买入股票的价格升高了。
在第一个式子里减也是一样的，相当于卖出股票的价格减小了。

*/

// DP写法
function maxProfitSixthByDP(prices: number[], fee: number): number {
  const n = prices.length;
  if (n === 0) return 0;

  const dp = Array.from(new Array(n), () => new Array(2));

  for (let i = 0; i < n; i++) {
    if (i === 0) {
      dp[i][0] = 0;
      dp[i][1] = -prices[i] - fee; // 第一次交易的话也是要扣手续费的
      continue;
    }

    dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i]);
    dp[i][1] = Math.max(dp[i-1][1], dp[i-1][0] - prices[i] - fee);
  }

  return dp[n-1][0];
}

console.log(maxProfitSixthByDP([1, 3, 2, 8, 4, 9], 2));

// 状态机变量写法
function maxProfitSixthByVariable(prices: number[], fee: number): number {
  let dp_i_0 = 0, dp_i_1 = -Infinity;
  
  for (let i = 0; i < prices.length; i++) {
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
    dp_i_1 = Math.max(dp_i_1, dp_i_0 - prices[i] - fee);
  }

  return dp_i_0;
}

console.log(maxProfitSixthByVariable([1, 3, 2, 8, 4, 9], 2));
