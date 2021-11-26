/* 
KMP 算法常被称为“看毛片算法”，由一个姓K的，一个姓M的，一个姓P 一起提出。是一种由暴力匹配改进的字符串匹配算法。
KMP 是由暴力匹配改进的字符串匹配算法。那什么是暴力匹配？假若我们的目标串和模式串如下图。
（之前在 Sunday 匹配中讲过，所有的字符串匹配算法第一步都是对齐。不管是 暴力匹配，KMP，Sunday，BM 都是一样）

目标串: A B C A B D A B C E A B D
模式串: A B C E

一、暴力匹配，就是目标串和模式串一个一个的对比
目标串: A B C A B D A B C E A B D
模式串: A B C E

当A匹配成功，继续开始比对，直到我们遇见一个不匹配的字符：E，然后我们调整模式串，
从目标串的下一个字符开始匹配（注意，这里是核心）。很遗憾，还是没有匹配成功（A和B）

目标串: A B C A B D A B C E A B D
模式串: A B C E
         A B C E
           A B C E
                ......
                   A B C E

假若我们目标串长度为m，模式串长度为n。模式串与目标串至少比较m次，又因其自身长度为n，所以理论的时间复杂度为O(m*n)。
但我们可以看到，因为途中遇到不能匹配的字符时，就可以停止，并不需要完全对比（比如上图就没有全部对比）。
所以虽然理论时间复杂度为 O(m*n) ，但其实大部分情况效率高很多。

暴力匹配又称为BF算法，暴风算法。代码比较简单。


二、KMP算法
目标串: A B C A B D A B C E A B D
模式串: A B C E

最开始其实还是一样，我们依次对比A-A,B-B,C-C，直到遇见第一个无法匹配的字符A-E。

*/

// 暴力算法
function BFSearch(haystack: string, needle: string) {
  // 双指针
  let i = 0,
    j = 0;

  while (i < haystack.length && j < needle.length) {
    if (haystack[i] === needle[j]) {
      i++;
      j++;
    } else {
      i = j - 1;
      j = 0;
    }
  }

  // 若指针已走完模式串，表示目标串包含模式串，返回索引
  if (j === needle.length) return j - 1;

  return -1;
}
