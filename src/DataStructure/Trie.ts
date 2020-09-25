// 数据结构 —— 字典树
// Trie 树，又称前缀树，字段典树，或单词查找树，是一种树形结构，也是哈希表的变种，它是一种专门处理字段串匹配的数据结构，用来解决在一组字符串集合中快速查找某个字符串的问题，主要被搜索引擎用来做文本词频的统计
// 根节点不包含字符，除根节点意外每个节点只包含一个字符。
// 从根节点到某一个节点，路径上经过的字符连接起来，为该节点对应的字符串。
// 每个节点的所有子节点包含的字符串不相同。
// 如果字符的种数为n，则每个结点的出度为n，这也是空间换时间的体现，浪费了很多的空间。
// 插入查找的复杂度为O(n)，n为字符串长度

/**
 * @description Trie 节点类
 * isWord 连接到该节点是否成为一个单词
 */
export class TrieNode {
  isWord: boolean;
  next: Map<string, TrieNode>;

  constructor(isWord: boolean = false) {
    this.isWord = isWord;
    this.next = new Map<string, TrieNode>();
  }
}

/**
 * @description Trie 字典树
 */
export class TrieTree {
  private root: TrieNode;
  private size: number;

  constructor() {
    this.root = new TrieNode();
    this.size = 0;
  }

  // 获取当前节点数量
  public getSize(): number {
    return this.size;
  }

  // 向树中存储一个单词
  public insert(word: string): void {
    let current = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word.charAt(i);
      
      if (!current.next.get(char)) current.next.set(char, new TrieNode());
      current = current.next.get(char) as TrieNode;
    }

    if (!current.isWord) {
      current.isWord = true;
      this.size++;
    }
  }

  // 搜索树中是否包含某个单词
  public search(word: string): boolean {
    let current = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word.charAt(i);
      
      if (!current.next.get(char)) return false;
      current = current.next.get(char) as TrieNode;
    }

    return current.isWord;
  }

  // 根据单词前缀搜索树中是否包含
  public startWith(prefix: string): boolean {
    let current = this.root;

    for (let i = 0; i < prefix.length; i++) {
      const char = prefix.charAt(i);

      if (!current.next.get(char)) return false;
      current = current.next.get(char) as TrieNode;
    }

    return true;
  }
}
