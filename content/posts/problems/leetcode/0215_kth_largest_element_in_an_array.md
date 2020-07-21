---
title: '215. Kth Largest Element in an Array'
link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/'
date: 2020-06-07
slug: '0215-kth-largest-element-in-an-array'
tags:
  - leetcode
  - sorting
  - recursion
  - quicksort
category: problems
---

```js
/* 
1. If you sort array, then kth largest value will be n-k from beginning.
 eg: [3, 2, 1, 5, 6, 4], k=2 [1,2,3,4,5,6], n-k=4
2. Use quick sort to partition the array discarding one side of the partition after every partition. If n-k < pivot index, recurse on the left.
Otherwise recurse on right.
3. After each partition, check if pivot index === n - k and if it is return the pivot value
*/

function findKthLargest(arr, k) {
	const len = arr.length
	const kthFromlast = len - k

	if (len <= 0 || kthFromlast < 0 || kthFromlast > len) return null

	function recurse(start, end) {
		if (start === end && start === kthFromlast) {
			return arr[start]
		}

		if (start > end) return

		const randomIndex = getRandomIntInclusive(start, end)

		swap(arr, randomIndex, start)

		const pivot = arr[start]
		let smaller = start,
			bigger = start + 1

		for (bigger; bigger <= end; bigger++) {
			if (arr[bigger] < pivot) {
				smaller++
				swap(arr, smaller, bigger)
			}
		}

		swap(arr, start, smaller)

		if (smaller === kthFromlast) {
			return arr[smaller]
		} else if (kthFromlast < smaller) {
			return recurse(start, smaller - 1)
		} else {
			return recurse(smaller + 1, end)
		}
	}
	return recurse(0, arr.length - 1)
}

// Helper functions:
function getRandomIntInclusive(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function swap(array, i, j) {
	let temp = array[i]
	array[i] = array[j]
	array[j] = temp
}

/* 
Time Complexity - O(n)

For average case,consider that the pivot is always in middle. But since we're discarding one half

n + n/2 + n/4 + ..... n/n ==> O(2n)

Worst case: O(n^2)
*/
const arr = [3, 2, 1, 5, 6, 4]
console.log(findKthLargest(arr, 2))
```
