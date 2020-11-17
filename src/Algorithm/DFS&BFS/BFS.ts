// 广度优先搜索是一种对图进行搜索的算法。
// 假设我们一开始位于某个结点（即起点），此时并不知道图的整体结构，而我们的目的是从起点开始顺着边搜索，直到到达指定顶点（即终点）。在此过程中每走到一个顶点，就会判断一次它是否为终点。广度优先搜索会优先从离起点近的顶点开始搜索。
// 注意: 一般说图才说遍历，树之类的话是搜索，其实是一样的

/*
            1
      2     3       4
    5  6    8    10   11
    7       9         12
*/

/* 
  广度优先搜索的思路：
  1. 一开始队列为[1],然后弹出1,发现它有子节点2 3 4, 就把子节点放进队列里面,此时队列为[2, 3, 4] 遍历顺序 1 -> 2 -> 3 -> 4
  2. 弹出队列的第一个元素2,发现它有子节点,把它的子节点都放在了队列的最后,此时队列为[3, 4, 5, 6]
  ...
  到最后连最后一个子节点12都没有子节点了，则把12也弹出了，队列为空，搜索结束
  最终遍历顺序是 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 8 -> 10 -> 11 -> 7 -> 9 -> 12

*/

interface BFSTreeType<E> {
  e: E;
  children?: BFSTreeType<E>[];
}

// 非递归广度优先搜索
function breadthFirstSearch<E>(data: BFSTreeType<E>[], target: E): BFSTreeType<E> | null {
  const queue = [...data];
  while (queue.length > 0) {
    const queueFront = queue.shift() as BFSTreeType<E>;
    if (queueFront.e === target) return queueFront;

    if (queueFront.children && queueFront.children.length > 0) {
      queue.push(...queueFront.children);
    }
  }

  return null;
}

// 递归广度优先搜索
function breadthFirstSearchWR<E>(data: BFSTreeType<E>[], target: E): BFSTreeType<E> | null {
  const queue = [...data];

  const bfs = (queue: BFSTreeType<E>[], target: E): BFSTreeType<E> | null => {
    if (queue.length === 0) return null; 

    const queueFront = queue.shift() as BFSTreeType<E>;
    if (queueFront.e === target) return queueFront;

    if (queueFront.children && queueFront.children.length > 0) {
      queue.push(...queueFront.children);
    }

    return bfs(queue, target);
  }

  const result: BFSTreeType<E> | null = bfs(queue, target);

  return result;
}



const bfsTree = [{
  e: '0',
  children: [
    {
      e: '1',
      children: [
        {
          e: '1-1',
          children: [{ e: '1-1-1' }, { e: '1-1-2' }],
        },
        {
          e: '1-2',
          children: [{ e: '1-2-1' }, { e: '1-2-2' }],
        },
      ],
    },
    {
      e: '2',
      children: [
        {
          e: '2-1',
          children: [{ e: '2-1-1' }, { e: '2-1-2' }],
        },
        {
          e: '2-2',
          children: [{ e: '2-2-1' }, { e: '2-2-2' }],
        },
      ],
    },
    {
      e: '3',
      children: [
        {
          e: '3-1',
          children: [{ e: '3-1-1' }, { e: '3-1-2' }],
        },
        {
          e: '3-2',
          children: [{ e: '3-2-1' }, { e: '3-2-2' }],
        },
      ],
    },
  ]
}]

console.log(breadthFirstSearch(bfsTree, '2-2-2'));

// ---------------------------------------------------------------------------------

