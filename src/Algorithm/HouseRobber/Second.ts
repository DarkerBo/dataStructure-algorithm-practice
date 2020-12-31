// LeetCode第 213 题， 打家劫舍 II 房子围成一个圈
/*
你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 围成一圈 ，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警 。

给定一个代表每个房屋存放金额的非负整数数组，计算你 在不触动警报装置的情况下 ，能够偷窃到的最高金额。

示例 1：
输入：nums = [2,3,2]
输出：3
解释：你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。

示例 2：
输入：nums = [1,2,3,1]
输出：4
解释：你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。
     偷窃到的最高金额 = 1 + 3 = 4 。

示例 3：
输入：nums = [0]
输出：0

*/

/*
思路：
这道题目和第一道描述基本一样，强盗依然不能抢劫相邻的房子，输入依然是一个数组，但是告诉你这些房子不是一排，而是围成了一个圈。

也就是说，现在第一间房子和最后一间房子也相当于是相邻的，不能同时抢。比如说输入数组nums=[2,3,2]，算法返回的结果应该是 3 而不是 4，因为开头和结尾不能同时被抢。

这个约束条件看起来应该不难解决，我们前文 单调栈 Monotonic Stack 的使用 说过一种解决环形数组的方案，那么在这个问题上怎么处理呢？

首先，首尾房间不能同时被抢，那么只可能有三种不同情况：要么都不被抢；要么第一间房子被抢最后一间不抢；要么最后一间房子被抢第一间不抢。
eg: [1,2,3]
分别是情况一二三： 12, 23, 2

那就简单了啊，这三种情况，哪种的结果最大，就是最终答案呗！不过，其实我们不需要比较三种情况，只要比较情况二和情况三就行了，因为这两种情况对于房子的选择余地比情况一大呀，房子里的钱数都是非负数，所以选择余地大，最优决策结果肯定不会小。

*/

// Memo备忘录写法 【超时 + memo不应该共用问题】
function robSecondByMemo(nums: number[]): number {
  const n = nums.length;
  if (n === 1) return nums[0];
  const memo = new Map();

  const dp = (nums: number[], start: number, end: number) => {

    if (start > end) return 0;
    if (memo.has(n)) return memo.get(n);

    const res = Math.max(dp(nums, start + 1, end), dp(nums, start + 2, end) + nums[start]);
    memo.set(start, res);
    return res;
  }

  return Math.max(dp(nums, 0, nums.length - 2), dp(nums, 1, nums.length - 1));
}

// console.log(robSecondByMemo([2,3,2]));
// console.log(robSecondByMemo([1,2,3,1]));
console.log(robSecondByMemo([94, 40, 49, 65, 21, 21, 106, 80, 92, 81, 679, 4, 61, 6, 237, 12, 72, 74, 29, 95, 265, 35, 47, 1, 61, 397, 52, 72, 37, 51, 1, 81, 45, 435, 7, 36, 57, 86, 81, 72]));

// DP写法
function robSecondByDP(nums: number[]): number {
  const n = nums.length;
  if (n === 1) return nums[0];
  
  const _robSecondByDP = (nums: number[], start: number, end: number) => {
    // 长度还是要为 n + 2，因为end有可能为 n - 1，也可以写成 end - start + 4
    const dp = new Array(end - start + 4).fill(0);
    for (let i = end; i >= start; i--) {
      dp[i] = Math.max(dp[i + 1], dp[i + 2] + nums[i]);
    }

    return dp[start];
  }

  return Math.max(_robSecondByDP(nums, 0, n - 2), _robSecondByDP(nums, 1, n - 1));
}

// console.log(robSecondByDP([2,3,2]));
// console.log(robSecondByDP([1,2,3,1]));
// console.log(robSecondByDP([1]));
// console.log(robSecondByDP([1, 2]));


// 空间复杂度为O(1)的变量写法
function robSecondByVariable(nums: number[]): number {
  const n = nums.length;
  if (n === 1) return nums[0];
  
  const _robSecondByVariable = (nums: number[], start: number, end: number) => {
    let dp_i_1 = 0, dp_i_2 = 0, dp_i = 0;
    for (let i = end; i >= start; i--) {
      dp_i = Math.max(dp_i_1, dp_i_2 + nums[i]);
      dp_i_2 = dp_i_1;
      dp_i_1 = dp_i;
    }

    return dp_i;
  }

  return Math.max(_robSecondByVariable(nums, 0, n - 2), _robSecondByVariable(nums, 1, n - 1));
}
