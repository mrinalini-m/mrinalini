---
title: Number of Subsets of Size K
date: 2020-06-15
slug: number-of-subsets-of-size-k
tags:
  - recursion
category: problems
---

There are C(n,k) ways to choose k elements from a set of n elements. Write a recursive implementation of the C(n,k) function that uses no loops, no multiplications and no calls to fact. n > 1, k >=0

<span style="font-weight: 600;">Relevant wiki links</span>: [Binomial Coefficient ](https://en.wikipedia.org/wiki/Binomial_coefficient#Combinatorics_and_statistics), [Pascal's Triangle](zhttps://en.wikipedia.org/wiki/Pascal%27s_triangle).

`C(n,k) = C(n-1, k) + C(n-1, k-1)` --> Writing Recursive function for this

`C(n,k) = n!/(k! * (n-k)!)` --> Another way to get C(n,k)

`C(n,n) = C(n,0) = 1` --> Base cases

> Note: The sum of the number of subsets for n and k = 0..n is same as the total number of all possible subsets of n: `C(n,0) + C(n,1) + C(n,2) + ... + C(n,n) = 2^n`

```js
/*
Time Complexity - O(n!/(k! * (n-k)!)). The total number of subsets of size k
Space Complexity - O(k).
  - Tree height can't be more than k (O(k)) and because of dfs, max "held" values will be k (O(k))
  - So, it's O(k) + O(k) ~ O(k)
*/
function C(n, k) {
	if (n <= 1 || k === 0 || k === n) return 1
	else return C(n - 1, k) + C(n - 1, k - 1)
}

// Tests ------------------------------------------
const tests = [
	[3, 2, 3],
	[4, 2, 6],
	[10, 3, 120],
	[0, 5, 1],
	[5, 5, 1],
	[5, 0, 1],
	[20, 5, 15504],
]

for (const test of tests) {
	console.log(C(test[0], test[1]) === test[2])
}
```