// 使用案例 LeetCode 第 111 题 获取一棵二叉树的最小高度
/*
给定一个二叉树，找出其最小深度。
最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
说明：叶子节点是指没有子节点的节点。
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// eg: 输入：root = [3,9,20,null,null,15,7] (结构如上面所示)  输出：2

// 题目给的结构
class TreeNode {
  private value: number;
  public left: TreeNode | null;
  public right: TreeNode | null;

  constructor (value?: number, left?: TreeNode, right?: TreeNode) {
    this.value = value ?? 0;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

// 这里需要自己创建一个树结构，用来保存每个节点的深度
class NewNode {
  public node: TreeNode;
  public depth: number;

  constructor(node: TreeNode, depth: number) {
    this.node = node;
    this.depth = depth;
  }
}

function minDepth(root: TreeNode | void): number {
  if (!root) return 0;

  const queue = [new NewNode(root, 1)];

  while (queue.length > 0) {
    const { node, depth } = queue.shift() as NewNode;
    if (!node.left && !node.right) return depth;

    if (node.left) queue.push(new NewNode(node.left, depth + 1));
    if (node.right) queue.push(new NewNode(node.right, depth + 1));
  }

  return 0;
}

/*
1、为什么 BFS 可以找到最短距离，DFS 不行吗？
首先，你看 BFS 的逻辑，depth 每增加一次，队列中的所有节点都向前迈一步，这保证了第一次到达终点的时候，走的步数是最少的。
DFS 不能找最短路径吗？其实也是可以的，但是时间复杂度相对高很多。你想啊，DFS 实际上是靠递归的堆栈记录走过的路径，你要找到最短路径，肯定得把二叉树中所有树杈都探索完才能对比出最短的路径有多长对不对？而 BFS 借助队列做到一次一步「齐头并进」，是可以在不遍历完整棵树的条件下找到最短距离的。
形象点说，DFS 是线，BFS 是面；DFS 是单打独斗，BFS 是集体行动。这个应该比较容易理解吧。
2、既然 BFS 那么好，为啥 DFS 还要存在？
BFS 可以找到最短距离，但是空间复杂度高，而 DFS 的空间复杂度较低。
还是拿刚才我们处理二叉树问题的例子，假设给你的这个二叉树是满二叉树，节点数为 N，对于 DFS 算法来说，空间复杂度无非就是递归堆栈，最坏情况下顶多就是树的高度，也就是 O(logN)。
但是你想想 BFS 算法，队列中每次都会储存着二叉树一层的节点，这样的话最坏情况下空间复杂度应该是树的最底层节点的数量，也就是 N/2，用 Big O 表示的话也就是 O(N)。
由此观之，BFS 还是有代价的，一般来说在找最短路径的时候使用 BFS，其他时候还是 DFS 使用得多一些（主要是递归代码好写）。
好了，现在你对 BFS 了解得足够多了，下面来一道难一点的题目，深化一下框架的理解吧。
 */


// ---------------------------------------------------------------------------------

// 使用案例: LeetCode 第752题 打开转盘锁问题
/*
你有一个带有四个圆形拨轮的转盘锁。每个拨轮都有10个数字： '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' 。每个拨轮可以自由旋转：例如把 '9' 变为  '0'，'0' 变为 '9' 。每次旋转都只能旋转一个拨轮的一位数字。

锁的初始数字为 '0000' ，一个代表四个拨轮的数字的字符串。

列表 deadends 包含了一组死亡数字，一旦拨轮的数字和列表里的任何一个元素相同，这个锁将会被永久锁定，无法再被旋转。

字符串 target 代表可以解锁的数字，你需要给出最小的旋转次数，如果无论如何不能解锁，返回 -1。
*/


/*
思路：一开始是0000,转一次只有1000 9000 0100 0900... 8种可能
然后根据这8种可能再转1次就有8 * 8 = 64 种可能，但这些可能是有重复的(如1000转回0000),需要过滤一下
然后又根据过滤后的64 - n种可能再转一次...以此类推查找最短路径
                  0000
    1000  9000 0100 0900 0010 0090 0001 0009
2000 0000(重复)...

*/

/**
 * 向上或向下拨动密码
 * @param type 值为up或down，表示向上或向下拨动密码，向上拨动表示+1 向下拨动表示-1
 * @param password 需要拨动的密码
 * @param index 密码中需要拨动的索引 
 */
function toggle(type: 'up' | 'down', password: string, index: number): string {
  const pwdArr: string[] = password.split('');
  if (type === 'up' && pwdArr[index] === '9') {
    pwdArr[index] = '0';
  } else if (type === 'down' && pwdArr[index] === '0') {
    pwdArr[index] = '9';
  } else {
    const plusNum = type === 'up' ? 1 : -1;
    pwdArr[index] = (Number(pwdArr[index]) + plusNum).toString();
  }

  return pwdArr.join('');
}

/**
 * 打开转盘锁
 * @param deadends 死亡之组
 * @param target 目标密码
 */
function turnOnTurnTable(deadends: string[], target: string): number {

  // 记录已经访问过的密码，防止走回头路，如0000转到1000，1000又转回0000 无限循环
  const visitArr: string[] = [];
  // 需要操作密码的步数，其实就是树的第几层
  let depth: number = 0;
  // 初始队列
  const queue: string[] = ['0000'];

  while (queue.length > 0) {
    // 循环队列而不是使用queue.shift()是为了保证当前循环的值是同一层级的(保证depth的准确值)
    for (let i = 0; i < queue.length; i++) {
      const queueFront = queue.shift() as string;
      if (queueFront === target) return depth;
      if (deadends.includes(queueFront)) continue;

      // 循环拨动第一到第四个密码
      for (let j = 0; j < 4; j++) {
        const upPwd = toggle('up', queueFront, j);
        const downPwd = toggle('down', queueFront, j);

        if (!visitArr.includes(upPwd)) {
          visitArr.push(upPwd);
          queue.push(upPwd);
        }

        if (!visitArr.includes(downPwd)) {
          visitArr.push(downPwd);
          queue.push(downPwd);
        }
      }
    }

    depth++;
  }
  return -1
}

console.log(turnOnTurnTable(["0201","0101","0102","1212","2002"], '0202'));
