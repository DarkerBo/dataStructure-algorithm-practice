// LeetCode第 92 题 反转链表Ⅱ
/*
反转链表的一部分

现在解决我们最开始提出的问题，给一个索引区间 [m,n]（索引从 1 开始），仅仅反转区间中的链表元素。

function reverseBetween(head: ListNode, m: number, n: number): ListNode {

}

首先，如果 m == 1，就相当于反转链表开头的 n 个元素嘛，也就是我们刚才实现的功能：

function reverseBetween(head: ListNode, m: number, n: number): ListNode {
    // base case
    if (m === 1) {
        // 相当于反转前 n 个元素
        return reverseN(head, n);
    }
    // ...
}

如果 m != 1 怎么办？如果我们把 head 的索引视为 1，那么我们是想从第 m 个元素开始反转对吧；如果把 head.next 的索引视为 1 呢？那么相对于 head.next，反转的区间应该是从第 m - 1 个元素开始的；那么对于 head.next.next 呢……

区别于迭代思想，这就是递归思想，所以我们可以完成代码：

function reverseBetween(head: ListNode, m: number, n: number): ListNode {
    // base case
    if (m === 1) {
        return reverseN(head, n);
    }
    // 前进到反转的起点触发 base case
    head.next = reverseBetween(head.next, m - 1, n - 1);
    return head;
}
至此，我们的最终大 BOSS 就被解决了。

四、最后总结
递归的思想相对迭代思想，稍微有点难以理解，处理的技巧是：不要跳进递归，而是利用明确的定义来实现算法逻辑。

处理看起来比较困难的问题，可以尝试化整为零，把一些简单的解法进行修改，解决困难的问题。

值得一提的是，递归操作链表并不高效。和迭代解法相比，虽然时间复杂度都是 O(N)，但是迭代解法的空间复杂度是 O(1)，而递归解法需要堆栈，空间复杂度是 O(N)。所以递归操作链表可以作为对递归算法的练习或者拿去和小伙伴装逼，但是考虑效率的话还是使用迭代算法更好。

--------------------------------------------------------------------------------------------------------

压栈写法思路：
整理思想是：在需要反转的区间里，每遍历到一个节点，让这个新节点来到反转部分的起始位置。下面的图展示了整个流程。

cur：指向待反转区域的第一个节点 left；
next：永远指向 curr 的下一个节点，循环过程中，curr 变化以后 next 会变化；
prev：永远指向待反转区域的第一个节点 left 的前一个节点，在循环过程中不变。

反转区域 2 到 4
prev cur next
1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null

先将 cur 的下一个节点记录为 next；
执行操作 ①：把 cur 的下一个节点指向 next 的下一个节点；
执行操作 ②：把 next 的下一个节点指向 prev 的下一个节点；
执行操作 ③：把 prev 的下一个节点指向 next。

反转后就是
prev     cur  next
1 -> 3 -> 2 -> 4 -> 5 -> 6 -> null
继续

*/

class ReverseListBetweenNode {
	public val: number;
	public next: ReverseListBetweenNode | null;
	constructor (val?: number, next?: ReverseListBetweenNode | null) {
		this.val = val === undefined ? 0 : val;
		this.next = next === undefined ? null : next;
	}
}

import { reverseNByRecursion } from './ReverseListN';

// 插入写法
function reverseBetween(head: ReverseListBetweenNode | null, left: number, right: number): ReverseListBetweenNode | null {
	if (head === null) return null;

	// 需要在加一个虚拟的开始节点，来适配长度只有2的链表反转
	const dummyNode = new ReverseListBetweenNode(0, head);
	let	prev: ReverseListBetweenNode | null = dummyNode;

	// 使用for循环更加语义化
	// 因为left是1开始的，i是0开始的，因此要-1
	for (let i = 0; i < left - 1; i++) {
		if (prev) prev = prev.next;
	}

	let cur: ReverseListBetweenNode | null = (prev as ReverseListBetweenNode).next;

	// 比如2-4反转，cur在2中，反转到4就停止，因此需要4-2=2次反转，i是从0开始的，因此 i < right - left = 2
	for (let i = 0; i < right - left; i++) {
		if (cur && cur.next && prev) {
			const nextNode = cur.next;
			cur.next = nextNode.next;
			nextNode.next = prev.next;
			prev.next = nextNode;
		}
	}

	return dummyNode.next;
}

// 压栈写法
function reverseBetweenByStack(head: ReverseListBetweenNode | null, left: number, right: number): ReverseListBetweenNode | null {
	if (head === null) return null;

	let	prev: ReverseListBetweenNode | null = head,
      cur: ReverseListBetweenNode | null = head,
			startPoint: ReverseListBetweenNode | null = head;

  for (let i = 0; i < right - 1; i++) {
		// 要放在prev赋值的上面，否则就会去到需要反转的头部的下一个
		if (i === left - 1) startPoint = prev;
		if (i === left) cur = prev;

    if (prev) prev = prev.next;
    else return head;
  }

	// 区间外的下一个点
	const endPoint = prev;

	// 对比反转整个链表的区别在于这里的 cur 相当于反转全部的 null
  while (cur && cur !== endPoint) {
    const nextNode: ReverseListBetweenNode | null = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nextNode;
  }

	(startPoint as ReverseListBetweenNode).next = prev;

	return head;
}


// 递归写法
function reverseBetweenByRecursion(head: ReverseListBetweenNode | null, m: number, n: number): ReverseListBetweenNode | null {
	if (head === null) return null; 

	// 当m为1的时候，相当于反转链表的前N个
	if (m === 1) {
		return reverseNByRecursion(head, n);
	}

	head.next = reverseBetweenByRecursion(head.next, m - 1, n - 1);
	return head;
}

const list = new ReverseListBetweenNode(1, new ReverseListBetweenNode(2, new ReverseListBetweenNode(3, new ReverseListBetweenNode(4, new ReverseListBetweenNode(5)))));

// console.log(reverseBetween(list, 2, 4)?.next?.next);
// console.log(reverseBetweenByStack(list, 2, 4)?.next?.next);

// const list = new ReverseListBetweenNode(1,new ReverseListBetweenNode(2))

// console.log(reverseBetween(list, 1, 2));
