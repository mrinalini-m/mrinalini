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

## Brute Force Attempt - O(n^2) time

<!-- embed:brute_force.js -->

## Optimizing Brute Force attempt to use Recursive Merge Sort - O(nklog(k)) time

`isIncreasingOrder` and `merge` functions will be same as the one from brute force. But instead of iterating over arrays and merging each array with the a cumulative merged(result) array, we'll use merge sort to divide and recurse to the bottom until there is only array left. Each successive merge call will merge and return the merged array that will double in size until it gets to `n*k` size.

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

## Using Binary Heap - O(nklog(k)) time

<!-- embed:heap.js -->
