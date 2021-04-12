// LeetCode第 230 题 二叉搜索树中第K小的元素
/*
这篇手把手带你刷 BST (二叉搜索树)
首先，BST 的特性大家应该都很熟悉了：

1、对于 BST 的每一个节点 node，左子树节点的值都比 node 的值要小，右子树节点的值都比 node 的值大。

2、对于 BST 的每一个节点 node，它的左侧子树和右侧子树都是 BST。

二叉搜索树并不算复杂，但我觉得它可以算是数据结构领域的半壁江山，直接基于 BST 的数据结构有 AVL 树，红黑树等等，拥有了自平衡性质，可以提供 logN 级别的增删查改效率；还有 B+ 树，线段树等结构都是基于 BST 的思想来设计的。

从做算法题的角度来看 BST，除了它的定义，还有一个重要的性质：BST 的中序遍历结果是有序的（升序）。

也就是说，如果输入一棵 BST，以下代码可以将 BST 中每个节点的值升序打印出来：
function traverse(root: TreeNode) {
  if (root == null) return;
  traverse(root.left);
  // 中序遍历代码位置
  console(root.val);
  traverse(root.right);
}

这个需求很常见吧，一个直接的思路就是升序排序，然后找第k个元素呗。BST 的中序遍历其实就是升序排序的结果，找第k个元素肯定不是什么难事。

按照这个思路，可以直接写出代码：

中序遍历就完事

这道题就做完了，不过呢，还是要多说几句，因为这个解法并不是最高效的解法，而是仅仅适用于这道题。

如果按照我们刚才说的方法，利用「BST 中序遍历就是升序排序结果」这个性质，每次寻找第k小的元素都要中序遍历一次，最坏的时间复杂度是O(N)，N是 BST 的节点个数。

要知道 BST 性质是非常牛逼的，像红黑树这种改良的自平衡 BST，增删查改都是O(logN)的复杂度，让你算一个第k小元素，时间复杂度竟然要O(N)，有点低效了。

所以说，计算第k小元素，最好的算法肯定也是对数级别的复杂度，不过这个依赖于 BST 节点记录的信息有多少。

我们想一下 BST 的操作为什么这么高效？就拿搜索某一个元素来说，BST 能够在对数时间找到该元素的根本原因还是在 BST 的定义里，左子树小右子树大嘛，所以每个节点都可以通过对比自身的值判断去左子树还是右子树搜索目标值，从而避免了全树遍历，达到对数级复杂度。

那么回到这个问题，想找到第k小的元素，或者说找到排名为k的元素，如果想达到对数级复杂度，关键也在于每个节点得知道他自己排第几。

比如说你让我查找排名为k的元素，当前节点知道自己排名第m，那么我可以比较m和k的大小：

1、如果m == k，显然就是找到了第k个元素，返回当前节点就行了。

2、如果k < m，那说明排名第k的元素在左子树，所以可以去左子树搜索第k个元素。

3、如果k > m，那说明排名第k的元素在右子树，所以可以去右子树搜索第k - m - 1个元素。

这样就可以将时间复杂度降到O(logN)了。

那么，如何让每一个节点知道自己的排名呢？

这就是我们之前说的，需要在二叉树节点中维护额外信息。每个节点需要记录，以自己为根的这棵二叉树有多少个节点。

也就是说，我们TreeNode中的字段应该如下：

class TreeNode {
  private val: number;
  // 以该节点为根的树的节点总数
  private size: number;
  private left: TreeNode;
  private right: TreeNode;
}
有了size字段，外加 BST 节点左小右大的性质，对于每个节点node就可以通过node.left推导出node的排名，从而做到我们刚才说到的对数级算法。

当然，size字段需要在增删元素的时候需要被正确维护，力扣提供的TreeNode是没有size这个字段的，所以我们这道题就只能利用 BST 中序遍历的特性实现了，但是我们上面说到的优化思路是 BST 的常见操作，还是有必要理解的。

*/

class KthSmallestTree {
	val: number
	left: KthSmallestTree | null
	right: KthSmallestTree | null
	constructor(val?: number, left?: KthSmallestTree, right?: KthSmallestTree) {
		this.val = (val === undefined ? 0 : val)
		this.left = (left === undefined ? null : left)
		this.right = (right === undefined ? null : right)
	}
}

// 中序遍历写法
function kthSmallest(root: KthSmallestTree | null, k: number): number {
  // 按升序排序元素的索引
  let rank = 0;
  // 返回元素的值
  let res = 0;

  // 中序遍历按升序排序元素
  const traverse = (node: KthSmallestTree | null): void => {
    if (node === null) return;

    traverse(node.left);
    rank++;
    if (rank === k) {
      res = node.val;
      return;
    }
    traverse(node.right);
  }

  traverse(root);

  return res;
}

