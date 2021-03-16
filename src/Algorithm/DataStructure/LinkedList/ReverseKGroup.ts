// LeetCode第 92 题 反转链表Ⅱ
/*
给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。

k 是一个正整数，它的值小于或等于链表的长度。

如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

示例1：
输入：head = [1,2,3,4,5], k = 2
输出：[2,1,4,3,5]

示例2：
输入：head = [1,2,3,4,5], k = 3
输出：[3,2,1,4,5]

示例 3：
输入：head = [1,2,3,4,5], k = 1
输出：[1,2,3,4,5]

示例 4：
输入：head = [1], k = 1
输出：[1]

*/

/*
思路：
这个问题经常在面经中看到，而且 LeetCode 上难度是 Hard，它真的有那么难吗？
对于基本数据结构的算法问题其实都不难，只要结合特点一点点拆解分析，一般都没啥难点。下面我们就来拆解一下这个问题。

一、分析问题

首先，前文学习数据结构的框架思维提到过，链表是一种兼具递归和迭代性质的数据结构，认真思考一下可以发现这个问题具有递归性质。

什么叫递归性质？直接上图理解，比如说我们对这个链表调用 reverseKGroup(head, 2)，即以 2 个节点为一组反转链表：

reverseKGroup(head, 2)

head       
1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null

如果我设法把前 2 个节点反转，那么后面的那些节点怎么处理？后面的这些节点也是一条链表，而且规模（长度）比原来这条链表小，这就叫子问题。

  head  newHead     
1 <- 2    3 -> 4 -> 5 -> 6 -> null
|         
-------> reverseKGroup(head, 2)

我们可以直接递归调用 reverseKGroup(cur, 2)，因为子问题和原问题的结构完全相同，这就是所谓的递归性质。

发现了递归性质，就可以得到大致的算法流程：

1、先反转以 head 开头的 k 个元素。
     head  newHead
null <- 1 <- 2    3 -> 4 -> 5 -> 6 -> null

2、将第 k + 1 个元素作为 head 递归调用 reverseKGroup 函数。
        newHead head
null <- 2 <- 1    3 -> 4 -> 5 -> 6 -> null
                reverseKGroup(head, 2)

3、将上述两个过程的结果连接起来。
  newHead head     
1 <- 2    3 -> 4 -> 5 -> 6 -> null
|         
-------> reverseKGroup(head, 2)

整体思路就是这样了，最后一点值得注意的是，递归函数都有个 base case，对于这个问题是什么呢？
题目说了，如果最后的元素不足 k 个，就保持不变。这就是 base case，待会会在代码里体现。

首先，我们要实现一个 reverse 函数反转一个区间之内的元素。在此之前我们再简化一下，给定链表头结点，如何反转整个链表？
这个在之前做过

那「反转以 a 为头结点的链表」其实就是「反转 a 到 null 之间的结点」，那么如果让你「反转 a 到 b 之间的结点」，你会不会？

function reverseList(a: ReverseListAll | null, a: ReverseListAll | null): ReverseListAll | null {
  if (a === null) return null;
  
  // 前后双指针
  let cur: ReverseListAll | null = a, 
      prev: ReverseListAll | null = null;

  // cur为 b 的时候链表已经反转完成
  while (cur !== b) {
    const nextNode: ReverseListAll | null = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nextNode;
  }

  return prev;
}

现在我们迭代实现了反转部分链表的功能，接下来就按照之前的逻辑编写 reverseKGroup 函数即可：

*/

class ReverseKGroup {
  public val: number;
  public next: ReverseKGroup | null;
  constructor (val?: number, next?: ReverseKGroup | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function reverseKGroup(head: ReverseKGroup | null, k: number): ReverseKGroup | null {
  if (head === null) return null;

  let prev: ReverseKGroup | null = head,
      cur: ReverseKGroup | null = head,
      startPoint: ReverseKGroup | null = head;

  
  // prev此时为需要反转的区间的下一个节点
  for (let i = 0; i < k; i++) {
    if (prev) prev = prev.next;
    else return head; // 如果k小于链表的长度，则不用反转，直接返回链表
  }

  // 区间外的下一个点
  const endPoint = prev;

  // 对比反转整个链表的区别在于这里的 cur 相当于反转全部的 null
  while (cur && cur !== endPoint) {
    const nextNode: ReverseKGroup | null = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nextNode;
  }

  startPoint.next = reverseKGroup(endPoint, k);

  return prev;
}


