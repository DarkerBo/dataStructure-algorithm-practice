
// 数据结构 —— 树 插入或删除元素的时间复杂度为O(1),访问元素的时间复杂度为O(n)
// 二叉树中的节点最多只能有两个子节点：一个是左侧子节点，另一个是右侧子节点。这个定义有助于我们写出更高效地在树中插入、查找和删除节点的算法。
// 二叉搜索树（BST）是二叉树的一种，但是只允许你在左侧节点存储（比父节点）小的值，在右侧节点存储（比父节点）大的值
// 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值，若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值。

import { ArrayQueue } from './Queue';
import { ArrayStack } from './Stack';

/**
 * @description 二分树节点
 */
export class BinaryTreeNode<E> {
  element: E;
  left: BinaryTreeNode<E> | null;
  right: BinaryTreeNode<E> | null;

  constructor(element: E) {
    this.element = element;
    this.left = null;
    this.right = null;
  }
}

/**
 * @description 二分搜索树（BinarySearchTree）
 */
export class BST<E> {
  private root: BinaryTreeNode<E> | null;
  private size: number;

  constructor() {
    this.root = null;
    this.size = 0;
  }

  // 根据element的值的大小查找二分搜索树对应的位置(左树还是右树)
  private _insert(node: BinaryTreeNode<E> | null, element: E): BinaryTreeNode<E> {
    if (node === null) {
      this.size++;
      return new BinaryTreeNode<E>(element);
    }

    if (element < node.element) {
      node.left = this._insert(node.left, element);
    } else if (element > node.element) {
      node.right = this._insert(node.right, element);
    }

    return node;
  }

  // 根据element的值的大小查找
  private _contains(node: BinaryTreeNode<E> | null, element: E): boolean {
    if (node === null) return false;

    if (node.element === element) return true;
    else if (element < node.element) return this._contains(node.left, element);
    else return this._contains(node.right, element);
  }

  // 查找最小值的节点
  private _findMinNode(node: BinaryTreeNode<E> | null): BinaryTreeNode<E> {
    if (node === null) throw new Error('BST is Empty!');

    if (node.left) return this._findMinNode(node.left);
    return node;
  }



  // 删除最小值的节点,如果left为空，那最小那个就是父节点了，然后就把父节点删除，right就为root
  // right为null的话，root也变成null了, 如果right有值，那就把值赋给root
  private _removeMin(node: BinaryTreeNode<E>): BinaryTreeNode<E> | null {
    if (node.left === null) {
      const rightNode = node.right;
      node.right === null;
      this.size--;
      return rightNode;
    }

    node.left = this._removeMin(node.left);
    return node;
  }

  // 与上面同理，left为null的话，root也变成null了, 如果left有值，那就把值赋给root
  private _removeMax(node: BinaryTreeNode<E>): BinaryTreeNode<E> | null {
    if (node.right === null) {
      const leftNode = node.left;
      node.left === null;
      this.size--;
      return leftNode;
    }

    node.right = this._removeMax(node.right);
    return node;
  }

  // 根据指点元素删除节点
  private _remove(node: BinaryTreeNode<E> | null, element: E): BinaryTreeNode<E> | null {
    if (!node) return null;

    if (element < node.element) { 
      node.left = this._remove(node.left, element);
      return node;
    } else if (element > node.element) {
      node.right = this._remove(node.right, element);
      return node;
    } else {
      if (node.left === null) {
        const rightNode = node.right;
        node.right = null;
        this.size--;
        return rightNode;
      }

      if (node.right === null) {
        const leftNode = node.left;
        node.left = null;
        this.size--;
        return leftNode;
      }

      // 左右子树均不为空，找到比待删除节点大的最小节点，并用该节点替换待删除节点
      const successor = this._findMinNode(node.right); // 获取右子树最小节点替换待删除节点
      successor.right = this._removeMin(node.right); // 删除右子树最小节点(但仍比左子树所有节点都要大)
      successor.left = node.left; 

      node.left = node.right = null;

      return successor;
    }
  }

  // 获取长度
  public getSize(): number {
    return this.size
  }

  // 判断是否为空
  public isEmpty(): boolean {
    return this.size === 0
  }

