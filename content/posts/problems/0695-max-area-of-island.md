---
title: '695. Max Area of Island'
link: 'https://leetcode.com/problems/max-area-of-island'
date: 2019-11-22
slug: '0695-max-area-of-island'
tags:
  - javascript
  - leetcode
  - algorithms
category:  problems
---

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */

const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]
const dfs = (i, j, count) => {
  if (!grid[i] || !grid[i][j]) return 0
  if (grid[i][j] === 1) {
    grid[i][j] = 0
    count++
  }

  for (let [moveX, moveY] of directions) {
    const checked = dfs(moveX + i, moveY + j, count)
    count = checked !== 0 ? checked : count
  }
  return count
}

var maxAreaOfIsland = function(grid) {
  let maxCount = 0
  grid.forEach((row, i) => {
    row.forEach((col, j) => {
      maxCount = Math.max(maxCount, dfs(i, j, 0))
    })
  })

  return maxCount
}

const grid = [
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
]

const grid1 = [[0, 0, 0, 0, 0, 0, 0, 0]]

//Test cases
console.log(maxAreaOfIsland(grid))
console.log(maxAreaOfIsland(grid1))

```
