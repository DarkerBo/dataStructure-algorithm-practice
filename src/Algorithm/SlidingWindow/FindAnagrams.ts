// 找所有字母异位词
/*
给定一个字符串 s 和一个非空字符串 p，找到 s 中所有是 p 的字母异位词的子串，返回这些子串的起始索引。

字符串只包含小写英文字母，并且字符串 s 和 p 的长度都不超过 20100。

说明：

字母异位词指字母相同，但排列不同的字符串。
不考虑答案输出的顺序。
示例 1:

输入:
s: "cbaebabacd" p: "abc"

输出:
[0, 6]

解释:
起始索引等于 0 的子串是 "cba", 它是 "abc" 的字母异位词。
起始索引等于 6 的子串是 "bac", 它是 "abc" 的字母异位词。
 示例 2:

输入:
s: "abab" p: "ab"

输出:
[0, 1, 2]

解释:
起始索引等于 0 的子串是 "ab", 它是 "ab" 的字母异位词。
起始索引等于 1 的子串是 "ba", 它是 "ab" 的字母异位词。
起始索引等于 2 的子串是 "ab", 它是 "ab" 的字母异位词。

*/

/*
呵呵，这个所谓的字母异位词，不就是排列吗，搞个高端的说法就能糊弄人了吗？相当于，输入一个串 S，一个串 T，找到 S 中所有 T 的排列，返回它们的起始索引。

直接默写一下框架，明确刚才讲的 4 个问题，即可秒杀这道题：
*/

function findAnagrams(source: string, target: string): number[] {
  // need表示每个字母和它所需要的个数，window表示窗口包含的字母和它的个数
  const needs = new Map(), window = new Map();
  // 左右指针和已经满足个数的字母数量(计数器)
  let left = 0, right = 0, vaild = 0;
  // 存储start的数组
  const result = [];

  for (const item of target) {
    needs.set(item, needs.has(item) ? needs.get(item) + 1 : 1);
  }

  while(right < source.length) {
    const c = source[right];
    right++;
    if (needs.has(c)) {
      window.set(c, window.has(c) ? window.get(c) + 1 : 1);
      if (window.get(c) === needs.get(c)) vaild++;
    }

    // 这里窗口长度与target长度相等就应该要移动左指针更新窗口
    while (right - left >= target.length) {
      if (vaild === target.length) result.push(left);

      const d = source[left];
      left++;
      
      if (needs.has(d)) {
        if (window.get(d) === needs.get(d)) vaild--
        window.set(d, window.get(d) - 1);
      }
    }
  }

  return result;
};

console.log(findAnagrams('cbaebabacd', 'abc'));
console.log(findAnagrams('abab', 'ab'));

// 跟寻找字符串的排列一样，只是找到一个合法异位词（排列）之后将起始索引加入 res 即可。