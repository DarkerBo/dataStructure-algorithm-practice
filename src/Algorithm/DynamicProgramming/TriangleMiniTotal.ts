// LeetCode 第120题. 三角形最小路径和
/*
给定一个三角形 triangle ，找出自顶向下的最小路径和。

每一步只能移动到下一行中相邻的结点上。相邻的结点 在这里指的是 下标 与 上一层结点下标 相同或者等于 上一层结点下标 + 1 的两个结点。也就是说，如果正位于当前行的下标 i ，那么下一步可以移动到下一行的下标 i 或 i + 1 。

 

示例 1：
输入：triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
输出：11
解释：如下面简图所示：
   2
  3 4
 6 5 7
4 1 8 3
自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。

示例 2：
输入：triangle = [[-10]]
输出：-10

*/

/*
思路：
尝试把大问题拆分为子问题，它们的区别在于问题的规模。
规模在这里是：层高。
base case 是当矩阵行高只有 1 时，它的最优路径是显而易见的。
把行设为i, 列设为j

   2
  3 4
 6 5 7
4 1 8 3

(1)自上而下
i = 0, 从2开始走，第一层就只有一个2，dp[0][0] = 2, 没什么可说。
i = 1, 第二层3来自2，4也来自2,因此dp[1][0] = 2 + 3 = 5, dp[1][1] = 2 + 4 = 6
i = 2, 第三层6只能来自3，5可以3或4，7就只能来自4
我们可以发现 dp 的动态规划表达式出来了：
dp[i][j] = Math.min(dp[i-1][j], dp[i-1][j-1]) + arr[i][j]

但是这里要注意判断的条件有点多，比如每一列最左侧的元素即索引为0时，没有j - 1的情况，列最右侧时，没有j的情况

(2)自下而上（这种方式比较简单）
i = length - 1, 4 1 8 3 没得走，没什么可说
i = length - 2, 6只能4和1过来，5只能1和8，7只能8和3
我们可以发现 dp 的动态规划表达式出来了：
dp[i][j] = Math.min(dp[i+1][j], dp[i+1][j+1]) + arr[i][j]

dp[0][0]就是答案

*/



// 备忘录写法
function triangleMiniTotalByMemo(triangle: number[][]): number {
	const memo = new Map();
	const dp = (row: number, column: number) => {
		if (row === triangle.length - 1) {
			return triangle[row][column];
		}

		if (memo.has(`${row}-${column}`)) return memo.get(`${row}-${column}`);

		const res: number = Math.min(dp(row + 1, column), dp(row + 1, column + 1)) + triangle[row][column];
		memo.set(`${row}-${column}`, res);

		return res;
	}

	return dp(0, 0);
};

console.log(triangleMiniTotalByMemo([[2],[3,4],[6,5,7],[4,1,8,3]]));
console.log(triangleMiniTotalByMemo([[-1], [-2, -3]]));
console.log(triangleMiniTotalByMemo([[-1],[2,3],[1,-1,-3]]));


// DP写法
function triangleMiniTotalByDP(triangle: number[][]): number {
	const n = triangle.length;
	const dp = Array.from(new Array(n), () => new Array(n));

	for (let row = n - 1; row >= 0; row--) {
		for (let column = 0; column <= triangle[row].length; column++) {
			// base case
			if (row === n - 1) {
				dp[row][column] = triangle[row][column];
			} else {
				// 该节点的路径和最小值为它下一行两个相邻节点路径和的最小值 + 当前节点的值
				dp[row][column] = Math.min(dp[row + 1][column], dp[row + 1][column + 1]) + triangle[row][column];
			}
		}
	}

	return dp[0][0];
}


console.log(triangleMiniTotalByDP([[2],[3,4],[6,5,7],[4,1,8,3]]));
console.log(triangleMiniTotalByDP([[-1], [-2, -3]]));
console.log(triangleMiniTotalByDP([[-1],[2,3],[1,-1,-3]]));
