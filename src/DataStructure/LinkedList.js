// 数据结构 —— 链表 插入或删除元素的时间复杂度为O(1),访问元素的时间复杂度为O(n)
// (1) 单向链表 在链表中，一个节点只有链向下一个节点的链接。
// (2) 双向链表 链接是双向的：一个链向下一个元素，另一个链向前一个元素。

/**
 * @description 单向链表节点
 */

class LinkedListNode {
  constructor(element, next) {
    this.element = element;
    this.next = next;
  }
}

/**
 * @description 单向链表
 * cur代表最新节点，从 head.next 计算
 * prev代表上一个节点，从 head 计算
 */

class LinkedList {
  constructor() {
    // 头部节点是一开始就存在的，不属于节点的增删改查讨论范围
    this.head = new LinkedListNode(null, null);
    this.size = 0; 
  }

  // 获取链表长度
  getSize() {
    return this.size;
  }

  // 判断链表是否为空
  isEmpty() {
    return this.size === 0;
  }

  // 向链表的特定位置插入一个新元素
  add(index, element) {
    if (index < 0 || index > this.size) {
      throw new Error('Add failed. Illegal index.');
    }

    let prev = this.head;
    for (let i = 0; i < index; i++) {
      prev = prev.next;
    }

    prev.next = new LinkedListNode(element, prev.next);
    this.size++;
  }

  // 向链表头部添加一个新元素
  addFirst(element) {
    this.add(0, element);
  }

  // 向链表尾部添加一个新元素
  addLast(element) {
    this.add(this.size, element);
  }

  // 返回链表中特定位置的元素
  get(index) {
    if (index < 0 || index >= this.size) {
      throw new Error('Add failed. Illegal index.');
    }

    let prev = this.head;
    for (let i = 0; i < index; i++) {
      prev = prev.next; 
    }

    // head不参与计算，因此访问的是next的元素
    return prev.next.element;
  }

  // 返回链表中第一个节点的元素
  getFirst() {
    return this.get(0);
  }

  // 返回链表中最后一个节点的元素
  getLast() {
    return this.get(this.size - 1);
  }

  // 判断链表是否包含某元素
  containsElement(element) {
    // head不参与计算，因此从head的下一个节点开始计算
    let cur = this.head.next;

    while(cur !== null) {
      if (cur.element === element) return true;

      cur = cur.next;
    }

    return false;
  }

  // 从链表中移除指定位置的元素,并返回被移除的节点的元素
  remove(index) {
    if (index < 0 || index >= this.size) {
      throw new Error('Add failed. Illegal index.');
    }

    let prev = this.head;
    for (let i = 0; i < index; i++) {
      prev = prev.next;
    }
    const retNode = prev.next;
    prev.next = retNode.next;
    retNode.next = null;
    this.size--;

    return retNode.element;
  }

  // 删除链表中第一个节点并返回被删除节点的元素
  removeFirst() {
    return this.remove(0);
  }

  // 删除链表中最后一个节点并返回被删除节点的元素
  removeLast() {
    return this.remove(this.size - 1);
  }

  // 根据元素删除链表的节点
  removeElement(element) {
    let prev = this.head;

    while(prev.next) {
      if (prev.next.element = element) break;

      prev = prev.next;
    }

    // 兼容空链表还调用该方法的
    if (prev.next !== null) {
      const delNode = prev.next;
      prev.next = delNode.next;
      delNode.next = null;
      this.size--;

    }
  }

  // 修改链表某个节点的elment值
  set(index, element) {
    if (index < 0 || index >= this.size) {
      throw new Error('Add failed. Illegal index.');
    }

    let prev = this.head;
    for (let i = 0; i <= index; i++) {
      prev = prev.next;
    }

    prev.element = element;
  }

  // 返回元素在链表中的索引。如果链表中没有该元素则返回 -1 
  indexOf(element) {
    let cur = this.head;
    let index = 0;

    while(cur.next) {
      if (cur.next.element === element) return index;

      index += 1;
      cur = cur.next;
    }

    return -1;
  }

  toString() {
    let contentMsg = ''

    for (let cur = this.head.next; cur != null; cur = cur.next) {
      contentMsg += `${cur.element} -> `
    }

    return (contentMsg += 'NULL');
  }
}

// const linkedList = new LinkedList();
// console.log(linkedList.isEmpty());
// linkedList.addLast(2);
// linkedList.addFirst(0);
// linkedList.add(1, 1)

// console.log(linkedList.getLast());
// console.log(linkedList.get(1));
// console.log(linkedList.containsElement(2));

// console.log(linkedList.remove(1));

// linkedList.add(1, 1);
// linkedList.set(1, 5);
// console.log(linkedList.get(1));
// console.log(linkedList.indexOf(5));
// console.log(linkedList.toString());

/**
 * @description 双向链表节点
 */

