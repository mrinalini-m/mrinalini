---
title: '49. group anagrams'
link: 'https://leetcode.com/problems/group-anagrams'
date: 2019-11-22
slug: '0049-group-anagrams'
tags:
  - javascript
  - leetcode
categories:
  - problems
---

```js
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  const wordHash = {},
    results = []
  strs.forEach(word => {
    const sorted = word
      .split('')
      .sort()
      .join('')
    if (!wordHash[sorted]) {
      wordHash[sorted] = [word]
    } else {
      wordHash[sorted].push(word)
    }
  })
  Object.keys(wordHash).forEach(arr => {
    results.push(wordHash[arr])
  })
  return results
}

```
