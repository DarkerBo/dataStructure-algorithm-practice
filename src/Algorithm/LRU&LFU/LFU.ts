// LRU算法
/*
从实现难度上来说，LFU 算法的难度大于 LRU 算法，因为 LRU 算法相当于把数据按照时间排序，这个需求借助链表很自然就能实现，
你一直从链表头部加入元素的话，越靠近头部的元素就是新的数据，越靠近尾部的元素就是旧的数据，我们进行缓存淘汰的时候只要简单地将尾部的元素淘汰掉就行了。

而 LFU 算法相当于是淘汰访问频次最低的数据，如果访问频次最低的数据有多条，需要淘汰最旧的数据。把数据按照访问频次进行排序，而且频次还会不断变化，这可不容易实现。

LRU可以理解为按时间顺序，容量满了之后，直接弹出最久没有访问的那个元素

LFU是按频次顺序，容量满了之后，弹出的是访问频次最少的那个元素，如果访问的最低频次相同，才按最低频次中的插入元素的时间排序
比如容量为3的缓存，key为1的被访问了3次，key为2被访问了2次，key为3的被访问了4次
此时如果加新元素的话，被弹出的应该是key为2的元素

一、LFU 算法描述
要求你写一个类，接受一个capacity参数，实现get和put方法：

class LFUCache<K, V> {
  // 构造容量为capacity的缓存
  private capacity: number; // 最大缓存的容量

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  // 在缓存中查询key
  get(key: K) {}

  // 将key和value存入缓存
  put(key: K, value: V) {}
}

get(key)方法会去缓存中查询键key，如果key存在，则返回key对应的value，否则返回 undefined。

put(key, value)方法插入或修改缓存。如果key已存在，则将它对应的值改为value；如果key不存在，则插入键值对(key, value)。

当缓存达到容量capacity时，则应该在插入新的键值对之前，删除使用频次（后文用freq表示）最低的键值对。如果freq最低的键值对有多个，则删除其中最旧的那个。

// 构造一个容量为 2 的 LFU 缓存
LFUCache cache = new LFUCache(2);

// 插入两对 (key, val)，对应的 freq 为 1
cache.put(1, 10);
cache.put(2, 20);

// 查询 key 为 1 对应的 val
// 返回 10，同时键 1 对应的 freq 变为 2
cache.get(1);

// 容量已满，淘汰 freq 最小的键 2
// 插入键值对 (3, 30)，对应的 freq 为 1
cache.put(3, 30);   

// 键 2 已经被淘汰删除，返回 undefined
cache.get(2); 

*/

class LFUCache<K, V> {
  private cache: Map<K, { date: Date; value: V; freq: number }>; // 缓存，里面包含过期时间和缓存值和访问频率
  private minFreq: number; // 最小频次数
  private freqCache: Map<number, Map<K, V>>; // 频次缓存，里面存放各频次的缓存值
  private capacity: number; // 最大缓存的容量
  private expire: number; // 过期时间
  private deleteCallback: ((value: V) => void) | null; // 删除缓存回调

  constructor(
    capacity: number,
    expire = 30 * 60 * 1000,
    deleteCallback?: (value: V) => void
  ) {
    this.cache = new Map();
    this.minFreq = 0;
    this.freqCache = new Map();
    this.capacity = capacity;
    this.expire = expire;
    this.deleteCallback = deleteCallback || null;
  }

  get(key: K): V | undefined {
    const entity = this.cache.get(key);

    if (entity) {
      const { date, value } = entity;

      // 被访问的元素超过缓存时间
      if (Date.now() - date.getTime() > this.expire) {
        this.deleteKey(key);

        return undefined;
      }

      // 有该元素并且没有超过缓存时间的话，直接更新访问时间和频次
      this.updateFreq(key);
      return value;
    }
  }

  // 这里会有个疑问：如果删除的元素刚好是minFreq，而且是freqCache唯一一个元素
  // 这时候删除掉了，如何在时间复杂度为O(1)找出下一个最小的频率？实际上没办法在O(1)快速计算minFreq
  // 但是，其实这时候不需要找出下一个最小的频率，minFreq不需要更新
  // 因为删除方法只在get方法超时和put方法超容量才会调用
  // get超时不需要使用到minFreq，put方法超容量时，删除多余元素后，插入到元素的频率为1，此时minFreq就为1
  deleteKey(key: K): void {
    const entity = this.cache.get(key);

    if (entity) {
      const { value, freq } = entity;

      this.deleteCallback?.(value);
      this.cache.delete(key);
      // 删除频次缓存里面的对应key的元素
      const freqItemMap = this.freqCache.get(freq) as Map<K, V>;
      freqItemMap.delete(key);

      // 如果频次缓存的频次key没有对应的元素了，则删掉该频次
      if (freqItemMap.size === 0) {
        this.freqCache.delete(freq);
        // 这里不需要更新minFreq
      }
    }
  }

  updateFreq(key: K) {
    const entity = this.cache.get(key);
    const { value, freq } = entity as { date: Date; value: V; freq: number };

    this.cache.set(key, { date: new Date(), value, freq: freq + 1 });

    // 删除频次缓存里面的对应key的元素
    const freqItemMap = this.freqCache.get(freq) as Map<K, V>;
    freqItemMap.delete(key);

    // 如果频次缓存的频次key没有对应的元素了，则删掉该频次
    if (freqItemMap.size === 0) {
      this.freqCache.delete(freq);
      // 如果该频次刚好是最小访问频次，则更新最小访问频次
      if (this.minFreq === freq) this.minFreq++;
    }

    this.freqCache.set(
      freq + 1,
      this.freqCache.has(freq + 1)
        ? (this.freqCache.get(freq + 1) as Map<K, V>).set(key, value)
        : new Map()
    );
  }

  put(key: K, value: V) {
    const entity = this.cache.get(key);

    if (entity) {
      // 有的话直接删除即可
      this.deleteKey(key);
    } else if (this.cache.size === this.capacity) {
      // 超出最大容量，删除最小频率且最久没有访问的元素
      const longestKey = (this.freqCache.get(this.minFreq) as Map<K, V>)
        .keys()
        .next().value;
      this.deleteKey(longestKey);
    }

    this.cache.set(key, { date: new Date(), value, freq: 1 });
    // 更新频次数组
    this.freqCache.set(
      1,
      this.freqCache.has(1)
        ? (this.freqCache.get(1) as Map<K, V>).set(key, value)
        : new Map()
    );

    this.minFreq = 1;
  }
}
