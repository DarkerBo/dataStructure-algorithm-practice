// LeetCode第 114 题 填充每个节点的下一个右侧节点指针叉树
/*
给你二叉树的根结点 root ，请你将它展开为一个单链表：

展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。
展开后的单链表应该与二叉树 先序遍历 顺序相同。

示例 1：
输入：root = [1,2,5,3,4,null,6]
输出：[1,null,2,null,3,null,4,null,5,null,6]

示例 2：
输入：root = []
输出：[]

示例 3：
输入：root = [0]
输出：[0]

*/

/*
思路：
我们尝试给出这个函数的定义：

给flatten函数输入一个节点root，那么以root为根的二叉树就会被拉平为一条链表。

我们再梳理一下，如何按题目要求把一棵树拉平成一条链表？很简单，以下流程：

1、将root的左子树和右子树拉平。

2、将root的右子树接到左子树下方，然后将整个左子树作为右子树。

上面三步看起来最难的应该是第一步对吧，如何把root的左右子树拉平？其实很简单，按照flatten函数的定义，对root的左右子树递归调用flatten函数即可：


*/


class FlatterTreeNode {
  val: number
  left: FlatterTreeNode | null
  right: FlatterTreeNode | null
  constructor(val?: number, left?: FlatterTreeNode, right?: FlatterTreeNode) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}


function flattenTree(root: FlatterTreeNode | null): void {
  // base case
  if (root === null) return;

  if (root.left) flattenTree(root.left);
  if (root.right) flattenTree(root.right);

  // 使用后序遍历的原因是先将左右子树摆正
  // 1.左右子树已经被拉平成一条链表
  const leftNode = root.left;
  const rightNode = root.right;
  
  // 2.将左子树作为右子树
  root.right = leftNode;
  root.left = null;

  let curNode = root;

  // 3.将原先的右子树接到当前右子树的末端
  // 如果是最底层的子节点，它的左子节点是null，前面第二步移到右节点，因此这里是判断curNode.right是否为null
  while (curNode.right !== null) {
    curNode = curNode.right;
  }
  curNode.right = rightNode;
}

