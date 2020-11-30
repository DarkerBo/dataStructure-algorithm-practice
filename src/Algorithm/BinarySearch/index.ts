/* 
二分搜索算法

二分查找并不简单，Knuth 大佬（发明 KMP 算法的那位）都说二分查找：思路很简单，细节是魔鬼。很多人喜欢拿整型溢出的 bug 说事儿，但是二分查找真正的坑根本就不是那个细节问题，而是在于到底要给 mid 加一还是减一，while 里到底用 <= 还是 <。

二分查找框架:
function binarySearch(nums: number[], target: number) {
  let left = 0, right = ...;

  while (...) {
    const mid = left + (right - left) / 2;
    if (nums[mid] === target) {
      ...
    } else if (nums[mid] < target) {
      left = ...;
    } else if (nums[mid] > target) {
      right = ...;
    }
  }
  return ...;
}

分析二分查找的一个技巧是：不要出现 else，而是把所有情况用 else if 写清楚，这样可以清楚地展现所有细节。本文都会使用 else if，旨在讲清楚，读者理解后可自行简化。
其中 ... 标记的部分，就是可能出现细节问题的地方，当你见到一个二分查找的代码时，首先注意这几个地方。后文用实例分析这些地方能有什么样的变化。
另外声明一下，计算 mid 时需要防止溢出，代码中 left + (right - left) / 2 就和 (left + right) / 2 的结果相同，但是有效防止了 left 和 right 太大直接相加导致溢出。

记忆点：
[left, rigt) left是闭区间 一般要mid+1 right是开区间 一般直接等于mid就可以
[left, right] 两个都是闭区间 一般都是mid+1和mid-1

*/

// LeetCode 704 二分查找 + 34 在排序数组中查找元素的第一个和最后一个位置
// 基本二分搜索 + 左侧边界搜索 + 右侧边界搜索 左右关闭总结
// 对于寻找左右边界的二分搜索，常见的手法是使用左闭右开的「搜索区间」，我们还根据逻辑将「搜索区间」全都统一成了两端都闭，便于记忆，只要修改两处即可变化出三种写法：

// 基本二分搜索
function binarySearchByClose(nums: number[], target: number): number {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.ceil(left + (right - left) / 2);
    if (nums[mid] === target) return mid; // 直接返回
    else if (nums[mid] < target) left = mid + 1;
    else if (nums[mid] > target) right = mid - 1;
  }

  return -1;  // 直接返回
}

// 左侧边界搜索
function leftBoundSearchByClose(nums: number[], target: number): number {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.ceil(left + (right - left) / 2);
    if (nums[mid] === target) right = mid - 1; // 别返回，锁定左侧边界
    else if (nums[mid] < target) left = mid + 1;
    else if (nums[mid] > target) right = mid - 1; 
  }

  // 最后要检查 left 越界的情况
  if (left === nums.length || nums[left] !== target) return -1;

  return left;
}

// 右侧边界搜索
function rightBoundSearchByClose(nums: number[], target: number): number {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.ceil(left + (right - left) / 2);
    if (nums[mid] === target) left + 1;
    else if (nums[mid] < target) left + 1; // 别返回，锁定右侧边界
    else if (nums[mid] > target) right - 1;
  }

  // 最后要检查 right 越界的情况
  if (right < 0 || nums[right] !== target) return -1;
  
  return right;
}

/*
通过本文，你学会了：
1、分析二分查找代码时，不要出现 else，全部展开成 else if 方便理解。
2、注意「搜索区间」和 while 的终止条件，如果存在漏掉的元素，记得在最后检查。
3、如需定义左闭右开的「搜索区间」搜索左右边界，只要在 nums[mid] == target 时做修改即可，搜索右侧时需要减一。
4、如果将「搜索区间」全都统一成两端都闭，好记，只要稍改 nums[mid] === target 条件处的代码和返回的逻辑即可，推荐拿小本本记下，作为二分搜索模板

*/


