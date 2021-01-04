// LeetCode 第 1288 题，删除被覆盖区间
/*
给你一个区间列表，请你删除列表中被其他区间所覆盖的区间。

只有当 c <= a 且 b <= d 时，我们才认为区间 [a,b) 被区间 [c,d) 覆盖。

在完成所有删除操作后，请你返回列表中剩余区间的数目。

 

示例：

输入：intervals = [[1,4],[3,6],[2,8]]
输出：2
解释：区间 [3,6] 被区间 [2,8] 覆盖，所以它被删除了。
 

提示：​​​​​​

1 <= intervals.length <= 1000
0 <= intervals[i][0] < intervals[i][1] <= 10^5
对于所有的 i != j：intervals[i] != intervals[j]

*/


/* 思路:
题目问我们，去除被覆盖区间之后，还剩下多少区间，那么我们可以先算一算，被覆盖区间有多少个，然后和总数相减就是剩余区间数。
对于这种区间问题，如果没啥头绪，首先排个序看看，比如我们按照区间的起点进行升序排序：
  start           end
1      start     end
2    start                end
3                        start            end

排序之后，两个相邻区间可能有如下三种相对位置：
1. 对于情况一，找到了覆盖区间。


2. 对于情况二，两个区间可以合并，成一个大区间。
为什么可以合并呢？
假设合并了A B 区间，C是下一个区间， 因为按start升序的话，C的起点总是小于等于B的起点，
因此C与合并区间AB比较的时候也是那三种情况（并且不会出现C的起点大于B小于A的情况）
所以合并区间对结果没有影响，只是相当于比较的区间大了一点而已，


3. 对于情况三，两个区间完全不相交。


注意：
对于这两个起点相同的区间，我们需要保证长的那个区间在上面（按照终点降序），这样才会被判定为覆盖，否则会被错误地判定为相交，少算一个覆盖区间:
(1) 同一起点，终点升序，这样是不对的，会导致覆盖区间数量少了一个
start       end
start                end

(2) 同一起点，终点降序，这样排序才对，可以正确判断覆盖区间
start                  end
start         end

*/

function removeCoveredIntervals(intervals: number[][]): number {
  // 排序，对起点升序，终点降序
  const sortIntervals = intervals.sort((a, b) => {
    // 起点升序，起点相同则终点降序
    if (a[0] === b[0]) return b[1] - a[1];
    else return a[0] - b[0];
  })

  // 分别是区间的左指针，右指针，被覆盖的区间数量
  let left = 0, right = 0, count = 0;

  for (const item of sortIntervals) {
    // 第一种情况 覆盖
    if (left <= item[0] && right >= item[1]) {
      count++;
    }

    // 第二种情况 该区间右边界大于上一个区间右边界 合并
    // 这里也可以更新left指针，不过没必要
    if (right > item[0] && right < item[1]) {
      right = item[1];
    }

    // 第三种情况 超出 更新指针
    if (right <= item[0]) {
      left = item[0];
      right = item [1];
    }
  }

  return intervals.length - count;
}

console.log(removeCoveredIntervals([[1,4],[3,6],[2,8]]));
