---
title: 733. Flood Fill
date: 2020-07-01
slug: 0733-flood-fill
link: https://leetcode.com/problems/flood-fill/
tags:
  - leetcode
  - graph
  - recursion
category: problems
---

Function to get neighbors of each cell - common to both bfs and dfs traversals:

```js
function getNeighbors(x, y, grid) {
	const result = []

	if (x + 1 < grid.length) result.push([x + 1, y])
	if (y + 1 < grid[0].length) result.push([x, y + 1])
	if (x - 1 >= 0) result.push([x - 1, y])
	if (y - 1 >= 0) result.push([x, y - 1])

	return result
}
```

### With DFS:

```js
var floodFill = function(image, sr, sc, newColor) {
	const oldColor = image[sr][sc]

	if (oldColor !== newColor) dfs(sr, sc)

	return image

	// -----------------------------------------------
	function dfs(i, j) {
		image[i][j] = newColor

		const neighbors = getNeighbors(i, j, image)

		for (const neighbor of neighbors) {
			const [nRow, nCol] = neighbor
			if (image[nRow][nCol] === oldColor) dfs(nRow, nCol)
		}
	}
}
```

### With BFS:

```js
var floodFillBFS = function(image, sr, sc, newColor) {
	const oldColor = image[sr][sc]
	// Selected color is already new color
	if (oldColor !== newColor) bfs(sr, sc)

	return image

	function bfs(i, j) {
		const queue = []
		queue.push([i, j])
		image[i][j] = newColor

		while (queue.length) {
			const [row, col] = queue.shift(),
				neighbors = getNeighbors(row, col, image)

			for (const neighbor of neighbors) {
				const [nRow, nCol] = neighbor

				if (image[nRow][nCol] === oldColor) {
					queue.push(neighbor)
					image[nRow][nCol] = newColor
				}
			}
		}
	}
}

// tests
const tests = [
	[[[1, 1, 1], [1, 1, 0], [1, 0, 1]], 1, 1, 2],
	[[[0, 0, 0], [0, 1, 1]], 1, 1, 1],
	[[[0]], 0, 0, 2]
]

for (const test of tests) {
	console.log(floodFill(test[0], test[1], test[2], test[3]))
	console.log(floodFillBFS(test[0], test[1], test[2], test[3]))
}
```
