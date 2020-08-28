// 队列：常用于打印队列，如打印一份份文档之类的操作

/**
 * @description 队列的接口方法
 */
interface _Queue<E> {
  getSize(): number
  isEmpty(): boolean
  enqueue(e: E): void
  dequeue(): E | undefined
  getFront(): E | undefined
}

/**
 * @description 使用数组来实现队列
 */

export class ArrayQueue<E> implements _Queue<E> {
  private data: E[];

  constructor() {
    this.data = [];
  }

  // 向队列后面增加元素
  public enqueue(element: E) {
    this.data.push(element);
  }

  // 移除队列的第一项并返回移除元素
  public dequeue(): E | undefined {
    return this.data.shift();
  }

  // 返回队列的第一个元素
  public getFront(): E | undefined {
    return this.data[0];
  }

  // 判断队列是否为空
  public isEmpty(): boolean {
    return this.data.length === 0;
  }

  // 获取队列长度
  public getSize(): number {
    return this.data.length;
  }

  // 清空队列
  public clear(): void {
    this.data = [];
  }

  public toString(): string {
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

export class ObjectQueue<E> implements _Queue<E> {
  count: number;
  lowestCount: number;
  data: Record<number, E>

  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.data = {};
  }

  // 向队列后面增加元素
  public enqueue(element: E) {
    this.data[this.count] = element;
    this.count++;
  }

  // 移除队列的第一项并返回移除元素
  public dequeue(): E | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const result = this.data[this.lowestCount];
    delete this.data[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  // 返回队列的第一个元素
  public getFront(): E | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.data[this.lowestCount];
  }

  // 判断队列是否为空
  public isEmpty(): boolean {
    return this.count - this.lowestCount === 0;
  }

  // 获取队列长度
  public getSize(): number {
    return this.count - this.lowestCount;
  }

  // 清空队列
  public clear(): void {
    this.data = {}
    this.lowestCount = 0;
    this.count = 0;
  }

  public toString(): string {
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

/**
 * @description 双端队列的接口方法
 */
interface _Deque<E> {
  getSize(): number
  isEmpty(): boolean
  addFront(e: E): void
  addBack(e: E): void
  getFront(): E | undefined
  getBack(): E | undefined
  removeFront(): E | undefined
  removeBack(): E | undefined
}

// 双端队列 常用于存储一系列的撤销动作。
// 点击撤销后，队列末返回之前一步操作。
// 进行了预定义数量的操作后，最先进行的操作会从队列最前端删除

/**
 * @description 使用数组来实现双端队列
 */

export class ArrayDeque<E> implements _Deque<E> {
  private data: E[];

  constructor() {
    this.data = [];
  }

  // 在双端队列前端添加新的元素
  public addFront(element: E): void {
    this.data.unshift(element);
  }

  // 在双端队列后端添加新的元素
  public addBack(element: E): void {
    this.data.push(element);
  }

  // 从双端队列前端移除第一个元素
  public removeFront(): E | undefined {
    return this.data.shift();
  }

  // 从双端队列后端移除第一个元素
  public removeBack(): E | undefined {
    return this.data.pop();
  }

  // 返回双端队列前端的第一个元素
  public getFront(): E | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.data[0];
  }

  // 返回双端队列后端的第一个元素
  public getBack(): E | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.data[this.data.length - 1];
  }

  // 返回双端队列的长度
  public getSize(): number {
    return this.data.length;
  }

  // 判断双端队列是否为空
  public isEmpty(): boolean {
    return this.data.length === 0;
  }

  // 清空双端队列
  public clear(): void {
    this.data = [];
  }

  public toString(): string {
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

export class ObjectDeque<E> implements _Deque<E> {
  private count: number;
  private lowestCount: number;
  private data: Record<number, E>;

  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.data = {};
  }

  // 在双端队列前端添加新的元素
  public addFront(element: E): void {
    if (this.isEmpty()) {
      this.addBack(element);
    } else if (this.lowestCount > 0) {
      this.lowestCount--;
      this.data[this.lowestCount] = element;
    } else {
      for (let i = this.count; i > 0; i--) {
        this.data[i] = this.data[i - 1];
      }
      this.count++;
      this.lowestCount = 0;
      this.data[this.lowestCount] = element;
    }
  }

  // 在双端队列后端添加新的元素
  public addBack(element: E): void {
    this.data[this.count] = element;
    this.count++;
  }

  // 从双端队列前端移除第一个元素
  public removeFront(): E | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const result = this.data[this.lowestCount];
    delete this.data[this.lowestCount];
    this.lowestCount++;
    return result;

  }

  // 从双端队列后端移除第一个元素
  public removeBack(): E | undefined {
    if(this.isEmpty()) {
      return undefined;
    }

    const result = this.data[this.count - 1];
    delete this.data[this.count - 1];
    this.count--;
    return result;
  }

  // 返回双端队列前端的第一个元素
  public getFront(): E | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.data[this.lowestCount];
  }

  // 返回双端队列后端的第一个元素
  public getBack(): E | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.data[this.count - 1];
  }

  // 返回双端队列的长度
  public getSize(): number {
    return this.count - this.lowestCount;
  }

  // 判断双端队列是否为空
  public isEmpty(): boolean {
    return this.count - this.lowestCount === 0;
  }

  // 清空双端队列
  public clear(): void {
    this.count = 0;
    this.lowestCount = 0;
    this.data = {};
  }

  public toString(): string {
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


// 测试三种普通队列性能
// function test() {
//   function generateQueue<T extends Queue<number>>(queue: T, len: number): T {
//     for (let i = 0; i < len; i++) {
//       queue.enqueue(Math.floor(100000 * Math.random()))
//     }

//     return queue
//   }

//   function printDequeueTime<T extends Queue<number>>(queue: T, name?: string): void {
//     console.time(`${name} dequeue 耗时`)
//     for (let i = 0; i < len; i++) {
//       queue.dequeue()
//     }
//     console.timeEnd(`${name} dequeue 耗时`)
//   }

//   const len = 100000

//   const queue1 = generateQueue(new ArrayQueue<number>(), len)
//   const queue2 = generateQueue(new LoopQueue<number>(), len)
//   const queue3 = generateQueue(new LinkedListQueue<number>(), len)

//   printDequeueTime(queue1, 'ArrayQueue')
//   printDequeueTime(queue2, 'LoopQueue')
//   printDequeueTime(queue3, 'LinkedListQueue')
// }