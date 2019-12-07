---
title: '29. Divide Two Integers'
link: 'https://leetcode.com/problems/divide-two-integers'
date: 2019-11-22
slug: '0029-divide-two-integers'
tags:
  - javascript
  - leetcode
  - algorithms
category:  problems
---

```js
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */

var divide = function(dividend, divisor) {
  //The largest number in A 32-bit signed interger ranger is 2147483647 which is 01111111111111111111111111111111 in binary
  if (dividend === -2147483648 && divisor === -1) return 2147483647

  let quotient = 0,
    isNegative = false,
    absDivisor = Math.abs(divisor),
    absDividend = Math.abs(dividend)

  if (dividend > 0 !== divisor > 0) isNegative = true

  while (absDividend >= absDivisor) {
    absDividend = absDividend - absDivisor
    quotient++
  }
  return isNegative ? -quotient : quotient
}

//Test cases
console.log(divide(7, -2))
console.log(divide(0, -2))
console.log(divide(-2147483649, -1))

console.log(divide(0, -1))

```
