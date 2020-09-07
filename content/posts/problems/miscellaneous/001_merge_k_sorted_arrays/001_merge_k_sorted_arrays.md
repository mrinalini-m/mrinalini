---
title: 'Merge k sorted arrays'
link: 'https://www.geeksforgeeks.org/merge-k-sorted-arrays/'
date: 2020-06-10
slug: 'merge-k-sorted-arrays'
tags:
  - sorting
  - recursion
  - divide-and-conquer
category: problems
---

Arrays can be either in ascending or descending order. The merged array must preserve the order of the input arrays.

## Using Binary Heap - O(nklog(k)) time

<!-- embed:heap.js -->

The next three strategies will be using some variation of merge sort.

### Common Helpers

`isIncreasingOrder` and `merge` functions will be same for the next three strategies. So I'm just going to write it once.

```js
/* 
merge
  - Same as merge from merge sort but NOT in place and need to consider if
    the values are in ascending order or descending.
*/
function merge(arr1, arr2, increasingOrder) {
	const len1 = arr1.length,
		len2 = arr2.length,
		merged = []

	let i = 0,
		j = 0

	function mergeSortedIncreasing() {
		while (i < len1 && j < len2) {
			if (arr1[i] <= arr2[j]) {
				merged.push(arr1[i++])
			} else {
				merged.push(arr2[j++])
			}
		}
	}

	function mergeSortedDecreasing() {
		while (i < len1 && j < len2) {
			if (arr1[i] >= arr2[j]) {
				merged.push(arr1[i++])
			} else {
				merged.push(arr2[j++])
			}
		}
	}

	increasingOrder ? mergeSortedIncreasing() : mergeSortedDecreasing()

	while (i < len1) merged.push(arr1[i++])
	while (j < len2) merged.push(arr2[j++])

	return merged
}

// --------------------------------------------------------------
/* 
isIncreasingOrder
 - Function to get the sort order of the arrays
 - Can't just check the first two values of the first array cause they might be repeated values
 - So keep checking until two values are different & return true or false
*/
function isIncreasingOrder(arrays) {
	let i = 0,
		k = arrays.length

	while (i < k) {
		const arr = arrays[i],
			len = arr.length

		for (let j = 1; j < len; j++) {
			const diff = arr[j] - arr[j - 1]
			if (diff > 0) return true
			else if (diff < 0) return false
			else continue
		}
		i++
	}

	return false
}
```

## Recursive Merge Sort - O(nklog(k)) time

We'll use merge sort to divide and recurse to the bottom until there is only array left. Each successive merge call will merge and return the merged array that will double in size until it gets to `n*k` size.

<!-- embed:merge_sort.js -->

## Using Iterative or "Bottom Up" Merge Sort - O(nklog(k)) time

<!-- embed:iterative_merge_sort.js -->

<p>
  <img style='display: block; margin: 0 auto; margin-bottom: 0.75rem;' src='./knlogk_merge_sort_time_complexity.jpg' alt='Iterative Merge Sort Time Complexity Explanation'/>
  <span style="display:block; text-align: center;">Calculating Time Complexity for Solution using Iterative Merge Sort</span>
</p>
<p>
  <img style='display: block; margin: 0 auto; margin-bottom: 0.75rem;' src='./knlogk_merge_sort_space_complexity.jpg' alt='Iterative Merge Sort Space Complexity Explanation'/>
  <span style="display:block; text-align: center;">Calculating Space Complexity for Solution using Iterative Merge Sort</span>
</p>

## Brute Force Attempt - O(nk^2) time

This was my first attempt.

<!-- embed:brute_force.js -->

Tests:

```js
let arr0 = [
	[-10, -8, -6, -4, -2],
	[-9, -7, -5, -4, -3],
	[-1, 1, 3, 5, 7],
	[0, 2, 4, 6, 8],
]
let arr1 = [
	[5, 6, 8, 16],
	[3, 7, 12, 13],
	[1, 10, 11, 15],
	[2, 4, 9, 14],
]
let arr2 = [
	[200, 50, 18, 1],
	[180, 45, 15, 9],
	[30, 17, 8, 5],
	[190, 40, 12, 7],
]

console.log(mergeArrays(arr0))
console.log(mergeArrays(arr1))
console.log(mergeArrays(arr2))
```
