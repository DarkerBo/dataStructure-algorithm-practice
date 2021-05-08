// LeetCode第 297 题 二叉树的序列化与反序列化
/*
序列化是将一个数据结构或者对象转换为连续的比特位的操作，进而可以将转换后的数据存储在一个文件或者内存中，同时也可以通过网络传输到另一个计算机环境，采取相反方式重构得到原数据。

请设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 / 反序列化算法执行逻辑，你只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。

提示: 输入输出格式与 LeetCode 目前使用的方式一致，详情请参阅 LeetCode 序列化二叉树的格式。你并非必须采取这种方式，你也可以采用其他的方法解决这个问题。

示例 1：
    1
   / \
  2   3
     / \
    4   5

输入：root = [1,2,3,null,null,4,5]
输出：[1,2,3,null,null,4,5]

示例 2：
输入：root = []
输出：[]

示例 3：
输入：root = [1]
输出：[1]

示例 4：
输入：root = [1,2]
输出：[1,2]
*/

/*
一、前序遍历解法：
前序遍历框架如下：
function traverse(root: TreeNode) {
  // 前序遍历
  traverse(root.left)
  traverse(root.right)
}
调用 traverse 函数之后，你是否可以立即想出这个 res 列表中元素的顺序是怎样的？比如如下二叉树（@ 代表空指针 null），可以直观看出前序遍历做的事情：
    1
   / \
  2   3
     / \
    4   5

        root left----left  right-----------------right
preorder:  1   2   @   @   3   4   @   @   5   @   @    (前序遍历)

序列化的字符串就是：1,2,@,@,3,4,@,@,5,@,@

这就是将二叉树「打平」到了一个列表中，其中 @ 代表 null。

序列化函数比较简单，使用递归函数分别递归左右子树，用字符串串起来就ok

现在，思考一下如何写 deserialize 函数，将字符串反过来构造二叉树。

首先我们可以把字符串转化成列表：

const data = "1,2,@,@,3,4,@,@,5,@,@";
const nodes = data.split(",");
这样，nodes 列表就是二叉树的前序遍历结果，问题转化为：如何通过二叉树的前序遍历结果还原一棵二叉树？

PS：一般语境下，单单前序遍历结果是不能还原二叉树结构的，因为缺少空指针的信息，至少要得到前、中、后序遍历中的两种才能还原二叉树。但是这里的 node 列表包含空指针的信息，所以只使用 node 列表就可以还原二叉树。

根据我们刚才的分析，nodes 列表就是一棵打平的二叉树：
        root left----left  right-----------------right
preorder:  1   2   @   @   3   4   @   @   5   @   @    (前序遍历)

那么，反序列化过程也是一样，先确定根节点 root，然后遵循前序遍历的规则，递归生成左右子树即可.

我们发现，根据树的递归性质，nodes 列表的第一个元素就是一棵树的根节点，所以只要将列表的第一个元素取出作为根节点，剩下的交给递归函数去解决即可。


二、中序遍历
先说结论，中序遍历的方式行不通，因为无法实现反序列化方法 deserialize。

序列化方法 serialize 依然容易，只要把字符串的拼接操作放到中序遍历的位置就行了：

但是，我们刚才说了，要想实现反序列方法，首先要构造 root 节点。前序遍历得到的 nodes 列表中，第一个元素是 root 节点的值；后序遍历得到的 nodes 列表中，最后一个元素是 root 节点的值。

你看上面这段中序遍历的代码，root 的值被夹在两棵子树的中间，也就是在 nodes 列表的中间，我们不知道确切的索引位置，所以无法找到 root 节点，也就无法进行反序列化。


三、后序遍历
明白了前序遍历的解法，后序遍历就比较容易理解了，我们首先实现 serialize 序列化方法，只需要稍微修改将root放在字符串的最后，
前面分别递归左右子树即可

我们把对 StringBuilder 的拼接操作放到了后续遍历的位置，后序遍历导致结果的顺序发生变化：

    1
   / \
  2   3
     / \
    4   5

          left----left  right----------------right  root
postorder:  @   @   2   @   @   4   @   @   5   3   1    (后序遍历)

序列化的字符串就是：@,@,2,@,@,4,@,@,5,3,1

关键的难点在于，如何实现后序遍历的 deserialize 方法呢？是不是也简单地将关键代码放到后序遍历的位置就行了呢？
不对，如果是直接套用后序遍历框架：
function traverse(root: TreeNode) {
  traverse(root.left)
  traverse(root.right)

  const root = new TreeNode(lastValue);
}
没这么简单，显然上述代码是错误的，变量都没声明呢，就开始用了？生搬硬套肯定是行不通的，回想刚才我们前序遍历方法中的 deserialize 方法，第一件事情在做什么？

deserialize 方法首先寻找 root 节点的值，然后递归计算左右子节点。那么我们这里也应该顺着这个基本思路走，后续遍历中，root 节点的值能不能找到？再看一眼刚才的图：
          left----left  right----------------right  root
postorder:  @   @   2   @   @   4   @   @   5   3   1    (后序遍历)

可见，root 的值是列表的最后一个元素。我们应该从后往前取出列表元素，先用最后一个元素构造 root，然后递归调用生成 root 的左右子树。注意，根据上图，从后往前在 nodes 列表中取元素，一定要先构造 root.right 子树，后构造 root.left 子树。


四、层序遍历
层序遍历框架：
function traverse(root: TreeNode) {
  const queue = [root];

  // 如果需要遍历同一层级的话（这个也能降低时间复杂度）
  while (queue.length) {
    const len = queue.length;

    for (let i = 0; i < len; i++) {
      const node = queue.shift();
      ...
      // 这里序列化的话也要记录空节点，
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
}

    1
   / \
  2   3
     / \
    4   5
          
sequence:  1   2   3   @   @   4   5   @   @   @   @    (层序遍历)

可以看到，每一个非空节点都会对应两个子节点，那么反序列化的思路也是用队列进行层级遍历，同时用索引 i 记录对应子节点的位置：

只不过，标准的层级遍历在操作二叉树节点 TreeNode，而我们的函数在操作 nodes[i]，这也恰恰是反序列化的目的嘛。

*/

