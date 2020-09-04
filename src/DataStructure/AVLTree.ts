// 数据结构 —— 自平衡树（AVL - Adelson-Velskii-Landi）
// AVL树是一种自平衡树。添加或移除节点时，AVL树会尝试保持自平衡。任意一个节点（不论
// 深度）的左子树和右子树高度最多相差 1。添加或移除节点时，AVL树会尽可能尝试转换为完全树。

/**
 * @description AVLTree 节点
 */
export class AVLTreeNode<E> {
  value: E;
  left: AVLTreeNode<E> | null = null;
  right: AVLTreeNode<E> | null = null;
  height: number = 1;

  constructor(value: E) {
    this.value = value;
  }
}

/**
 * @description AVLTree
 * 节点高度:
 如以下二叉树:
    _  3  _
    |     |
    2   _ 6 _
        |    |
       _5    7
       |
       4

节点3: 高度为3, 有6 5 4三层子节点
节点2: 高度为0, 没有子节点
节点6: 高度为2, 有5 4两层子节点
...

 * 
 */
export class AVLTree<E> {
  private root: AVLTreeNode<E> | null = null;
  private size: number = 0;

  // 返回节点高度
  private getHeight(node: AVLTreeNode<E> | null): number {
    if (!node) return 0;
    return node.height;
  }

