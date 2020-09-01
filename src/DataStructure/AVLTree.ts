// 数据结构 —— 自平衡树树（AVL - Adelson-Velskii-Landi）
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

    // 左左平衡
    if (balanceFactor > 1 && this.getBalanceFactor(node.left) >= 0) {
      return this.rightRotate(node);
    }
    // 右右平衡
    if (balanceFactor < -1 && this.getBalanceFactor(node.right) <= 0) {
      return this.leftRotate(node);
    }
    // 有拐点左右平衡
    if (balanceFactor > 1 && this.getBalanceFactor(node.left) < 0) {
      node.left = this.leftRotate(node.left as AVLTreeNode<E>);
      return this.rightRotate(node);
    }
    // 有拐点右左平衡
    if (balanceFactor < -1 && this.getBalanceFactor(node.right) > 0) {
      node.right = this.rightRotate(node.right as AVLTreeNode<E>);
      return this.leftRotate(node);
    }
    return node;
  }


}
