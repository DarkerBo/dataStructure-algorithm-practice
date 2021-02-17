// LeetCode第 15 题 三数之和
/*
给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。

注意：答案中不可以包含重复的三元组。

示例 1：
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]

示例 2：
输入：nums = []
输出：[]

示例 3：
输入：nums = [0]
输出：[]
*/


/*
思路：
题目就是让我们找 nums 中和为 0 的三个元素，返回所有可能的三元组（triple），函数签名如下：

vector<vector<int>> threeSum(vector<int>& nums);
这样，我们再泛化一下题目，不要光和为 0 的三元组了，计算和为 target 的三元组吧，同上面的 twoSum 一样，也不允许重复的结果：

vector<vector<int>> threeSum(vector<int>& nums) {
    // 求和为 0 的三元组
    return threeSumTarget(nums, 0);
}

vector<vector<int>> threeSumTarget(vector<int>& nums, int target) {
    // 输入数组 nums，返回所有和为 target 的三元组
}
这个问题怎么解决呢？很简单，穷举呗。现在我们想找和为 target 的三个数字，那么对于第一个数字，可能是什么？nums 中的每一个元素 nums[i] 都有可能！

那么，确定了第一个数字之后，剩下的两个数字可以是什么呢？其实就是和为 target - nums[i] 的两个数字呗，那不就是 twoSum 函数解决的问题么🤔

可以直接写代码了，需要把 twoSum 函数稍作修改即可复用。

需要注意的是，类似 twoSum，3Sum 的结果也可能重复，比如输入是 nums = [1,1,1,2,3], target = 6，结果就会重复。

关键点在于，不能让第一个数重复，至于后面的两个数，我们复用的 twoSum 函数会保证它们不重复。所以代码中必须用一个 while 循环来保证 3Sum 中第一个元素不重复。

至此，3Sum 问题就解决了，时间复杂度不难算，排序的复杂度为 O(NlogN)，twoSumTarget 函数中的双指针操作为 O(N)，threeSumTarget 函数在 for 循环中调用 twoSumTarget 所以总的时间复杂度就是 O(NlogN + N^2) = O(N^2)。

*/

// function threeSum(nums: number[], target: number): number[][] {

// };

// 两数之和辅助函数
// function twoSumTarget(nums: number[], target: number): number[][] {
//   let left = 0, right = nums.length - 1;
//   const res = [];

// }