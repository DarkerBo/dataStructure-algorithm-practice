// LeetCode第 654 题 构造最大二叉树
/*
给定一个不含重复元素的整数数组 nums 。一个以此数组直接递归构建的 最大二叉树 定义如下：

二叉树的根是数组 nums 中的最大元素。
左子树是通过数组中 最大值左边部分 递归构造出的最大二叉树。
右子树是通过数组中 最大值右边部分 递归构造出的最大二叉树。
返回有给定数组 nums 构建的 最大二叉树 。

示例一：
输入：nums = [3,2,1,6,0,5]
输出：[6,3,5,null,2,0,null,null,1]

     6
   /   \
  3     5
   \    /
    2  0  
     \
      1

解释：递归调用如下所示：
- [3,2,1,6,0,5] 中的最大值是 6 ，左边部分是 [3,2,1] ，右边部分是 [0,5] 。
    - [3,2,1] 中的最大值是 3 ，左边部分是 [] ，右边部分是 [2,1] 。
        - 空数组，无子节点。
        - [2,1] 中的最大值是 2 ，左边部分是 [] ，右边部分是 [1] 。
            - 空数组，无子节点。
            - 只有一个元素，所以子节点是一个值为 1 的节点。
    - [0,5] 中的最大值是 5 ，左边部分是 [0] ，右边部分是 [] 。
        - 只有一个元素，所以子节点是一个值为 0 的节点。
        - 空数组，无子节点。

示例二：
输入：nums = [3,2,1]
输出：[3,null,2,null,1]

*/


/*
思路：
先来复习一下，我们说过写树的算法，关键思路如下：
把题目的要求细化，搞清楚根节点应该做什么，然后剩下的事情抛给前/中/后序的遍历框架就行了，我们千万不要跳进递归的细节里，你的脑袋才能压几个栈呀。

按照我们刚才说的，先明确根节点做什么？对于构造二叉树的问题，根节点要做的就是把想办法把自己构造出来。

我们肯定要遍历数组把找到最大值 maxVal，把根节点 root 做出来，然后对 maxVal 左边的数组和右边的数组进行递归调用，作为 root 的左右子树。

按照题目给出的例子，输入的数组为 [3,2,1,6,0,5]，对于整棵树的根节点来说，其实在做这件事：

function constructMaximumBinaryTree([3,2,1,6,0,5]): TreeNode | null {
	// 找到数组中的最大值
	const root: TreeNode = new TreeNode(6);
	// 递归调用构造左右子树
	root.left = constructMaximumBinaryTree([3,2,1]);
	root.right = constructMaximumBinaryTree([0,5]);
	return root;
}

*/

class ConstructMaximumTreeNode {
	val: number
	left: ConstructMaximumTreeNode | null
	right: ConstructMaximumTreeNode | null
	constructor(val?: number, left?: ConstructMaximumTreeNode, right?: ConstructMaximumTreeNode) {
		this.val = (val === undefined ? 0 : val)
		this.left = (left === undefined ? null : left)
		this.right = (right === undefined ? null : right)
	}
}

function constructMaximumBinaryTree(nums: number[]): ConstructMaximumTreeNode | null {
	// base case
	if (nums.length === 0) return null;

	// 获取数组中最大的数的索引
	const maxIndex = nums.reduce((acc, cur, index) => {
		return nums[acc] >= cur ? acc : index;
	}, 0);

	const root = new ConstructMaximumTreeNode(nums[maxIndex]);

	// 左右节点使用递归，这里其实就是前序遍历
	root.left = constructMaximumBinaryTree(nums.slice(0, maxIndex));
	root.right = constructMaximumBinaryTree(nums.slice(maxIndex + 1));

	return root;
}
