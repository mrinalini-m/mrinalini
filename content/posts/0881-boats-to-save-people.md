---
title: '881. boats to save people'
link: 'https://leetcode.com/problems/boats-to-save-people'
date: 2019-11-22
slug: '0881-boats-to-save-people'
tags:
  - javascript
  - leetcode
categories:
  - problems
---

```js
/**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
var numRescueBoats = function(people, limit) {
  let boatCount = 0,
    i = 0,
    j = people.length - 1
  people.sort((a, b) => a - b)
  while (i <= j) {
    const curr = people[i] + people[j]
    boatCount++
    if (curr <= limit) {
      i++
    }
    j--
  }
  return boatCount
}

//Test cases
console.log(numRescueBoats([1, 2], 3))
console.log(numRescueBoats([3, 2, 2, 1], 3))
console.log(numRescueBoats([], 3))
console.log(numRescueBoats([3, 5, 3, 4], 5))
console.log(numRescueBoats([3, 5, 3, 4], 0))

```
