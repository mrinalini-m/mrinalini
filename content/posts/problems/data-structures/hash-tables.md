---
title: 'Hash Tables'
date: 2020-04-20
slug: 'hash-tables'
tags:
  - data-structures
  - hash-table
category: problems
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
		const i = this.hash(key)
		// if no collision, set the bucket at position i to array
		if (!this.buckets[i]) this.buckets[i] = []
		// push [key, val] into the array
		this.buckets[i].push([key, value])
		return i
	}

	get(key) {
		const i = this.hash(key)

		if (!this.buckets[i]) return null
		// check each pair inside the bucket at position i
		// if key matches key at pair[0] return the val at pair[1]
		for (const pair of this.buckets[i]) {
			if (pair[0] === key) return pair[1]
		}
	}
}
```

Tests (jest):

```js
const { HashTable } = require('../src')

test('gets correct value from table', () => {
	const hash = new HashTable(10)
	hash.set('test', 'This is a test.')
	expect(hash.get('test')).toBe('This is a test.')
})
```