  // 递归(Recursive)方式插入新元素
  public insert(element: E) {
    this.root = this._insert(this.root, element);
  }

  // 非递归方式插入新元素
  public insertNR(element: E): void {
    const newNode = new BinaryTreeNode<E>(element);

    if (this.root === null) {
      this.root = newNode;
      this.size++;
      return;
    }

    let current: BinaryTreeNode<E> | null = this.root;

    while (current) {
      if (element < current.element) {
        if (current.left === null) {
          current.left = newNode;
          this.size++;
          break;
        }
        current = current.left;
      } else if (element > current.element) {
        if (current.right === null) {
          current.right = newNode;
          this.size++;
          break;
        }
        current = current.right;
      } else return;
    }
  }

  // 判断某元素是否包含在树中
  public contains(e: E): boolean {
    return this._contains(this.root, e)
  }

  // 前序遍历
  public frontTravers(node: BinaryTreeNode<E> | null = this.root): void {
    if (!node) return;

    console.log(node.element);
    this.frontTravers(node.left);
    this.frontTravers(node.right);
  }

  // 中序遍历
  public middleTravers(node: BinaryTreeNode<E> | null = this.root): void {
    if (!node) return;

    this.middleTravers(node.left);
    console.log(node.element);
    this.middleTravers(node.right);
  }

  // 后序遍历
  public backTravers(node: BinaryTreeNode<E> | null = this.root): void {
    if (!node) return;

    this.backTravers(node.left);
    this.backTravers(node.right);
    console.log(node.element);
  }

  // 非递归前序遍历
  public frontTraversNR(): void {
    const stack = new ArrayStack<BinaryTreeNode<E> | null>();
    stack.push(this.root);

    while (!stack.isEmpty()) {
      const current = stack.pop() as BinaryTreeNode<E>;
      console.log(current.element);

      if (current.right) stack.push(current.right);
      if (current.left) stack.push(current.left);
    }
  }

  // 层序遍历
  public levelTravers(): void {
    const queue = new ArrayQueue<BinaryTreeNode<E> | null>();
    queue.enqueue(this.root);

    while (!queue.isEmpty()) {
      const current = queue.dequeue() as BinaryTreeNode<E>;
      console.log(current.element);

      if (current.left) queue.enqueue(current.left);
      if (current.right) queue.enqueue(current.right);
    }
  }

  // 非递归方式找出最小值
  public findMin(): E {
    if (!this.root) throw new Error('BST is empty!');

    let current = this.root;

    while (current) {
      if (!current.left) break;
      current = current.left;
    }
    return current.element;
  }

  // 递归方式找出最小值
  public findMinWR(node: BinaryTreeNode<E> | null = this.root): E | null {
    if (!node) return null;

    if (!node.left) return node.element;
    else return this.findMinWR(node.left);
  }

  // 非递归方式找出最小值
  public findMax(): E {
    if (!this.root) throw new Error('BST is empty!');

    let current = this.root;

    while (current) {
      if (!current.right) break;
      current = current.right;
    }
    return current.element;
  }

  // 删除树最小节点
  public removeMin() {
    const ret = this.findMin();
    this.root = this._removeMin(this.root as BinaryTreeNode<E>);
    return ret;
  }

  // 删除树最大节点
  public removeMax() {
    const ret = this.findMax();
    this.root = this._removeMax(this.root as BinaryTreeNode<E>);
    return ret;
  }

  // 根据元素删除节点
  public remove(e: E): void {
    this.root = this._remove(this.root, e);
  }

}

const binaryTree = new BST<number>();
binaryTree.insert(5);
binaryTree.insert(4);
binaryTree.insert(3);
binaryTree.insert(2);
binaryTree.insert(1);
binaryTree.insert(0);
binaryTree.removeMin();

// binaryTree.insert(0);
// binaryTree.insert(1);
// binaryTree.insert(2);
// binaryTree.insert(3);
// binaryTree.insert(4);
// binaryTree.insert(5);
// binaryTree.removeMax();

// binaryTree.insert(23);
// binaryTree.insert(16);
// binaryTree.insert(45);
// binaryTree.removeMax();

console.log(binaryTree);

