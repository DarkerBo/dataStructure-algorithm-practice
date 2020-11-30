/* 滑动窗口算法 (双指针算法中的一种)
本文就解决一类最难掌握的双指针技巧：滑动窗口技巧。总结出一套框架，可以保你闭着眼睛都能写出正确的解法。
说起滑动窗口算法，很多读者都会头疼。这个算法技巧的思路非常简单，就是维护一个窗口，不断滑动，然后更新答案么。其实困扰大家的，不是算法的思路，而是各种细节问题。比如说如何向窗口中添加新元素，如何缩小窗口，在窗口滑动的哪个阶段更新结果。即便你明白了这些细节，也容易出 bug，找 bug 还不知道怎么找，真的挺让人心烦的。LeetCode 上有起码 10 道运用滑动窗口算法的题目，难度都是中等和困难。该算法的大致逻辑如下：

// s为检测是否包含t的字符串，t为需要包含的字符串
function slidingWindow (s: string, t: string) {
  const need = new Map<string, number>(); // t中的字母和其出现的次数
  const window = new Map<string, number>(); // 窗口
  for (const tItem of t) {
    need.set(tItem, need.has(tItem) ? need.get(tItem) + 1 : 1);
  }

  left left = 0, right = 0; // 左右指针

  while (right < s.size()) {
    // c 是将移入窗口的字符
    const c = s[right]
    // 增大窗口
    window.set(s[right]);
    // 右移窗口
    right++;
    // 进行窗口内数据的一系列更新
    ...

    // debug 输出的位置
    console.log(left, right);

    // 判断左侧窗口是否要收缩
    while (window needs shrink) {
      // d 是将移出窗口的字符
      const d = s[left];
      // 缩小窗口
      window.delete(s[left]);
      // 左移窗口
      left++;
      // 进行窗口内数据的一系列更新
      ...
    }
  }
}
其中两处 ... 表示的更新窗口数据的地方，到时候你直接往里面填就行了。
而且，这两个 ... 处的操作分别是右移和左移窗口更新操作，等会你会发现它们操作是完全对称的。

*/