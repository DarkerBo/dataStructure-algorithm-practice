// 数据结构 —— 字典 ES6 已经内置有Map WeekMap这种数据结构

/** 有关字典的方法
 * (由于ES6的Map已经内置了这些方法，下面就不实现了)
 * set(key,value)：向字典中添加新元素。如果 key 已经存在，那么已存在的 value 会被新的值覆盖。
 * remove(key)：通过使用键值作为参数来从字典中移除键值对应的数据值。
 * hasKey(key)：如果某个键值存在于该字典中，返回 true，否则返回 false。
 *  get(key)：通过以键值作为参数查找特定的数值并返回。
 * clear()：删除该字典中的所有值。
 * size()：返回字典所包含值的数量。与数组的 length 属性类似。
 * isEmpty()：在 size 等于零的时候返回 true，否则返回 false。
 * keys()：将字典所包含的所有键名以数组形式返回。
 * values()：将字典所包含的所有数值以数组形式返回。
 * keyValues()：将字典中所有[键，值]对返回。
 * forEach(callbackFn)：迭代字典中所有的键值对。callbackFn 有两个参数：key 和value。该方法可以在回调函数返回 false 时被中止（和 Array 类中的 every 方法相似
 */

 /**
 * @description 映射的方法接口
 */
  interface _Map<K, V> {
    put(key: K, value: V): void
    remove(key: K): V | null
    contains(key: K): boolean
    get(key: K): V | null
    set(key: K, newValue: V): void
    getSize(): number
    isEmpty(): boolean
  }

 /**
 * @description 链表映射的节点
 */

export class ListMapNode<K, V> {
  key: K | null;
  value: V | null;
  next: ListMapNode<K, V> | null;

  constructor(key: K | null = null, value: V | null = null, next: ListMapNode<K, V> | null = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }

  public toStrint(): string {
    if (typeof this.key === 'string' && typeof this.value === 'string') {
      return `${this.key.toString()} : ${this.value.toString()}`;
    }

    return '';
  }
}

/**
 * @description 基于链表的映射
 */

export class LinkedListMap<K, V> implements _Map<K, V> {
  private dummyHead: ListMapNode<K, V>;
  private size: number;

  constructor() {
    this.dummyHead = new ListMapNode();
    this.size = 0;
  }

  // 根据key获取节点
  private getMapNode(key: K): ListMapNode<K, V> | null {
    let cur = this.dummyHead.next;
    
    while(cur) {
      if (cur.key === key) return cur;
      cur = cur.next;
    }

    return null;
  }

  // 返回链表长度
  public getSize(): number {
    return this.size;
  }

  // 判断链表长度是否为空
  public isEmpty(): boolean {
    return this.size === 0;
  }

  // 是否包含某个key的节点
  public contains(key: K): boolean {
    return this.getMapNode(key) !== null;
  }

  // 根据key获取对应节点的value值
  public get(key: K): V | null {
    const mapNode = this.getMapNode(key);
    return mapNode === null ? null : mapNode.value;
  }

  // 根据key和value增加节点，若key已存在，则更改其value值
  public put(key: K, value: V): void {
    const mapNode = this.getMapNode(key);

    if (!mapNode) {
      this.dummyHead.next = new ListMapNode(key, value, this.dummyHead.next);
      this.size++;
    } else {
      mapNode.value = value;
    }
  }

  // 根据key更改value值
  public set(key: K, newValue: V): void {
    const mapNode = this.getMapNode(key);
    if (!mapNode) throw new Error(`${key} doesn't exist!`);
    mapNode.value = newValue;
  }

  // 根据key值删除节点
  public remove(key: K): V | null {
    let prev = this.dummyHead;
    while(prev.next) {
      if (prev.next.key === key) break;
      prev = prev.next;
    }

    if (prev.next) {
      const deleteNode = prev.next;
      prev.next = deleteNode.next;
      deleteNode.next = null;
      this.size--;

      return deleteNode.value;
    }

    return null;
  }

}

// const linkedListMap = new LinkedListMap();
// linkedListMap.put('key1', 'value1');
// linkedListMap.put('key2', 'value2');
// linkedListMap.put('key2', 'value3');
// console.log(linkedListMap.contains('key2'));
// console.log(linkedListMap.getSize());
// console.log(linkedListMap.isEmpty());
// console.log(linkedListMap.get('key1'));
// linkedListMap.set('key2', '111');
// console.log(linkedListMap);
// console.log(linkedListMap.remove('key2'));


 
