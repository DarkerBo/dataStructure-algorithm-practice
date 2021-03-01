// LeetCode第 206 题 反转链表
/*
反转一个单链表。

示例:

输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL

*/

class ReverseListFirstNode {
  private val: number;
  private next: ReverseListFirstNode | null;
  constructor (val?: number, next?: ReverseListFirstNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// function reverseList(head: ReverseListFirstNode | null): ReverseListFirstNode | null {

// };