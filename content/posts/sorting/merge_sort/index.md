---
title: Merge Sort
date: 2020-06-03
slug: merge-sort
tags:
  - sorting
  - algorithms
category: problems
---

<img style='display: block; margin: 0 auto; margin-bottom: 2rem;' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Merge-sort-example-300px.gif' alt='Merge sort gif'/>

<span style="display:block; text-align: center;">Wiki pic - Graphical example of merge sort. [Source.](https://en.wikipedia.org/wiki/Merge_sort)</span>

## Merge Function

The `merge` function that compares and merges left and right halves or array will be common for both recursive and iterative merge sort.

<!-- embed:merge.js -->

## Recursive Merge Sort

<!-- embed:merge_sort.js -->

### Calculating the Time Complexity of Recursive Merge Sort

![Time Complexity of Merge Sort](./merge_sort_runtime.png)

## Iterative or "Bottom Up" Merge Sort

Merge sort can be solved iteratively in a bottom up way. Instead of recursively dividing the array into two halves and merging when you've reached the bottom, you can use two loops and an interval to keep track of which sections of the array you're merging. You don't recurse to the bottom and then return back from the recursive calls. You just start from the bottom which is why it's called "bottom up" merge sort. Intervals will be multiples of 2 because you'll be doubling the number of elements with each merge.

<!-- embed:merge_sort_iterative.js -->
