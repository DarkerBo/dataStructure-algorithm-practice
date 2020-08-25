// 数据结构 —— 集合 ES6 已经内置有Set这种数据结构

// 两个集合的并集运算
function union(setA, setB) {
  return new Set([...setA, ...setB]);
}

// 两个集合的交集运算
function intersection(setA, setB) {
  return new Set([...setA].filter((item) => setB.has(item)));
}

// 两个集合的差集运算
function difference(setA, setB) {
  return new Set([...setA].filter((item) => !setB.has(item)));
}
