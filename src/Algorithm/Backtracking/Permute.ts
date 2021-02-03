// 全排列 LeetCode 46
// 我们在高中的时候就做过排列组合的数学题，我们也知道 n 个不重复的数，全排列共有 n! 个

// 题目：输入一组不重复的数字，返回它们的全排列

// 熟悉回溯框架写法: 使用track数组装载路径
export function permute(nums: number[]): Array<number[]> {
  const res: Array<number[]> = [];
  const track = new Set<number>();

  _permute(nums, track, res);
  return res;
}

// 辅助函数，也是框架函数
function _permute(nums: number[], track: Set<number>, res: Array<number[]>): void {
  if (track.size === nums.length) {
    // Array.from是为了防止res内的路径track指向同一个地址，最终全为[]
    res.push(Array.from(track));
    return;
  }

  for (let i = 0; i < nums.length; i++) {
    // 这里若nums有重复数据不能有效判断
    if (track.has(nums[i])) continue;

    track.add(nums[i]);
    _permute(nums, track, res);
    track.delete(nums[i]);
  }
}

console.log(permute([1,2,3]));

// 使用单指针写法: 使用指针from来改变nums的排序来保存路径
export function permutePoint(nums: number[]) {
  const res: Array<number[]> = [];

  _permutePoint(nums, 0, res);
  return res;
}

// 辅助函数
function _permutePoint(nums: number[], from: number, res: Array<number[]>) {
  // 指针from到达数组最后一个元素时表示排序完毕
  if (from === nums.length - 1) {
    res.push(Array.from(nums));
    return;
  }

  // 检验是否有重复项
  const checkRepeat: Set<number> = new Set();

  for (let i = from; i < nums.length; i++) {
    // 若有重复项,则排序是一样的,跳过
    if (checkRepeat.has(nums[i])) continue;
    checkRepeat.add(nums[i]);

    [nums[from], nums[i]] = [nums[i], nums[from]];
    _permutePoint(nums, from + 1, res);
    [nums[from], nums[i]] = [nums[i], nums[from]];
  }

}


// const nums = [1, 2, 3];
const nums = [1, 1, 3];
console.log(permutePoint(nums));

