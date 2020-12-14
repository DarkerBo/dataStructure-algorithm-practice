// LeetCode第 3 题 无重复字符的最长子串
/*
给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:

输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例 2:

输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:

输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
示例 4:

输入: s = ""
输出: 0
 

提示：

0 <= s.length <= 5 * 104
s 由英文字母、数字、符号和空格组成
*/

function lengthOfLongestSubstring(s: string): number {
  // window表示窗口包含的字母和它的个数
  const window = new Map();
  // 左右指针和满足子串长度
  let left = 0, right = 0, count = 0;

  while (right < s.length) {
    const c = s[right];
    right++;
    window.set(c, window.has(c) ? window.get(c) + 1 : 1);

    // 如果窗口出现了相同的元素，就要移动左侧边界，无需判断left 和 right的大小，窗口内至少有一个元素
    while (window.get(c) > 1) {
      const d = s[left];
      left++;
      window.set(d, window.get(d) - 1);
    }
    // 在这里更新答案
    count = Math.max(count, right - left);
  }

  return count;
}

console.log(lengthOfLongestSubstring('abcabcbb'));
console.log(lengthOfLongestSubstring('bbbbb'));
console.log(lengthOfLongestSubstring('pwwkew'));
console.log(lengthOfLongestSubstring(''));
console.log(lengthOfLongestSubstring(' '));
