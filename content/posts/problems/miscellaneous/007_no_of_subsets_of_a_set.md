---
title: Number of Subsets of a Set
date: 2020-06-15
slug: number-of-subsets-of-a-set
tags:
  - recursion
category: problems
---

Given a set of size n, count total number of distinct possible subsets. Assume n >= 0 and all elements of the set are unique.

> Note: The total number of possible subsets of a subset of size n is `2^n`.

### Iterative Decrease-and-conquer strategy

```js
/*
Time Complexity - O(n)
Space Complexity - O(1)
*/
function iCountSubsetsOfSet(n) {
	let result = 1
	for (let i = 1; i <= n; i++) {
		result *= 2
	}
	return result
}
```

### Recursive Decrease-and-conquer strategy

```js
/*
Time Complexity - O(n)
Space Complexity - O(n)
*/
function rCountSubsetsOfSet(n) {
	if (n === 0) return 1
	else return 2 * rCountSubsetsOfSet(n - 1)
}
```

### Recursive Exponential Time Decrease-and-conquer strategy

```js
/*
Time Complexity - O(2^n)
Space Complexity - O(n)
2 * rCountSubsetsOfSet(n - 1) can be written as rCountSubsetsOfSet(n - 1) +  rCountSubsetsOfSet(n - 1)
But time complexity would go up to O(2^n)! This is because each call will spawn two new recursive calls. 
*/
function expCountSubsetsOfSet(n) {
	if (n === 0) return 1
	else return expCountSubsetsOfSet(n - 1) + expCountSubsetsOfSet(n - 1)
}
```

### Recursive Divide-and-conquer strategy

Instead of chipping away at n 1 at a time, we can halve it and reduce time complexity to O(log(n)).

For example, for n = 10:
Using decrease-and-conquer, there will be 11 recursive calls: `2^10 --> 2^9 --> 2^8 --> .... --> 2^0`.

Using divide-and-conquer, there will be 5 recursive calls. Odd powers can be split, `recurse(2^5) --> 2 * recurse(2^4)`.

So 2^10 will look like: `2^10 --> 2^5 (2 * 2^4)--> 2^2 --> 2^1 (2*2^0) --> 2^0`

```js
/* 
Recursive log(n) time
Time Complexity - O(log(n))
Space Complexity - O(log(n))
*/

function isEven(n) {
	return n % 2 === 0
}

function lnCountSubsetsOfSet(n) {
	if (n === 0) return 1

	let multiplier = 1

	if (!isEven(n)) {
		multiplier = 2
		n = n - 1
	}

	const m = n / 2,
		sqrt = lnCountSubsetsOfSet(m)

	return multiplier * sqrt * sqrt //DO NOT DO lnCountSubsetsOfSet(m) * lnCountSubsetsOfSet(m). Dis n dat r not da same things
}
```

Tests:

```js
// Tests ------------------------------------------
const tests = [[2, 4], [0, 1], [5, 32], [10, 1024]]
console.log('Iterative tests')
for (const test of tests) {
	console.log(iCountSubsetsOfSet(test[0]) === test[1])
}

console.log('Recursive O(n) time tests')
for (const test of tests) {
	console.log(rCountSubsetsOfSet(test[0]) === test[1])
}

console.log('Recursive O(2^n) time tests')
for (const test of tests) {
	console.log(expCountSubsetsOfSet(test[0]) === test[1])
}

console.log('Recursive O(log(n)) time tests')
for (const test of tests) {
	console.log(lnCountSubsetsOfSet(test[0]) === test[1])
}
```
