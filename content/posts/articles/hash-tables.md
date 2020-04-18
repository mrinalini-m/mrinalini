---
title: 'Hash Tables'
date: 2020-04-15
slug: 'hash-tables'
tags:
  - data-structures
  - hash-table
category: articles
---

> In computing, a hash table is a data structure that implements an associative array abstract data type, a structure that can map keys to values. A hash table uses a hash function to compute an index, also called a hash code, into an array of buckets or slots, from which the desired value can be found.

Basically, you have:

1. an array of fixed sized
2. a hashing function that takes your key and maps it to an index < size of your array
3. a way to handle conflicts

## Collision Resolution

1. **Separate Chaining** — Separate chaining is one of the most commonly used collision resolution techniques. It is usually implemented using linked lists. In separate chaining, each element of the hash table is a linked list. To store an element in the hash table you must insert it into a specific linked list. If there is any collision (i.e. two different elements have same hash value) then store both the elements in the same linked list.

2. **Linear Probing**
3. **Quadratic Probing**
4. **Double Hashing**
5. **Coalesced Chaining**

```javascript
/* https://reactgo.com/hashtable-javascript/ */

/*
Rudimentary javascript hash table resolving collisions with separate chaining.
Todo: Resolve conflicts with Linear Probing, Separate Chaining (linked lists)
*/

class HashTable {
	constructor(size = 42) {
		this.buckets = new Array(size)
		this.size = size
	}

	hash(key) {
		return key.toString().length % this.size
	}

	set(key, value) {
		let index = this.hash(key)
		if (!this.buckets[index]) {
			this.buckets[index] = []
		}
		this.buckets[index].push([key, value])
		return index
	}

	get(key) {
		let index = this.hash(key)
		if (!this.buckets[index]) return null
		for (const bucket of this.buckets[index]) {
			if (bucket[0] === key) {
				return bucket[1]
			}
		}
	}
}

const hash = new HashTable(10)
hash.set('test', 'This is a test.')

console.log(hash)
console.log(hash.get('test'))
```
