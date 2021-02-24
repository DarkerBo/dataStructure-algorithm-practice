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


// 滑动窗口做法
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
    // 在这里更新答案，不能在左移窗口前更新，因为此时窗口已经有重复的元素了，此时right - left的长度是不准确的,需要-1个长度
    count = Math.max(count, right - left);
  }

  return count;
}

console.log(lengthOfLongestSubstring('abcabcbb'));
console.log(lengthOfLongestSubstring('bbbbb'));
console.log(lengthOfLongestSubstring('pwwkew'));
console.log(lengthOfLongestSubstring(''));
console.log(lengthOfLongestSubstring(' '));



// 哈希表做法
function lengthOfLongestSubstringByMap(s: string): number {
  // 存储某个字母对应的最新索引
  const map = new Map<string, number>();

  // 左指针，代表计算字串长度的开始索引
  let left = 0;
  // 不重复子串的最大长度
  let max = 0;

  for (let i = 0; i < s.length; i++) {
    // 如果子串有重复元素，更新left
    if (map.has(s[i])) {
      // 这里要用max的原因是防止左指针回退，保持最新的子串起点
      // 比如abba，i为3时,b重复了，left更新为3。
      // 然后i为4时，因为map中a的索引为0，如果此时不用max比较的话，left会回退到 0 + 1 = 1，而不是正确的索引3
      left = Math.max(left, map.get(s[i]) as number + 1);
    }

    map.set(s[i], i);

    max = Math.max(max, i - left + 1);
  }

  return max;
}


console.log(lengthOfLongestSubstringByMap('abcabcbb'));
console.log(lengthOfLongestSubstringByMap('bbbbb'));
console.log(lengthOfLongestSubstringByMap('pwwkew'));
console.log(lengthOfLongestSubstringByMap(''));
console.log(lengthOfLongestSubstringByMap(' '));