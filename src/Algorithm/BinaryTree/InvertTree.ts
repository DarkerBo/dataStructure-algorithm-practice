// LeetCode第 226 题 翻转二叉树
/*
翻转一棵二叉树。

示例：

输入：

     4
   /   \
  2     7
 / \   / \
1   3 6   9
输出：

     4
   /   \
  7     2
 / \   / \
9   6 3   1

*/

/*
通过观察，我们发现只要把二叉树上的每一个节点的左右子节点进行交换，最后的结果就是完全翻转之后的二叉树。
可以直接写出解法代码：

// 将整棵树的节点翻转
function invertTree(root: TreeNode): TreeNode {
    // base case
    if (root === null) {
        return null;
    }

    // ------- 前序遍历位置 ---------
    // root 节点需要交换它的左右子节点
    const tmp: TreeNode = root.left;
    root.left = root.right;
    root.right = tmp;

    // 让左右子节点继续翻转它们的子节点
    invertTree(root.left);
    invertTree(root.right);

    return root;
}
这道题目比较简单，关键思路在于我们发现翻转整棵树就是交换每个节点的左右子节点，于是我们把交换左右子节点的代码放在了前序遍历的位置。
值得一提的是，如果把交换左右子节点的代码放在后序遍历的位置也是可以的，但是放在中序遍历的位置是不行的，中序遍历换节点 根据左根右的遍历顺序 相当于左侧节点交换了两次 右侧节点没换  因为遍历根的时候交换了左右节点 遍历右侧的时候还是之前那个左节点。

首先讲这道题目是想告诉你，二叉树题目的一个难点就是，如何把题目的要求细化成每个节点需要做的事情。
*/

// Definition for a binary tree node.
class InvertTreeNode {
  val: number
  left: InvertTreeNode | null
  right: InvertTreeNode | null
  constructor(val?: number, left?: InvertTreeNode | null, right?: InvertTreeNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}

function invertTree(root: InvertTreeNode | null): InvertTreeNode | null {

  if (root === null) return root;
  
  const temp = root.left;
  root.left = root.right;
  root.right = temp;

  invertTree(root.left);
  invertTree(root.right);

  return root;
};
