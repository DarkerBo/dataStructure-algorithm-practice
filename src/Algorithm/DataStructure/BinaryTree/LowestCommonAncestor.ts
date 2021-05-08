// LeetCode第 236 题 二叉树的最近公共祖先
/*
给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

百度百科中最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

示例一：

     3
   /   \
  5     1
 / \   / \
6   2  0  8
   / \
  7   4

输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
输出：3
解释：节点 5 和节点 1 的最近公共祖先是节点 3 。


示例二：

     3
   /   \
  5     1
 / \   / \
6   2  0  8
   / \
  7   4

输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
输出：5
解释：节点 5 和节点 4 的最近公共祖先是节点 5 。因为根据定义最近公共祖先节点可以为节点本身。


示例三：

输入：root = [1,2], p = 1, q = 2
输出：1

*/

/*
我们前文 学习数据结构和算法的框架思维 就说过了，所有二叉树的套路都是一样的：

function traverse(root: TreeNode) {
    // 前序遍历
    traverse(root.left)
    // 中序遍历
    traverse(root.right)
    // 后序遍历
}
所以，只要看到二叉树的问题，先把这个框架写出来准没问题：

function lowestCommonAncestor(root: TreeNode, p: TreeNode, q: TreeNode) {
    const left: TreeNode = lowestCommonAncestor(root.left, p, q);
    const right: TreeNode = lowestCommonAncestor(root.right, p, q);
}
现在我们思考如何添加一些细节，把框架改造成解法。

labuladong 告诉你，遇到任何递归型的问题，无非就是灵魂三问：

1、这个函数是干嘛的？

2、这个函数参数中的变量是什么的是什么？

3、得到函数的递归结果，你应该干什么？

呵呵，看到这灵魂三问，你有没有感觉到熟悉？本号的动态规划系列文章，篇篇都在说的动态规划套路，首先要明确的是什么？是不是要明确「定义」「状态」「选择」，这仨不就是上面的灵魂三问吗？

下面我们就来看看如何回答这灵魂三问。

解法思路
首先看第一个问题，这个函数是干嘛的？或者说，你给我描述一下lowestCommonAncestor这个函数的「定义」吧。

描述：给该函数输入三个参数root，p，q，它会返回一个节点。

情况 1，如果p和q都在以root为根的树中，函数返回的即使p和q的最近公共祖先节点。

情况 2，那如果p和q都不在以root为根的树中怎么办呢？函数理所当然地返回null呗。

情况 3，那如果p和q只有一个存在于root为根的树中呢？函数就会返回那个节点。

题目说了输入的p和q一定存在于以root为根的树中，但是递归过程中，以上三种情况都有可能发生，所以说这里要定义清楚，后续这些定义都会在代码中体现。

OK，第一个问题就解决了，把这个定义记在脑子里，无论发生什么，都不要怀疑这个定义的正确性，这是我们写递归函数的基本素养。

然后来看第二个问题，这个函数的参数中，变量是什么？或者说，你描述一个这个函数的「状态」吧。

描述：函数参数中的变量是root，因为根据框架，lowestCommonAncestor(root)会递归调用root.left和root.right；至于p和q，我们要求它俩的公共祖先，它俩肯定不会变化的。

第二个问题也解决了，你也可以理解这是「状态转移」，每次递归在做什么？不就是在把「以root为根」转移成「以root的子节点为根」，不断缩小问题规模嘛？

最后来看第三个问题，得到函数的递归结果，你该干嘛？或者说，得到递归调用的结果后，你做什么「选择」？

这就像动态规划系列问题，怎么做选择，需要观察问题的性质，找规律。那么我们就得分析这个「最近公共祖先节点」有什么特点呢？刚才说了函数中的变量是root参数，所以这里都要围绕root节点的情况来展开讨论。

先想 base case，如果root为空，肯定得返回null。如果root本身就是p或者q，比如说root就是p节点吧，如果q存在于以root为根的树中，显然root就是最近公共祖先；即使q不存在于以root为根的树中，按照情况 3 的定义，也应该返回root节点。

以上两种情况的 base case 就可以把框架代码填充一点了：

function lowestCommonAncestor(root: TreeNode, p: TreeNode, q: TreeNode) {
  // 两种情况的 base case
  if (root == null) return null;
  if (root == p || root == q) return root;

  const left: TreeNode = lowestCommonAncestor(root.left, p, q);
  const right: TreeNode = lowestCommonAncestor(root.right, p, q);
}
现在就要面临真正的挑战了，用递归调用的结果left和right来搞点事情。根据刚才第一个问题中对函数的定义，我们继续分情况讨论：

情况 1，如果p和q都在以root为根的树中，那么left和right一定分别是p和q（从 base case 看出来的）。

情况 2，如果p和q都不在以root为根的树中，直接返回null。

情况 3，如果p和q只有一个存在于root为根的树中，函数返回该节点。

明白了上面三点，可以直接看解法代码了.

对于情况 1，你肯定有疑问，left和right非空，分别是p和q，可以说明root是它们的公共祖先，但能确定root就是「最近」公共祖先吗？

这就是一个巧妙的地方了，因为这里是二叉树的后序遍历啊！前序遍历可以理解为是从上往下，而后序遍历是从下往上，就好比从p和q出发往上走，第一次相交的节点就是这个root，你说这是不是最近公共祖先呢？

综上，二叉树的最近公共祖先就计算出来了。
*/

class LowestCommonAncestorNode {
  val: number
  left: LowestCommonAncestorNode | null
  right: LowestCommonAncestorNode | null
  constructor(val?: number, left?: LowestCommonAncestorNode, right?: LowestCommonAncestorNode) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}


function lowestCommonAncestor(root: LowestCommonAncestorNode | null, p: LowestCommonAncestorNode | null, q: LowestCommonAncestorNode | null): LowestCommonAncestorNode | null {
  if (root === null) return null;

  if (root === p || root === q) return root;
  
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  // 如果不为空，那么 left 和 right 一定为 p 和 q
  if (left !== null && right !== null) return root;

  // 如果都为空，则代表 p 和 q 都不在root这棵树上
  if (left === null && right === null) return null;

  // 如果其中一个不为空，比如 left，那么 left 就为 p 或 q
  return left ? left : right;
};