class DoublyLinkedListNode {
  constructor(element, next, prev) {
    this.element = element;
    this.next = next || null; // 保证tail的next为null而不是undefined
    this.prev = prev || null; // 保证head的pre为null而不是undefined
  }
}

/**
 * @description 双向链表
 * add get remove 方法和单向链表一样，就不写了
 * 
    0           1           2
--------    --------    --------
|  pre |    |  pre |    |  pre |
--------    --------    --------
|   e  |    |   e  |    |   e  |
--------    --------    --------
| next |    | next |    | next |
--------    --------    --------

  head                    tail     

  1为head, pre指向null, next指向2
  2为普通节点, pre指向1, next指向3
  3为tail, pre指向2, next指向null
 */

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // 获取链表长度
  getSize() {
    return this.size;
  }

  // 判断链表是否为空
  isEmpty() {
    return this.size === 0;
  }

  // 在双向链表前端增加节点
  prepend(element) {
    const newNode = new DoublyLinkedListNode(element);

    if (this.head) {
      this.head.prev = newNode;
      newNode.next = this.head;
    } else {
      this.tail = newNode;
    }

    this.head = newNode;
    this.size++;
  }

  // 在双向链表后端增加节点
  append(element) {
    const newNode = new DoublyLinkedListNode(element);

    if (this.tail) {
      this.tail.next = newNode;
      newNode.prev = this.tail;
    } else {
      this.head = newNode;
    }

    this.tail = newNode;
    this.size++;
  }

  // 删除第一个节点,并返回该节点的elemnt
  deleteHead() {
    if(!this.head) return null;

    const deleteHead = this.head;
    if (this.head.next) {
      this.head = this.head.next;
      this.head.prev = null;
    } else {
      this.head = null;
      this.tail = null;
    }

    this.size--;
    return deleteHead.element;
  }
  
  // 删除最后一个节点,并返回该节点的element
  deleteTail() {
    if (!this.tail) return null;

    const deleteTail = this.tail;
    if (this.head !== this.tail) {
      this.tail = this.tail.prev;
      this.tail.next = null;
    } else {
      this.head = null;
      this.tail = null;
    }

    this.size--;
    return deleteTail.element;
  }

  // 删除含有对应elment的所有节点
  delete(element) {
    if (!this.head) return null;

    let currentNode = this.head;

    while(currentNode) {
      if (currentNode.element === element) {
        if (currentNode === this.head) {
          this.deleteHead();
        } else if (currentNode === this.tail) {
          this.deleteTail();
        } else {
          const deleteNode = currentNode;
          const prevNode = deleteNode.prev;
          const nextNode = deleteNode.next;

          prevNode.next = nextNode;
          nextNode.prev = prevNode;

          this.size--;
        }
      }

      currentNode = currentNode.next;
    }

  }

  toString() {
    let contentMsg = '';
    let current = this.head;

    while (current) {
      contentMsg += `${current.element} <-> `;
      current = current.next;
    }

    return `NULL <-> ${contentMsg} NULL`;
  }


}

// const test = new DoublyLinkedList();
// // test.prepend(2);
// // test.prepend(1);
// test.prepend(0);
// test.delete(0);
// console.log(test.toString());


/**
 * @description 单向循环链表
 * 和单向链表的区别在于最后一个节点的next指向第一个节点
 */

class CircularLinkedList {
   constructor() {
     this.head = null;
     this.size = 0;
   }

   // 获取链表长度
  getSize() {
    return this.size;
  }

  // 判断链表是否为空
  isEmpty() {
    return this.size === 0;
  }

  // 在链表后端增加节点
  append(element) {
    const newNode = new LinkedListNode(element);

    if (!this.head) {
      this.head = newNode;
      this.head.next = this.head;
      this.size++;
    } else {
      let currentNode = this.head;
      while(currentNode.next !== this.head) {
        currentNode = currentNode.next;
      }

      currentNode.next = newNode;
      newNode.next = this.head;
      this.head = newNode;
      this.size++;
    }
  }

  // 删除最后一个节点
  remove() {
    if (!this.head) return null;

    if (this.head.next === this.head) {
      this.head = null;
      this.size--;
      return null;
    } else {
      let currentNode = this.head;
      while(currentNode.next !== this.head) {
        currentNode = currentNode.next;
      }

      const retNode = this.head;

      this.head = this.head.next;
      currentNode.next = this.head;
      this.size--;

      return retNode.element;
    }
  }

  toString() {
    if (!this.head) return '-> ->';

    let contentMsg = '';
    let current = this.head.next;

    while (current && current !== this.head) {
      contentMsg += `${current.element} -> `;
      current = current.next;
    }

    return `-> ${this.head.element} -> ${contentMsg}`;
  }

}

// const test = new CircularLinkedList();
// test.append(0);
// console.log(test.toString());
// console.log(test.remove());
// console.log(test.toString());

module.exports = {
  LinkedList,
  DoublyLinkedList,
  CircularLinkedList,
}
