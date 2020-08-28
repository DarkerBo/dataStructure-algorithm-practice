// 数据结构 —— 数组 插入或删除元素的时间复杂度为O(n),访问元素的时间复杂度为O(1)

export class _Array<E> {
  private data: E[];
  private size: number;

  constructor(arg?: number | E[]) {
    if (!arg) {
      this.data = new Array<E>(10);
      this.size = 0;
    } else if (typeof arg === 'number') {
      this.data = new Array<E>(arg);
      this.size = 0;
    } else {
      this.data = new Array<E>(arg.length);
      arg.forEach((element: E, index: number) => { this.data[index] = element });
      this.size = arg.length;
    }
  }

  // 改变数组容器容量
  private resize(newCapacity: number): void {
    const newArray = new Array(newCapacity);
    for (let i = 0; i < this.size; i++) {
      newArray[i] = this.data[i];
    }
    this.data = newArray;
  }

  // 获取数组有效长度
  public getSize(): number {
    return this.size;
  }

  // 获取数组容器容量
  public getCapacity(): number {
    return this.data.length;
  }

  // 判断数组是否为空
  public isEmpty(): boolean {
    return this.size === 0;
  }

  // 在数组指定位置插入元素，会填充空元素增加data的长度，有效元素个数要用size记录
  // JS引擎其实已经做了控制数组容器的大小，这里是模拟原始数组结构实现
  public add(index: number, element: E): void {
    if (index < 0 || index > this.size) {
      throw new Error('Add failed Require index >= 0 and index < size');
    }

    if (this.size === this.data.length) {
      this.resize(2 * this.data.length);
    }

    for (let i = this.size; i >= index; i--) {
      this.data[i + 1] = this.data[i];
    }

    this.data[index] = element;
    this.size++;
  }

  // 在数组最后插入元素
  public addLast(element: E): void {
    this.add(this.size, element);
  }

  // 在数组开头插入元素
  public addFirst(element: E): void {
    this.add(0, element);
  }

  // 获取指定位置的元素
  public get(index: number): E {
    if (index < 0 || index >= this.size) {
      throw new Error('Add failed Require index >= 0 and index < size');
    }

    return this.data[index];
  }

  // 获取数组最后一个元素
  public getLast(): E {
    return this.data[this.size];
  }

  // 获取数组第一个元素
  public getFirst(): E {
    return this.data[0];
  }

  // 改变某一个位置的元素
  public set(index: number, element: E): void {
    if (index < 0 || index >= this.size) {
      throw new Error('Add failed Require index >= 0 and index < size');
    }

    this.data[index] = element;
  }

  // 数组是否包含某个元素
  public contains(element: E): boolean {
    for (let i = 0; i < this.size; i++) {
      if (this.data[i] === element) {
        return true;
      }
    }
    return false;
  }

  // 删除指定位置的元素
  public remove(index: number): E {
    if (index < 0 || index >= this.size) {
      throw new Error('Add failed Require index >= 0 and index < size');
    }

    const result = this.data[index];

    for (let i = index + 1; i < this.size; i++) {
      this.data[i - 1] = this.data[i];
    }

    delete this.data[this.size--];

    if (this.size === Math.floor(this.data.length / 4) && Math.floor(this.data.length / 2) !== 0) {
      this.resize(Math.floor(this.data.length / 2))
    }

    return result;
  }

  // 删除数组最后一个数据
  public removeLast(): E {
    return this.remove(this.size);
  }

  // 删除数组第一个元素
  public removeFirst(): E {
    return this.remove(0);
  }

  // 查找某个元素在数组中德位置
  public find(element: E): number {
    for (let i = 0; i < this.size; i++) {
      if (this.data[i] === element) {
        return i;
      }
    }
    return -1;
  }

  // 根据某个元素来删除
  public removeElement(element: E): void {
    const index = this.find(element);
    if (index !== -1) {
      this.remove(index);
    }
  }

  // 交换数组中两个位置的元素
  public swap(i: number, j: number): void {
    if (i < 0 || i >= this.size || j < 0 || j >= this.size) {
      throw new Error('Index is illegal.');
    }

    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }

  // 将数组转为字符串
  public toString(): string {
    const baseMsg = `Array: size=${this.size}, capacity=${this.data.length}\n`;
    let contentMsg = '';
    for (let i = 0; i < this.size; i++) {
      contentMsg += this.data[i];
      if (i !== this.size) {
        contentMsg += ',';
      }
    }

    return `${baseMsg}${contentMsg}`;
  }
}



// 创建二维数组
const arr = Array.from(new Array(9), () => Array.from(new Array(9), () => 1));
console.log(arr);

