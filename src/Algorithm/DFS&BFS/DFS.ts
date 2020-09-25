// 深度优先搜索作为广度优先搜索的好基友，同样也是对图进行搜索的一种算法。
// 善用这两种算法，可以解决我们业务中遇到的「树形结构遍历搜索」问题
// 深度优先搜索与广度优先搜索一样，都是从图的起点开始搜索直到到达目标结点，深度优先搜索会沿着一条路径不断往下搜索直到不能再继续为止，然后再折返，开始搜索下一条候补路径。
// 注意: 一般说图才说遍历，树之类的话是搜索，其实是一样的

/*
            1
      2     3       4
    5  6    8    10   11
    7       9         12
*/

/* 
  深度优先搜索的思路：
  1. 遍历顺序 1 -> 2 -> 5 -> 7 没找到，同时7是终点，在栈中弹出7，5也没有其他未标记的子节点，弹出5，此时栈为[1, 2]
  2. 遍历顺序 1 -> 2 -> 5 -> 7 -> 6，6和2都没有未标记的子节点，弹出2和6，此时栈为[1]
  ...
  到最后连顶点1都没有未标记的子节点了，则把1也弹出了，栈为空，搜索结束
  最终遍历顺序是 1 -> 2 -> 5 -> 7 -> 6 -> 3 -> 8 -> 9 -> 4 -> 10 -> 11 -> 12

*/

type DFSTreeType<E> = {
  e: E;
  children?: DFSTreeType<E>[];
}

// 非递归深度优先搜索
function depthFirstSearch<E>(tree: DFSTreeType<E>, target: E): DFSTreeType<E> | null {
  const stack = [tree];
  while (stack.length > 0) {
    const stackTop = stack.pop() as DFSTreeType<E>;
    if (stackTop.e === target) return stackTop;

    if (stackTop.children && stackTop.children.length > 0) {
      stack.push(...stackTop.children.reverse());
    }
  }

  return null;
}

// 递归深度优先搜索
function depthFirstSearchWR<E>(tree: DFSTreeType<E>, target: E): DFSTreeType<E> | null {
  const stack = [tree];

  const dfs = (stack: DFSTreeType<E>[], target: E): DFSTreeType<E> | null => {
    if (stack.length === 0) return null;

    const stackTop = stack.pop() as DFSTreeType<E>;
    if (stackTop.e === target) return stackTop;

    if (stackTop.children && stackTop.children.length > 0) {
      stack.push(...stackTop.children.reverse());
    }

    return dfs(stack, target);
  }

  const result: DFSTreeType<E> | null = dfs(stack, target);

  return result;
}



const dfsTree = {
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

console.log(depthFirstSearchWR(dfsTree, '2-2-2'));
