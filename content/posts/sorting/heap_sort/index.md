---
title: Heap Sort
date: 2020-06-07
slug: heap-sort
tags:
  - sorting
  - binary-heap
category: problems
---

<img style='display: block; margin: 0 auto;' src='https://upload.wikimedia.org/wikipedia/commons/4/4d/Heapsort-example.gif' alt='Insertion sort gif'/>

<span style="display:block; text-align: center;">Wiki pic - Graphical example of in place heap sort. [Source.](https://en.wikipedia.org/wiki/Heapsort)</span>

## In-place heap sort:

<p style="margin-bottom: 0.75rem;">Given an unsorted array,</p>

1. Build a max heap in place using `buildMaxHeap` function.
2. Loop through the items of the heap.
3. Instead of extracting and removing the max from the heap, swap it with last item of the heap and decrement heap size.
4. "Heapify" or sink down the swapped item which is at `index 0`.

<!-- embed:heap_sort_in_place.js -->

## Heap sort with `O(n)` auxiliary space:

<p style="margin-bottom: 0.75rem;">Given an unsorted array,</p>

1. Create a min heap using `MinBinaryHeap` data structure.
2. Loop through array items and insert each item into the min heap.
3. Initialize an empty auxiliary array to hold sorted values.
4. Until there are items in the heap, keep extracting min from the min heap and pushing it into the sorted array.

[Link to Binary Heap](/posts/binary-heap/)

<!-- embed:heap_sort.js -->
