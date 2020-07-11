---
title: 909. Snakes and Ladders
date: 2020-07-01
slug: 0909-snakes-and-ladders
link: https://leetcode.com/problems/snakes-and-ladders/
tags:
  - leetcode
  - graph
  - recursion
category: problems
---

> Note: Most shortest path graph problems will use BFS Directed Graph Traversal.

```js
var snakesAndLadders = function(board) {
	const size = board.length,
		maxSquare = size * size

	return minMoves(1)
	// -----------------------------------------------
	function numToRowCol(n) {
		const row = Math.floor((maxSquare - n) / size),
			c = (n - 1) % (2 * size) //c is in the range of 0 to 2*size -1
		// Because board is "boustrophedonically", make cols 2 * size

		let col

		if (c < size) col = c
		else col = 2 * size - 1 - c

		return [row, col]
	}

	// -----------------------------------------------
	// bfs for shortest path
	function minMoves(n) {
		const queue = [],
			visited = {}

		queue.push(n)
		visited[n] = 0 //records the shortest path distance from source to this vertex

		while (queue.length) {
			const curr = queue.shift()

			for (let i = 1; i < 7; i++) {
				let next = curr + i

				if (next > maxSquare) continue

				const [row, col] = numToRowCol(next)
				// if cell is snake or ladder, go down snake or go up ladder
				if (board[row][col] !== -1) next = board[row][col]

				if (visited[next] === undefined) {
					queue.push(next)
					visited[next] = visited[curr] + 1
					// The first path to get to end will be the min
					if (next === maxSquare) return visited[next]
				}
			}
		}

		// It's possible to have an impossible game, in which case return -1
		return -1
	}
}

// tests
const board = [
	[-1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1],
	[-1, 35, -1, -1, 13, -1],
	[-1, -1, -1, -1, -1, -1],
	[-1, 15, -1, -1, -1, -1]
]

console.log(snakesAndLadders(board))
```

Old Attempt from 2019-11-22:

```js
/**
 * @param {number[][]} board
 * @return {number}
 */
const getLocation = (sq, n) => {
	const remainder = (sq - 1) % n,
		quotient = Math.floor((sq - 1) / n),
		row = n - 1 - quotient,
		col = row % 2 !== n % 2 ? remainder : n - 1 - remainder
	return [row, col]
}

var snakesAndLadders = function(board) {
	const queue = [1],
		n = board.length,
		end = n ** 2,
		visited = { 1: 0 }

	while (queue.length) {
		let curr = queue.shift()
		if (curr === end) return visited[curr]

		for (let i = curr + 1; i <= Math.min(curr + 6, end); i++) {
			const [row, col] = getLocation(i, n),
				next = board[row][col] === -1 ? i : board[row][col]
			if (visited[next] === undefined) {
				queue.push(next)
				visited[next] = visited[curr] + 1
			}
		}
	}
	return -1
}

const board = [
	[-1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1],
	[-1, 35, -1, -1, 13, -1],
	[-1, 12, -1, -1, -1, -1],
	[-1, 15, -1, -1, -1, -1]
]
const board1 = [
	[-1, -1, -1, -1],
	[-1, -1, -1, -1],
	[-1, -1, -1, -1],
	[-1, -1, -1, -1]
]

const board2 = [
	[-1, -1, 78, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, 99, -1],
	[-1, -1, -1, 50, -1, -1, -1, -1, -1, -1],
	[-1, 88, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, 69, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, 18, -1, -1, -1, -1, -1, -1]
]

//Test cases
console.log(snakesAndLadders(board))
// console.log(snakesAndLadders(board1))
// console.log(snakesAndLadders(board2))
```
