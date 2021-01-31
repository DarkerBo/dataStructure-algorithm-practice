// LeetCode 第 986 题，区间列表的交集
/*
给定两个由一些 闭区间 组成的列表，每个区间列表都是成对不相交的，并且已经排序。

返回这两个区间列表的交集。

（形式上，闭区间 [a, b]（其中 a <= b）表示实数 x 的集合，而 a <= x <= b。两个闭区间的交集是一组实数，要么为空集，要么为闭区间。例如，[1, 3] 和 [2, 4] 的交集为 [2, 3]。）

示例：

输入：A = [[0,2],[5,10],[13,23],[24,25]], B = [[1,5],[8,12],[15,24],[25,26]]
输出：[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]

*/

/*
思路：
题目很好理解，就是让你找交集，注意区间都是闭区间。

解决区间问题的思路一般是先排序，以便操作，不过题目说已经排好序了，那么可以用两个索引指针在A和B中游走，把交集找出来，代码大概是这样的：

# A, B 形如 [[0,2],[5,10]...]
function intervalIntersection(A, B) {
  let i = 0, j = 0;
  const res = [];
  while (i < len(A) && j < len(B)) {
    // ...
    j++;
    i++;
  }
  return res;
      
}
   
不难，我们先老老实实分析一下各种情况。

首先，对于两个区间，我们用[a1,a2]和[b1,b2]表示在A和B中的两个区间，那么什么情况下这两个区间没有交集呢：
1. 情况1
a1   a2
         b1      b2

2. 情况2
          a1      a2
b1    b2

只有这两种情况，写成代码的条件判断就是这样：

if b2 < a1 or a2 < b1:
    [a1,a2] 和 [b1,b2] 无交集
那么，什么情况下，两个区间存在交集呢？根据命题的否定，上面逻辑的否命题就是存在交集的条件：

# 不等号取反，or 也要变成 and
if b2 >= a1 and a2 >= b1:
    [a1,a2] 和 [b1,b2] 存在交集
接下来，两个区间存在交集的情况有哪些呢？穷举出来：
1. 情况1
a1          a2
    b1    b2

2. 情况2
a1          a2
      b1           b2

3. 情况3
     a1     a2
b1               b2

4. 情况4
      a1         a2
b1          b2

这很简单吧，就这四种情况而已。那么接下来思考，这几种情况下，交集是否有什么共同点呢？
我们惊奇地发现，交集区间是有规律的！如果交集区间是[c1,c2]，那么c1=max(a1,b1)，c2=min(a2,b2)！这一点就是寻找交集的核心，我们把代码更进一步：

while i < len(A) && j < len(B) {
  a1, a2 = A[i][0], A[i][1]
  b1, b2 = B[j][0], B[j][1]
  if b2 >= a1 and a2 >= b1 {
    res.append([max(a1, b1), min(a2, b2)])
  }
  # ...
}
    
最后一步，我们的指针i和j肯定要前进（递增）的，什么时候应该前进呢？
1. 情况1
a1       a2
     b1        b2

2. 情况2
a1             a2
     b1    b2

情况1需要移动A组的指针，情况2需要移动B组的指针
是否前进，只取决于a2和b2的大小关系：
while i < len(A) and j < len(B):
    # ...
    if b2 < a2:
        j += 1
    else:
        i += 1
以此思路写出代码：

*/
function intervalIntersection(A: number[][], B: number[][]): number[][] {
  // i指针指向A，j指针指向B
  let i = 0, j = 0;
  const res = [];

  while (i < A.length && j < B.length) {
    const a0 = A[i][0], a1 = A[i][1],
          b0 = B[j][0], b1 = B[j][1];

    // 有交集的时候才需要把交集放到res里面
    if (a1 >= b0 && b1 >= a0) {
      res.push([Math.max(a0, b0), Math.min(a1, b1)]);
    }

    // 指针更新
    if (b1 > a1) i++;
    else j++;
  }

  return res;
};
