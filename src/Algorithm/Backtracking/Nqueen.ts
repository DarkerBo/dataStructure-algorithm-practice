// N皇后问题
/* 
这个问题很经典了，简单解释一下：给你一个 N×N 的棋盘，让你放置 N 个皇后，使得它们不能互相攻击。
PS：皇后可以攻击同一行、同一列、左上左下右上右下四个方向的任意单位。
这个问题本质上跟全排列问题差不多，决策树的每一层表示棋盘上的每一行；每个节点可以做出的选择是，在该行的任意一列放置一个皇后。
*/

export function nqueen(num: number) {
  // 创建一个num * num 的棋盘, .代表空的, 'Q'代表皇后
  const res: Array<('.'|'Q')[]> = Array.from(new Array(num), () => Array.from(new Array(num), () => '.'));
  _nqueen(res, 0, num,);
  return res;
}

// N皇后辅助函数
function _nqueen(res: Array<('.'|'Q')[]>, from: number, to: number) {
  if (from === to) {
    
  }
}

