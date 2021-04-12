// LeetCode第 98 题 验证二叉搜索树
/*
给定一个二叉树，判断其是否是一个有效的二叉搜索树。

假设一个二叉搜索树具有如下特征：

节点的左子树只包含小于当前节点的数。
节点的右子树只包含大于当前节点的数。
所有左子树和右子树自身必须也是二叉搜索树。


示例 1:
输入:
    2
   / \
  1   3
输出: true


示例 2:
输入:
    5
   / \
  1   4
     / \
    3   6
输出: false
解释: 输入为: [5,1,4,null,null,3,6]。
     根节点的值为 5 ，但是其右子节点值为 4 。
*/

/*
思路：
这里是有坑的哦，我们按照刚才的思路，每个节点自己要做的事不就是比较自己和左右孩子吗？看起来应该这样写代码：
function isValidBST(root: TreeNode): boolean {
  if (root === null) return true;

  if (root.left !== null && root.val <= root.left.val) return false;
  if (root.right !== null && root.val >= root.right.val) return false;

  return isValidBST(root.left) && isValidBST(root.right);
}

但是这个算法出现了错误，BST 的每个节点应该要小于右边子树的所有节点，下面这个二叉树显然不是 BST，因为节点 10 的右子树中有一个节点 6，但是我们的算法会把它判定为合法 BST：

    10
   / \
  5   15
     / \
    6   20

6 < 10 错误

出现问题的原因在于，对于每一个节点 root，代码值检查了它的左右孩子节点是否符合左小右大的原则；但是根据 BST 的定义，root 的整个左子树都要小于 root.val，整个右子树都要大于 root.val。

问题是，对于某一个节点 root，他只能管得了自己的左右子节点，怎么把 root 的约束传递给左右子树呢？

可以传递 min 和 max 来约束节点

我们通过使用辅助函数，增加函数参数列表，在参数中携带额外信息，将这种约束传递给子树的所有节点，这也是二叉树算法的一个小技巧吧。

*/

class IsValidBSTNode {
  val: number
  left: IsValidBSTNode | null
  right: IsValidBSTNode | null
  next: IsValidBSTNode | null
  constructor(val?: number, left?: IsValidBSTNode, right?: IsValidBSTNode, next?: IsValidBSTNode) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
    this.next = (next === undefined ? null : next)
  }
}

// 限定以 root 为根的子树节点必须满足 max.val > root.val > min.val
function isValidBST(root: IsValidBSTNode | null): boolean {
  const traverse = (node: IsValidBSTNode | null, min: IsValidBSTNode | null, max: IsValidBSTNode | null): boolean => {
    // base case
    if (node === null) return true;
    
    // 若 root.val 不符合 max 和 min 的限制，说明不是合法 BST
    if (min !== null && node.val <= min.val) return false;
    if (max !== null && node.val >= max.val) return false;

    // 限定左子树的最大值是 root.val，右子树的最小值是 root.val
    return traverse(node.left, min, node) && traverse(node.right, node, max);
  }

  return traverse(root, null, null);
};
