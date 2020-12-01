// 字符串排列
/*
给定两个字符串 s1 和 s2，写一个函数来判断 s2 是否包含 s1 的排列。

换句话说，第一个字符串的排列之一是第二个字符串的子串。

示例1:

输入: s1 = "ab" s2 = "eidbaooo"
输出: True
解释: s2 包含 s1 的排列之一 ("ba").
 

示例2:

输入: s1= "ab" s2 = "eidboaoo"
输出: False

题解：
注意哦，输入的 s1 是可以包含重复字符的，所以这个题难度不小。
这种题目，是明显的滑动窗口算法，相当给你一个 S 和一个 T，请问你 S 中是否存在一个子串，包含 T 中所有字符且不包含其他字符？

*/

// 这里的S1就等于target S2就等于source
function checkInclusion (source: string, target: string): boolean {
  // need表示每个字母和它所需要的个数，window表示窗口包含的字母和它的个数
  const needs = new Map(), window = new Map();
  // 左右指针和已经满足个数的字母数量(计数器)
  let left = 0, right = 0, vaild = 0;

  for (const item of target) {
    needs.set(item, needs.has(item) ? needs.get(item) + 1 : 1);
  }

  while (right < source.length) {
    const c = source[right];
    right++;
    if (needs.has(c)) {
      window.set(c, window.has(c) ? window.get(c) + 1 : 1);
      if (window.get(c) === needs.get(c)) vaild++;
    }

    // 这里窗口长度与target长度相等就应该要移动左指针更新窗口
    while (right - left >= target.length) {
      if (vaild === target.length) return true;
      const d = source[left];
      left++;
      if (needs.has(d)) {
        if (window.get(d) === needs.get(d)) vaild--;
        window.set(d, window.get(d) - 1);
      }
    }
  }

  return false;
}

console.log(checkInclusion('eidboaoo', 'ab'));

/*
对于这道题的解法代码，基本上和最小覆盖子串一模一样，只需要改变两个地方：

1、本题移动 left 缩小窗口的时机是窗口大小大于 t.size() 时，应为排列嘛，显然长度应该是一样的。

2、当发现 valid == need.size() 时，就说明窗口中就是一个合法的排列，所以立即返回 true。

至于如何处理窗口的扩大和缩小，和最小覆盖子串完全相同。
*/
