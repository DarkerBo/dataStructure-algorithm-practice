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

// Memo备忘录的写法
function robFirstByMemo(nums: number[]): number {
  const memo = new Map();
  const dp = (nums: number[], n: number) => {
    if (n >= nums.length) return 0;

    if (memo.has(n)) return memo.get(n);
    const res = Math.max(dp(nums, n + 1), nums[n] + dp(nums, n + 2));
    memo.set(n, res);
    return res;
  }

  return dp(nums, 0);
}

// console.log(robFirstByMemo([1,2,3,1]));
// console.log(robFirstByMemo([2,7,9,3,1]));


// DP写法
// 一般dp都是要加长一点长度，比nums大
function robFirstByDP(nums: number[]): number {
  const n = nums.length;
  const dp: number[] = new Array(n + 2).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    dp[i] = Math.max(dp[i+1], dp[i+2] + nums[i]);
  }
  return dp[0];
}

console.log(robFirstByDP([1,2,3,1]));
console.log(robFirstByDP([2,7,9,3,1]));


// 空间复杂度为O(1)的变量写法
function robFirstByVariable(nums: number[]): number {
  let dp_0 = 0, dp_1 = 0;
  for (let i = 0; i < nums.length; i++) {
    dp_0 = Math.max(dp_0, dp_1 + nums[i]);
    dp_1 = Math.max(dp_1, dp_0 + nums[i]);
  }

  return dp_0;
}

