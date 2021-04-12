// LeetCode第 105 题 从前序与中序遍历序列构造二叉树
/*
根据一棵树的前序遍历与中序遍历构造二叉树。

注意:
你可以假设树中没有重复的元素。

例如，给出

前序遍历 preorder = [3,9,20,15,7]
中序遍历 inorder = [9,3,15,20,7]
返回如下的二叉树：

    3
   / \
  9  20
    /  \
   15   7

*/

/*
思路：
废话不多说，直接来想思路，首先思考，根节点应该做什么。

类似上一题，我们肯定要想办法确定根节点的值，把根节点做出来，然后递归构造左右子树即可。

我们先来回顾一下，前序遍历和中序遍历的结果有什么特点？

function traverse(root: TreeNode) {
  // 前序遍历
  preorder.push(root.val);
  traverse(root.left);
  traverse(root.right);
}

function traverse(root: TreeNode) {
  traverse(root.left);
  // 中序遍历
  inorder.push(root.val);
  traverse(root.right);
}
前文 二叉树就那几个框架 写过，这样的遍历顺序差异，导致了preorder和inorder数组中的元素分布有如下特点：

      1
   /    \
  2      3
 /\      /\
5  4    8  9
   /\
  6  7

        root left------------left right---right
preorder:  1   2   5   4   6   7   3   8   9       (前序遍历)

        left-------------left root right--right
inorder:   5   2   6   4   7   1   8   3   9       (中序遍历)

         left------------left right--right root
postorder: 5   6   7   4   2   8   9   3   1       (后序遍历)

找到根节点是很简单的，前序遍历的第一个值preorder[0]就是根节点的值，

关键在于如何通过根节点的值，将preorder和inorder数组划分成两半，构造根节点的左右子树？

其实只要数组截取左节点的部分，截取右节点的部分，分别递归就行

*/

class BuildTreeNode {
	val: number
	left: BuildTreeNode | null
	right: BuildTreeNode | null
	constructor(val?: number, left?: BuildTreeNode, right?: BuildTreeNode) {
		this.val = (val === undefined ? 0 : val)
		this.left = (left === undefined ? null : left)
		this.right = (right === undefined ? null : right)
	}
}

function buildFrontMidTree(preorder: number[], inorder: number[]): BuildTreeNode | null {
  // base case
  if (preorder.length === 0 || inorder.length === 0) return null;

  // 前序遍历的第一个是根节点
  // 中序遍历根节点的左侧是根节点的左节点部分，右侧是根节点的右节点部分
  const rootVal = preorder[0];
  const rootIndex = inorder.findIndex(item => item === rootVal);

  const root = new BuildTreeNode(rootVal);

  root.left = buildFrontMidTree(preorder.slice(1, rootIndex + 1), inorder.slice(0, rootIndex));
  root.right = buildFrontMidTree(preorder.slice(rootIndex + 1), inorder.slice(rootIndex + 1));

  return root;
};

console.log(buildFrontMidTree([3,9,20,15,7], [9,3,15,20,7]));


// LeetCode第 106 题 从中序与后序遍历序列构造二叉树
/*
根据一棵树的中序遍历与后序遍历构造二叉树。

注意:
你可以假设树中没有重复的元素。

例如，给出

中序遍历 inorder = [9,3,15,20,7]
后序遍历 postorder = [9,15,7,20,3]
返回如下的二叉树：

    3
   / \
  9  20
    /  \
   15   7
*/

function buildMidBehindTree(inorder: number[], postorder: number[]): BuildTreeNode | null {
  if (inorder.length === 0 || postorder.length === 0) return null;
  
  const rootVal = postorder[postorder.length - 1];
  const rootIndex = inorder.findIndex(item => item === rootVal);

  const root = new BuildTreeNode(rootVal);

  root.left = buildMidBehindTree(inorder.slice(0, rootIndex), postorder.slice(0, rootIndex));
  root.right = buildMidBehindTree(inorder.slice(rootIndex + 1), postorder.slice(rootIndex, postorder.length - 1));

  return root;
}