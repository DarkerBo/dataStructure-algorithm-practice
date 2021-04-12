// LeetCode第 652 题 寻找重复的子树
/*
给定一棵二叉树，返回所有重复的子树。对于同一类的重复子树，你只需要返回其中任意一棵的根结点即可。

两棵树重复是指它们具有相同的结构以及相同的结点值。

示例 1：

        1
       / \
      2   3
     /   / \
    4   2   4
       /
      4
下面是两个重复的子树：

      2
     /
    4
和

    4
因此，你需要以列表的形式返回上述重复子树的根结点。

*/

/*
思路：
如何判断我们应该用前序还是中序还是后序遍历的框架？

那么本文就针对这个问题，不贪多，给你掰开揉碎只讲一道题。

还是那句话，根据题意，思考一个二叉树节点需要做什么，到底用什么遍历顺序就清楚了。

那么，我们返回的List中就应该有两个TreeNode，值分别为 4 和 2（具体是哪个节点都无所谓）。

这题咋做呢？还是老套路，先思考，对于某一个节点，它应该做什么。

比如说，你站在图中这个节点 2 上：

如果你想知道以自己为根的子树是不是重复的，是否应该被加入结果列表中，你需要知道什么信息？

你需要知道以下两点：

1、以我为根的这棵二叉树（子树）长啥样？

2、以其他节点为根的子树都长啥样？

这就叫知己知彼嘛，我得知道自己长啥样，还得知道别人长啥样，然后才能知道有没有人跟我重复，对不对？

好，那我们一个一个来解决，先来思考，我如何才能知道以自己为根的二叉树长啥样？

其实看到这个问题，就可以判断本题要使用「后序遍历」框架来解决：
function traverse(root: TreeNode) {
  traverse(root.left);
  traverse(root.right);
  // 解法代码的位置
}

为什么？很简单呀，我要知道以自己为根的子树长啥样，是不是得先知道我的左右子树长啥样，再加上自己，就构成了整棵子树的样子？

如果你还绕不过来，我再来举个非常简单的例子：计算一棵二叉树有多少个节点。这个代码应该会写吧：
function count(root: TreeNode | null): number {
  if (root === null) return 0;

  const left = count(root.left);
  const right = count(root.right);

  // 加上自己，就是整棵二叉树的节点数
  return left + right + 1;
}

这不就是标准的后序遍历框架嘛，和我们本题在思路上没啥区别对吧。

现在，明确了要用后序遍历，那应该怎么描述一棵二叉树的模样呢？我们前文 序列化和反序列化二叉树 其实写过了，二叉树的前序/中序/后序遍历结果可以描述二叉树的结构。

所以，我们可以通过拼接字符串的方式把二叉树序列化，看下代码：
const traverse = (node: FindDuplicateSubtrees | null) => {
  // base case 节点为空用#表示
  if (node === null) return '#';

  // 左右节点分别序列化
  const leftStr: string = traverse(node.left);
  const rightStr: string = traverse(node.right);
  
  // 这里存储的是后序遍历的字符串序列，也可以存前序或中序
  const treeStr = `${leftStr},${rightStr},${node.val}`;

  return treeStr;
}

我们用非数字的特殊符#表示空指针，并且用字符,分隔每个二叉树节点值，这属于序列化二叉树的套路了，不多说。

注意我们subTree是按照左子树、右子树、根节点这样的顺序拼接字符串，也就是后序遍历顺序。你完全可以按照前序或者中序的顺序拼接字符串，因为这里只是为了描述一棵二叉树的样子，什么顺序不重要。

这样，我们第一个问题就解决了，对于每个节点，递归函数中的subTree变量就可以描述以该节点为根的二叉树。

现在我们解决第二个问题，我知道了自己长啥样，怎么知道别人长啥样？这样我才能知道有没有其他子树跟我重复对吧。

这很简单呀，我们借助一个外部数据结构，让每个节点把自己子树的序列化结果存进去，这样，对于每个节点，不就可以知道有没有其他节点的子树和自己重复了么？

可以使用Map,额外记录每棵子树的出现次数：如果出现的次数为两次（题目只要出现过重复的节点即可），则把树push到res中

*/

class FindDuplicateSubtrees {
	val: number
	left: FindDuplicateSubtrees | null
	right: FindDuplicateSubtrees | null
	constructor(val?: number, left?: FindDuplicateSubtrees, right?: FindDuplicateSubtrees) {
		this.val = (val === undefined ? 0 : val)
		this.left = (left === undefined ? null : left)
		this.right = (right === undefined ? null : right)
	}
}

function findDuplicateSubtrees(root: FindDuplicateSubtrees | null): Array<FindDuplicateSubtrees | null> {
  if (root === null) return [];

  const memo = new Map<string, number>();
  const res: Array<FindDuplicateSubtrees | null> = [];

  const traverse = (node: FindDuplicateSubtrees | null) => {
    // base case 节点为空用#表示
    if (node === null) return '#';

    // 左右节点分别序列化
    const leftStr: string = traverse(node.left);
    const rightStr: string = traverse(node.right);
    
    // 字符串比较容易对比是否相同，数组的话不好对比
    // 这里存储的是后序遍历的字符串序列，也可以存前序或中序
    const treeStr = `${leftStr},${rightStr},${node.val}`;

    // 出现过的树以字符串形式存到memo里面
    memo.set(treeStr, memo.get(treeStr) ? memo.get(treeStr) as number + 1 : 1 );
    if (memo.get(treeStr) === 2) res.push(node);

    return treeStr;
  }

  traverse(root);

  return res;
};

// const tree = new FindDuplicateSubtrees(1, new FindDuplicateSubtrees(2, new FindDuplicateSubtrees(4)), new FindDuplicateSubtrees(3, new FindDuplicateSubtrees(2, new FindDuplicateSubtrees(4)), new FindDuplicateSubtrees(4)));

// console.log(findDuplicateSubtrees(tree));
