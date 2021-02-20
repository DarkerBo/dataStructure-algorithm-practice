// LeetCode第 18 题 四数之和
/*
给定一个包含 n 个整数的数组 nums 和一个目标值 target，判断 nums 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c + d 的值与 target 相等？找出所有满足条件且不重复的四元组。

注意：

答案中不可以包含重复的四元组。

示例：

给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。

满足要求的四元组集合为：
[
  [-1,  0, 0, 1],
  [-2, -1, 1, 2],
  [-2,  0, 0, 2]
]
*/

/*
思路：
都到这份上了，4Sum 完全就可以用相同的思路：穷举第一个数字，然后调用 3Sum 函数计算剩下三个数，最后组合出和为 target 的四元组。

这样，按照相同的套路，4Sum 问题就解决了，时间复杂度的分析和之前类似，for 循环中调用了 threeSumTarget 函数，所以总的时间复杂度就是 O(N^3)。
*/

function fourSum(nums: number[], target: number): number[][] {
  const sortNums = nums.sort((a, b) => a - b);
  const res = [];

  for (let i = 0; i < sortNums.length; i++) {
    const targetArr = threeSumTarget(sortNums, target - sortNums[i], i + 1);
    for (const item of targetArr) {
			res.push([nums[i], ...item]);
		}

    while (i < nums.length - 1 && nums[i] === nums[i + 1]) i++; 
  }

  return res;
};

function threeSumTarget(nums: number[], target: number, start: number): number[][] {
	const res = [];

	for (let i = start; i < nums.length; i++) {
		const targetArr = twoSumSup(nums, target - nums[i], i + 1);
		for (const item of targetArr) {
			res.push([nums[i], ...item]);
		}

		while (i < nums.length - 1 && nums[i] === nums[i + 1]) i++; 
	}

	return res;
};

// 两数之和辅助函数
function twoSumSup(nums: number[], target: number, start: number): number[][] {

  let left = start, right = nums.length - 1;
  const res = [];

	while (left < right) {
		const sum = nums[left] + nums[right];
		const leftValue = nums[left], rightValue = nums[right];

		if (sum < target) {
			while (left < right && nums[left] === leftValue) left++;
		} else if (sum > target) {
			while (left < right && nums[right] === rightValue) right--; 
		} else {
			res.push([nums[left], nums[right]]);
			while (left < right && nums[left] === leftValue) left++;
			while (left < right && nums[right] === rightValue) right--; 
		}
	}

	return res;
}
