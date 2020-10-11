// 快速排序
// 快排的原理如下。随机选取一个数组中的值作为基准值，从左至右取值与基准值对比大小。比基准值小的放数组左边，大的放右边，对比完成后将基准值和第一个比基准值大的值交换位置。然后将数组以基准值的位置分为两部分，继续递归以上操作。

/**
 * @description 快速排序
 * @param arr
 */
export function quickSort<T>(arr: T[]): T[] {
  _quickSort(arr, 0, arr.length - 1);
  return arr;
}

/**
 * @description 快速排序辅助函数
 * @param arr
 * @param left arr数组的左指针
 * @param right arr数组的右指针
 */
function _quickSort<T>(arr: T[], left: number, right: number): void {
  // 若left 等于 right，即需要排序的数组只剩下一个元素，此时无需排序
  // 而且没有该条件，p有可能为0，导致right的值有可能为 -1
  if (left < right) {
    const p: number = _partition1(arr, left, right); // arr以p为索引划分了左右数组
    _quickSort(arr, left, p - 1);
    _quickSort(arr, p + 1, right);
  }
}

/**
 * @description 快速排序单路快排
 * @param arr
 * @param left arr数组的左指针
 * @param right arr数组的右指针
 */
function _partition1<T>(arr: T[], left: number, right: number): number {
  // 随机取值，然后和开头left交换，这样做比固定取一个位置的复杂度略低
  const randomNum: number = Math.floor(Math.random() * (right - left + 1)) + left;
  [arr[left], arr[randomNum]] = [arr[randomNum], arr[left]];

  const v: T = arr[left]; // arr中原本随机选取的索引
  let j: number = left + 1; // left的下一个索引，作为组成比randomNum索引中的值小的数组的指针

  // 从left的下一个索引开始，与left的值比较，若比left索引中的值小，则与指针j中的值调换，然后指针j + 1
  for (let i = left + 1; i <= right; i++) {
    if (arr[i] < v) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      j++;
    }
  }

  // 比随机索引中的值小的元素已经从 left+1 排到 j-1 了，接下来调换 left 和 j -1 的值
  // 此时数组已经排好[比基准值小 * n, 基准值, 比基准值大 * n]
  [arr[left], arr[j - 1]] = [arr[j - 1], arr[left]];

  return j - 1;
}

const arr = [ 5, 8, 2, 7, 9, 1, 10, 0 ];
console.log(quickSort(arr));
