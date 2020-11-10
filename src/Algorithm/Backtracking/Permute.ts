// 全排列
// 我们在高中的时候就做过排列组合的数学题，我们也知道 n 个不重复的数，全排列共有 n! 个

// 题目：输入一组不重复的数字，返回它们的全排列

// 熟悉回溯框架写法: 使用track数组装载路径
export function permute(nums: number[]): Array<number[]> {
  const res: Array<number[]> = [];
  const track: number[] = [];

  backtrack(nums, track, res);
  return res;
}

// 辅助函数，也是框架函数
function backtrack(nums: number[], track: number[], res: Array<number[]>): void {
  if (track.length === nums.length) {
    // Array.from是为了防止res内的路径track指向同一个地址，最终全为[]
    res.push(Array.from(track));
    return;
  }

  for (let i = 0; i < nums.length; i++) {
    // 这里的复杂度有点高,而且若nums有重复数据也不能有效判断
    if (track.includes(nums[i])) continue;

    track.push(nums[i]);
    backtrack(nums, track, res);
    track.pop();
  }
}


// 使用单指针写法: 使用指针from来改变nums的排序来保存路径
export function permutePoint(nums: number[]) {
  const res: Array<number[]> = [];

  backtrackPoint(nums, 0, nums.length - 1, res);
  return res;
}

// 辅助函数
function backtrackPoint(nums: number[], from: number, to: number, res: Array<number[]>) {
  // 指针from到达数组最后一个元素时表示排序完毕
  if (from === to) {
    res.push(Array.from(nums));
    return;
  }

  for (let i = from; i <= to; i++) {
    [nums[from], nums[i]] = [nums[i], nums[from]];
    backtrackPoint(nums, from + 1, to, res);
    [nums[from], nums[i]] = [nums[i], nums[from]];
  }

}


// const nums = [1, 2, 3];
// console.log(permutePoint(nums));

const nums = [1, 1, 2];
console.log(permute(nums))
