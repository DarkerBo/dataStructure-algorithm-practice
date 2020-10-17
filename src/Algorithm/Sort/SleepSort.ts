// 睡眠排序
// 天才排序算法：睡眠排序

function sleepSort<T>(arr: T[]){
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

// 有点意思吧？同学A： 那要是值太大是9999999呢？我：爪巴