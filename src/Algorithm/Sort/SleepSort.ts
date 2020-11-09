// 睡眠排序
// 天才排序算法：睡眠排序

// 该方法直接return result是undefined的，因为会有延时。解决：promise包装
function sleepSort<T>(arr: T[]) {
  const result: T[] = [];
  for (let i = 0; i < arr.length; i++) {
    setTimeout(() => {
      result.push(arr[i]);
      if (result.length === arr.length) console.log(result);
    }, Number(arr[i]));
  }
}

const arr = [ 5, 8, 2, 7, 8, 9, 1, 10, 0 ];
sleepSort(arr)


// 使用promise包装
function sleepSortByPromise<T>(arr: T[]): void {
  const result: T[] = [];
  const promise = new Promise<T[]>((resolve) => {
    for (let i = 0; i < arr.length; i++) {
      setTimeout(() => {
        result.push(arr[i]);
        if (result.length === arr.length) resolve(result);
      }, Number(arr[i]));
    }
  })

  promise.then((data) => {
    return data;
  })
}

// 一开始没有输出，因此第一次会输出undefined
console.log(sleepSort(arr));

// 有点意思吧？同学A： 那要是值太大是9999999呢？我：爪巴