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

type BFSTreeType<E> = {
  e: E;
  children?: BFSTreeType<E>[];
}

// 非递归广度优先搜索
function breadthFirstSearch<E>(tree: BFSTreeType<E>, target: E): BFSTreeType<E> | null {
  const queue = [tree];
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
function breadthFirstSearchWR<E>(tree: BFSTreeType<E>, target: E): BFSTreeType<E> | null {
  const queue = [tree];

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



const bfsTree = {
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
}

console.log(breadthFirstSearch(bfsTree, '2-2-2'));
