---
title: 207. Course Schedule
date: 2020-07-01
slug: 0207-course-schedule
link: https://leetcode.com/problems/course-schedule/
tags:
  - leetcode
  - graph
  - recursion
category: problems
---

Related Problem: [210. Course Schedule II](/posts/0210-course-schedule-ii/).

<a href="/img/graphs_dfs_directed_course_select.jpg" target="_blank">
<img src="../../../../static/img/graphs_dfs_directed_course_select.jpg"/>
</a>

DFS on Directed Graph:

```js
var canFinish = function (numCourses, prerequisites) {
	const n = numCourses,
		adjList = buildGraph(n, prerequisites),
		// parent = new Array(n).fill(-1),
		visited = new Array(n).fill(-1),
		arrival = new Array(n).fill(-1),
		departure = new Array(n).fill(-1)

	let timestamp = 0
	// let components = 0 // This makes no sense in a directed graph

	for (let v = 0; v < n; v++) {
		if (visited[v] === -1) {
			// components++
			// if (components > 1) return false

			// if cycle found, you cannot complete the courses
			if (dfs(v)) return false
		}
	}

	return true // no cycle found anywhere

	// -----------------------------------------------
	function dfs(source) {
		arrival[source] = timestamp
		timestamp++
		visited[source] = 1

		for (const neighbor of adjList[source]) {
			if (visited[neighbor] === -1) {
				// parent[neighbor] = source
				if (dfs(neighbor)) return true
			} else {
				// This is a back edge, hence a cycle
				if (departure[neighbor] === -1) return true
			}
		}

		departure[source] = timestamp
		timestamp++
		return false
	}
	// -----------------------------------------------
	function buildGraph(n, edges) {
		const adjList = new Array(n).fill().map(() => [])

		for (const [src, dest] of edges) {
			// directed graph so push one direction only
			// adjList[src].push(dest)
			adjList[dest].push(src)
		}

		return adjList
	}
}

// tests
console.log(
	canFinish(2, [
		[1, 0],
		[0, 1],
	])
)
console.log(
	canFinish(6, [
		[1, 0],
		[2, 1],
		[3, 1],
		[4, 3],
		[3, 0],
		// [0, 2],
		[2, 4],
		[3, 5],
		[0, 5],
	])
)
```
