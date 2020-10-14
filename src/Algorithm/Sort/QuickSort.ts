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
    // const p: number = _partition1(arr, left, right); // arr以p为索引划分了左右数组
    // // const p: number = _partition2(arr, left, right); // arr以p为索引划分了左右数组
    // _quickSort(arr, left, p - 1);
    // _quickSort(arr, p + 1, right);

    const p: number[] = _partition3(arr, left, right); // arr以p为索引划分了左右数组
    _quickSort(arr, left, p[0] - 1);
    _quickSort(arr, p[1], right);
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


/**
 * @description 快速排序双路快排
 * @param arr
 * @param left arr数组的左指针
 * @param right arr数组的右指针
 */
function _partition2<T>(arr: T[], left: number, right: number): number {
  // 随机取值，然后和开头left交换，这样做比固定取一个位置的复杂度略低
  const randomNum: number = Math.floor(Math.random() * (right - left + 1)) + left;
  [arr[left], arr[randomNum]] = [arr[randomNum], arr[left]];

  const v: T = arr[left]; // arr中原本随机选取的索引
  let i: number = left + 1, // left的下一个索引，作为组成比randomNum索引中的值小的数组的指针（双路快排左指针）
      j: number = right; // 双路快排右指针
  
  // 这里会有一个问题：若选取的值为8，数组中还有其他值为8的元素，则有可能放到左数组或右数组中
  // 如：[5,2,7,1] 8 [10,8] 此时右数组还需要排序10和8，若使用三路快排(<8 ===8 >8)一起排会更快
  while (true) {
    while (i <= right && arr[i] < v) i++;
    while (j >= left + 1 && arr[j] > v) j--;
    
    if (i > j) break;

    [arr[i], arr[j]] = [arr[j], arr[i]];
    i++;
    j--;
  }

  [arr[left], arr[j]] = [arr[j], arr[left]];

  return j;
}

/**
 * @description 快速排序三路快排
 * @param arr
 * @param left arr数组的左指针
 * @param right arr数组的右指针
 */
function _partition3<T>(arr: T[], left: number, right: number): number[] {
  // 随机取值，然后和开头left交换，这样做比固定取一个位置的复杂度略低
  const randomNum: number = Math.floor(Math.random() * (right - left + 1)) + left;
  [arr[left], arr[randomNum]] = [arr[randomNum], arr[left]];

  const v: T = arr[left]; // arr中原本随机选取的索引
  let lt: number = left, // 三路快排左指针
      gt: number = right + 1, // 三路快排右指针
      i: number = left + 1; // 三路快排中指针
  
  while (i < gt) {
    if (arr[i] < v) {
      [arr[i], arr[lt + 1]] = [arr[lt + 1], arr[i]];
      i++;
      lt++;
    } else if (arr[i] > v) {
      [arr[i], arr[gt - 1]] = [arr[gt - 1], arr[i]];
      gt--;
    } else {
      i++;
    }
  }

  [arr[left], arr[lt]] = [arr[lt], arr[left]];

  return [lt, gt];
}

const arr = [ 5, 8, 2, 7, 8, 9, 1, 10, 0 ];
console.log(quickSort(arr));