class SerializeNode {
  val: number
  left: SerializeNode | null
  right: SerializeNode | null
  constructor(val?: number, left?: SerializeNode, right?: SerializeNode) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}

/* -----------------------  前序遍历  ---------------------------- */
// 序列化
function serializeByFront(root: SerializeNode | null): string {
  if (root === null) return '@';
  return `${root.val},${serializeByFront(root.left)},${serializeByFront(root.right)}`;
}

// 反序列化
function deserializeByFront(data: string): SerializeNode | null {
  const dataArr = data.split(',');

  const traverse = (): SerializeNode | null => {

    const value = dataArr.shift();
    if (value === '@') return null;

    const node = new SerializeNode(Number(value));
    node.left = traverse();
    node.right = traverse();

    return node;
  }

  return traverse();
}

/* -----------------------  中序遍历  ---------------------------- */
// 序列化
function serializeByMid(root: SerializeNode | null): string {
  if (root === null) return '@';
  return `${serializeByMid(root.left)},${root.val},${serializeByMid(root.right)}`;
}

// 中序遍历无法反序列化
/*
要想实现反序列方法，首先要构造 root 节点。前序遍历得到的 nodes 列表中，第一个元素是 root 节点的值；后序遍历得到的 nodes 列表中，最后一个元素是 root 节点的值。

你看上面这段中序遍历的代码，root 的值被夹在两棵子树的中间，也就是在 nodes 列表的中间，我们不知道确切的索引位置，所以无法找到 root 节点，也就无法进行反序列化。
*/


/* -----------------------  后序遍历  ---------------------------- */
// 序列化
function serializeByBack(root: SerializeNode | null): string {
  if (root === null) return '@';
  return `${serializeByBack(root.left)},${serializeByBack(root.right)},${root.val}`;
}

// 反序列化
function deserializeByBack(data: string): SerializeNode | null {
  if (data === '@') return null;

  const dataArr = data.split(',');

  const traverse = () => {
    const value = dataArr.pop();
    if (value === '@') return null;

    const root = new SerializeNode(Number(value));
    root.right = traverse();
    root.left = traverse();

    return root;
  }

  return traverse();
}

/* -----------------------  层序遍历  ---------------------------- */
// 序列化
function serializeByLevel(root: SerializeNode | null): string {
  const queue: Array<SerializeNode | null> = [root];
  // 存储节点的数组
  const dataArr = [];

  while (queue.length) {
    const len = queue.length;

    for (let i = 0; i < len; i++) {
      const queueItem = queue.shift() as SerializeNode;
      if (queueItem === null) {
        dataArr.push('@');
        continue;
      }
      dataArr.push(queueItem.val);
      
      queue.push(queueItem.left);
      queue.push(queueItem.right);
    }
  }

  return dataArr.join(',');
};

// 反序列化
function deserializeByLevel(data: string): SerializeNode | null {
  if (data === '@') return null;

  const dataArr = data.split(',');
  
  // 这里要声明head的目的是为了最后返回它就是返回整棵树
  const root = new SerializeNode(Number(data[0]));
  const queue = [root];

  // 注意：这里for循环不需要i++
  for (let i = 1; i < dataArr.length;) {
    // 在队列中保存的都是父组件
    const node = queue.shift() as SerializeNode;

    const leftItem = dataArr[i++];
    if (leftItem !== '@') {
      node.left = new SerializeNode(Number(leftItem));
      queue.push(node.left);
    } else {
      node.left = null;
    }

    const rightItem = dataArr[i++];
    if (rightItem !== '@') {
      node.right = new SerializeNode(Number(rightItem));
      queue.push(node.right);
    } else {
      node.right = null;
    }
  }

  return root;
};


const tree = new SerializeNode(1, new SerializeNode(2), new SerializeNode(3, new SerializeNode(4), new SerializeNode(5)));

// console.log(serializeByLevel(tree));
// console.log(serializeByFront(tree));
// console.log(serializeByBack(tree));
// console.log(deserializeByBack('@,@,2,@,@,4,@,@,5,3,1'));