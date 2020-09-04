// 数据结构 —— 红黑树
// 故名思义，即树中的节点不是红的就是黑的，它也是一个自平衡二叉树。上面我们实现了AVL树，我们在向AVL树中插入或移除节点可能会造成旋转，所以我们需要一个包含多次插入和删除的自平衡树，红黑树是比较好的。插入或删除频率比较低，那么AVL树比红黑树更好。
// 红黑树的每个节点都需要遵循以下原则：
// 1. 节点不是红的就是黑的
// 2. 树的根节点是黑的
// 3. 所有叶节点都是黑的
// 4. 如果一个节点是红的，那么它的两个子节点都是黑的
// 5. 不能有两个相邻的红节点，一个红节点不能有红的父节点或子节点
// 6. 从给定的节点找到它的后代节点(NULL叶节点)的所有路径包含相同数量的黑色节点。

// 要验证红黑树是否还是平衡的以及满足它的所有要求，我们需要使用两个概念：重新填色和旋转。
// 在向树中插入节点后，新节点将会是红色。这不会影响黑色节点数量的规则(规则6)，但会影响规则5: 两个后代红节点不能共存。如果插入节点的父节点是黑色，那么没有问题。但是如果插入节点的父节点是红色，那么会违反规则5。要解决这个冲突，我们就只需要改变父节点(红改黑)、祖父节点(黑改红)和叔节点(红改黑)

// 验证红黑树的属性:
// 从插入的节点开始，我们要验证它的父节点是否是红色，以及这个节点不为黑色。

// 验证父节点是祖父节点的左侧子节点还是右侧子节点

// 如果父节点是祖父节点的左侧子节点会有3种情形
// 1. 叔节点是红色，此时我们只需要重新进行填色即可
// 2. 节点是父节点的右侧子节点，此时我们需要进行左旋转
// 3. 节点是父节点的左侧子节点，此时我们需要进行右旋转

// 如果父节点是祖父节点的右侧子节点也会有3种情形
// 1. 叔节点是红色，重新填色即可
// 2. 节点是左侧子节点，右旋转
// 3. 节点是右侧子节点，左旋转

// 设置根节点颜色，由于根节点必须为黑色，我们进行上述操作后，根节点的颜色可能会被改变，因此我们需要将其设为黑色

const RED = true;
const BLACK = false;

/**
 * @description 红黑树节点
 */

export class RBTreeNode<E> {
  value: E;
  left: RBTreeNode<E> | null = null;
  right: RBTreeNode<E> | null = null;
  color: boolean = RED;

  constructor(value: E) {
    this.value = value;
  }
}

export class RedBlackTree<E> {
  private root: RBTreeNode<E> | null;
  private size: number;

  constructor() {
    this.root = null;
    this.size = 0;
  }

  // 判断某个节点是否为红色节点
  private isRed(node: RBTreeNode<E> | null): boolean {
    if (!node) return BLACK;
    return node.color;
  }

  // 左旋转
  private leftRotate(node: RBTreeNode<E>): RBTreeNode<E> {
    const x = node.right as RBTreeNode<E>;
    node.right = x.left;
    x.left = node;
    x.color = node.color;
    node.color = RED;

    return x;
  }

  // 右旋转
  private rightRotate(node: RBTreeNode<E>): RBTreeNode<E> {
    const x = node.left as RBTreeNode<E>;
    node.left = x.right;
    x.right = node;
    x.color = node.color;
    node.color = RED;

    return x;
  }

  // 颜色翻转
  private flipColors(node: RBTreeNode<E>): void {
    node.color = RED;
    if(node.left) node.left.color = BLACK;
    if (node.right) node.right.color = BLACK; 
  }

  // 向node节点插入元素
  private _insert(node: RBTreeNode<E> | null, value: E): RBTreeNode<E> {
    if (!node) {
      this.size++;
      return new RBTreeNode<E>(value);
    }

    if (value < node.value) node.left = this._insert(node.left, value);
    else if (value > node.value) node.right = this._insert(node.right, value);

    if (this.isRed(node.right) && !this.isRed(node.left)) node = this.leftRotate(node);
    if (this.isRed(node.left) && this.isRed((<RBTreeNode<E>>node.left).left))
      node = this.rightRotate(node);
    if (this.isRed(node.left) && this.isRed(node.right)) this.flipColors(node);

    return node;
  }

  // 获取树节点的数量
  public getSize(): number {
    return this.size;
  }

  // 判断树是否为空
  public isEmpty(): boolean {
    return this.size === 0;
  }

  // 向root节点插入元素
  public insert(value: E): void {
    this.root = this._insert(this.root, value);
    this.root.color = BLACK;
  }

}
