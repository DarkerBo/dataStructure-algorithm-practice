// 归并排序
// 归并排序的原理如下。递归的将数组两两分开直到最多包含两个元素，然后将数组排序合并，最终合并为排序好的数组。假设我有一组数组 [3, 1, 2, 8, 9, 7, 6]，中间数索引是 3，先排序数组 [3, 1, 2, 8] 。在这个左边数组上，继续拆分直到变成数组包含两个元素（如果数组长度是奇数的话，会有一个拆分数组只包含一个元素）。然后排序数组 [3, 1] 和 [2, 8] ，然后再排序数组 [1, 3, 2, 8] ，这样左边数组就排序完成，然后按照以上思路排序右边数组，最后将数组 [1, 2, 3, 8] 和 [6, 7, 9] 排序。

/**
 * @description 归并排序
 * @param arr
 */
export function mergeSort<T>(arr: T[]): T[] {
  _mergeSort(arr, 0, arr.length - 1);
  return arr;
}

/**
 * @description 归并排序辅助函数
 * @param arr
 * @param left arr数组的左指针
 * @param right arr数组的右指针
 */
function _mergeSort<T>(arr: T[], left: number, right: number): T[] | void {
  // 若分成了每一段都为1个元素即停止
  if (left === right) return;

  // 位运算，向下取整
  const mid: number = ((left + right) / 2) | 0;
  _mergeSort(arr, left, mid);
  _mergeSort(arr, mid + 1, right);

  const helper: T[] = []; // 拿来中间过渡存储数据的数组
  let i: number = 0; // 过渡数组的索引
  let p1: number = left; // 左数组的指针
  let p2: number = mid + 1; // 右数组的指针

  // 开始对比两组有序数据的子元素大小，放进helper里面
  while (p1 <= mid && p2 <= right) {
    helper[i++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++];
  }

  // 若右组对比完，左组剩下的元素填充到过渡数组中
  while (p1 <= mid) {
    helper[i++] = arr[p1++];
  }

  // 若左组对比完，右组剩下的元素填充到过渡数组中
  while (p2 <= right) {
    helper[i++] = arr[p2++];
  }

  // 将过渡数组的元素赋值给arr
  for (let i = 0; i < helper.length; i++) {
    arr[left + i] = helper[i];
  }

  return arr;
}

const arr = [ 5, 8, 2, 7, 9, 1, 10, 0 ];
console.log(mergeSort(arr));