// LeetCode 76 题，Minimum Window Substring 最小覆盖子串
/*
给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。

注意：如果 s 中存在这样的子串，我们保证它是唯一的答案。
示例：
输入：s = "ADOBECODEBANC", t = "ABC"
输出："BANC"

就是说要在 S(source) 中找到包含 T(target) 中全部字母的一个子串，且这个子串一定是所有可能子串中最短的。
*/

// 方法1 双指针暴力解法
function minWindowByViolence(source: string, target: string) {
  for (let i = 0; i < source.length; i++) {
    for (let j = i + 1; j < source.length; j++) {
      const str = source.slice(i, j + 1);
      // 检测是否包含 target 的所有字母 
    }
  }
}

// 思路很直接，但是显然，这个算法的复杂度肯定大于 O(N^2) 了，不好。

/*
滑动窗口算法的思路是这样：
1、我们在字符串 S 中使用双指针中的左右指针技巧，初始化 left = right = 0，把索引左闭右开区间 [left, right) 称为一个「窗口」。
2、我们先不断地增加 right 指针扩大窗口 [left, right)，直到窗口中的字符串符合要求（包含了 T 中的所有字符）。
3、此时，我们停止增加 right，转而不断增加 left 指针缩小窗口 [left, right)，直到窗口中的字符串不再符合要求（不包含 T 中的所有字符了）。同时，每次增加 left，我们都要更新一轮结果。
4、重复第 2 和第 3 步，直到 right 到达字符串 S 的尽头。
这个思路其实也不难，第 2 步相当于在寻找一个「可行解」，然后第 3 步在优化这个「可行解」，最终找到最优解，也就是最短的覆盖子串。左右指针轮流前进，窗口大小增增减减，窗口不断向右滑动，这就是「滑动窗口」这个名字的来历。
下面画图理解一下，needs 和 window 相当于计数器，分别记录 T 中字符出现次数和「窗口」中的相应字符的出现次数。
source: [E,B,B,A,N,C,F]
target: [A,B,C]

(1)初始状态：
left = 0  right = 0 窗口区间 [0, 1) = [0, 0]
needs: { A: 1, B: 1, C: 1 }  window: { A: 0, B: 0, C: 0 }

(2)增加 right，直到窗口 [left, right] 包含了 T 中所有字符：
left = 0  right = 6 窗口区间 [0, 6) = [0, 5]
needs: { A: 1, B: 1, C: 1 }  window: { A: 1, B: 2, C: 1 }

(3)现在开始增加 left，缩小窗口 [left, right]。
left = 2  right = 6 窗口区间 [2, 6) = [2, 5]
needs: { A: 1, B: 1, C: 1 }  window: { A: 1, B: 1, C: 1 }

(4)直到窗口中的字符串不再符合要求，left 不再继续移动。
left = 3  right = 6 窗口区间 [3, 6) = [3, 5]
needs: { A: 1, B: 1, C: 1 }  window: { A: 1, B: 0, C: 1 }

之后重复上述过程，先移动 right，再移动 left…… 直到 right 指针到达字符串 S 的末端，算法结束。

如果你能够理解上述过程，恭喜，你已经完全掌握了滑动窗口算法思想。现在我们来看看这个滑动窗口代码框架怎么用：
1.首先，初始化 window 和 need 两个哈希表，记录窗口中的字符和需要凑齐的字符：
  const need = new Map<string, number>(); // t中的字母和其出现的次数
  const window = new Map<string, number>(); // 窗口
  for (const tItem of t) {
    need.set(tItem, need.has(tItem) ? need.get(tItem) + 1 : 1);
  }

2.然后，使用 left 和 right 变量初始化窗口的两端，不要忘了，区间 [left, right) 是左闭右开的，所以初始情况下窗口没有包含任何元素：
  let left = 0, right = 0;
  let valid = 0;
  while (right < s.size()) {
    // 开始滑动
  }

其中 valid 变量表示窗口中满足 need 条件的字符个数，如果 valid 和 need.size 的大小相同，则说明窗口已满足条件，已经完全覆盖了串 T。
解题思路就出来了：
1.要从S字符串中找出包含 T 所有字母的最小子串，那么首先就得记录T中有哪些字符，然后再去遍历 S，从S中寻找包含 T 所有字母的子串
2.这里我们可以先用一个map，needs来记录T中的字符，以及字符的数量
3.然后维护一个窗口，用索引l和r来表示这个窗口的左右边界，刚开始窗口的大小为0，即l = 0、r = 0
4.然后开始遍历S，从窗口的右侧依次放入元素，也用一个map， windows来记录S中的字符及其字符的数量
5.如果windows[c1] === needs[c1]，则说明窗口中有一个字符的数量与T中相等，则将计数器count++
6.如果count等于needs中的key的数量和，则说明窗口中有T中所有的字符串，此时窗口所包含的子串就是一个包含 T 所有字母的子串
7.由于答案是要寻找最小的字串，所以可以记录下符合要求的子串的起始位置以及其长度，起始位置就是l，长度为r - l
8.找到符合要求的子串后，就开始从窗口的左侧移除字符，直到该子串不符合要求，因为移动右侧的话相当于加长了合法的窗口，只有移动左侧才能形成新的窗口，根据将要移除的字符c，判断windows[c] === needs[c]，如果相等则要将则将计数器count--，然后移除该字符windows[c]--，最后将左边界索引l++
9.重复上面的逻辑找出所有可能的子串，比较每一个子串的长度，最后返回最小的子串

*/

function minWindowBySlide(source: string, target: string): number {
  // need表示每个字母和它所需要的个数，window表示窗口包含的字母和它的个数
  const needs = new Map(), window = new Map;
  // 左右指针和已经满足个数的字母数量(计数器)
  let left = 0, right = 0, vaild = 0;
  // 记录最小覆盖子串的起始索引及长度
  let start = 0, len = Infinity;

  // 将target的字母和数量装入need中
  for (const item of target) {
    needs.set(item, needs.has(item) ? needs.get(item) + 1 : 1);
  }

  while (right < source.length) {
    // 最右侧元素
    const c = source[right];
    // 区间为[left, right) 这里的right是窗口的下一个右侧
    right++;
    // 如果右侧元素（即最新加入的元素）是所需的元素，则更新window和vaild
    if (needs.has(c)) {
      window.set(c, window.has(c) ? window.get(c) + 1 : 1);
      if (window.get(c) === needs.get(c)) vaild++; // 如果某个字母符合所需的数量计数器+1
    }

    // 当计数器等于needs的key的长度，表示该窗口已经包含了target
    // 接下来是移动窗口左侧来找新的可能成立的窗口
    while (vaild === Object.keys(needs).length) {
      // 在这里更新最小覆盖子串的长度和起点
      if (right - left < len) {
        start = left;
        len = right - left;
      }

      // d 是将移出窗口的字符
      const d = source[left];
      // 左移窗口
      left++;
      // 如果左侧元素（即最新移出的元素）是所需的元素，则更新window和vaild
      if (needs.has(d)) {
        if (window.get(d) === needs.get(d)) vaild--; // 如果某个字母符合所需的数量计数器-1
        window.set(d, window.get(d) - 1);
      }
    }
  }

  return isFinite(len) ? 0 : source.slice(start, start + len).length;
}


console.log(minWindowBySlide('EBBANCF', 'ABC'));
