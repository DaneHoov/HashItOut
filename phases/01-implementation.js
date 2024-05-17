class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {
  // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    this.capacity = numBuckets;
    this.data = Array(this.capacity).fill(null);
    this.count = 0;
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }

  insert(key, value) {
    let hashIndex = this.hashMod(key);
    let nonEmptyBucket = this.data[hashIndex];
    let newKV = new KeyValuePair(key, value);

    if (!nonEmptyBucket) {
      this.data[hashIndex] = newKV;
    } else {
      let current = nonEmptyBucket;

      while (current) {
        if (current.key === key) {
          current.value = value;
          return;
        }
        if (!current.next) break;
        current = current.next;
      }
      newKV.next = nonEmptyBucket;
      this.data[hashIndex] = newKV;
    }
    this.count++;
  }

  read(key) {
    // Your code here
    let hashIndex = this.hashMod(key);
    let curr = this.data[hashIndex];

    while (curr) {
      if (curr.key === key) {
        return curr.value;
      }
      curr = curr.next;
    }
    return undefined;
  }

  resize() {
    let oldData = this.data;
    this.capacity *= 2;
    this.data = Array(this.capacity).fill(null);
    this.count = 0;

    oldData.forEach((data) => {
      let curr = data;
      while (curr) {
        this.insert(curr.key, curr.value);
        curr = curr.next;
      }
    });
  }

  delete(key) {
    // Your code here
  }
}

module.exports = HashTable;
