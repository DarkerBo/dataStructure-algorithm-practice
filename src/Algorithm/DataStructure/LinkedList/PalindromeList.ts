// LeetCode第 234 题 回文链表
/*
请判断一个链表是否为回文链表。

示例 1:

输入: 1->2
输出: false
示例 2:

输入: 1->2->2->1
输出: true
*/

/*
我们之前有两篇文章写了回文串和回文序列相关的问题。

寻找回文串的核心思想是从中心向两端扩展：

function palindrome(s: string, l: number, r: number): string {
  // 防止索引越界
  while (l >= 0 && r < s.length && s[l] === s[r]) {
    // 向两边展开
    l--; r++;
  }

  // 返回以s[l]和s[r]为中心的最长回文符
  return s.slice(l + 1, r);
}

因为回文串长度可能为奇数也可能是偶数，长度为奇数时只存在一个中心点，而长度为偶数时存在两个中心点，所以上面这个函数需要传入l和r。

而判断一个字符串是不是回文串就简单很多，不需要考虑奇偶情况，只需要「双指针技巧」，从两端向中间逼近即可：

function isPalindrome(s: string): boolean {
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s[l] !== s[r]) return false;
    left++;
    right--;
  }

  return true;
}
以上代码很好理解吧，因为回文串是对称的，所以正着读和倒着读应该是一样的，这一特点是解决回文串问题的关键。

下面扩展这一最简单的情况，来解决：如何判断一个「单链表」是不是回文。

这道题的关键在于，单链表无法倒着遍历，无法使用双指针技巧。那么最简单的办法就是，把原始链表反转存入一条新的链表，然后比较这两条链表是否相同。关于如何反转链表，可以参见前文「递归操作链表」。

其实，借助二叉树后序遍历的思路，不需要显式反转原始链表也可以倒序遍历链表，下面来具体聊聊。

对于二叉树的几种遍历方式，我们再熟悉不过了：

function traverse(root: TreeNode) {
    // 前序遍历代码
    traverse(root.left);
    // 中序遍历代码
    traverse(root.right);
    // 后序遍历代码
}

在「学习数据结构的框架思维」中说过，链表兼具递归结构，树结构不过是链表的衍生。那么，链表其实也可以有前序遍历和后序遍历：

function traverse(head: ListNode) {
    // 前序遍历代码
    traverse(head.next);
    // 后序遍历代码
}

这个框架有什么指导意义呢？如果我想正序打印链表中的val值，可以在前序遍历位置写代码；反之，如果想倒序遍历链表，就可以在后序遍历位置操作：

// 倒序打印单链表中的元素值
function traverse(head: ListNode) {
  if (head === null) return;
  traverse(head.next);
  // 后序遍历代码
  console.log(head.val);
}

说到这了，其实可以稍作修改，模仿双指针实现回文判断的功能：
下面有代码

这么做的核心逻辑是什么呢？实际上就是把链表节点放入一个栈，然后再拿出来，这时候元素顺序就是反的，只不过我们利用的是递归函数的堆栈而已。

当然，无论造一条反转链表还是利用后序遍历，算法的时间和空间复杂度都是 O(N)。下面我们想想，能不能不用额外的空间，解决这个问题呢？

*/

