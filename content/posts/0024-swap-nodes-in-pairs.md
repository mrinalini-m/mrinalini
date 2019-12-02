---
title: '24. Swap Nodes in Pairs'
link: 'https://leetcode.com/problems/swap-nodes-in-pairs'
date: 2019-11-22
slug: '0024-swap-nodes-in-pairs'
tags:
  - javascript
  - leetcode
  - algorithms
categories:
  - problems
---

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

const { ListNode, arrToLL, LLToArr } = require('./utils.js')
var swapPairs = function(head) {
  if (!head || !head.next) return head
  let node1 = head,
    node2 = head.next,
    newHead = node2,
    prev,
    rest

  while (node2) {
    rest = node2.next
    node2.next = node1
    node1.next = rest

    if (prev) prev.next = node2
    prev = node1
    node1 = rest
    if (!node1) return newHead
    node2 = node1.next
  }
  return newHead
}

//Test cases
console.log(LLToArr(swapPairs(arrToLL([1, 2, 3, 4, 5]))))
console.log(LLToArr(swapPairs(arrToLL([1, 2, 3, 4]))))
console.log(LLToArr(swapPairs(arrToLL([1, 2, 3]))))
console.log(LLToArr(swapPairs(arrToLL([1, 2]))))
console.log(LLToArr(swapPairs(arrToLL([1]))))
console.log(LLToArr(swapPairs(arrToLL([]))))

```
