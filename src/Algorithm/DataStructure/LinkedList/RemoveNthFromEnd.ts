// LeetCode第 16 题 删除链表的倒数第 N 个结点
/*
给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
进阶：你能尝试使用一趟扫描实现吗？

示例 1：

原链表： 1 -> 2 -> 3 -> 4 -> 5
删除后的链表： 1 -> 2 -> 3 -> 5

输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]

示例 2：
输入：head = [1], n = 1
输出：[]

示例 3：
输入：head = [1,2], n = 1
输出：[1]

*/

/*
思路：
快慢指针，快指针先走n步，然后快慢指针同时走，这样快慢指针一直保持n的距离

等到快指针走到链表的底端的时候，慢指针刚好走到倒数第n个的节点。

此时需要获取慢指针前一个节点cur，然后cur连接slow的下一个节点，slow指向null就删除节点了
*/

class RemoveNthFromEndList {
  public val: number;
  public next: RemoveNthFromEndList | null;
  constructor (val?: number, next?: RemoveNthFromEndList | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function removeNthFromEnd(head: RemoveNthFromEndList | null, n: number): RemoveNthFromEndList | null {

  // 为了兼容链表只有一个节点的情况
  const dummyNode = new RemoveNthFromEndList(0, head);

  let fast: RemoveNthFromEndList | null = head,
      slow: RemoveNthFromEndList | null = head,
      cur: RemoveNthFromEndList | null = dummyNode;

  // 如果链表的长度不足k，直接返回整个链表
  for (let i = 0; i < n; i++) {
    if (fast) fast = fast.next;
    else return head;
  }

  while (fast !== null) {
    fast = fast.next;
    cur = (cur as RemoveNthFromEndList).next;
    slow = (slow as RemoveNthFromEndList).next;
  }

  // 删除慢指针指向的节点
  (cur as RemoveNthFromEndList).next = (slow as RemoveNthFromEndList).next;
  (slow as RemoveNthFromEndList).next = null;

  return dummyNode.next;
};

