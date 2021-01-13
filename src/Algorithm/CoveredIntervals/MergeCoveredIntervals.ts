// LeetCode 第 56 题，合并区间
/*
给出一个区间的集合，请合并所有重叠的区间。

示例 1:
输入: intervals = [[1,3],[2,6],[8,10],[15,18]]
输出: [[1,6],[8,10],[15,18]]
解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].

示例 2:
输入: intervals = [[1,4],[4,5]]
输出: [[1,5]]
解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。

*/

/*
思路：
我们解决区间问题的一般思路是先排序，然后观察规律。

一个区间可以表示为[start, end]，前文聊的区间调度问题，需要按end排序，以便满足贪心选择性质。而对于区间合并问题，其实按end和start排序都可以，不过为了清晰起见，我们选择按start排序。

显然，对于几个相交区间合并后的结果区间x，x.start一定是这些相交区间中start最小的，x.end一定是这些相交区间中end最大的。
  start           end
1      start     end
2    start                end
3                        start            end

其实主要判断12两种情况的右边界哪个大就取哪个，情况3直接放到res数组就ok，然后以新push的元素来做边界判断

由于已经排了序，x.start很好确定，求x.end也很容易，可以类比在数组中找最大值的过程：
let max_ele = arr[0];
for (int i = 1; i < arr.length; i++) {
  max_ele = Math.max(max_ele, arr[i]);
}
return max_ele;

*/

function mergeCoveredIntervals(intervals: number[][]): number[][] {
  if (intervals.length === 0) return [];

  const sortIntervals = intervals.sort((a, b) => a[0] - b[0]);
  const res = [sortIntervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const prev = res[res.length - 1];
    const cur = intervals[i];
    
    /*
      当下一个的左边界是在上一个的右边界之内的，说明只有两种可能
      1. start       end
            start          end
      
      2. start           end
            start    end
    
      这里只需要判断end的大小，然后取最大的右边界就好
      左边界直接取上一个的左边界，因为下一个的左边界排好序后是肯定大于等于上一个的左边界的
    */
    if (cur[0] <= prev[1]) {
      const maxRight = Math.max(prev[1], cur[1]);
      res[res.length - 1][1] = maxRight;
    } else {
      res.push(cur);
    }  
  }

  return res;
}

console.log(mergeCoveredIntervals([[1,3],[2,6],[8,10],[15,18]]));
console.log(mergeCoveredIntervals([[1,4],[4,5]]));
console.log(mergeCoveredIntervals([[1,4],[2,3]]));
console.log(mergeCoveredIntervals([[1,4],[0,4]]));

