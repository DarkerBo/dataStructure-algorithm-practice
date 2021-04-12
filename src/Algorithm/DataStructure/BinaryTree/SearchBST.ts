// LeetCode第 700 题 二叉搜索树中的搜索
/*
给定二叉搜索树（BST）的根节点和一个值。 你需要在BST中找到节点值等于给定值的节点。 返回以该节点为根的子树。 如果节点不存在，则返回 NULL。

例如，

给定二叉搜索树:

        4
       / \
      2   7
     / \
    1   3

和值: 2

你应该返回如下子树:
      2     
     / \   
    1   3
在上述示例中，如果要找的值是 5，但因为没有节点值为 5，我们应该返回 NULL。
*/

/*
思想：
如果是在二叉树中寻找元素，可以这样写代码：
function isInBST(root: TreeNode, target: number): boolean {
    if (root === null) return false;
    if (root.val === target) return true;
    // 当前节点没找到就递归地去左右子树寻找
    return isInBST(root.left, target)
        || isInBST(root.right, target);
}
这样写完全正确，但这段代码相当于穷举了所有节点，适用于所有普通二叉树。那么应该如何充分利用信息，把 BST 这个「左小右大」的特性用上？

很简单，其实不需要递归地搜索两边，类似二分查找思想，根据 target 和 root.val 的大小比较，就能排除一边。我们把上面的思路稍稍改动：
function isInBST(root: TreeNode, target: number): boolean {
    if (root === null) return false;
    if (root.val === target)
        return true;
    if (root.val < target) 
        return isInBST(root.right, target);
    if (root.val > target)
        return isInBST(root.left, target);
    // root 该做的事做完了，顺带把框架也完成了，妙
}
于是，我们对原始框架进行改造，抽象出一套针对 BST 的遍历框架：
function BST(root: TreeNode, target: number): void {
  if (root.val === target)
    // 找到目标，做点什么
  if (root.val < target) 
    BST(root.right, target);
  if (root.val > target)
    BST(root.left, target);
}
这个代码框架其实和二叉树的遍历框架差不多，无非就是利用了 BST 左小右大的特性而已。
*/

class SearchBSTNode {
  val: number
  left: SearchBSTNode | null
  right: SearchBSTNode | null
  next: SearchBSTNode | null
  constructor(val?: number, left?: SearchBSTNode, right?: SearchBSTNode, next?: SearchBSTNode) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
    this.next = (next === undefined ? null : next)
  }
}

function searchBST(root: SearchBSTNode | null, val: number): SearchBSTNode | null {
  if (root === null) return null;

  if (root.val === val) return root;
  else if (root.val > val) return searchBST(root.left, val);
  else if (root.val < val) return searchBST(root.right, val);

  return null;
};
