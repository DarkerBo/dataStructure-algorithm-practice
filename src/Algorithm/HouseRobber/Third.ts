// LeetCode第 213 题， 打家劫舍 II 房子是个二叉树
/*
在上次打劫完一条街道之后和一圈房屋后，小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为“根”。 除了“根”之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 如果两个直接相连的房子在同一天晚上被打劫，房屋将自动报警。

计算在不触动警报的情况下，小偷一晚能够盗取的最高金额。

示例 1:
输入: [3,2,3,null,3,null,1]

     3
    / \
   2   3
    \   \ 
     3   1

输出: 7 
解释: 小偷一晚能够盗取的最高金额 = 3 + 3 + 1 = 7.

示例 2:
输入: [3,4,5,1,3,null,1]

     3
    / \
   4   5
  / \   \ 
 1   3   1

输出: 9
解释: 小偷一晚能够盗取的最高金额 = 4 + 5 = 9.

*/

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val === undefined ? 0 : val)
 *         this.left = (left === undefined ? null : left)
 *         this.right = (right === undefined ? null : right)
 *     }
 * }
 */

class RobTreeNode {
  val: number;
  left: RobTreeNode | null;
  right: RobTreeNode | null;
  constructor(val?: number, left?: RobTreeNode | null, right?: RobTreeNode | null) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
  }
}

// 备忘录写法
function robThirdByMemo(root: RobTreeNode | null): number {
  const memo = new Map();

  const dp = (node: RobTreeNode | null) => {
    if (!node) return 0;
    if (memo.has(node)) return memo.get(node);
    // 抢
    let do_it: number = node.val 
          + (node.left === null ? 0 : dp(node.left.left) + dp(node.left.right)) 
          + (node.right === null ? 0 : dp(node.right.left) + dp(node.right.right));

    // 不抢
    let not_do_it: number = (node.left === null ? 0 : dp(node.left)) + (node.right === null ? 0 : dp(node.right));

    const res = Math.max(do_it, not_do_it);
    memo.set(node, res);

    return res;
  }

  return dp(root); 
}


// 状态机变量写法
function robThirdByVariable(root: RobTreeNode | null): number {

  const dp = (node: RobTreeNode | null) => {
    if (!node) return [0, 0];
    const left = dp(node.left);
    const right = dp(node.right);

    // 抢
    const do_it = node.val + Math.max(left[1], right[1]);
    
    // 不抢
    const no_do_it = Math.max();
    return [1, 1];
    
  }

  return 1;
}
