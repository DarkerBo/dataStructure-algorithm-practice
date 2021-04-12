// LeetCode第 538 题 把二叉搜索树转换为累加树
/*
给出二叉 搜索 树的根节点，该树的节点值各不相同，请你将其转换为累加树（Greater Sum Tree），使每个节点 node 的新值等于原树中大于或等于 node.val 的值之和。

提醒一下，二叉搜索树满足下列约束条件：

节点的左子树仅包含键 小于 节点键的节点。
节点的右子树仅包含键 大于 节点键的节点。
左右子树也必须是二叉搜索树。

示例 1：
         4(30)
     /          \
  1(36)        6(21)
 /     \       /    \
0(36)  2(35)  5(26) 7(15)
         \            \
         3(33)        8(8)

输入：[4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
输出：[30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]

示例 2：
输入：root = [0,null,1]
输出：[1,null,1]

示例 3：
输入：root = [1,0,2]
输出：[3,3,2]

示例 4：
输入：root = [3,2,4,1]
输出：[7,9,4,10]

*/

/*
思路：反转中序遍历

题目应该不难理解，比如图中的节点 5，转化成累加树的话，比 5 大的节点有 6，7，8，加上 5 本身，所以累加树上这个节点的值应该是 5+6+7+8=26。

我们需要把 BST 转化成累加树，函数签名如下：
function convertBST(root: TreeNode): TreeNode

按照二叉树的通用思路，需要思考每个节点应该做什么，但是这道题上很难想到什么思路。

BST 的每个节点左小右大，这似乎是一个有用的信息，既然累加和是计算大于等于当前值的所有元素之和，那么每个节点都去计算右子树的和，不就行了吗？

这是不行的。对于一个节点来说，确实右子树都是比它大的元素，但问题是它的父节点也可能是比它大的元素呀？这个没法确定的，我们又没有触达父节点的指针，所以二叉树的通用思路在这里用不了。

其实，正确的解法很简单，还是利用 BST 的中序遍历特性。

刚才我们说了 BST 的中序遍历代码可以升序打印节点的值：

function traverse(root: TreeNode) {
	if (root === null) return;
	traverse(root.left);
	// 中序遍历代码位置
	console.log(root.val);
	traverse(root.right);
}
那如果我想降序打印节点的值怎么办？

很简单，只要把递归顺序改一下就行了：

function traverse(root: TreeNode) {
	if (root === null) return;
	traverse(root.right);
	// 中序遍历代码位置
	console.log(root.val);
	traverse(root.left);
}
这段代码可以从大到小降序打印 BST 节点的值，如果维护一个外部累加变量sum，然后把sum赋值给 BST 中的每一个节点，不就将 BST 转化成累加树了吗？

这道题就解决了，核心还是 BST 的中序遍历特性，只不过我们修改了递归顺序，降序遍历 BST 的元素值，从而契合题目累加树的要求。

简单总结下吧，BST 相关的问题，要么利用 BST 左小右大的特性提升算法效率，要么利用中序遍历的特性满足题目的要求，也就这么些事儿吧。

*/

class ConvertBSTNode {
   val: number
   left: ConvertBSTNode | null
   right: ConvertBSTNode | null
   next: ConvertBSTNode | null
   constructor(val?: number, left?: ConvertBSTNode, right?: ConvertBSTNode, next?: ConvertBSTNode) {
     this.val = (val === undefined ? 0 : val)
     this.left = (left === undefined ? null : left)
     this.right = (right === undefined ? null : right)
     this.next = (next === undefined ? null : next)
   }
 }

function convertBST(root: ConvertBSTNode | null): ConvertBSTNode | null {
	let count = 0;

	const traverse = (node: ConvertBSTNode | null) => {
		// base case
		if (node === null) return;
		
		traverse(node.right);

		count += node.val;
		node.val = count;

		traverse(node.left);
  }
  
	traverse(root);
	return root;
};

