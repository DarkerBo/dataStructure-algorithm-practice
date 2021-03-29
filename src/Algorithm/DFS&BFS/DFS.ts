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

interface DFSTreeType<E> {
  e: E;
  children?: DFSTreeType<E>[];
}

// 非递归深度优先搜索
function depthFirstSearch<E>(data: DFSTreeType<E>[], target: E): DFSTreeType<E> | null {
  const stack = [...data];
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
function depthFirstSearchWR<E>(data: DFSTreeType<E>[], target: E): DFSTreeType<E> | null {
  const stack = [...data];

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



const dfsTree = [{
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

console.log(depthFirstSearchWR(dfsTree, '2-2-2'));

// ---------------------------------------------------------------------------------

// 使用案例 给定一个子子节点的e，获取其向上所有父节点的e
// 思路1：给每个节点一个parentE(根节点为null)，通过parentE一直往上找，直到为null

interface DFSParentTreeType<E> {
  e: E;
  children?: DFSParentTreeType<E>[];
  parentKey?: E | null;
}

// 深度遍历注入parentKey
function setParentKey<E>(data: DFSTreeType<E>[]): DFSParentTreeType<E>[] {

  const stack = [...data];
  while (stack.length > 0) {
    const stackTop = stack.pop() as DFSParentTreeType<E>;
    // 将根节点parentKey设置为null
    if (!stackTop.parentKey) stackTop.parentKey = null;

    if (stackTop.children && stackTop.children.length > 0) {
      for (let i = stackTop.children.length - 1; i >= 0; i--) {
        stackTop.children[i].parentKey = stackTop.e;
        stack.push(stackTop.children[i]);
      }
    }
  }

  return data;
}

// 将多维数组拉伸至一维数组
function flatten<E>(data: DFSTreeType<E>[]): DFSParentTreeType<E>[] {
  const parentKeyData = setParentKey(data);
  return parentKeyData.reduce(
    (prev: DFSTreeType<E>[], cur: DFSTreeType<E>) =>
      cur.children && cur.children.length > 0 
      ? [...prev, cur,  ...flatten(cur.children)]
      : [...prev, cur],
    [],
  )
}

// 根据所传的值找出该节点和其所有的父节点
function getParentNodes<E>(data: DFSTreeType<E>[], target: E): DFSParentTreeType<E>[] {
  const flatTreeData = flatten(data);
  const targetNode = flatTreeData.find(node => node.e === target);

  if (!targetNode) return [];

  const parentNodes: DFSParentTreeType<E>[] = [targetNode];
  let parentKey = targetNode.parentKey;

  while (parentKey) {
    const parentNode = flatTreeData.find(node => node.e === parentKey) as DFSParentTreeType<E>;
    parentNodes.unshift(parentNode);
    parentKey = parentNode.parentKey;
  }

  return parentNodes;
}

console.log(getParentNodes(dfsTree, '2-2-2'));


// 思路2：暴力循环，使用一个栈stack装载正在遍历的父节点和子节点，如果符合则返回，不符合弹出子节点，继续找下一个

function getParentNodesByLoop<E>(data: DFSTreeType<E>[], target: E): DFSTreeType<E>[] {
  const stack: DFSTreeType<E>[] = [];

  const findNode = (treeData: DFSTreeType<E>[], target: E): DFSTreeType<E>[] => {
    for (const item of treeData) {
      stack.push(item);
      if (item.e === target) return stack;

      if (item.children && item.children.length > 0) {
        const childStack = findNode(item.children, target);
        if (childStack.length !== 0) return stack;
      }
      stack.pop();
    }
    return [];
  }

  return findNode(data, target);
}

console.log(getParentNodesByLoop(dfsTree, '2-2-2'));


// 思路3：回溯法
function getParentNodesByBackTrack<E>(data: DFSTreeType<E>[], target: E): DFSTreeType<E>[] {
  const res: DFSTreeType<E>[] = [];
  const track: DFSTreeType<E>[] = [];
  _getParentNodesByBackTrack(data, target, track, res);

  return res;
}

// 回溯法辅助函数
function _getParentNodesByBackTrack<E>(data: DFSTreeType<E>[], target: E, track: DFSTreeType<E>[], res: DFSTreeType<E>[]) {
  // 如果没有children节点，仍传递，在这里return掉
  // 或者已经有一条路径了就return
  if (!data || res.length > 0) return; 

  // 找到对应的节点，就把路径返回
  if (track[track.length - 1]?.e === target) {
    res.push(...Array.from(track));
    return;
  }

  for (let i = 0; i < data.length; i++) {
    track.push(data[i]);
    _getParentNodesByBackTrack(data[i].children || [], target, track, res);
    track.pop();
  }
}

console.log(getParentNodesByBackTrack(dfsTree, '2-2-2'));
