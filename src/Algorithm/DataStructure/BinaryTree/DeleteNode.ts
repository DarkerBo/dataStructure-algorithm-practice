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
思路：
这个问题稍微复杂，跟插入操作类似，先「找」再「改」，先把框架写出来再说：
function deleteNode(root: TreeNode | null, int key): TreeNode | null {
  if (root.val == key) {
    // 找到啦，进行删除
  } else if (root.val > key) {
    // 去左子树找
    root.left = deleteNode(root.left, key);
  } else if (root.val < key) {
    // 去右子树找
    root.right = deleteNode(root.right, key);
  }
  return root;
}

找到目标节点了，比方说是节点A，如何删除这个节点，这是难点。因为删除节点的同时不能破坏 BST 的性质。有三种情况，用画图来说明。

情况1：A恰好是末端节点(A = 7)，两个子节点都为空，那么它可以当场去世了。
    5 
   / \
  3   6
 / \   \
2   4   7

    5 
   / \
  3   6
 / \   
2   4   

情况2：A只有一个非空子节点(A = 6)，那么它要让这个孩子接替自己的位置。
    5 
   / \
  3   6
 / \   \
2   4   7

    5 
   / \
  3   7
 / \   
2   4   

if (root.left == null) return root.right;
if (root.right == null) return root.left;

情况 3：A有两个子节点(A = 2)，麻烦了，为了不破坏 BST 的性质，A必须找到左子树中最大的那个节点，或者右子树中最小的那个节点来接替自己。我们以第二种方式讲解。
    5 
   / \
  2   6
 / \   \
1   4   7
    /
   3

    5 
   / \
  3   6
 / \   \
1   4   7
    /
   3(这个节点把2替换了，要把该节点删掉)

删除操作就完成了。注意一下，这个删除操作并不完美，因为我们一般不会通过root.val = minNode.val修改节点内部的值来交换节点，而是通过一系列略微复杂的链表操作交换root和minNode两个节点。

因为具体应用中，val域可能会是一个复杂的数据结构，修改起来非常麻烦；而链表操作无非改一改指针，而不会去碰内部数据。

不过这里我们暂时忽略这个细节，旨在突出 BST 基本操作的共性，以及借助框架逐层细化问题的思维方式。

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
// 这个写法方便，但是树的层级会变得越来越多
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

// 顺滑写法
// 思路是，用删除的节点的左树的最大节点或者右树的最小节点，来替换需要删除的节点
// 这个写法是不会增加很多的层级
function deleteTreeNode(root: DeleteTreeNode | null, key: number): DeleteTreeNode | null {
  if (root === null) return null;

  if (root.val > key) root.left = deleteNode(root.left, key);
  else if (root.val < key) root.right = deleteNode(root.right, key);
  else {
    if (root.left === null) return root.right;
    if (root.right === null) return root.left;

    // 右子树的最小节点的值
    let rightMinVal = 0;
    let rightMinNode: DeleteTreeNode | null = root.right;

    while (rightMinNode) {
      rightMinVal = rightMinNode.val;
      rightMinNode = rightMinNode.left;
    }

    root.val = rightMinVal;
    // 需要删掉右树的最小节点，因为它替换了需要删除的节点
    root.right = deleteNode(root.right, rightMinVal);
  }

  return root;
};
