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

--------------------------------------------------------------------------------------------------------

迭代（压栈）写法思路：
整理思想是：在需要反转的区间里，每遍历到一个节点，让这个新节点来到反转部分的起始位置。下面的图展示了整个流程。

cur：指向待反转区域的第一个节点 left；
next：永远指向 curr 的下一个节点，循环过程中，curr 变化以后 next 会变化；
prev：永远指向待反转区域的第一个节点 left 的前一个节点，在循环过程中不变。

反转区域 1 到 4
prev cur next
dummy 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null

先将 cur 的下一个节点记录为 next；
执行操作 ①：把 cur 的下一个节点指向 next 的下一个节点；
执行操作 ②：把 next 的下一个节点指向 prev 的下一个节点；
执行操作 ③：把 prev 的下一个节点指向 next。

反转后就是
prev      cur  next
dummy 2 -> 1 -> 3 -> 4 -> 5 -> 6 -> null
继续


*/

class ReverseListNNode {
  public val: number;
  public next: ReverseListNNode | null;
  constructor (val?: number, next?: ReverseListNNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// 插入写法（未校验）
function reverseN(head: ReverseListNNode | null, n: number): ReverseListNNode | null {
  if (head === null) return null;

  // 需要在加一个虚拟的开始节点，来适配长度只有2的链表反转
	const dummyNode = new ReverseListNNode(0, head);
	let	prev: ReverseListNNode | null = dummyNode,
      cur: ReverseListNNode | null = dummyNode.next;

  for (let i = 0; i < n - 1; i++) {
    if (cur && cur.next && prev) {
      const nextNode = cur.next;
      cur.next = nextNode.next;
      nextNode.next = prev.next;
      prev.next = nextNode;
    }
  }

  return prev.next;
}

// 压栈写法
function reverseNByStack(head: ReverseListNNode | null, n: number): ReverseListNNode | null {
  if (head === null) return null;

  let	prev: ReverseListNNode | null = head,
      cur: ReverseListNNode | null = head;

  for (let i = 0; i < n; i++) {
    if (prev) prev = prev.next;
    else return head;
  }

  // 这个节点是拿来判断cur是否到达了末尾
  const entPoint: ReverseListNNode | null = prev;

  while (cur && cur !== entPoint) {
    const nextNode: ReverseListNNode | null = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nextNode;
  }

  return prev;
}


// 递归写法
export function reverseNByRecursion(head: ReverseListNNode | null, n: number): ReverseListNNode | null {

  // 后驱节点，如反转后 3 -> 2 -> 1 -> 4，这里的节点4
  let curNode: ReverseListNNode | null = null;

  const _reverse = (node: ReverseListNNode | null, num: number): ReverseListNNode | null => {
    // 兼容 head 为 null 的情况
    if (node === null) return null;

    // 兼容链表的长度小于n的情况(此时就反转整个链表)
    if (node.next === null) return node;

    // 表示遍历到了需要反转的最后节点
    if (num === 1) {
      curNode = node.next;
      return node;
    }

    const last = _reverse(node.next, num - 1);
    node.next.next = node;
    node.next = curNode;

    return last;
  }
  
  return _reverse(head, n);
}

const list = new ReverseListNNode(1, new ReverseListNNode(2, new ReverseListNNode(3, new ReverseListNNode(4, new ReverseListNNode(5)))));

// console.log(reverseN(list, 3));
// console.log(reverseNByRecursion(list, 3));
// console.log(reverseNByStack(list, 3)?.next?.next);

