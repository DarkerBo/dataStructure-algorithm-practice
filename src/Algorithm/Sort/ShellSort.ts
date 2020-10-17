/**
 * @description 希尔排序
 * @param arr
 */
export default function shellSort<T>(arr: T[]): T[] {
  const n = arr.length;
  let h: number = 1;

  while (h < n / 3) {
    h = 3 * h + 1;
  }

  // 动态定义间隔序列的算法是《算法（第4版）》的合著者Robert Sedgewick提出的
  while (h >= 1) {
    for (let i = h; i < n; i++) {
      const e: T = arr[i];
      let j: number;

      // 使用插入排序，这里由于有动态定义间隔算法，间隔之间只有两个元素对比
      for (j = i; j >= h && e < arr[j - h]; j -= h) {
        arr[j] = arr[j - h];
      }

      arr[j] = e;
    }

    h = (h / 3) | 0;
  }

  return arr;
}

const arr = [ 5, 8, 2, 7, 8, 9, 1, 10, 0 ];
console.log(shellSort(arr));