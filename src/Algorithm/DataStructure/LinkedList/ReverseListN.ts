/* 
二、反转链表前 N 个节点
这次我们实现一个这样的函数：
// 将链表的前 n 个节点反转（n <= 链表长度）
function reverseN(head: ListNode | null, n: number): ListNode | null {

}

比如说对于下图链表，执行 reverseN(head, 3)
1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null

变成
head   last curNode
1 <- 2 <- 3  4 -> 5 -> 6 -> null
|            ^
|            |
--------------

具体的区别：
1、base case 变为 n == 1，反转一个元素，就是它本身，同时要记录后驱节点。
2、刚才我们直接把 head.next 设置为 null，因为整个链表反转后原来的 head 变成了整个链表的最后一个节点。但现在 head 节点在递归反转之后不一定是最后一个节点了，所以要记录后驱 successor（第 n + 1 个节点），反转之后将 head 连接上。


*/

class ReverseListNNode {
  public val: number;
  public next: ReverseListNNode | null;
  constructor (val?: number, next?: ReverseListNNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// 压栈写法（未校验）
function reverseN(head: ReverseListNNode | null, n: number): ReverseListNNode | null {
  if (head === null || head.next === null) return head;
  let prev: ReverseListNNode | null = head, 
      cur: ReverseListNNode | null = head.next;

  const curNode = head;

  while (cur && n >= 0) {
    const nextNode: ReverseListNNode | null = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nextNode;

    n--;
  }

  return prev;
}

// 递归写法
export function reverseNByRecursion(head: ReverseListNNode | null, n: number): ReverseListNNode | null {

  // 后驱节点，如反转后 3 -> 2 -> 1 -> 4，这里的节点4
  let curNode: ReverseListNNode | null = null;

  const _reverse = (node: ReverseListNNode | null, num: number) => {
    // 兼容 head 为 null 的情况
    if (node === null) return null;

    // 兼容链表的长度小于n的情况(此时就反转整个链表)
    if (node.next === null) return node;

    // 表示遍历到了需要反转的最后节点
    if (num === 1) {
      curNode = node.next;
      return node;
    }

    const last = reverseNByRecursion(node.next, num - 1);
    node.next.next = node;
    node.next = curNode;

    return last;
  }
  
  return _reverse(head, n);
}