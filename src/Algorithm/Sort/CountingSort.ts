// 计数排序
// 该算法的总体流程。分为两步：查和排。首先查一查每个元素都出现了多少次，比如元素0出现了1一次，元素1出现了一次，元素2出现了3次等。都统计好了，然后排序的过程就简单了，从小到大按顺序填充数组即可，出现几次就填充几次就好了。“从小到大”这个词语，就体现了排序的过程。

/**
 * 计数排序
 * @param arr
 */
export function countingSort (arr: number[]): number[] {
  let maxIndex: number = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[maxIndex]) {
      maxIndex = i;
    }
  }

  const maxValue: number = arr[maxIndex];
  const bucket: number[] = new Array(maxValue + 1).fill(0);

  for (let i = 0; i < arr.length; i++) {
    bucket[arr[i]]++;
  }

  console.log(bucket, 'bucket')

  let sortedIndex = 0;

  for (let i = 0; i < bucket.length; i++) {
    while (bucket[i] > 0) {
      arr[sortedIndex++] = i;
      bucket[i]--;
    }
  }

  return arr;
}

const arr = [ 5, 8, 2, 7, 8, 9, 1, 10, 0 ];
console.log(countingSort(arr));
