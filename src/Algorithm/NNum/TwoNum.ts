// LeetCode第 1 题 两数之和 【原题是获取索引值，这里改编成获取值】
/*
给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 的那 两个 整数，并返回它们的数组的值【原题下标】。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

你可以按任意顺序返回答案。

示例 1：
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

示例 2：
输入：nums = [3,2,4], target = 6
输出：[1,2]

示例 3：
输入：nums = [3,3], target = 6
输出：[0,1]


*/

/*
思路：
力扣上的 twoSum 问题，题目要求返回的是索引，这里我来编一道 twoSum 题目，不要返回索引，返回元素的值：

如果假设输入一个数组 nums 和一个目标和 target，请你返回 nums 中能够凑出 target 的两个元素的值，
比如输入 nums = [5,3,1,6], target = 9，那么算法返回两个元素 [3,6]。可以假设只有且仅有一对儿元素可以凑出 target。

我们可以先对 nums 排序，然后利用前文「双指针技巧汇总」写过的左右双指针技巧，从两端相向而行就行了：

*/

function twoSum(nums: number[], target: number): number[] {
  const sortNums = nums.sort((a, b) => a - b);
  let left = 0,
    right = sortNums.length - 1;

  while (left < right) {
    const sum = sortNums[left] + sortNums[right];
    if (sum < target) left++;
    else if (sum > target) right--;
    else return [sortNums[left], sortNums[right]];
  }

  return [];
}

console.log(twoSum([3, 2, 4], 6));

/*
思路：
这样就可以解决这个问题，不过我们要继续魔改题目，把这个题目变得更泛化，更困难一点：

nums 中可能有多对儿元素之和都等于 target，请你的算法返回所有和为 target 的元素对儿，其中不能出现重复。

函数签名如下：

vector<vector<int>> twoSumTarget(vector<int>& nums, int target);
比如说输入为 nums = [1,3,1,2,2,3], target = 4，那么算法返回的结果就是：[[1,3],[2,2]]。

对于修改后的问题，关键难点是现在可能有多个和为 target 的数对儿，还不能重复，比如上述例子中 [1,3] 和 [3,1] 就算重复，只能算一次。

首先，基本思路肯定还是排序加双指针：

但是，这样实现会造成重复的结果，比如说 nums = [1,1,1,2,2,3,3], target = 4，得到的结果中 [1,3] 肯定会重复。

出问题的地方在于 sum == target 条件的 if 分支，当给 res 加入一次结果后，lo 和 hi 不应该改变 1 的同时，还应该跳过所有重复的元素：

其实前两个 if 分支也是可以做一点效率优化，跳过相同的元素：

*/

function twoSumVarious(nums: number[], target: number): number[][] {
  let left = 0,
    right = nums.length - 1;
  const res = [];

  const sortNums = nums.sort((a, b) => a - b);

  while (left < right) {
    const sum = sortNums[left] + sortNums[right];
    const leftValue = sortNums[left],
      rightValue = sortNums[right];

    if (sum < target) {
      // 如果有相同项的话，忽略掉该项，继续下一项
      while (left < right && nums[left] === leftValue) left++;
    } else if (sum > target) {
      // 如果有相同项的话，忽略掉该项，继续下一项
      while (left < right && nums[right] === rightValue) right--;
    } else {
      res.push([sortNums[left], sortNums[right]]);
      while (left < right && nums[left] === leftValue) left++;
      while (left < right && nums[right] === rightValue) right--;
    }
  }

  return res;
}

/*
这样，一个通用化的 twoSum 函数就写出来了，请确保你理解了该算法的逻辑，我们后面解决 3Sum 和 4Sum 的时候会复用这个函数。

这个函数的时间复杂度非常容易看出来，双指针操作的部分虽然有那么多 while 循环，但是时间复杂度还是 O(N)，而排序的时间复杂度是 O(NlogN)，所以这个函数的时间复杂度是 O(NlogN)。
*/

// 可以使用memo来解决
function twoSumMap(nums: number[], target: number): number[] {
  const memo = new Map();

  for (let i = 0; i < nums.length; i++) {
    memo.set(nums[i], i);
  }

  for (let i = 0; i < nums.length; i++) {
    if (memo.has(target - nums[i])) {
      return [i, memo.get(target - nums[i])];
    }
  }

  return [];
}
