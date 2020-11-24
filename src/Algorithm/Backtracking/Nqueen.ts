// N皇后问题 LeetCode 51
/* 
这个问题很经典了，简单解释一下：给你一个 N×N 的棋盘，让你放置 N 个皇后，使得它们不能互相攻击。
PS：皇后可以攻击同一行、同一列、左上左下右上右下四个方向的任意单位。
这个问题本质上跟全排列问题差不多，决策树的每一层表示棋盘上的每一行；每个节点可以做出的选择是，在该行的任意一列放置一个皇后。
*/

export function nqueen(num: number): Array<('.'|'Q')[]>[] {
  // 创建一个num * num 的棋盘, .代表空的, 'Q'代表皇后
  const board: Array<('.'|'Q')[]> = Array.from(new Array(num), () => Array.from(new Array(num), () => '.'));
  const res: Array<('.'|'Q')[]>[] = [];
  _nqueen(board, 0, res);
  return res;
}

// N皇后辅助递归函数
function _nqueen(board: Array<('.'|'Q')[]>, row: number, res: Array<('.'|'Q')[]>[]): void {
  if (row === board.length) {
    // 因为是二阶数组，因此需要使用深拷贝
    res.push(JSON.parse(JSON.stringify(board)));
    return;
  }

  // 从第1行(row = 0)开始，判断是否合法，合法则将Q填入第一个空(col = 0)，然后继续下一行(row + 1)，直到row为最后一行。
  // 然后回来最开始的循环row = 0，然后判断是否合法，再填入第二个空(col = 1)，然后继续下一行，以此类推
  // 通过是否合法的判断来"剪枝"，填入col就是做选择
  for (let col = 0; col < board.length; col++) {
    if (!isValid(board, row, col)) continue;

    board[row][col] = 'Q';
    _nqueen(board, row + 1, res);
    board[row][col] = '.';
    
    // if (res.length === 1) return; // 只需要一种结果的时候加上这个判断
  }
}

// 判断是否合法: 是否可以在 board[row][col] 放置皇后？
function isValid(board: Array<('.'|'Q')[]>, row: number, col: number): boolean {

  // 检查正上方列是否有皇后互相冲突
  for (let i = 0; i < row; i++) {
    if (board[i][col] === 'Q') return false;
  }

  // 检查左上方是否有皇后互相冲突
  for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j] === 'Q') return false;
  }

  // 检查右上方是否有皇后互相冲突
  for (let i = row - 1, j = col + 1; i >= 0 && j < board.length; i--, j++) {
    if (board[i][j] === 'Q') return false;
  }

  return true;
}

console.log(nqueen(4));
