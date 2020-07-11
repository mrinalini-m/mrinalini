---
title: 695. Max Area of Island
date: 2020-07-01
slug: 0695-max-area-of-island
link: https://leetcode.com/problems/max-area-of-island/
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
var maxAreaOfIslandz = function (grid) {
	let maxCount = 0

	for (let x = 0; x < grid.length; x++) {
		for (let y = 0; y < grid[0].length; y++) {
			if (grid[x][y] !== 0) {
				maxCount = Math.max(maxCount, dfs(x, y, 0))
			}
		}
	}

	return maxCount

	// -----------------------------------------------
	function dfs(i, j, area) {
		grid[i][j] = 0
		area = area + 1

		const neighbors = getNeighbors(i, j, grid)

		for (const [nRow, nCol] of neighbors) {
			if (grid[nRow][nCol] !== 0) area = dfs(nRow, nCol, area)
		}
		return area
	}
}
```

### With BFS:

```js
var maxAreaOfIsland = function (grid) {
	let maxCount = 0

	for (let x = 0; x < grid.length; x++) {
		for (let y = 0; y < grid[0].length; y++) {
			if (grid[x][y] !== 0) {
				// Don't need to pass count as param like if dfs.
				maxCount = Math.max(maxCount, bfs(x, y))
			}
		}
	}

	return maxCount

	// -----------------------------------------------
	function bfs(i, j) {
		const queue = []
		queue.push([i, j])
		grid[i][j] = 0

		let area = 1

		while (queue.length) {
			const [row, col] = queue.shift(),
				neighbors = getNeighbors(row, col, grid)

			for (const neighbor of neighbors) {
				const [nRow, nCol] = neighbor

				if (grid[nRow][nCol] !== 0) {
					area++
					queue.push([nRow, nCol])
					grid[nRow][nCol] = 0
				}
			}
		}
		return area
	}
}

// tests
const grid = [
	[0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
	[0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
	[0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
]

const grid1 = [[0, 0, 0, 0, 0, 0, 0, 0]]

console.log(maxAreaOfIsland(grid))
console.log(maxAreaOfIsland(grid1))
```