class PalindromeList {
  public val: number;
  public next: PalindromeList | null;
  constructor (val?: number, next?: PalindromeList | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// 后续遍历对比首尾的值
// 有局限：right指针是从链首到链末的，不是到中间，也就是说，与left指针对比了两次链表的每一个节点
function isPalindromeListByBackTravers(head: PalindromeList | null): boolean {
  if (head === null) return true;

  // 双指针
  let left: PalindromeList | null = head,
      right: PalindromeList | null = head;

  // 递归函数
  function _isPalindromeListByBackTravers(right: PalindromeList | null): boolean {
    // base case
    // 右指针为 null 代表已经到达了链表底端
    if (right === null) return true;

    // 这里就是后序遍历，相当于把后面的操作入栈
    let res = _isPalindromeListByBackTravers(right.next);

    // 返回判断
    res = res && (left as PalindromeList).val === right.val;

    // 按照后序遍历来说，是最后一个节点(right)
    left = (left as PalindromeList).next;

    return res;
  }


  return _isPalindromeListByBackTravers(right);
};


/*
二、优化空间复杂度

更好的思路是这样的：
1、先通过「双指针技巧」中的快慢指针来找到链表的中点：
let slow: PalindromeList | null = head,
    fast: PalindromeList | null = head;

while (fast !== null && fast.next !== null) {
  slow = (slow as PalindromeList).next;
  fast = fast.next.next;
}
// slow 指针现在指向链表中点
     head      slow      fast
奇数： 1 -> 2 -> 3 -> 4 -> 5 -> null

     head           slow            fast
偶数： 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null


2、如果fast指针没有指向null，说明链表长度为奇数，slow还要再前进一步：

if (fast !== null) {
  slow = (slow as PalindromeList).next;
}

     head           slow  fast
奇数： 1 -> 2 -> 3 -> 4 -> 5 -> null
【此时对比的是链表的两端到中间，即 1->2 和 5->4】

     head           slow            fast
偶数： 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null
【此时对比的是链表的两端到中间，即 1->3 和 6->4】


3、从slow开始反转后面的链表，现在就可以开始比较回文串了：
// 反转后半段链表
slow = isPalindromeListReverse(slow, null);
     left                right
     head                slow 
奇数： 1 -> 2 -> 3 -> 4 <- 5 
                     ⇓
                    null

     left                     right
     head                     slow            
偶数： 1 -> 2 -> 3 -> 4 <- 5 <- 6
                     ⇓
                    null

算法总体的时间复杂度 O(N)，空间复杂度 O(1)，已经是最优的了
。
我知道肯定有读者会问：这种解法虽然高效，但破坏了输入链表的原始结构，能不能避免这个瑕疵呢？

其实这个问题很好解决，关键在于得到p, q这两个指针位置：
               left              
                p   slow       q            
偶数： 1 -> 2 -> 3 -> 4 <- 5 <- 6
                     ⇓
                    null
                    right

这样，只要在函数 return 之前加一段代码即可恢复原先链表顺序：

// 恢复为原链表
p.next = isPalindromeListReverse(q, null);


三、最后总结
首先，寻找回文串是从中间向两端扩展，判断回文串是从两端向中间收缩。对于单链表，无法直接倒序遍历，可以造一条新的反转链表，可以利用链表的后序遍历，也可以用栈结构倒序处理单链表。

具体到回文链表的判断问题，由于回文的特殊性，可以不完全反转链表，而是仅仅反转部分链表，将空间复杂度降到 O(1)。

*/



// 找到中间节点，反转后半链表，首位对比
function isPalindromeListByMidNode(head: PalindromeList | null): boolean {
  if (head === null) return true;

  // 通过快慢指针找到链表的中间节点
  let slow: PalindromeList | null = head,
      fast: PalindromeList | null = head;
  
  while (fast !== null && fast.next !== null) {
    slow = (slow as PalindromeList).next;
    fast = fast.next.next;
  }

  // 如果是奇数链表的话，slow指针还要往前一位，原因是最中间的那个节点不用对比
  if (fast !== null) {
    slow = (slow as PalindromeList).next;
  }

  // 反转后半段链表
  slow = isPalindromeListReverse(slow, null);

  // 左右指针开始从两端对比
  let left: PalindromeList | null = head,
      right: PalindromeList | null = slow;

  // 这是拿来恢复原链表的指针
  let p: PalindromeList | null = head,
      q: PalindromeList | null = slow;

  // 判断是否为回文链表
  let flag = true;

  while (right) {
    if (left.val !== right.val) flag = false;
    left = left.next as PalindromeList;
    right = right.next;
    p = left;
  }

  // 恢复为原链表
  p.next = isPalindromeListReverse(q, null);

  return flag;
}

// 根据两个节点反转链表
function isPalindromeListReverse(cur: PalindromeList | null, prev: PalindromeList | null): PalindromeList | null {
  while (cur && cur !== prev) {
    const nextNode = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nextNode;
  }

  return prev;
}

const list = new PalindromeList(1, new PalindromeList(2, new PalindromeList(3, new PalindromeList(4, new PalindromeList(5)))));

console.log(isPalindromeListByMidNode(list));