  // 计算平衡因子(即左右子节点的高度差)
  // 差值应为 0、1 或-1, 否则需要平衡该AVL树
  private getBalanceFactor(node: AVLTreeNode<E> | null): number {
    if (!node) return 0;
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  // 将 nodeY 右旋转，返回旋转后的根节点，平衡树的一种方式
  private rightRotate(nodeY: AVLTreeNode<E>): AVLTreeNode<E> {
    const nodeX = nodeY.left as AVLTreeNode<E>;
    const nodeZ = nodeX.right;

    nodeX.right = nodeY;
    nodeY.left = nodeZ;

    // 找出左右树中最高的高度 + 1 = 这个节点的高度
    nodeY.height = Math.max(this.getHeight(nodeY.left), this.getHeight(nodeY.right)) + 1;
    nodeX.height = Math.max(this.getHeight(nodeX.left), this.getHeight(nodeX.right)) + 1;

    return nodeX;
  }

  // 将 nodeY 左旋转，返回旋转后的根节点，平衡树的一种方式
  private leftRotate(nodeY: AVLTreeNode<E>): AVLTreeNode<E> {
    const nodeX = nodeY.right as AVLTreeNode<E>;
    const nodeZ = nodeX.left;

    nodeX.left = nodeY;
    nodeY.right = nodeZ;

    // 找出左右树中最高的高度 + 1 = 这个节点的高度
    nodeY.height = Math.max(this.getHeight(nodeY.left), this.getHeight(nodeY.right)) + 1;
    nodeX.height = Math.max(this.getHeight(nodeX.left), this.getHeight(nodeX.right)) + 1;

    return nodeX;
  }

  // 平衡维护
  private maintain(node: AVLTreeNode<E> | null): AVLTreeNode<E> | null {
    if (!node) return null;

    const balanceFactor = this.getBalanceFactor(node);

    // 左-左(LL): 向右的单旋转
    // 当节点的左侧子节点的高度大于右侧子节点的高度时，并且左侧子节点也是平衡或左侧较重，此时就需要对平衡树进行LL操作
    if (balanceFactor > 1 && this.getBalanceFactor(node.left) >= 0) {
      return this.rightRotate(node);
    }
    // 右-右(RR): 向左的单旋转
    // 当节点右侧子节点的高度大于左侧子节点的高度时，并且右侧子节点也是平衡或右侧较重，此时就需要对平衡树进行RR操作
    if (balanceFactor < -1 && this.getBalanceFactor(node.right) <= 0) {
      return this.leftRotate(node);
    }
    // 左-右(LR): 有左拐点就左右旋
    // 当左侧子节点的高度大于右侧子节点的高度时，并且左侧子节点右侧较重，此时就需要对平衡树进行左旋转来修复，这样就会形成左-左的情况，然后在对不平衡的节点进行一个右旋转来修复
    if (balanceFactor > 1 && this.getBalanceFactor(node.left) < 0) {
      node.left = this.leftRotate(node.left as AVLTreeNode<E>);
      return this.rightRotate(node);
    }
    // 右-左(RL): 有右拐点就右左旋
    // 当右侧子节点的高度大于左侧子节点的高度时，并且右侧子节点左侧较重，此时就需要对平衡树进行右旋转进行修复，这样会形成右-右的情况，然后在对不平衡的节点进行一个左旋转来修复
    if (balanceFactor < -1 && this.getBalanceFactor(node.right) > 0) {
      node.right = this.rightRotate(node.right as AVLTreeNode<E>);
      return this.leftRotate(node);
    }
    return node;
  }

  // 查找node中的最小节点
  private _findMinNode(node: AVLTreeNode<E>): AVLTreeNode<E> {
    if (!node) throw new Error('AVLTree is Empty!');

    if (node.left) node.left = this._findMinNode(node.left);
    return node;
  }

  // 在node节点中插入元素
  private _insert(node: AVLTreeNode<E> | null, value: E): AVLTreeNode<E> | null {
    if (!node) {
      this.size++;
      return new AVLTreeNode<E>(value);
    }

    if (value < node.value) node.left = this._insert(node.left, value);
    else if (value > node.value) node.right = this._insert(node.right, value);

    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    return this.maintain(node);
  }

  // 根据value值删除node节点中的元素
  private _remove(node: AVLTreeNode<E> | null, value: E): AVLTreeNode<E> | null {
    if (!node) return null;

    let retNode: AVLTreeNode<E> | null;

    if (value < node.value) {
      node.left = this._remove(node.left, value);
      retNode = node;
    } else if (value > node.value) {
      node.right = this._remove(node.right, value);
      retNode = node;
    } else {
      if (node.left === null) {
        const rightNode = node.right;
        node.right = null;
        this.size--;
        retNode = rightNode;
      } else if (node.right === null) {
        const leftNode = node.left;
        node.left = null;
        this.size--;
        retNode = leftNode;
      } else {
        const successor = this._findMinNode(node.right);
        successor.right = this._remove(node.right, successor.value);
        successor.left = node.left;

        node.left = node.right = null;
        retNode = successor;
      }
    }

    return this.maintain(retNode);
  }

  // 将树的节点的值从小到大排列
  private midTravers(node: AVLTreeNode<E> | null, array: E[]): void {
    if (!node) return;

    this.midTravers(node.left, array);
    array.push(node.value);
    this.midTravers(node.right, array);
  }

  // 获取树的节点数量
  public getSize(): number {
    return this.size;
  }

  // 判断树是否为空
  public isEmpty(): boolean {
    return this.size === 0;
  }

  // 在root中插入节点
  public insert(value: E): void {
    this.root = this._insert(this.root, value);
  }

  // 在root中删除某个节点
  public remove(value: E): void {
    this.root = this._remove(this.root, value);
  }

  // 判断是否为BST树
  public isBST(): boolean {
    const values = new Array<E>();

    this.midTravers(this.root, values);
    for (let i = 0; i <= values.length; i++) {
      if (values[i - 1] > values[i]) return false;
    }

    return true;
  }

  // 判断node节点是否平衡
  public isBalanced(node: AVLTreeNode<E> | null = this.root): boolean {
    if (!node) return true

    const balanceFactor = this.getBalanceFactor(node)
    if (Math.abs(balanceFactor) > 1) return false

    return this.isBalanced(node.left) && this.isBalanced(node.right)
  }

}

// const aVLTree = new AVLTree<number>();
// aVLTree.insert(0);
// aVLTree.insert(1);
// aVLTree.insert(2);
// aVLTree.remove(1);

// console.log(aVLTree);
// console.log(aVLTree.isBST());

