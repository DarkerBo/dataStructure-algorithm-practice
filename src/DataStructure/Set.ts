// 数据结构 —— 集合 ES6 已经内置有Set WeekSet这种数据结构
/** 有关集合的方法
 * (由于ES6的Set已经内置了这些方法，下面就不实现了)
 * add(element)：向集合添加一个新元素。
 * delete(element)：从集合移除一个元素。
 * has(element)：如果元素在集合中，返回 true，否则返回 false。
 * clear()：移除集合中的所有元素。
 * size()：返回集合所包含元素的数量。它与数组的 length 属性类似。
 * values()：返回一个包含集合中所有值（元素）的数组。
*/

// 我们已经学习过，集合数据结构不允许存在重复的元素。但是，在数学中，有一个叫作多重
// 集的概念，它允许我们向集合中插入之前已经添加过的元素。多重集（或袋）在计算集合中元素
// 的出现次数时很有用。它也在数据库系统中得到了广泛运用。

import { LinkedList } from './LinkedList';

// 两个集合的并集运算
export function union<E>(setA: Set<E>, setB: Set<E>): Set<E> {
  return new Set([...setA, ...setB]);
}

// 两个集合的交集运算
export function intersection<E>(setA: Set<E>, setB: Set<E>): Set<E> {
  return new Set([...setA].filter((item) => setB.has(item)));
}

// 两个集合的差集运算
export function difference<E>(setA: Set<E>, setB: Set<E>) {
  return new Set([...setA].filter((item) => !setB.has(item)));
}

/**
 * @description 基于链表的集合
 */

export class LinkedListSet<E> {
  private list: LinkedList<E>;

  constructor() {
    this.list = new LinkedList();
  }

  public getSize(): number {
    return this.list.getSize();
  }

  public isEmpty(): boolean {
    return this.list.isEmpty();
  }

  public contains(element: E): boolean {
    return this.list.containsElement(element);
  }

  public add(element: E): void {
    if (!this.list.containsElement(element)) {
      this.list.addFirst(element);
    }
  }

  public remove(element: E): void {
    this.list.removeElement(element);
  }

}



