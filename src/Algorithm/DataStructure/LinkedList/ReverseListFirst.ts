// LeetCode第 206 题 反转链表
/*
反转一个单链表。

示例:

输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL

*/

class ReverseListFirstNode {
  public val: number;
  public next: ReverseListFirstNode | null;
  constructor (val?: number, next?: ReverseListFirstNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// 压栈写法
function reverseList(head: ReverseListFirstNode | null): ReverseListFirstNode | null {
  if (head === null) return null;
  
  // 前后双指针
  let cur: ReverseListFirstNode | null = head, 
      prev: ReverseListFirstNode | null = null;

  // cur为 null 的时候链表已经反转完成
  while (cur) {
    const nextNode: ReverseListFirstNode | null = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nextNode;
  }

  return prev;

};

/*
反转单链表的迭代实现不是一个困难的事情，但是递归实现就有点难度了，如果再加一点难度，让你仅仅反转单链表中的一部分，你是否能够递归实现呢？

本文就来由浅入深，step by step 地解决这个问题。如果你还不会递归地反转单链表也没关系，本文会从递归反转整个单链表开始拓展，只要你明白单链表的结构，相信你能够有所收获。

单链表节点结构：
class LinkListNode {
  public value: number;
  public next: LinkListNode | null;
  constructor(value?: number, next?: LinkListNode | null) {
    this.value = value ?? 0;
    this.next = next ?? next;
  }
}

什么叫反转单链表的一部分呢，就是给你一个索引区间，让你把单链表中这部分元素反转，其他部分不变：

注意这里的索引是从 1 开始的。迭代的思路大概是：先用一个 for 循环找到第 m 个位置，然后再用一个 for 循环将 m 和 n 之间的元素反转。但是我们的递归解法不用一个 for 循环，纯递归实现反转。

迭代实现思路看起来虽然简单，但是细节问题很多的，反而不容易写对。相反，递归实现就很简洁优美，下面就由浅入深，先从反转整个单链表说起。

一、递归反转整个链表
这个算法可能很多读者都听说过，这里详细介绍一下，先直接看实现代码：
function reverse(head: LinkListNode | null): LinkListNode | null {
  if (head.next == null) return head;

  const last: ListNode | null = reverse(head.next);
  head.next.next = head;
  head.next = null;
  return last;
}

看起来是不是感觉不知所云，完全不能理解这样为什么能够反转链表？这就对了，这个算法常常拿来显示递归的巧妙和优美，我们下面来详细解释一下这段代码。

对于递归算法，最重要的就是明确递归函数的定义。具体来说，我们的 reverse 函数定义是这样的：

输入一个节点 head，将「以 head 为起点」的链表反转，并返回反转之后的头结点。

明白了函数的定义，在来看这个问题。比如说我们想反转这个链表：
1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null

那么输入 reverse(head) 后，会在这里进行递归：

ListNode last = reverse(head.next);

不要跳进递归（你的脑袋能压几个栈呀？），而是要根据刚才的函数定义，来弄清楚这段代码会产生什么结果：
head
1 -> reverse(2 -> 3 -> 4 -> 5 -> 6 -> null)

这个 reverse(head.next) 执行完成后，整个链表就成了这样：
    null
     ^
head |                  last
1 -> 2 <- 3 <- 4 <- 5 <- 6

并且根据函数定义，reverse 函数会返回反转之后的头结点，我们用变量 last 接收了。
现在再来看下面的代码：

head.next.next = head;

head                   last
1 -> 2 <- 3 <- 4 <- 5 <- 6
  <-

接下来：
head.next = null;
return last;

      head                     last
null <- 1 <- 2 <- 3 <- 4 <- 5 <- 6

神不神奇，这样整个链表就反转过来了！递归代码就是这么简洁优雅，不过其中有两个地方需要注意：

1、递归函数要有 base case，也就是这句：

if (head.next == null) return head;

意思是如果链表只有一个节点的时候反转也是它自己，直接返回即可。

2、当链表递归反转之后，新的头结点是 last，而之前的 head 变成了最后一个节点，别忘了链表的末尾要指向 null：

head.next = null;

理解了这两点后，我们就可以进一步深入了，接下来的问题其实都是在这个算法上的扩展。

*/

// 递归写法
function reverseListByRecursion(head: ReverseListFirstNode | null): ReverseListFirstNode | null {
  if (head === null) return null;
  
  // 递归到最后一个节点的时候直接返回，最终返回的就是整个反转的链表
  if (head.next === null) return head;
  
  const last = reverseListByRecursion(head.next);
  head.next.next = head;
  head.next = null;

  return last;
}
