// 二叉树相关问题
/*
之前多次强调，先刷二叉树的题目，先刷二叉树的题目，先刷二叉树的题目，因为很多经典算法，以及我们前文讲过的所有回溯、动归、分治算法，其实都是树的问题，而树的问题就永远逃不开树的递归遍历框架这几行破代码：

// 二叉树遍历框架 
function traverse(root: TreeNode) {
  // 前序遍历
  traverse(root.left)
  // 中序遍历
  traverse(root.right)
  // 后序遍历
}

// 层序遍历（本质就是广度优先遍历）
function traverse(root: TreeNode) {
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    ...
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  // 如果需要遍历同一层级的话（这个也能降低时间复杂度）
  while (queue.length) {
    const len = queue.length;

    for (let i = 0; i < len; i++) {
      const node = queue.shift();
      ...
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
}

// 深度优先遍历
function traverse(root: TreeNode) {
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    ...
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }
}


结果还有很多读者说觉得「递归」非常难以理解，说实话，递归解法应该是最简单，最容易理解的才对，行云流水地写递归代码是学好算法的基本功，而二叉树相关的题目就是最练习递归基本功，最练习框架思维的。
我先花一些篇幅说明二叉树算法的重要性。

一、二叉树的重要性
举个例子，比如说我们的经典算法「快速排序」和「归并排序」，对于这两个算法，你有什么理解？如果你告诉我，快速排序就是个二叉树的前序遍历，归并排序就是个二叉树的后序遍历，那么我就知道你是个算法高手了。

为什么快速排序和归并排序能和二叉树扯上关系？我们来简单分析一下他们的算法思想和代码框架：
快速排序的逻辑是，若要对 nums[left..right] 进行排序，我们先找一个分界点 p，通过交换元素使得 nums[left..p-1] 都小于等于 nums[p]，且 nums[p+1..right] 都大于 nums[p]，然后递归地去 nums[left..p-1] 和 nums[p+1..right] 中寻找新的分界点，最后整个数组就被排序了。

// 快速排序的代码框架如下：
function sort(nums: number[], left: number, right: right) {
    // ------ 前序遍历位置 -------
    // 通过交换元素构建分界点 p
    int p = partition(nums, left, right);
    // --------------------------

    sort(nums, left, p - 1);
    sort(nums, p + 1, right);
}
先构造分界点，然后去左右子数组构造分界点，你看这不就是一个二叉树的前序遍历吗？

再说说归并排序的逻辑，若要对 nums[left..right] 进行排序，我们先对 nums[left..mid] 排序，再对 nums[mid+1..right] 排序，最后把这两个有序的子数组合并，整个数组就排好序了。

// 归并排序的代码框架如下：
function sort(nums: number[], left: number, right: number) {
    const mid = (left + right) / 2;
    sort(nums, left, mid);
    sort(nums, mid + 1, right);

    // ------- 后序遍历位置 --------
    // 合并两个排好序的子数组
    merge(nums, left, mid, right);
    // ----------------------------
}
先对左右子数组排序，然后合并（类似合并有序链表的逻辑），你看这是不是二叉树的后序遍历框架？另外，这不就是传说中的分治算法嘛，不过如此呀。
如果你一眼就识破这些排序算法的底细，还需要背这些算法代码吗？这不是手到擒来，从框架慢慢扩展就能写出算法了。
说了这么多，旨在说明，二叉树的算法思想的运用广泛，甚至可以说，只要涉及递归，都可以抽象成二叉树的问题，所以本文和后续的 手把手带你刷二叉树（第二期） 以及 手把手刷二叉树（第三期），我们直接上几道比较有意思，且能体现出递归算法精妙的二叉树题目，东哥手把手教你怎么用算法框架搞定它们。

二、写递归算法的秘诀
我们前文 二叉树的最近公共祖先 写过，写递归算法的关键是要明确函数的「定义」是什么，然后相信这个定义，利用这个定义推导最终结果，绝不要跳入递归的细节。
怎么理解呢，我们用一个具体的例子来说，比如说让你计算一棵二叉树共有几个节点：

// 定义：count(root) 返回以 root 为根的树有多少节点
function count(TreeNode root): number {
  // base case
  if (root === null) return 0;
  // 自己加上子树的节点数就是整棵树的节点数
  return 1 + count(root.left) + count(root.right);
}
这个问题非常简单，大家应该都会写这段代码，root 本身就是一个节点，加上左右子树的节点数就是以 root 为根的树的节点总数。
左右子树的节点数怎么算？其实就是计算根为 root.left 和 root.right 两棵树的节点数呗，按照定义，递归调用 count 函数即可算出来。
写树相关的算法，简单说就是，先搞清楚当前 root 节点该做什么，然后根据函数定义递归调用子节点，递归调用会让孩子节点做相同的事情。
我们接下来看几道算法题目实操一下。

三、算法实践

四、总结
你看，这就是递归的魅力，你说flatten函数是怎么把左右子树拉平的？不容易说清楚，但是只要知道flatten的定义如此，相信这个定义，让root做它该做的事情，然后flatten函数就会按照定义工作。

另外注意递归框架是后序遍历，因为我们要先拉平左右子树才能进行后续操作。

递归算法的关键要明确函数的定义，相信这个定义，而不要跳进递归细节。

写二叉树的算法题，都是基于递归框架的，我们先要搞清楚root节点它自己要做什么，然后根据题目要求选择使用前序，中序，后续的递归框架。

五、二叉搜索树的遍历框架

function BST(root: TreeNode, target: number): void {
  if (root.val === target)
    // 找到目标，做点什么
  if (root.val < target) 
    BST(root.right, target);
  if (root.val > target)
    BST(root.left, target);
}

*/