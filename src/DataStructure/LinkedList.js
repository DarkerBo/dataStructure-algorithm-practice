// 数据结构 —— 链表 插入或删除元素的时间复杂度为O(1),访问元素的时间复杂度为O(n)

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
 */

class LinkedList {
  constructor() {
    // 头部节点是一开始就存在的，不属于节点的增删改查讨论范围
    this.headNode = new LinkedListNode(null, null);
    this.size = 0; 
  }

  // 向链表的特定位置插入一个新元素
  add(index, element) {
    if (index < 0 || index > this.size) {
      throw new Error('Add failed. Illegal index.');
    }

    let prev = this.headNode;
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
  addLast() {
    this.add(this.size, element);
  }

  // 返回链表中特定位置的元素
  get(index) {
    if (index < 0 || index >= this.size) {
      throw new Error('Add failed. Illegal index.');
    }

    let cur = this.headNode;
    for (let i = 0; i < index; i++) {
      cur = cur.next; 
    }

    // headNode不参与计算，因此访问的是next的元素
    return cur.next.element;
  }

  // 返回链表中第一个节点的元素
  getFirst() {
    return this.get(0);
  }

  // 返回链表中最后一个节点的元素
  getLast() {
    return this.get(this.size - 1);
  }

  getElement() {
    
  }

  // 从链表中移除指定位置的元素,并返回被移除的节点的元素
  remove(index) {
    if (index < 0 || index >= this.size) {
      throw new Error('Add failed. Illegal index.');
    }

    let prev = this.headNode;
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
    this.remove(0);
  }

  // 删除链表中最后一个节点并返回被删除节点的元素
  removeLast() {
    this.remove(this.size - 1);
  }

  // 根据元素删除链表的节点
  removeElement(element) {
    let prev = this.headNode;

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

  // 返回元素在链表中的索引。如果链表中没有该元素则返回 -1 
  indexOf(element) {

  }

  // 如果链表中不包含任何元素，返回 true ，如果链表长度大于0则返回 false
  isEmpty() {

  }

  // 返回链表包含的元素个数，与数组的 length 属性类似
  getSize() {

  }

  toString() {

  }


}

