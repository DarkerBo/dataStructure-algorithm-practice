// 寻找右侧边界的二分搜索
// 查找大于target的边界值 如[1,2,3,4,5] target为4 则右侧边界索引为3

// 老规矩先左闭右开写法
function rightBoundSearch(nums: number[], target: number): number {
  if (nums.length === 0) return -1;

  let left = 0, right = nums.length;
  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] === target) left = mid + 1; // 注意
    else if (nums[mid] < target) left = mid + 1;
    else if (nums[mid] > target) right = mid;
  }

  if (left === 0 || nums[left - 1] !== target) return -1;

  // 循环完毕left就等于right，这里写right - 1也是一样的
  return left - 1; // 注意
}

/*
1、为什么这个算法能够找到右侧边界？
答：类似地，关键点还是这里：
if (nums[mid] === target) left = mid + 1;
当 nums[mid] == target 时，不要立即返回，而是增大「搜索区间」的下界 left，使得区间不断向右收缩，达到锁定右侧边界的目的。

2、为什么最后返回 left - 1 而不像左侧边界的函数，返回 left？而且我觉得这里既然是搜索右侧边界，应该返回 right 才对。
答：首先，while 循环的终止条件是 left === right，所以 left 和 right 是一样的，你非要体现右侧的特点，返回 right - 1 好了。
至于为什么要减一，这是搜索右侧边界的一个特殊点，关键在这个条件判断：
if (nums[mid] === target) left = mid + 1;
如nums为[1,2,2,4] 此时left为0 right为4。
第一次循环mid为2，left为3，right为4，
第二次循环mid为3，left为3，right为3
跳出循环 此时left在第二次循环中+1，因此返回最终结果的时候需要返回
因为我们对 left 的更新必须是 left = mid + 1，就是说 while 循环结束时，nums[left] 一定不等于 target 了，而 nums[left-1] 可能是 target。
至于为什么 left 的更新必须是 left = mid + 1，同左侧边界搜索，就不再赘述。

3、为什么没有返回 -1 的操作？如果 nums 中不存在 target 这个值，怎么办？
答：类似之前的左侧边界搜索，因为 while 的终止条件是 left == right，就是说 left 的取值范围是 [0, nums.length]，所以可以添加两行代码，正确地返回 -1：
if (left === 0 || nums[left - 1] !== target) return -1;

4. 是否也可以把这个算法的「搜索区间」也统一成两端都闭的形式呢？这样这三个写法就完全统一了，以后就可以闭着眼睛写出来了。
*/


// 与普通二分搜索统一写法(right = nums.length - 1)
// 左闭右闭写法
function rightBoundSearchByEqual(nums: number[], target: number): number {
  if (nums.length === 0) return -1;
  let left = 0, right = nums.length - 1;
  
  while(left <= right) {
    const mid = Math.ceil(left + (right - left) / 2);
    if (nums[mid] === target) left = mid + 1;
    else if (nums[mid] < target) left = mid + 1;
    else if (nums[mid] > target) right = mid - 1;
  }

  if (right < 0 || nums[right] !== target) return -1;
  
  return right;
}

/*
梳理总结：寻找右侧边界的二分查找：
因为我们初始化 right = nums.length
所以决定了我们的「搜索区间」是 [left, right)
所以决定了 while (left < right)
同时也决定了 left = mid + 1 和 right = mid

因为我们需找到 target 的最右侧索引
所以当 nums[mid] === target 时不要立即返回
而要收紧左侧边界以锁定右侧边界

又因为收紧左侧边界时必须 left = mid + 1
所以最后无论返回 left 还是 right，必须减一

*/

