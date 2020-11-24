// 寻找左侧边界的二分搜索
// 查找小于target的边界值 如[1,2,3,4,5] target为4 则左侧边界索引为3

// 左闭右开写法
function leftBoundSearch(nums: number[], target: number): number {
  if (nums.length === 0) return -1;
  let left = 0, right = nums.length; // 注意

  while (left < right) { // 注意
    // 注意这里用的是floor, 如果是用ceil的话如nums = [1,2,2,2,5] target = 3
    // 一开始mid为3，left就变成4，后面mid就无限为5了，但是索引5是不存在该数组的，因此会无限循环
    const mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] === target) right = mid; 
    else if (nums[mid] < target) left = mid + 1; 
    else if (nums[mid] > target) right = mid; // 注意
  }

  // target都大于nums里面的元素时 left就为nums.length
  // target都小于nums里面的元素时 left就为0
  if (left === nums.length || nums[left] !== target) return -1;

  return left;
}

// console.log(leftBoundSearch([1,2,2,2,5], 3));
console.log(leftBoundSearch([1,2,2,2,3], 2));
// console.log(leftBoundSearch([2,2,2,2,3], 1));

/*
1、为什么 while 中是 < 而不是 <=?
答：用相同的方法分析，因为 right = nums.length 而不是 nums.length - 1。因此每次循环的「搜索区间」是 [left, right) 左闭右开。
while(left < right) 终止的条件是 left == right，此时搜索区间 [left, left) 为空，所以可以正确终止。
PS：这里先要说一个搜索左右边界和上面这个算法的一个区别，也是很多读者问的：刚才的 right 不是 nums.length - 1 吗，为啥这里非要写成 nums.length 使得「搜索区间」变成左闭右开呢？
因为对于搜索左右侧边界的二分查找，这种写法比较普遍，我就拿这种写法举例了，保证你以后遇到这类代码可以理解。你非要用两端都闭的写法反而更简单，我会在后面写相关的代码，把三种二分搜索都用一种两端都闭的写法统一起来，你耐心往后看就行了。

2、为什么没有返回 -1 的操作？如果 nums 中不存在 target 这个值，怎么办？
答：因为要一步一步来，先理解一下这个「左侧边界」有什么特殊含义：
如 nums = [1,2,2,2,3]  target = 3
对于这个数组，算法会返回 1。这个 1 的含义可以这样解读：nums 中小于 2 的元素有 1 个。
比如对于有序数组 nums = [2,3,5,7], target = 1，算法会返回 0，含义是：nums 中小于 1 的元素有 0 个。
再比如说 nums = [2,3,5,7], target = 8，算法会返回 4，含义是：nums 中小于 8 的元素有 4 个。
综上可以看出，函数的返回值（即 left 变量的值）取值区间是闭区间 [0, nums.length]，所以我们简单添加两行代码就能在正确的时候 return -1：
while (left < right) {
  ...
}
// target 比所有数都大
if (left === nums.length) return -1; 或 return nums[left] === target ? left : -1;

3、为什么 left = mid + 1，right = mid ？和之前的算法不一样？
答：这个很好解释，因为我们的「搜索区间」是 [left, right) 左闭右开，所以当 nums[mid] 被检测之后，下一步的搜索区间应该去掉 mid 分割成两个区间，即 [left, mid) 或 [mid + 1, right)。

4、为什么该算法能够搜索左侧边界？
答：关键在于对于 nums[mid] == target 这种情况的处理：
if (nums[mid] === target) right = mid; 
可见，找到 target 时不要立即返回，而是缩小「搜索区间」的上界 right，在区间 [left, mid) 中继续搜索，即不断向左收缩，达到锁定左侧边界的目的。

5、为什么返回 left 而不是 right？
答：都是一样的，因为 while 终止的条件是 left == right。

6、能不能想办法把 right 变成 nums.length - 1，也就是继续使用两边都闭的「搜索区间」？这样就可以和第一种二分搜索在某种程度上统一起来了。
答：当然可以，只要你明白了「搜索区间」这个概念，就能有效避免漏掉元素，随便你怎么改都行。下面我们严格根据逻辑来修改：
因为你非要让搜索区间两端都闭，所以 right 应该初始化为 nums.length - 1，while 的终止条件应该是 left == right + 1，也就是其中应该用 <=：
*/

// 与普通二分搜索统一写法(right = nums.length - 1)
// 左闭右闭写法
function leftBoundSearchByEqual(nums: number[], target: number): number {
  if (nums.length === 0) return -1;

  // 搜索区间为 [left, right]
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.ceil(left + (right - left) / 2);
    if (nums[mid] === target) right = mid - 1; // 收缩右侧边界
    else if (nums[mid] < target) left = mid + 1; // 搜索区间变为 [mid+1, right]
    else if (nums[mid] > target) right = mid - 1; // 搜索区间变为 [left, mid-1]
  }

  if (left === nums.length || nums[left] !== target) return -1;

  return left;
}

// console.log(leftBoundSearchByEqual([1,2,2,2,5], 3));
// console.log(leftBoundSearchByEqual([1,2,2,2,3], 5));
// console.log(leftBoundSearchByEqual([2,2,2,2,3], 1));
console.log(leftBoundSearchByEqual([1,2,2,2,3], 2));


/*
梳理总结：寻找左侧边界的二分查找：
因为我们初始化 right = nums.length
所以决定了我们的「搜索区间」是 [left, right)
所以决定了 while (left < right)
同时也决定了 left = mid + 1 和 right = mid

因为我们需找到 target 的最左侧索引
所以当 nums[mid] === target 时不要立即返回
而要收紧右侧边界以锁定左侧边界

*/
