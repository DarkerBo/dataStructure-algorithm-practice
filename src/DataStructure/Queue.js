// 队列：常用于打印队列，如打印一份份文档之类的操作

/**
 * @description 使用数组来实现队列
 */

class ArrayQueue {
  constructor() {
    this.data = [];
  }

  // 向队列后面增加元素
  enqueue(item) {
    this.data.push(item);
  }

  // 移除队列的第一项并返回移除元素
  dequeue() {
    return this.data.shift();
  }

  // 返回队列的第一个元素
  peek() {
    return this.data[0];
  }

  // 判断队列是否为空
  isEmpty() {
    return this.data.length === 0;
  }

  // 获取队列长度
  size() {
    return this.data.length;
  }

  // 清空队列
  clear() {
    this.data = [];
  }

  toString() {
    let contentMsg = '';
    for (let i = 0; i < this.data.length; i++) {
      contentMsg += this.data[i];
      if (i !== this.data.length - 1) {
        contentMsg += ',';
      }
    }

    return `Queue: front [${contentMsg}] tail`;
  }
}

/**
 * @description 使用对象来实现队列
 */

class ObjectQueue {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.data = {};
  }

  // 向队列后面增加元素
  enqueue(item) {
    this.data[this.count] = item;
    this.count++;
  }

  // 移除队列的第一项并返回移除元素
  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }

    const result = this.data[this.lowestCount];
    delete this.data[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  // 返回队列的第一个元素
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.data[this.lowestCount];
  }

  // 判断队列是否为空
  isEmpty() {
    return this.count - this.lowestCount === 0;
  }

  // 获取队列长度
  size() {
    return this.count - this.lowestCount;
  }

  // 清空队列
  clear() {
    this.data = {}
    this.lowestCount = 0;
    this.count = 0;
  }

  toString() {
    let contentMsg = '';
    for (let i = this.lowestCount; i < this.count; i++) {
      contentMsg += this.data[i];
      if (i !== this.count - 1) {
        contentMsg += ',';
      }
    }

    return `Queue: front [${contentMsg}] tail`;
  }
}

// 双端队列 常用于存储一系列的撤销动作。
// 点击撤销后，队列末返回之前一步操作。
// 进行了预定义数量的操作后，最先进行的操作会从队列最前端删除

/**
 * @description 使用数组来实现双端队列
 */

class ArrayDeque {
  constructor() {
    this.data = [];
  }

  // 在双端队列前端添加新的元素
  addFront(item) {
    this.data.unshift(item);
  }

  // 在双端队列后端添加新的元素
  addBack(item) {
    this.data.push(item);
  }

  // 从双端队列前端移除第一个元素
  removeFront() {
    return this.data.shift();
  }

  // 从双端队列后端移除第一个元素
  removeBack() {
    return this.data.pop();
  }

  // 返回双端队列前端的第一个元素
  peekFront() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.data[0];
  }

  // 返回双端队列后端的第一个元素
  peekBack() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.data[this.data.length - 1];
  }

  // 返回双端队列的长度
  size() {
    return this.data.length;
  }

  // 判断双端队列是否为空
  isEmpty() {
    return this.data.length === 0;
  }

  // 清空双端队列
  clear() {
    this.data = [];
  }

  toString() {
    let contentMsg = '';
    for (let i = 0; i < this.data.length; i++) {
      contentMsg += this.data[i];
      if (i !== this.data.length - 1) {
        contentMsg += ',';
      }
    }

    return `Deque: front [${contentMsg}] tail`;
  }
}

class ObjectDeque {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.data = {};
  }

  // 在双端队列前端添加新的元素
  addFront(item) {
    if (this.isEmpty()) {
      this.addBack(item);
    } else if (this.lowestCount > 0) {
      this.lowestCount--;
      this.data[this.lowestCount] = item;
    } else {
      for (let i = this.count; i > 0; i--) {
        this.data[i] = this.data[i - 1];
      }
      this.count++;
      this.lowestCount = 0;
      this.data[this.lowestCount] = item;
    }
  }

  // 在双端队列后端添加新的元素
  addBack(item) {
    this.data[this.count] = item;
    this.count++;
  }

  // 从双端队列前端移除第一个元素
  removeFront() {
    if (this.isEmpty()) {
      return undefined;
    }

    const result = this.data[this.lowestCount];
    delete this.data[this.lowestCount];
    this.lowestCount++;
    return result;

  }

  // 从双端队列后端移除第一个元素
  removeBack() {
    if(this.isEmpty()) {
      return undefined;
    }

    const result = this.data[this.count - 1];
    delete this.data[this.count - 1];
    this.count--;
    return result;
  }

  // 返回双端队列前端的第一个元素
  peekFront() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.data[this.lowestCount];
  }

  // 返回双端队列后端的第一个元素
  peekBack() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.data[this.count - 1];
  }

  // 返回双端队列的长度
  size() {
    return this.count - this.lowestCount;
  }

  // 判断双端队列是否为空
  isEmpty() {
    return this.count - this.lowestCount === 0;
  }

  // 清空双端队列
  clear() {
    this.count = 0;
    this.lowestCount = 0;
    this.data = {};
  }

  toString() {
    let contentMsg = '';
    for (let i = 0; i < this.count; i++) {
      contentMsg += this.data[i];
      if (i !== this.count - 1) {
        contentMsg += ',';
      }
    }

    return `Deque: front [${contentMsg}] tail`;
  }
}

// const deque = new ObjectDeque();
// deque.addFront(2);
// deque.addFront(1);
// deque.addFront(0);
// deque.addBack(3);
// console.log(deque.toString());
// console.log(deque.removeFront());
// console.log(deque.removeBack());
// console.log(deque.peekFront());
// console.log(deque.peekBack());
// console.log(deque.size());
// deque.clear();
// console.log(deque.isEmpty());


module.exports = {
  ArrayQueue,
  ObjectQueue,
  ArrayDeque,
  ObjectDeque,
}