// 归并排序
// 归并排序的原理如下。递归的将数组两两分开直到最多包含两个元素，然后将数组排序合并，最终合并为排序好的数组。假设我有一组数组 [3, 1, 2, 8, 9, 7, 6]，中间数索引是 3，先排序数组 [3, 1, 2, 8] 。在这个左边数组上，继续拆分直到变成数组包含两个元素（如果数组长度是奇数的话，会有一个拆分数组只包含一个元素）。然后排序数组 [3, 1] 和 [2, 8] ，然后再排序数组 [1, 3, 2, 8] ，这样左边数组就排序完成，然后按照以上思路排序右边数组，最后将数组 [1, 2, 3, 8] 和 [6, 7, 9] 排序。

/**
 * @description 归并排序
 * @param arr
 */
export function mergeSort<T>(arr: T[]) {
  
}

export function _merge<T>(arr: T[], left: number, right: number) {
  // 若分成了每一段都为1个元素即停止
  if (left === right) return;

  const mid = ((left + right) / 2) | 0;
  _merge(arr, left, mid);
  _merge(arr, mid + 1, right);

  let helper = [];
  let i = 0;
  let p1 = left;
  let p2 = mid + 1;

  // 开始对比两组有序数据的子元素大小，放进helper里面
  while (p1 <= mid && p2 <= right) {
    helper[i++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++];
  }

  // 若右组对比完，左组剩下的元素填充到
  while (p1 <= mid) {
    helper[i++] = arr[p1++];
  }

  // 若左组对比完，右组剩下的元素填充到
  while (p2 <= right) {
    helper[i++] = arr[p2++];
  }

  for (let i = 0; i < helper.length; i++) {
    arr[left + i] = helper[i]
  }

  return arr;
}