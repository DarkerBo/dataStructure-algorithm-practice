// LeetCode第 198 题，打家劫舍
/*
你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

示例 1：
输入：[1,2,3,1]
输出：4
解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4 。

示例 2：
输入：[2,7,9,3,1]
输出：12
解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
     偷窃到的最高金额 = 2 + 9 + 1 = 12 。

*/

/*
思路：
题目很容易理解，而且动态规划的特征很明显。我们前文 动态规划详解 做过总结，解决动态规划问题就是找「状态」和「选择」，仅此而已。

假想你就是这个专业强盗，从左到右走过这一排房子，在每间房子前都有两种选择：抢或者不抢。

如果你抢了这间房子，那么你肯定不能抢相邻的下一间房子了，只能从下下间房子开始做选择。

如果你不抢这间房子，那么你可以走到下一间房子前，继续做选择。

当你走过了最后一间房子后，你就没得抢了，能抢到的钱显然是 0（base case）。

以上的逻辑很简单吧，其实已经明确了「状态」和「选择」：你面前房子的索引就是状态，抢和不抢就是选择。

rob[2..] => rob[3..] 
         => nums[2] + rob[4..] (抢了2就不能抢3)
*/

// Memo备忘录的写法 其实是从上而下的，从 n 和 n-1 开始比较
// 可以这样理解：[1,2,3,4,5] 最开始是0 5比较，dp[5] = 5, 然后就是 4 5 比较，dp[4] = 5, 然后是dp[4], dp[5] + 3 比较...
function robFirstByMemo(nums: number[]): number {
  const memo = new Map();
  const dp = (nums: number[], n: number) => {
    if (n >= nums.length) return 0;

    if (memo.has(n)) return memo.get(n);
    const res = Math.max(dp(nums, n + 1), dp(nums, n + 2) + nums[n]);
    memo.set(n, res);
    return res;
  }

  return dp(nums, 0);
}

// console.log(robFirstByMemo([1,2,3,1]));
// console.log(robFirstByMemo([2,7,9,3,1]));
// console.log(robFirstByMemo([0, 1, 2]));


// DP写法 说是说自底而上，但是看来看去都是自顶而下。。
// 一般dp都是要加长一点长度，比nums大
function robFirstByDP(nums: number[]): number {
  const n = nums.length;
  if (n === 0) return 0;
  const dp = new Array(n);
  // base case
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < n; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }

  return dp[n - 1];
}

// console.log(robFirstByDP([1,2,3,1]));
// console.log(robFirstByDP([2,7,9,3,1]));
console.log(robFirstByDP([1,2,3]));


// 空间复杂度为O(1)的变量写法
function robFirstByVariable(nums: number[]): number {
  if (nums.length === 0) return 0;

  // dp_0代表上一间能抢的最大，dp_1代表当前可以抢的最大
  let dp_0 = 0, dp_1 = nums[0];
  // 这里i从1开始是因为有dp_0这个一开始的虚拟节点
  for (let i = 1; i < nums.length; i++) {
    const temp = dp_1;
    // 这里左边的dp_1是最新的，右边的dp_1已经是上一个房间的，dp_0是上两个房间
    dp_1 = Math.max(dp_1, dp_0 + nums[i]);
    dp_0 = temp;
  }

  return dp_1;
}

// console.log(robFirstByVariable([1,2,3,1]));
// console.log(robFirstByVariable([2,7,9,3,1]));
