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

module.exports = {
  ArrayQueue,
  ObjectQueue
}