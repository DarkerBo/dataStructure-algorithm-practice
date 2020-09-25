// 数据结构 —— 堆,也叫二叉堆,能高效、快速地找出最大值和最小值，常被应用于优先队列。它也被用于著名的堆排序算法中
// 二叉堆是一种特殊的二叉树，有以下两个特性。
// 1. 它是一棵完全二叉树，表示树的每一层都有左侧和右侧子节点（除了最后一层的叶节点），并且最后一层的叶节点尽可能都是左侧子节点，这叫作结构特性
// 2. 二叉堆不是最小堆就是最大堆。最小堆允许你快速导出树的最小值，最大堆允许你快速导出树的最大值。最大堆中，所有的节点都大于等于它的子节点，最小堆中所有的节点都小于等于每个它的子节点。这叫作堆特性

// 我们使用数组来表示二叉堆，对于给定位置(index)的节点，我们可以对其进行如下操作：

// 获取给定节点的左侧子节点位置：2 * index + 1
// 获取给定节点的右侧子节点位置：2 * index + 2
// 获取给定节点的父节点位置：(index - 1) / 2

// 可以非常方便的寻找任意节点的父子节点，在堆的实现里是非常有用的特性。

/**
 * @description 最大堆
 * 将二叉堆用数组来表示，而不是二叉对象来表示，因为用数组可以使用上述特性
 */
export class MaxHeap<E> {
  private data: E[];

  constructor(args: number | E[]) {
    if (typeof args === 'object') {
      this.data = new Array<E>();
      // 堆化
      for (let i = this.parent(args.length - 1); i >= 0; i--) this.shiftDown(i)
    } else {
      this.data = new Array<E>(args);
    }
  }

  // 返回父节点索引
  private parent(index: number): number {
    // index为0的话不纳入计算
    if (index === 0) throw new Error(`index-0 doesn't have parent.`);

    return Math.floor((index - 1) / 2);
  }

  // 返回左孩子节点的索引
  private leftChild(index: number): number {
    return index * 2 + 1;
  }

  // 返回右孩子节点的索引
  private rightChild(index: number): number {
    return index * 2 + 2;
  }

  // 节点上移
  // 若子节点比父节点还大，则交换两个节点的位置，相当于节点上移
  private shiftUp(k: number): void {
    while (k > 0 && this.data[k] > this.data[this.parent(k)]) {
      [this.data[k], this.data[this.parent(k)]] = [this.data[this.parent(k)], this.data[k]];
      k = this.parent(k);
    }
  }

  // 节点下移
  // 大概思路是是先获取左边节点，防止右边节点没有
  // 若有右边子节点，则判断是否小于右边子节点，若小于，那没事了，跳出循环
  // 若大于，则获取右节点，
  // 判断父节点和对比节点两个节点大小，若父节点较小，则互换两个节点
  private shiftDown(k: number): void {
    while (this.leftChild(k) < this.data.length) {
      let j = this.leftChild(k);

      if (j + 1 < this.data.length && this.data[j] < this.data[j + 1]) {
        j = this.rightChild(k);
      }
      if (this.data[k] > this.data[j]) break;
      
      [this.data[k], this.data[j]] = [this.data[j], this.data[k]];
      k = j;
    }
  }

  // 获取堆的长度
  public size(): number {
    return this.data.length;
  }

  // 判断堆是否为空
  public isEmpty(): boolean {
    return this.data.length === 0;
  }

  // 返回堆中最大节点的值
  public findMax(): E {
    if (this.isEmpty()) {
      throw new Error('Can not findMax when heap is empty.');
    }

    return this.data[0];
  }

  // 往堆里增加元素
  public add(e: E): void {
    this.data[this.data.length] = e;
    this.shiftUp(this.data.length - 1);
  }

  // 移除最大元素
  public extractMax(): E {
    const ret = this.findMax();

    [this.data[0], this.data[this.data.length - 1]] = [this.data[this.data.length - 1], this.data[0]];
    delete this.data[this.data.length - 1];
    this.shiftDown(0);

    return ret;
  }

  // 替换最大元素
  public replace(e: E): E {
    const ret = this.findMax();

    this.data[0] = e;
    this.shiftDown(0);
    
    return ret;
  }
}

/**
 * @description 最小堆
 */
export class MinHeap<E> {
  private data: E[];
  private comparator: (e1: E, e2: E) => number; // 比较函数，如果E为string类型也能通过该函数比较

  constructor(comparator: (e1: E, e2: E) => number) {
    this.data = new Array<E>();
    this.comparator = comparator;
  }

   // 返回父节点索引
  private parent(index: number): number {
    if (index === 0) throw new Error(`index-0 doesn't have parent.`);

    return Math.floor((index - 1) / 2);
  }

  // 返回左孩子节点的索引
  private leftChild(index: number): number {
    return index * 2 + 1;
  }

  // 返回右孩子节点的索引
  private rightChild(index: number): number {
    return index * 2 + 2;
  }

  // 节点上移
  private shiftUp(k: number): void {
    while (k > 0 && this.comparator(this.data[k], this.data[this.parent(k)]) === -1) {
      [this.data[k], this.data[this.parent(k)]] = [this.data[this.parent(k)], this.data[k]];
      k = this.parent(k);
    }
  }

  // 节点下移
  // 大概思路是先获取左边节点，防止右边节点没有
  // 若有右边子节点，则判断是否大于右边子节点，若大于，那没事了，跳出循环
  // 若小于，则获取右节点，
  // 判断父节点和对比节点两个节点大小，若父节点较大，则互换两个节点
  private shiftDown(k: number): void {
    while (this.leftChild(k) < this.data.length) {
      let j = this.leftChild(k);

      if (j + 1 < this.data.length && this.comparator(this.data[j + 1], this.data[j]) === -1) {
        j = this.rightChild(k);
      }
      if (this.comparator(this.data[k], this.data[j]) === -1) break;
      
      [this.data[k], this.data[j]] = [this.data[j], this.data[k]];
      k = j;
    }
  }

  // 根据节点查找index
  public findIndex(e: E): number {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i] === e) return i;
    }

    return -1;
  }

  // 获取堆的长度
  public size(): number {
    return this.data.length;
  }

  // 判断堆是否为空
  public isEmpty(): boolean {
    return this.data.length === 0;
  }

  // 返回堆中最大节点的值
  public findMin(): E {
    if (this.isEmpty()) {
      throw new Error('Can not findMax when heap is empty.');
    }

    return this.data[0];
  }

  // 往堆中增加元素
  public add(e: E): void {
    this.data[this.data.length - 1] = e;
    this.shiftUp(this.data.length - 1);
  }

  // 移除堆中最小节点
  public extractMin(): E {
    const ret = this.findMin();

    [this.data[0], this.data[this.data.length - 1]] = [this.data[this.data.length - 1], this.data[0]];
    delete this.data[this.data.length - 1];
    this.shiftDown(0);

    return ret;
  }

  // 根据某个节点更换新的值
  public change(oldE: E, newE: E): void {
    const index = this.findIndex(oldE);

    if (index === -1) throw new Error(`${oldE} doesn't exist!`);

    this.data[index] = newE;
    [this.data[0], this.data[index]] = [this.data[index], this.data[0]];
    this.shiftUp(index);
    this.shiftDown(0);
  }

}
