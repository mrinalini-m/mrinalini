---
title: '544. Output Contest Matches'
link: 'https://leetcode.com/problems/output-contest-matches'
date: 2019-11-22
slug: '0544-output-contest-matches'
tags:
  - leetcode
  - algorithms
category:  problems
---

```js
/**
 * @param {number} n
 * @return {string}
 */
var findContestMatch = function(n) {
  let i = 1,
    j = n,
    matches = []
  while (i < j) {
    matches.push(`(${i},${j})`)
    i++
    j--
  }
  const makeMatches = matches => {
    let i = 0,
      j = matches.length - 1
    const res = []
    while (i < j) {
      res.push(`(${matches[i]},${matches[j]})`)
      i++
      j--
    }
    return res
  }

  while (matches.length > 1) {
    matches = makeMatches(matches)
  }
  return matches[0]
}
//Test cases
console.log(findContestMatch(8))

```
