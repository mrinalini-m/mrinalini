---
title: 94. Binary Tree Inorder Traversal
date: 2020-06-24
slug: 0094-binary-tree-inorder-traversal
link: 'https://leetcode.com/problems/binary-tree-inorder-traversal/'
tags:
  - leetcode
  - tree
category: problems
---

```js
var inorderTraversal = function (root) {
	if (!root) return []
	const res = [],
		stack = []

	let curr = root

	while (stack.length || curr) {
		if (curr) {
			stack.push(curr)
			curr = curr.left
		} else {
			curr = stack.pop()
			res.push(curr.val)
			curr = curr.right
		}
	}

	return res
}
```
