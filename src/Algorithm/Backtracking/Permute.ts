// 全排列
// 我们在高中的时候就做过排列组合的数学题，我们也知道 n 个不重复的数，全排列共有 n! 个


// 输入一组不重复的数字，返回它们的全排列
export function permute(nums: number[]) {
  const res: Array<number[]> = [];
  const track: number[] = [];

  return backtrack(nums, track, res);
}

// 辅助函数，也是框架函数
function backtrack(nums: number[], track: number[], res: Array<number[]>): Array<number[]> | void {
  if (track.length === nums.length) {
    res.push(track);
    return;
  }

  for (let i = 0; i < nums.length; i++) {
    // 这里的复杂度有点高，后面可以尝试优化
    if (track.includes(nums[i])) continue;

    track.push(nums[i]);
    backtrack(nums, track, res);
    track.pop();
  }
}

const nums = [1, 2, 3];
console.log(permute(nums))
