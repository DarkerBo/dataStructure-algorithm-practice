/**
 * @description 堆排序
 * @param arr
 */
export default function heapSort<T>(arr: T[]): T[] {
  const len = arr.length;

  for (let i = ((len - 1) / 2) | 0; i >= 0; i--) {
    _shiftDown(arr, len, i);
  }

  for (let i = len - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    _shiftDown(arr, i, 0);
  }

  return arr;
}

function _shiftDown<T>(arr: T[], n: number, k: number): void {
  while (2 * k + 1 < n) {
    let j: number = 2 * k + 1

    if (j + 1 < n && arr[j + 1] > arr[j]) j += 1
    if (arr[k] > arr[j]) break

    [arr[k], arr[j]] = [arr[j], arr[k]];
    k = j
  }
}

const arr = [ 5, 8, 2, 7, 8, 9, 1, 10, 0 ];
console.log(heapSort(arr));
