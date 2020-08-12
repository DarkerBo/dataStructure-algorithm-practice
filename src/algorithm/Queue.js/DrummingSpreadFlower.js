// 《学习JavaScript数据结构与算法》（第三版）的队列章节 -- 击鼓传花游戏
// 简单使用一个循环队列来实现击鼓传花
// 我们会得到一份名单，把里面的名字全都加入队列。给定一个数字，然后迭代队列。从队列开头移
// 除一项，再将其添加到队列末尾，模拟击鼓传花（如果你把花传给了旁边的人，你被
// 淘汰的威胁就立刻解除了）。一旦达到给定的传递次数，拿着花的那个人就被淘汰了（从队列中
// 移除）。最后只剩下一个人的时候，这个人就是胜者
const { ObjectQueue } = require('../../DataStructure/Queue');

function drummingSpreadFlower(list, num) {
  const queue = new ObjectQueue();
  const elementList = [];

  for (let i = 0; i < list.length; i++) {
    queue.enqueue(list[i]);
  }

  while(queue.size() > 1) {
    for (let j = 0; j < num; j++) {
      queue.enqueue(queue.dequeue()); // 循环队列操作
    }

    elementList.push(queue.dequeue());
  }
  
  return {
    elementList,
    winner: queue.dequeue(),
  }

}

const names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
console.log(drummingSpreadFlower(names, 7));
