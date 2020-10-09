// 选择排序
// 选择排序的原理如下。遍历数组，设置最小值的索引为 0，如果取出的值比当前最小值小，就替换最小值索引，遍历完成后，将第一个元素和最小值索引上的值交换。如上操作后，第一个元素就是数组中的最小值，下次遍历就可以从索引 1 开始重复上述操作。

/**
 * @description 选择排序
 * @param arr
 */
export function selectionSort<T>(arr: T[]): T[] {
  for (let i = 0; i <= arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j <= arr.length - 1; j++) {
      minIndex = arr[minIndex] > arr[j] ? j : minIndex;
    }
    [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
  }

  return arr;
}

const arr = [ 5, 8, 2, 7, 9, 1, 10, 0 ];
console.log(selectionSort(arr));

