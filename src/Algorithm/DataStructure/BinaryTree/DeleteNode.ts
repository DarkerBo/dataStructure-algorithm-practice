// LeetCode第 450 题 删除二叉搜索树中的节点
/*
给定一个二叉搜索树的根节点 root 和一个值 key，删除二叉搜索树中的 key 对应的节点，并保证二叉搜索树的性质不变。返回二叉搜索树（有可能被更新）的根节点的引用。

一般来说，删除节点可分为两个步骤：

首先找到需要删除的节点；
如果找到了，删除它。
说明： 要求算法时间复杂度为 O(h)，h 为树的高度。

示例:

root = [5,3,6,2,4,null,7]
key = 3

    5
   / \
  3   6
 / \   \
2   4   7

给定需要删除的节点值是 3，所以我们首先找到 3 这个节点，然后删除它。

一个正确的答案是 [5,4,6,2,null,null,7], 如下图所示。

    5
   / \
  4   6
 /     \
2       7

另一个正确答案是 [5,2,6,null,4,null,7]。

    5
   / \
  2   6
   \   \
    4   7
*/

/*

*/

class DeleteTreeNode {
  val: number
  left: DeleteTreeNode | null
  right: DeleteTreeNode | null
  constructor(val?: number, left?: DeleteTreeNode | null, right?: DeleteTreeNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}

// 粗暴写法
// 思路：直接把需要删除的节点的整棵右树，直接移到左节点的最末端右节点，左节点替换需要删除的节点
function deleteNode(root: DeleteTreeNode | null, key: number): DeleteTreeNode | null {
  if (root === null) return null;

  if (root.val > key) root.left = deleteNode(root.left, key);
  else if (root.val < key) root.right = deleteNode(root.right, key);
  else {
    // 暂存右节点
    const rightNode = root.right;

    // 如果左节点为空，直接返回右节点
    if (root.left === null) {
      root = rightNode;
      return root;
    }

    // 先把左节点放到要删除的节点
    root = root.left;

    // 找到左节点的最末端的右节点
    let cur = root;

    while (cur.right) {
      cur = cur.right
    }

    // 把右树移到左节点的最末端的右节点
    cur.right = rightNode;
  }

  return root;
};
