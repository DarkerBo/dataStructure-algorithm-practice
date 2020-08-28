
// 数据结构 —— 树 插入或删除元素的时间复杂度为O(1),访问元素的时间复杂度为O(n)
// 二叉树中的节点最多只能有两个子节点：一个是左侧子节点，另一个是右侧子节点。这个定义有助于我们写出更高效地在树中插入、查找和删除节点的算法。
// 二叉搜索树（BST）是二叉树的一种，但是只允许你在左侧节点存储（比父节点）小的值，在右侧节点存储（比父节点）大的值

/**
 * @description 二分树节点
 */
class BinaryTreeNode {
  constructor(element) {
    this.element = element;
    this.left = null;
    this.right = null;
  }
}

/**
 * @description 二分搜索树（BinarySearchTree）
 */
class BST {
  constructor() {
    this.root = null;
    this.size = 0;
  }

  // 根据element的值向二分搜索树插入对应的位置
  // _insert() {

  // }


}
