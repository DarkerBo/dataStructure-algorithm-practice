/*
在 LeetCode 上，4Sum 就到头了，但是回想刚才写 3Sum 和 4Sum 的过程，实际上是遵循相同的模式的。我相信你只要稍微修改一下 4Sum 的函数就可以复用并解决 5Sum 问题，然后解决 6Sum 问题……

那么，如果我让你求 100Sum 问题，怎么办呢？其实我们可以观察上面这些解法，统一出一个 nSum 函数：

嗯，看起来很长，实际上就是把之前的题目解法合并起来了，n == 2 时是 twoSum 的双指针解法，n > 2 时就是穷举第一个数字，然后递归调用计算 (n-1)Sum，组装答案。

需要注意的是，调用这个 nSum 函数之前一定要先给 nums 数组排序，因为 nSum 是一个递归函数，如果在 nSum 函数里调用排序函数，那么每次递归都会进行没有必要的排序，效率会非常低。

*/

// 记得调用该函数之前先给nums排序，否则每次递归都要排序一次很耗性能
function nSum(nums: number[], target: number, n: number, start: number): number[][] {
  const res: number[][] = [];
  // 至少是 2Sum，且数组大小不应该小于 n
  if (n < 2 || nums.length < n) return res;

  // 2Sum 是 base case
  if (n === 2) {
    // 双指针那一套操作
    let left = start, right = nums.length - 1;

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
  } else {
    // n > 2 时，递归计算 (n-1)Sum 的结果
    for (let i = start; i < nums.length; i++) {
      const nSumArr = nSum(nums, target - nums[i], n - 1, i + 1);
      for (const item of nSumArr) {
        res.push([nums[i], ...item]);
      }

      while (i < nums.length - 1 && nums[i] === nums[i + 1]) i++;  
    }
  }

  return res;
}

