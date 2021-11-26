// LRU算法
/*
LRU 算法就是一种缓存淘汰策略，原理不难，但是面试中写出没有 bug 的算法比较有技巧，需要对数据结构进行层层抽象和拆解，本文 labuladong 就给你写一手漂亮的代码。

计算机的缓存容量有限，如果缓存满了就要删除一些内容，给新内容腾位置。但问题是，删除哪些内容呢？我们肯定希望删掉哪些没什么用的缓存，而把有用的数据继续留在缓存里，方便之后继续使用。那么，什么样的数据，我们判定为「有用的」的数据呢？

LRU 缓存淘汰算法就是一种常用策略。LRU 的全称是 Least Recently Used，也就是说我们认为最近使用过的数据应该是是「有用的」，很久都没用过的数据应该是无用的，内存满了就优先删那些很久没用过的数据。

举个简单的例子，安卓手机都可以把软件放到后台运行，比如我先后打开了「设置」「手机管家」「日历」，那么现在他们在后台排列的顺序是这样的：
设置(后)  管家  日历(前)

但是这时候如果我访问了一下「设置」界面，那么「设置」就会被提前到第一个，变成这样：
管家(后)  日历  设置(前)

假设我的手机只允许我同时开 3 个应用程序，现在已经满了。那么如果我新开了一个应用「时钟」，就必须关闭一个应用为「时钟」腾出一个位置，关那个呢？

按照 LRU 的策略，就关最底下的「手机管家」，因为那是最久未使用的，然后把新开的应用放到最上面：
日历(后)  设置  时钟(前)

现在你应该理解 LRU（Least Recently Used）策略了。当然还有其他缓存淘汰策略，比如不要按访问的时序来淘汰，而是按访问频率（LFU 策略）来淘汰等等，各有应用场景。本文讲解 LRU 算法策略。

一、LRU 算法描述
力扣第 146 题「LRU缓存机制」就是让你设计数据结构：

首先要接收一个 capacity 参数作为缓存的最大容量，然后实现两个 API，一个是 put(key, val) 方法存入键值对，另一个是 get(key) 方法获取 key 对应的 val，如果 key 不存在则返回 -1。

注意哦，get 和 put 方法必须都是 O(1) 的时间复杂度，我们举个具体例子来看看 LRU 算法怎么工作。

// 缓存容量为 2
LRUCache cache = new LRUCache(2);
// 你可以把 cache 理解成一个队列
// 假设左边是队头，右边是队尾
// 最近使用的排在队头，久未使用的排在队尾
// 圆括号表示键值对 (key, val)

cache.put(1, 1);
// cache = [(1, 1)]

cache.put(2, 2);
// cache = [(2, 2), (1, 1)]

cache.get(1);       // 返回 1
// cache = [(1, 1), (2, 2)]
// 解释：因为最近访问了键 1，所以提前至队头
// 返回键 1 对应的值 1

cache.put(3, 3);
// cache = [(3, 3), (1, 1)]
// 解释：缓存容量已满，需要删除内容空出位置
// 优先删除久未使用的数据，也就是队尾的数据
// 然后把新的数据插入队头

cache.get(2);       // 返回 -1 (未找到)
// cache = [(3, 3), (1, 1)]
// 解释：cache 中不存在键为 2 的数据

cache.put(1, 4);    
// cache = [(1, 4), (3, 3)]
// 解释：键 1 已存在，把原始值 1 覆盖为 4
// 不要忘了也要将键值对提前到队头

二、LRU 算法设计
分析上面的操作过程，要让 put 和 get 方法的时间复杂度为 O(1)，我们可以总结出 cache 这个数据结构必要的条件：

1、显然 cache 中的元素必须有时序，以区分最近使用的和久未使用的数据，当容量满了之后要删除最久未使用的那个元素腾位置。
2、我们要在 cache 中快速找某个 key 是否已存在并得到对应的 val；
3、每次访问 cache 中的某个 key，需要将这个元素变为最近使用的，也就是说 cache 要支持在任意位置快速插入和删除元素。

那么，什么数据结构同时符合上述条件呢？哈希表查找快，但是数据无固定顺序；链表有顺序之分，插入删除快，但是查找慢(时间大于O1)。所以结合一下，形成一种新的数据结构：哈希链表 LinkedHashMap。

【注意：JS使用Map就ok，因为增删改查时间复杂度都为O(1)】

LRU 缓存算法的核心数据结构就是哈希链表，双向链表和哈希表的结合体。这个数据结构长这样：

      key1         key2          key3         key4    (哈希表)
  指向链表key2  指向链表key1   指向链表key4    指向链表key3

表头 <=> key1(value1) <=> key2(value2) <=> key3(value3) <=> key4(value4) <=> 表尾  (双向链表)

借助这个结构，我们来逐一分析上面的 3 个条件：
1、如果我们每次默认从链表尾部添加元素，那么显然越靠尾部的元素就是最近使用的，越靠头部的元素就是最久未使用的。
2、对于某一个 key，我们可以通过哈希表快速定位到链表中的节点，从而取得对应 val。
3、链表显然是支持在任意位置快速插入和删除的，改改指针就行。只不过传统的链表无法按照索引快速访问某一个位置的元素，而这里借助哈希表，可以通过 key 快速映射到任意一个链表节点，然后进行插入和删除。
也许读者会问，为什么要是双向链表，单链表行不行？另外，既然哈希表中已经存了 key，为什么链表中还要存 key 和 val 呢，只存 val 不就行了？

不用单链表的原因：在链表末尾添加元素比较麻烦，时间复杂度不为O(1)。

链表中存key的原因：删除链表第一个元素(最久没有使用的元素)的时候，获取被删除元素的key，利用它同时删除哈希表中的key链接

想的时候都是问题，只有做的时候才有答案。这样设计的原因，必须等我们亲自实现 LRU 算法之后才能理解，所以我们开始看代码吧～

【其实JS内置了Map数据结构，可以直接使用该数据结构】

*/

export class LRUCache<K, V> {
  // 私有化属性，防止实例访问这些属性
  private cache: Map<K, { date: Date; value: V }>; // 缓存，里面包含过期时间和缓存值
  private capacity: number; // 最大缓存的容量
  private expire: number; // 过期时间
  private deleteCallback: ((value: V) => void) | null; // 删除缓存回调

  constructor(capacity: number, expire = 30 * 60 * 1000, deleteCallback?: (value: V) => void) {
    this.cache = new Map();
    this.capacity = capacity;
    this.expire = expire;
    this.deleteCallback = deleteCallback || null;
  }

  get(key: K): V | undefined {
    const entity = this.cache.get(key);

    if (entity) {
      const { date, value } = entity;
      
      // 超时处理
      if (Date.now() - date.getTime() > this.expire) {
        // 超时了需要删除回调，做错误原因打印之类的操作
        this.delete(key);
        return undefined;
      }

      // 正确获取值的话就直接删除就ok，不需要回调
      this.cache.delete(key);
      // 这里注意需要更新时间
      this.cache.set(key, { date: new Date(), value });
      return value;
    }
  }

  delete(key: K): void {
    const entity = this.cache.get(key);

    if (entity) {
      const { value } = entity;
      this.deleteCallback?.(value);
      this.cache.delete(key);
    }
  }

  put(key: K, value: V): void {
    if (this.cache.has(key)) {
      // 有的话直接删除即可，不是错误需要回调函数
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // 超出最大容量就需要错误回调了
      const firstKey = this.cache.keys().next().value;
      this.delete(firstKey);
    }
    // 每次set的时候都要记住更新一下时间
    this.cache.set(key, { date: new Date(), value });
  }
}


