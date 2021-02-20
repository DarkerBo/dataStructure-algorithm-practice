// LeetCode第 116 题 填充每个节点的下一个右侧节点指针叉树
/*
给定一个 完美二叉树 ，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：

struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。

初始状态下，所有 next 指针都被设置为 NULL。

     1
   /   \
  2     3
 / \   / \
4   5 6   7

     A

-------------

     1 -- null
   /   \
  2 --- 3 -- null
 / \   / \
4---5-6---7-- null

     B

输入：root = [1,2,3,4,5,6,7]
输出：[1,#,2,3,#,4,5,6,7,#]
解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。序列化的输出按层序遍历排列，同一层节点由 next 指针连接，'#' 标志着每一层的结束。

*/

/*
思路：
题目的意思就是把二叉树的每一层节点都用next指针连接起来：
而且题目说了，输入是一棵「完美二叉树」，形象地说整棵二叉树是一个正三角形，除了最右侧的节点next指针会指向null，其他节点的右侧一定有相邻的节点。

这道题怎么做呢？把每一层的节点穿起来，是不是只要把每个节点的左右子节点都穿起来就行了？

我们可以模仿上一道题，写出如下代码：

function connectTree(root: ConnectTreeNode | null): ConnectTreeNode | null {
  if (root === null || root.left === null) return root;

  root.left.next = root.right;

  connectTree(root.left);
  connectTree(root.right);

  return root;
};

这样其实有很大问题，再看看上面的A和B：

节点 5 和节点 6 不属于同一个父节点，那么按照这段代码的逻辑，它俩就没办法被穿起来，这是不符合题意的。

回想刚才说的，二叉树的问题难点在于，如何把题目的要求细化成每个节点需要做的事情，但是如果只依赖一个节点的话，肯定是没办法连接「跨父节点」的两个相邻节点的。

那么，我们的做法就是增加函数参数，一个节点做不到，我们就给他安排两个节点，「将每一层二叉树节点连接起来」可以细化成「将每两个相邻节点都连接起来」：

// 主函数
function connectTree(root: ConnectTreeNode | null) {
  ...
}

// 辅助函数
function connectTreeTwoNode(node1: ConnectTreeNode | null, node2: ConnectTreeNode | null) {
  ...
}


这样，connectTwoNode函数不断递归，可以无死角覆盖整棵二叉树，将所有相邻节点都连接起来，也就避免了我们之前出现的问题，这道题就解决了。

但是这个写法有点小弊端，就是会跑重复的路径：
            1
        /        \
       2          3
      / \       /   \
     4   5     6      7
    /\  /\     /\     /\
   8 9 10 11  12 13  14 15

1. 第一层
(1) 节点2和3  连接 4 & 5  |  6 & 7  |  5 & 6   

2. 第二层
(1) 节点4和5  连接  8 & 9  |  10 & 11  |  9 & 10
(2) 节点6和7  连接  12 & 13  |  14 & 15  |  13 & 14
(3) 节点5和6  连接  10 & 11  |  12 & 13  |  11 & 12

这里会发现 10 & 11 和 12 & 13 重复了

---------------------------------------------------------------

比较好的方法是用层序遍历

*/


// Definition for Node.
class ConnectTreeNode {
  val: number
  left: ConnectTreeNode | null
  right: ConnectTreeNode | null
  next: ConnectTreeNode | null
  constructor(val?: number, left?: ConnectTreeNode, right?: ConnectTreeNode, next?: ConnectTreeNode) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
    this.next = (next === undefined ? null : next)
  }
}

// 【递归写法】 主函数(有弊端，会重复跑一些路径)
function connectTree(root: ConnectTreeNode | null): ConnectTreeNode | null {
  if (root === null) return root;

  connectTreeTwoNode(root.left, root.right);

  return root;
};

// 辅助函数 定义：输入两个节点，将它俩连接起来
function connectTreeTwoNode(node1: ConnectTreeNode | null, node2: ConnectTreeNode | null) {
  if (node1 === null || node2 === null) return;

  // 前序遍历位置
  // 将传入的两个节点连接
  node1.next = node2;

  // 连接相同父节点的两个子节点
  connectTreeTwoNode(node1.left, node1.right);
  connectTreeTwoNode(node2.left, node2.right);

  // 连接跨越父节点的两个子节点
  connectTreeTwoNode(node1.right, node2.left);
}


// 【层序遍历】
// function connectTreeByLevelTravers(root: ConnectTreeNode | null): ConnectTreeNode | null {
//   const queue: (ConnectTreeNode | null)[] = [root];
  
//   while (queue.length > 0) {
//     // 当前层的所有元素总数量
//     const queueLength = queue.length;
//     const queueFront = queue.shift() as ConnectTreeNode;

//     for (let i = 0; i < queueLength) {

//     }
     
    
//     if (queueFront.left) queue.push(queueFront.left);
//     if (queueFront.right) queue.push(queueFront.right);


//   }
  
// }