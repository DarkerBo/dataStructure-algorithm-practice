// LeetCode第 783 题 二叉搜索树节点最小距离
/*
给你一个二叉搜索树的根节点 root ，返回 树中任意两不同节点值之间的最小差值。

示例一：

     4
   /   \
  2     6
 / \   
1   3  

输入：root = [4,2,6,1,3]
输出：1


示例二：

     1
   /   \
  0     48
        / \
       12  49

输入：root = [1,0,48,null,null,12,49]
输出：1

*/

/*
其实二叉搜索树也就那几条关键的性质
1. 二叉搜索树的中序遍历是按节点的升序排序
2. 二叉搜索树的左树都小于右树
3. 二叉搜索树的前序遍历根节点在第一个，后序遍历根节点在最后一个

这里找最小差值，很明显要反向中序遍历(降序)，然后找两个元素之间的最小差值
可以用一个数组装载所有遍历的值，为了降低空间复杂度，可以使用一个变量保存最小值min，另一个变量保存上一个节点的值

*/

class MinDiffInBSTeNode {
  val: number
  left: MinDiffInBSTeNode | null
  right: MinDiffInBSTeNode | null
  constructor(val?: number, left?: MinDiffInBSTeNode | null, right?: MinDiffInBSTeNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}

function minDiffInBST(root: MinDiffInBSTeNode | null): number {
  if (root === null) return 0;

  let min = Infinity;
  let cur = Infinity;

  const traverse = (node: MinDiffInBSTeNode | null) => {
    if (node === null) return;

    traverse(node.right);
    min = Math.min(min, cur - node.val);
    cur = node.val;
    traverse(node.left);
  }

  traverse(root);

  return min;
};

