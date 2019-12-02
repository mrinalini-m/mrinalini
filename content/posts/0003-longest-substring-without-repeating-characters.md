---
title: '3. Longest Substring Without Repeating Characters'
link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters'
date: 2019-11-22
slug: '0003-longest-substring-without-repeating-characters'
tags:
  - javascript
  - leetcode
  - algorithms
categories:
  - problems
---

```js
/**
 * @param {string} s
 * @return {number}
 */

var lengthOfLongestSubstring = function(s) {
  const len = s.length
  let substringHash = {},
    count = 0,
    maxCount = 0,
    i = 0,
    j = 0
  while (i < len) {
    const char = s[i]
    if (substringHash[char] === undefined) {
      substringHash[char] = i
      count++
    } else {
      maxCount = Math.max(count, maxCount)
      let k = substringHash[char] + 1
      j = k
      count = 0
      substringHash = {}
      while (k <= i) {
        substringHash[s[k]] = k
        count++
        k++
      }
    }
    i++
  }
  return Math.max(count, maxCount)
}

//Test cases
console.log(lengthOfLongestSubstring('abcabcbb'))
console.log(lengthOfLongestSubstring('bbbbb'))
console.log(lengthOfLongestSubstring('pwwkew'))
console.log(lengthOfLongestSubstring('dvdf'))
console.log(lengthOfLongestSubstring('abba'))
console.log(lengthOfLongestSubstring('jbpnbwwd'))

```
