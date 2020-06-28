---
title: 429. N-ary Tree Level Order Traversal
date: 2020-06-24
slug: 0429-n-ary-tree-level-order-traversal
link: 'https://leetcode.com/problems/n-ary-tree-level-order-traversal/'
tags:
  - leetcode
  - tree
category: problems
---

```js
var levelOrder = function(root) {
	const res = []
	if (!root) return res
	let q = [root]

	while (q.length) {
		const numNodes = q.length,
			temp = []

		for (let i = 0; i < numNodes; i++) {
			const node = q.shift()
			temp.push(node.val)
			for (const child of node.children) {
				q.push(child)
			}
		}

		res.push(temp)
	}
	return res
}
```
