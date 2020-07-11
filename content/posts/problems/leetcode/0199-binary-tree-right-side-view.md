---
title: '199. Binary Tree Right Side View'
link: 'https://leetcode.com/problems/binary-tree-right-side-view'
date: 2020-06-23
slug: '0199-binary-tree-right-side-view'
tags:
  - leetcode
  - tree
  - recursion
category: problems
---

```js
var rightSideView = function (root) {
	const res = []
	if (!root) return res
	let q = [root]

	while (q.length) {
		const numNodes = q.length
		let temp

		for (let i = 0; i < numNodes; i++) {
			const node = q.shift()
			temp = node.val
			if (node.left) q.push(node.left)
			if (node.right) q.push(node.right)
		}

		res.push(temp)
	}

	return res
}
```

Old: 2019-11-22

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
	const res = []
	let maxDepth = 0

	const recurse = (node, depth) => {
		if (!node) return
		if (depth > maxDepth || depth === 0) {
			res.push(node.val)
		}
		maxDepth = Math.max(maxDepth, depth)

		if (!node.right && node.left) {
			recurse(node.left, depth + 1)
		} else {
			recurse(node.right, depth + 1)
		}
		recurse(node.left, depth + 1)
	}
	recurse(root, 0)

	return res
}

//leetcode input [1,2,3,null,5,null,4,7,null ]
var node1 = {
	val: 1,
	right: { val: 3, right: null, left: { val: 4, right: null, left: null } },
	left: {
		val: 2,
		right: { val: 5, right: null, left: { val: 7, right: null, left: null } },
		left: null,
	},
}

var node2 = {
	val: 1,
	right: {
		val: 3,
		right: { val: 4, right: { val: 7, right: null, left: null }, left: null },
		left: null,
	},
	left: {
		val: 2,
		right: { val: 5, right: null, left: { val: 6, right: null, left: null } },
		left: null,
	},
}

//[1,2,3,4]
var node3 = {
	val: 1,
	right: { val: 3, right: null, left: null },
	left: { val: 2, right: null, left: { val: 4, right: null, left: null } },
}

const inputArr = [node1, node2, node3]
inputArr.forEach((node) => {
	//Test cases
	console.log(rightSideView(node))
})
```
