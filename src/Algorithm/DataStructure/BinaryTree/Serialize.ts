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

*/

class SerializeNode {
  val: number
  left: SerializeNode | null
  right: SerializeNode | null
  next: SerializeNode | null
  constructor(val?: number, left?: SerializeNode, right?: SerializeNode, next?: SerializeNode) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
    this.next = (next === undefined ? null : next)
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

  const traverse = (arr: string[]): SerializeNode | null => {
    if (arr.length === 0) return null;

    const value = arr.shift();
    if (value === '@') return null;

    const node = new SerializeNode(Number(value));
    node.left = traverse(arr);
    node.right = traverse(arr);

    return node;
  }

  return traverse(dataArr);
}

/* -----------------------  中序遍历  ---------------------------- */
// 序列化
function serializeByMid(root: SerializeNode | null): string {
  if (root === null) return '@';
  return `${serializeByMid(root.left)},${root.val},${serializeByMid(root.right)}`;
}

// 反序列化
// function deserializeByMid(data: string): SerializeNode | null {
//   if (data === '@') return null;
//   const dataArr = data.split(',');

//   const traverse = (arr: string[]) => {
//     if (arr.length === 0) return null;

//     const midIndex = Math.floor(arr.length / 2);
    

//     const root = new SerializeNode(Number(arr[midIndex]));
    
//   }

// }




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
console.log(serializeByMid(tree)); // @,2,@,1,@,4,@,3,@,5,@
// console.log(deserializeByLevel('1,2,3,@,@,4,5,@,@,@,@'));