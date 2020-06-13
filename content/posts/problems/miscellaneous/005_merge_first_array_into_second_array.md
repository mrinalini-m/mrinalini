---
title: 'Merge an array of size n into another array of size 2n'
date: 2020-06-12
slug: 'merge-first_array_into_second_array'
tags:
  - sorting
  - pointers
category: problems
---

Given two sorted arrays in ascending order - first of length n and second of length 2n, merge them into the second array. Eg. Given `arr1 = [1,3,5]` and `arr2 = [2,4,6,0,0,0]`, the result should be `arr2 = [1,2,3,4,5,6]`. Constraints - it should be in place (no extra space allowed).

```js
/* 
Time Complexity - O(2n)
Space Complexity - O(1)
*/
function merger_first_into_second(arr1, arr2) {
	const n = arr1.length
	let i = n - 1,
		j = n - 1,
		k = 2 * n - 1

	while (i > -1 && j > -1) {
		if (arr2[j] > arr1[i]) arr2[k--] = arr2[j--]
		else arr2[k--] = arr1[i--]
	}

	while (i > -1) {
		arr2[k--] = arr1[i--]
	}

	while (j > -1) {
		arr2[k--] = arr2[j--]
	}
}

const arr1 = [1, 3, 5],
	arr2 = [2, 4, 6, 0, 0, 0]

merger_first_into_second(arr1, arr2)
```
