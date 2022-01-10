// 洗牌算法
/*
我知道大家会各种花式排序，但是如果叫你打乱一个数组，你是否能做到胸有成竹？
即便你拍脑袋想出一个算法，怎么证明你的算法就是正确的呢？乱序算法不像排序算法，结果唯一可以很容易检验。
因为「乱」可以有很多种，你怎么能证明你的算法是「真的乱」呢？

所以我们面临两个问题：

1. 什么叫做「真的乱」？

2. 设计怎样的算法来打乱数组才能做到「真的乱」？

这种算法称为「随机乱置算法」或者「洗牌算法」。

此类算法都是靠随机选取元素交换来获取随机性，直接看代码（伪码），该算法有 4 种形式，都是正确的：

// 得到一个在闭区间[min, max]内的随机整数
function randNum(min: number, max: number): number {}

// 洗牌算法
function shuffle(arr: number[]): number[] {
  const n = arr.length;
  // 第一种写法
  for (let i = 0; i < n; i++) {
    const randomIndex = randNum(i, n - 1);
    // 交换i和随机索引的位置
    swap(arr[i], arr[randomIndex]);
  }

  // 第二种写法,循环少了一次
  for (let i = 0; i < n - 1; i++) {
    const randomIndex = randNum(i, n - 1);
    // 交换i和随机索引的位置
    swap(arr[i], arr[randomIndex]);
  }

  // 第三种写法，与第一种是一样的
  for (let i = n - 1; i >= 0; i--) {
    const randomIndex = randNum(0, i);
    // 交换i和随机索引的位置
    swap(arr[i], arr[randomIndex]);
  }

  // 第四种写法，与第二种是一样的
  for (let i = n - 1; i > 0; i--) {
    const randomIndex = randNum(0, i);
    // 交换i和随机索引的位置
    swap(arr[i], arr[randomIndex]);
  }
}

分析洗牌算法正确性的准则：产生的结果必须有 n! 种可能，否则就是错误的。
这个很好解释，因为一个长度为 n 的数组的全排列就有 n! 种。

【要求每个元素到各个位置的概率是相等的，也就是数组的全排列】

也就是说打乱结果总共有 n! 种。算法必须能够反映这个事实，才是正确的。

我们先用这个准则分析一下第一种写法的正确性：
// 假设传入一个这样的arr
const arr = [1, 3, 5, 7, 9]
function shuffle(arr: number[]): number[] {
  const n = arr.length; // 5
  for (let i = 0; i < n; i++) {
    const randomIndex = randNum(i, n - 1);
    swap(arr[i], arr[randomIndex]);
  }
}

for循环第一轮迭代时，i=0，randomIndex的取值范围是[0,4]，有5个可能的取值

index: 0 1 2 3 4
array: 1 3 5 7 9
       i    ran

for循环第二轮迭代时，i=1，randomIndex的取值范围是[1,4]，有4个可能的取值

index: 0 1 2 3 4
array: 7 3 5 1 9
         i    ran

后面以此类推，直到最后一次迭代，i=4，randomIndex 的取值范围是 [4,4]，只有 1 个可能的取值。

index: 0 1 2 3 4
array: 7 9 3 5 1
               i    
              ran


可以看到，整个过程产生的所有可能结果有 5*4*3*2*1=5!=n! 种，所以这个算法是正确的。


分析第二种写法，前面的迭代都是一样的，少了一次迭代而已。
所以最后一次迭代时 i = 3，rand 的取值范围是 [3,4]，有 2 个可能的取值。

const arr = [1, 3, 5, 7, 9]
function shuffle(arr: number[]): number[] {
  const n = arr.length; // 5
  for (let i = 0; i < n - 1; i++) {
    const randomIndex = randNum(i, n - 1);
    swap(arr[i], arr[randomIndex]);
  }
}

所以整个过程产生的所有可能结果仍然有 5*4*3*2=5!=n! 种，因为乘以 1 可有可无嘛。所以这种写法也是正确的。

如果以上内容你都能理解，那么你就能发现第三种写法就是第一种写法，只是将数组从后往前迭代而已；
第四种写法是第二种写法从后往前来。所以它们都是正确的。

如果读者思考过洗牌算法，可能会想出如下的算法，但是这种写法是错误的：
function shuffle(arr: number[]): number[] {
  const n = arr.length; // 5
  for (let i = 0; i < n; i++) {
    const randomIndex = randNum(0, n - 1); // 这里的话，每次循环都是n * n种可能
    swap(arr[i], arr[randomIndex]);
  }
}

现在你应该明白这种写法为什么会错误了。
因为这种写法得到的所有可能结果有 n^n 种，而不是 n! 种，
而且 n^n 一般不可能是 n! 的整数倍。

比如说 arr = {1,2,3}，正确的结果应该有 3!=6 种可能，而这种写法总共有 3^3 = 27 种可能结果。
因为 27 不能被 6 整除，也就是说总概率不可能被平分，一定有某些情况被「偏袒」了。

后文会讲到，概率均等是算法正确的衡量标准，所以这个算法是错误的。

第二部分写了洗牌算法正确性的衡量标准，即每种随机结果出现的概率必须相等。
如果我们不用严格的数学证明，可以通过蒙特卡罗方法大力出奇迹，粗略验证算法的正确性。
蒙特卡罗方法也有不同的思路，不过要求不必太严格，因为我们只是寻求一个简单的验证。

*/

function shuffle(arr: number[]): number[] {
  for (let i = 0; i < arr.length; i++) {
    // 这里获取的是[i, n-1]的闭区间
    const randomIndex = i + Math.ceil(Math.random() * (arr.length - i - 1));
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }

  return arr;
}
