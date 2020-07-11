---
title: 200. Number of Islands
date: 2020-07-01
slug: 0200-number-of-islands
link: https://leetcode.com/problems/number-of-islands/
tags:
  - leetcode
  - graph
  - recursion
category: problems
---

This is same as 323. connected components - we're counting number connected of connected components. But instead of an explicit edge list (from which we were able to build an adjacency list), we're given a matrix — each cell has four neighbors (4 corner cells have 2 neighbors and edge cells have 3).

```js
/*
Here the things that are different from the connected components problem:

|                       | Count Connected components       | Count no. of islands         |
| --------------------- | -------------------------------- | ---------------------------- |
| Visited array         | Not given, 1d initialized to -1  | Given grid, 2d with 0's, 1's |
|                       | On visited, update to 1          | On visited, update to 0      |
| Neighbors & adj. list | Not given, create from edge list | Not given, implicit          |
|                       |                                  | Each cell has 4 neighbors    |
*/
```

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
var numIslands = function (grid) {
	let islands = 0

	for (let x = 0; x < grid.length; x++) {
		for (let y = 0; y < grid[0].length; y++) {
			if (grid[x][y] !== '0') {
				dfs(x, y)
				islands++
			}
		}
	}

	return islands

	// -----------------------------------------------
	function dfs(i, j) {
		grid[i][j] = '0'
		const neighbors = getNeighbors(i, j, grid)

		for (const [nRow, nCol] of neighbors) {
			if (grid[nRow][nCol] !== '0') dfs(nRow, nCol)
		}
	}
}
```

### With BFS:

```js
var numIslands = function (grid) {
	let islands = 0

	for (let x = 0; x < grid.length; x++) {
		for (let y = 0; y < grid[0].length; y++) {
			if (grid[x][y] !== '0') {
				bfs(x, y)
				islands++
			}
		}
	}

	return islands

	// -----------------------------------------------
	function bfs(i, j) {
		const queue = []
		queue.push([i, j])
		grid[i][j] = '0'

		while (queue.length) {
			const [row, col] = queue.shift(),
				neighbors = getNeighbors(row, col, grid)

			for (const neighbor of neighbors) {
				const [nRow, nCol] = neighbor

				if (grid[nRow][nCol] !== '0') {
					queue.push([nRow, nCol])
					grid[nRow][nCol] = '0'
				}
			}
		}
	}
}

// Tests
console.log(
	numIslands([
		['1', '1', '0', '0', '0'],
		['1', '1', '0', '0', '0'],
		['0', '0', '1', '0', '0'],
		['0', '0', '0', '1', '1'],
	])
)
```
