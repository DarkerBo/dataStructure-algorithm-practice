/**
 * @description 使用数组来实现栈
 */

export class ArrayStack {
  constructor() {
    this.data = [];
  }

  // 添加元素到栈顶
  push(item) {
    this.data.push(item);
  }

  // 移除栈顶的元素
  pop() {
    return this.data.pop();
  }

  // 返回栈顶的元素
  peek() {
    return this.data[this.data.length - 1];
  }

  // 判断栈内是否有元素
  isEmpty() {
    return this.data.length === 0;
  }

  // 清空栈
  clear() {
    this.data = [];
  }

  size() {
    return this.data.length;
  }
  
  toString() {
    const baseMsg = `Stack: size=${this.data.length}\n`;
    let contentMsg = '';
    for (let i = 0; i < this.data.length; i++) {
      contentMsg += this.data[i];
      if (i !== this.data.length - 1) {
        contentMsg += '';
      }
    }
    return `${baseMsg}${contentMsg}`;
  }
}


/**
 * @description 使用对象来实现栈
 */
export class ObjectStack {
  constructor() {
    this.count = 0;
    this.data = {};
  }

  // 添加元素到栈顶
  push(item) {
    this.data[this.count] = item;
    this.count++;
  }

  // 移除栈顶的元素
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.data[this.count - 1];
    delete this.data[this.count];
    this.count--;
    return result;
  }

  // 返回栈顶的元素
  peek() {
    if (this.isEmpty()) {
      return undefined
    }
    return this.data[this.count - 1];
  }

  // 判断栈内是否有元素
  isEmpty() {
    return this.count === 0;
  }

  // 清空栈
  clear() {
    this.data = {};
    this.count = 0;
  }

  size() {
    return this.count;
  }

  toString() {
    const baseMsg = `Stack: size=${this.count}\n`;
    let contentMsg = '';
    for (let i = 0; i < this.count; i++) {
      contentMsg += this.data[i];
      if (i !== this.count - 1) {
        contentMsg += '';
      }
    }
    return `${baseMsg}${contentMsg}`;
  }

}

