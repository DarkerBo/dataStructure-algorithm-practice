// LeetCode第 123 题，买卖股票的最佳时机 III
/*
给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。

注意: 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

示例 1:

输入: [3,3,5,0,0,3,1,4]
输出: 6
解释: 在第 4 天（股票价格 = 0）的时候买入，在第 6 天（股票价格 = 3）的时候卖出，这笔交易所能获得利润 = 3-0 = 3 。
     随后，在第 7 天（股票价格 = 1）的时候买入，在第 8 天 （股票价格 = 4）的时候卖出，这笔交易所能获得利润 = 4-1 = 3 。
示例 2:

输入: [1,2,3,4,5]
输出: 4
解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。   
     注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。   
     因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
示例 3:

输入: [7,6,4,3,1] 
输出: 0 
解释: 在这个情况下, 没有交易完成, 所以最大利润为 0。

*/

/*
思路：k = 2
k = 2 和前面题目的情况稍微不同，因为上面的情况都和 k 的关系不太大。要么 k 是正无穷，状态转移和 k 没关系了；要么 k = 1，跟 k = 0 这个 base case 挨得近，最后也没有存在感。
这道题 k = 2 和后面要讲的 k 是任意正整数的情况中，对 k 的处理就凸显出来了。我们直接写代码，边写边分析原因。

原始的动态转移方程，没有可化简的地方
dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])

按照之前的代码，我们可能想当然这样写代码（错误的）：

int k = 2;
int[][][] dp = new int[n][k + 1][2];
for (int i = 0; i < n; i++)
    if (i - 1 == -1) { // 处理一下 base case }
    dp[i][k][0] = Math.max(dp[i-1][k][0], dp[i-1][k][1] + prices[i]);
    dp[i][k][1] = Math.max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i]);
}
return dp[n - 1][k][0];

为什么错误？我这不是照着状态转移方程写的吗？
还记得前面总结的「穷举框架」吗？就是说我们必须穷举所有状态。其实我们之前的解法，都在穷举所有状态，只是之前的题目中 k 都被化简掉了。比如说第一题，k = 1：
「代码截图」
这道题由于没有消掉 k 的影响，所以必须要对 k 进行穷举：

int max_k = 2;
int[][][] dp = new int[n][max_k + 1][2];
for (int i = 0; i < n; i++) {
    for (int k = max_k; k >= 1; k--) {
        if (i - 1 == -1) { // 处理 base case }
        dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i]);
        dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i]);
    }
}
// 穷举了 n × max_k × 2 个状态，正确。
return dp[n - 1][max_k][0];

如果你不理解，可以返回第一点「穷举框架」重新阅读体会一下。
这里 k 取值范围比较小，所以可以不用 for 循环，直接把 k = 1 和 2 的情况全部列举出来也可以：

*/

// DP写法
function maxProfitThirdByDP(prices: number[]): number {
  const n = prices.length;
  const max_k = 2;
  // k的数组长度为2(即max_k) + 1 的意思代表 k = 0 没有交易，k = 1 第一次交易，k = 2 第二次交易
  const dp = Array.from(new Array(n), () => Array.from(new Array(max_k + 1), () => new Array(2)));

  for (let i = 0; i < n; i++) {
    // k为2比较小，可以直接列举
    if (i === 0) {
      dp[i][1][0] = 0; // 这里可以为0，因为下面的dp[i][1][0]的比较大小无影响：max(0, 股票价格)
      dp[i][1][1] = -prices[i]; // 第一次购买股票，完成第一次交易
      dp[i][2][0] = 0; // 第一天不可能有第二次交易，比较大小无影响，因此可以设为0
      dp[i][2][1] = -prices[i]; // 同上，但不能设为0，因为也需要给一个初始值,代表第一天就交易了
      continue;
    }

    // 每次购买才算一次交易，k就会 +1，(也可以售卖才算，下面的状态转移方程就)
    // dp[i][2][1]要先跑，因为它依赖dp[i-1][1][0]，不然dp[i-1][1][0]一改就错了

    // 当天(k=2)没持有股票: 1.昨天(k=2)没持有股票直到第二天 2.昨天(k=2)卖了股票，但卖不算交易，因此k不用动
    dp[i][2][0] = Math.max(dp[i-1][2][0], dp[i-1][2][1] + prices[i]);
    // 当天(k=2)持有股票: 1.昨天(k=2)持有股票直到第二天 2.昨天(k=2)购买了股票，而且当时是k=1的盈利金额去买的
    dp[i][2][1] = Math.max(dp[i-1][2][1], dp[i-1][1][0] - prices[i]);
    // 当天(k=1)没持有股票: 1.昨天(k=1)没持有股票直到第二天 2.昨天(k=1)卖了股票，但卖不算交易，因此k不用动
    dp[i][1][0] = Math.max(dp[i-1][1][0], dp[i-1][1][1] + prices[i]);
    // 当天(k=1)持有股票: 1.昨天(k=1)持有股票直到第二天 
    // 2.昨天(k=1)购买了股票，买算交易，因此后面应该是dp[i][0][0] - prices[i]，未交易未持有那就是0，因此可以省略
    dp[i][1][1] = Math.max(dp[i-1][1][1], -prices[i]);
  }

  // 穷举了 n × max_k × 2 个状态
  return dp[n-1][2][0];

  // 相比于状态机的写法，这里其实少了一个循环的，i = 0 时设置的初始值，状态机是一开始就有初始值了
  // 这里需要比较第一次和第二次交易的最大利润的大小
  // i = 0 时 dp[i][2][1] = -Infinity; // 同上，但不能设为0，比较大小有影响：max(0, -股票价格),需要设为负无穷
  // return Math.max(dp[n-1][1][0], dp[n-1][2][0]);
}

console.log(maxProfitThirdByDP([3,3,5,0,0,3,1,4]));
console.log(maxProfitThirdByDP([1,2,3,4,5]));
console.log(maxProfitThirdByDP([7,6,4,3,1]));

// 状态机变量写法
function maxProfitThirdByVariable(prices: number[]): number {
  // base case
  // 这里使用-Infinity一点问题都没有，因为第一天 i = 0 才能买股票扣钱
  let dp_i_1_0 = 0, dp_i_1_1 = -Infinity,
      dp_i_2_0 = 0, dp_i_2_1 = -Infinity;
  
  for (let i = 0; i < prices.length; i++) {
    // 这里调换一下顺序就可以不用暂存变量的初始值,防止一个初始值改变影响到其他值的大小比较了
    dp_i_2_0 = Math.max(dp_i_2_0, dp_i_2_1 + prices[i]);
    dp_i_2_1 = Math.max(dp_i_2_1, dp_i_1_0 - prices[i]);
    dp_i_1_0 = Math.max(dp_i_1_0, dp_i_1_1 + prices[i]);
    dp_i_1_1 = Math.max(dp_i_1_1, -prices[i]);
  }

  return dp_i_2_0;
}

console.log(maxProfitThirdByVariable([3,3,5,0,0,3,1,4]));
console.log(maxProfitThirdByVariable([1,2,3,4,5]));
console.log(maxProfitThirdByVariable([7,6,4,3,1]));
