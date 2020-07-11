---
title: 144. Binary Tree Preorder Traversal
date: 2020-06-24
slug: 0144-binary-tree-preorder-traversal
link: 'https://leetcode.com/problems/binary-tree-preorder-traversal/'
tags:
  - leetcode
  - tree
category: problems
---

```js
// Easiest dfs traversal to write iteratively
var preorderTraversal = function (root) {
	if (!root) return []

	const res = [],
		stack = [root]
	let curr

	while (stack.length) {
		curr = stack.pop()
		res.push(curr.val)
		if (curr.right) stack.push(curr.right)
		if (curr.left) stack.push(curr.left)
	}
	return res
}
```
