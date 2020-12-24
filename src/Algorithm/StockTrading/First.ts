// LeetCode第 121 题，买卖股票的最佳时机
/*
给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。

如果你最多只允许完成一笔交易（即买入和卖出一支股票一次），设计一个算法来计算你所能获取的最大利润。

注意：你不能在买入股票前卖出股票。

示例 1:

输入: [7,1,5,3,6,4]
输出: 5
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
示例 2:

输入: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。

*/


/*
思路：先写出状态转移方程 只能有一次交易，k = 1，最后的0代表手上没股票，1代表手上有股票
dp[i][1][0] = max(dp[i-1][1][0], dp[i-1][1][1] + prices[i])
dp[i][1][1] = max(dp[i-1][1][1], dp[i-1][0][0] - prices[i]) 
            = max(dp[i-1][1][1], -prices[i])
解释：k = 0 的 base case，即之前没有交易过，那就是初始值0，所以 dp[i-1][0][0] = 0。

现在发现 k 都是 1，不会改变，即 k 对状态转移已经没有影响了。
可以进行进一步化简去掉所有 k：
dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])
dp[i][1] = max(dp[i-1][1], -prices[i])

还要兼容一下 i = 0 时 dp[i-1] 是不合法的。这是因为我们没有对 i 的 base case 进行处理。处理一下即可

*/

// DP写法
function maxProfitFirstByDP(prices: number[]): number {
  const n = prices.length;
  if (n === 0) return 0;
  const dp: Array<number[]> = Array.from(new Array(n), () => new Array(2));
  for (let i = 0; i < n; i++) {
    if (i === 0) {
      dp[i][0] = 0;
      dp[i][1] = -prices[0];
      continue;
    }

    dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i]);
    dp[i][1] = Math.max(dp[i-1][1], -prices[i]);
  }

  return dp[n - 1][0];
}

console.log(maxProfitFirstByDP([7,1,5,3,6,4]));
console.log(maxProfitFirstByDP([7,6,4,3,1]));
console.log(maxProfitFirstByDP([]));


/*
第一题就解决了，但是这样处理 base case 很麻烦，而且注意一下状态转移方程，新状态只和相邻的一个状态有关，其实不用整个 dp 数组，只需要一个变量储存相邻的那个状态就足够了，这样可以把空间复杂度降到 O(1):
*/

// 变量写法
function maxProfitFirstByVariable(prices: number[]): number {
  // dp_i_0 未交易时利润为0, dp_i_1 需要设为最小值，这样第一次买股票的话能赋值为股票的价格了
  let dp_i_0 = 0, dp_i_1 = -Infinity;
  for (let i = 0; i < prices.length; i++) {
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
    dp_i_1 = Math.max(dp_i_1, -prices[i]);
  }

  return dp_i_0;
}

console.log(maxProfitFirstByVariable([7,1,5,3,6,4]));
console.log(maxProfitFirstByVariable([7,6,4,3,1]));
console.log(maxProfitFirstByVariable([]));
