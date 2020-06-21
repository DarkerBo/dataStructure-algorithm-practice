class _Array {
  constructor(arg) {
    if (!arg) {
      this.data = new Array();
      this.size = 0;
    } else if (typeof arg === 'number') {
      this.data = new Array(arg);
      this.size = 0;
    } else {
      this.data = new Array(arg);
      arg.forEach((item, index) => { this.data[index] = item });
      this.size = arg.length;
    }
  }

  // 改变数组容器容量
  resize(newCapacity) {
    const newArray = new Array(newCapacity);
    for (let i = 0; i < this.size; i++) {
      newArray[i] = this.data[i];
    }
    this.data = newArray;
  }

  // 获取数组有效长度
  getSize() {
    return this.size;
  }

  // 获取数组容器容量
  getCapacity() {
    return this.data.length;
  }

  // 判断数组是否为空
  isEmpty() {
    return this.size === 0;
  }

  // 在数组指定位置插入元素，会填充空元素增加data的长度，有效元素个数要用size记录
  // JS引擎其实已经做了控制数组容器的大小，这里是模拟原始数组结构实现
  add(index, item) {
    if (index < 0 || index > this.size) {
      throw new Error('Add failed Require index >= 0 and index < size');
    }

    if (this.size === this.data.length) {
      this.resize(2 * this.data.length);
      console.log(this.data.length, 'resize')
    }

    for (let i = this.size; i >= index; i--) {
      this.data[i + 1] = this.data[i];
    }

    this.data[index] = item;
    this.size++;
  }

  // 在数组最后插入元素
  addLast(item) {
    this.add(this.size, item);
  }

  // 在数组开头插入元素
  addFirst(item) {
    this.add(0, item);
  }

  // 获取指定位置的元素
  get(index) {
    if (index < 0 || index >= this.size) {
      throw new Error('Add failed Require index >= 0 and index < size');
    }

    return this.data[index];
  }

  // 获取数组最后一个元素
  getLast() {
    return this.data[this.size];
  }

  // 获取数组第一个元素
  getFirst() {
    return this.data[0];
  }

  // 改变某一个位置的元素
  set(index, item) {
    if (index < 0 || index >= this.size) {
      throw new Error('Add failed Require index >= 0 and index < size');
    }

    this.data[index] = item;
  }

  // 数组是否包含某个元素
  contains(item) {
    for (let i = 0; i < this.size; i++) {
      if (this.data[i] === item) {
        return true;
      }
    }
    return false;
  }

  // 删除指定位置的元素
  remove(index) {
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
  removeLast() {
    return this.remove(this.size);
  }

  // 删除数组第一个元素
  removeFirst() {
    return this.remove(0);
  }

  // 查找某个元素在数组中德位置
  find(item) {
    for (let i = 0; i < this.size; i++) {
      if (this.data[i] === item) {
        return i;
      }
    }
    return -1;
  }

  // 根据某个元素来删除
  removeElement(item) {
    const index = this.find(item);
    if (index !== -1) {
      this.remove(index);
      return index;
    }
  }

  // 交换数组中两个位置的元素
  swap(i, j) {
    if (i < 0 || i >= this.size || j < 0 || j >= this.size) {
      throw new Error('Index is illegal.')
    }

    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }

  // 将数组转为字符串
  toString() {
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
