// 栈：常用于回退动作，如浏览器的回退历史页面按钮

/**
 * @description 栈的方法接口
 */
interface _Stack<E> {
  getSize(): number
  isEmpty(): boolean
  push(e: E): void
  pop(): E | undefined
  peek(): E | undefined
}

/**
 * @description 使用数组来实现栈
 */

export class ArrayStack<E> implements _Stack<E> {
  private data: E[];

  constructor() {
    this.data = [];
  }

  // 添加元素到栈顶
  public push(element: E): void {
    this.data.push(element);
  }

  // 移除栈顶的元素
  public pop(): E | undefined {
    return this.data.pop();
  }

  // 返回栈顶的元素
  public peek(): E | undefined {
    return this.data[this.data.length - 1];
  }

  // 判断栈内是否有元素
  public isEmpty(): boolean {
    return this.data.length === 0;
  }

  // 清空栈
  public clear(): void {
    this.data = [];
  }

  // 返回栈的长度
  public getSize(): number {
    return this.data.length;
  }
  
  public toString(): string {
    const baseMsg = `Stack: size=${this.data.length}\n`;
    let contentMsg = '';
    for (let i = 0; i < this.data.length; i++) {
      contentMsg += this.data[i];
      if (i !== this.data.length - 1) {
        contentMsg += ',';
      }
    }
    return `${baseMsg}${contentMsg}`;
  }
}


/**
 * @description 使用对象来实现栈
 */
export class ObjectStack<E> implements _Stack<E> {
  private count: number;
  private data: Record<number, E>

  constructor() {
    this.count = 0;
    this.data = {};
  }

  // 添加元素到栈顶
  public push(element: E) {
    this.data[this.count] = element;
    this.count++;
  }

  // 移除栈顶的元素
  public pop(): E | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.data[this.count - 1];
    delete this.data[this.count - 1];
    this.count--;
    return result;
  }

  // 返回栈顶的元素
  public peek(): E | undefined {
    if (this.isEmpty()) {
      return undefined
    }
    return this.data[this.count - 1];
  }

  // 判断栈内是否有元素
  public isEmpty(): boolean {
    return this.count === 0;
  }

  // 清空栈
  public clear(): void {
    this.data = {};
    this.count = 0;
  }

  // 返回栈的长度
  public getSize(): number {
    return this.count;
  }

  public toString(): string {
    const baseMsg = `Stack: size=${this.count}\n`;
    let contentMsg = '';
    for (let i = 0; i < this.count; i++) {
      contentMsg += this.data[i];
      if (i !== this.count - 1) {
        contentMsg += ',';
      }
    }
    return `${baseMsg}${contentMsg}`;
  }

}
