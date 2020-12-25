// 凑零钱问题
// 先看下题目：给你 k 种面值的硬币，面值分别为 c1, c2 ... ck，每种硬币的数量无限，再给一个总金额 amount，问你最少需要几枚硬币凑出这个金额，如果不可能凑出，算法返回 -1 。

/*

1、确定 base case，这个很简单，显然目标金额 amount 为 0 时算法返回 0，因为不需要任何硬币就已经凑出目标金额了。
2、确定「状态」，也就是原问题和子问题中会变化的变量。由于硬币数量无限，硬币的面额也是题目给定的，只有目标金额会不断地向 base case 靠近，所以唯一的「状态」就是目标金额 amount。
3、确定「选择」，也就是导致「状态」产生变化的行为。目标金额为什么变化呢，因为你在选择硬币，你每选择一枚硬币，就相当于减少了目标金额。所以说所有硬币的面值，就是你的「选择」。
4、明确 dp 函数/数组的定义。我们这里讲的是自顶向下的解法，所以会有一个递归的 dp 函数，一般来说函数的参数就是状态转移中会变化的量，也就是上面说到的「状态」；函数的返回值就是题目要求我们计算的量。就本题来说，状态只有一个，即「目标金额」，题目要求我们计算凑出目标金额所需的最少硬币数量。所以我们可以这样定义 dp 函数：
dp(n) 的定义：输入一个目标金额 n，返回凑出目标金额 n 的最少硬币数量。
搞清楚上面这几个关键点，解法的伪码就可以写出来了：

// 伪码框架
function coinChange(coins: number[], amount: number): number {
  // 定义：要凑出金额 n，至少要 dp(n) 个硬币
  const dp = (num: number): number => {
    // 做选择，选择需要硬币最少的那个结果
    for (let i = 0; i < coins.length; i++) {
      res = Math.min(res, dp(num - coins[i]));
    }
    return res;
  }

  // 题目要求的最终结果是 dp(amount)
  return dp(amount);
}
*/

// 备忘录写法(自上而下)
// 画出递归树的时候会发现有重叠子问题，需要用备忘录之类的降低复杂度
export function coinMemo(coins: number[], amount: number): number {
  // 创建备忘录
  const memo = new Map();

  // 定义：要凑出金额 n，至少要 dp(n) 个硬币, 【确定状态】
  const dp = (num: number): number => {
    if (memo.has(num)) return memo.get(num);

    // base 基本值判断
    if (num === 0) return 0;
    if (num < 0) return -1;

    // 为了判断num - coin有无选择（num - coin >= 0）
    // 若无选择则通过isFinite判断是否返回-1
    let res = Infinity;

    // 【确定选择】
    for (const coin of coins) {
      const superAmount = dp(num - coin);
      if (superAmount === -1) continue;
      
      res = Math.min(res, 1 + superAmount);
    }

    if (!isFinite(res)) memo.set(num, -1);
    else memo.set(num, res);

    return memo.get(num);
  }

  return dp(amount);
}

console.log(coinMemo([1, 2, 5], 11));


// dp数组的迭代写法(自下而上)
export function coinDp(coins: number[], amount: number): number {
  // 数组大小为 amount + 1，初始值也为 amount + 1
  // dp 数组的定义：当目标金额为 i 时，至少需要 dp[i] 枚硬币凑出。
  const dp = new Array(amount + 1).fill(amount + 1);
  // base case
  dp[0] = 0;
  // 外层 for 循环在遍历所有状态的所有取值
  for (let i = 0; i < dp.length; i++) {
    // 内层 for 循环在求所有选择的最小值
    for (const coin of coins) {
      // i - coin >= 0说明有选择
      if (i - coin < 0) continue;
      // 如i = 5, coin有三个选择1 2 5
      // 此时要找dp[4] dp[3] dp[0]之前最少硬币数的值 然后 + 1(所选的硬币)
      dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
    }
  }

  return dp[amount] === amount + 1 ? -1 : dp[amount];
}

console.log(coinDp([1, 2, 5], 11));


// 使用dp数组获取最少的硬币数所组成的硬币数组
export function coinsListDp(coins: number[], amount: number): number[] {
  // 此时的dp数组包含硬币数量和硬币数组
  const dp: { count: number; coinsArr: number[]}[] 
    = Array.from(new Array(amount + 1), () => ({ count: amount + 1, coinsArr: [] }));

  dp[0].count = 0;

  for (let i = 0; i < dp.length; i++) {
    for (const coin of coins) {
      if (i - coin < 0) continue;
      
      if (dp[i].count > dp[i - coin].count + 1) {
        dp[i].count = dp[i - coin].count + 1;
        dp[i].coinsArr = [...dp[i - coin].coinsArr, coin];
      }
    }
  }

  return dp[amount].count === amount + 1 ? [] : dp[amount].coinsArr;
}

console.log(coinsListDp([1, 2, 5], 11));
