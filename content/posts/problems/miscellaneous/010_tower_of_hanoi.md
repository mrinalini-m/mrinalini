---
title: 'Tower of Hanoi'
date: 2020-06-15
slug: 'tower-of-hanoi'
tags:
  - recursion
category: problems
---

The Tower of Hanoi is a classic math game/puzzle. It consists of three rods and a number of disks of different sizes, which can slide onto any rod. The puzzle starts with the disks in a neat stack in ascending order of size on one rod, the smallest at the top, thus making a conical shape. The objective of the puzzle is to move the entire stack to another rod, obeying the following simple rules:

1. Only one disk can be moved at a time.
2. Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack or on an empty rod.
3. No larger disk may be placed on top of a smaller disk.

Source: [Wiki Link](https://en.wikipedia.org/wiki/Tower_of_Hanoi)

### Naive Implementation that just prints current move:

```js
/* 
Time Complexity - O(2^n)
 - Exact is 2^n - 1. So T(2) = 3, T(3) = 7, T(4) = 15
Space Complexity - O(n). Max possible tree height
*/

function naiveTOH(n, src, dst, aux) {
	if (n === 1) console.log(`Move disk from ${src} to ${dst}.`)
	else {
		naiveTOH(n - 1, src, aux, dst)
		console.log(`Move disk from ${src} to ${dst}.`)
		naiveTOH(n - 1, aux, dst, src)
	}
}

// tests
console.log('Naive Tower of Hanoi that just prints current move')
naiveTOH(4, 'A', 'B', 'C')
console.log('-----------------------------')
naiveTOH(3, 'A', 'B', 'C')
// Will log the following for n = 3
/* 
Move disk from A to B.
Move disk from A to C.
Move disk from B to C.
Move disk from A to B.
Move disk from C to A.
Move disk from C to B.
Move disk from A to B.
*/
```

### Tower of Hanoi Implemented with stacks for rods to hold disks:

```js
const { Stack } = require('../../../utils')

/*
Time Complexity - O(2^n)
Space Complexity - O(n). O(n) + O(n) from sum of the three stack sizes. 
*/

class TowerOfHanoi {
	/**
	 * @param {number} [diskCount] Number of disks.
	 * @param {string} [src] Name of source rod.
	 * @param {string} [dst] Name of destination rod.
	 * @param {string} [src] Name of auxiliary rod.
	 */
	constructor(diskCount = 4, src = 'src', dst = 'dst', aux = 'aux') {
		this.diskCount = diskCount
		this.src = src
		this.dst = dst
		this.aux = aux
		this.rods = {}
		this.moveCount = 0
	}

	/** Main recursive function to move all disks */
	recurseAndMoveAlldisks(n, src, dst, aux) {
		this.moveCount++
		if (n === 1) this.moveOnedisk(src, dst)
		else {
			this.recurseAndMoveAlldisks(n - 1, src, aux, dst)
			this.moveOnedisk(src, dst)
			this.recurseAndMoveAlldisks(n - 1, aux, dst, src)
		}
	}

	/** Pop one disk from src, push popped disk into dst and print rods */
	moveOnedisk(src, dst) {
		const disk = this.rods[src].pop()
		this.rods[dst].push(disk)

		console.log(`Move disk from ${src} to ${dst}.`)
		this.printRods()
	}

	/** Function to start puzzle — init rods, print initial state, call recurseAndMoveAlldisks & print moveCount. Call after creating an instance of TowerOfHanoi */
	init() {
		this.initRods()

		this.printDivider()
		console.log('Starting new Tower of Hanoi Puzzle...')
		console.log(`src: ${this.src}, dst: ${this.dst}, aux: ${this.aux}`)
		this.printRods()
		console.log(`disk Count: ${this.diskCount}`)
		console.log(`Total moves: ${this.moveCount}`)
		this.printDivider()

		this.recurseAndMoveAlldisks(this.diskCount, this.src, this.dst, this.aux)
		this.printDivider()
		console.log(`Total moves: 2^${this.diskCount} - 1 = ${this.moveCount}`)
		this.printDivider()
		console.log()
		console.log()
	}

	/** Set src, dst, aux rods to a new stack, push diskCount disks into src stack */
	initRods() {
		this.rods[this.src] = new Stack()
		this.rods[this.dst] = new Stack()
		this.rods[this.aux] = new Stack()

		for (let i = this.diskCount; i > 0; i--) {
			this.rods[this.src].push(i)
		}
	}

	printRods() {
		console.log(
			`${this.src}:`,
			this.rods[this.src].printStack(),
			`${this.dst}:`,
			this.rods[this.dst].printStack(),
			`${this.aux}:`,
			this.rods[this.aux].printStack()
		)
	}

	printDivider() {
		console.log('-----------------------------')
	}
}

// tests
console.log('-----------------------------')
console.log('Tower of Hanoi implemented with Stack to hold disks')
const toh = new TowerOfHanoi(5, 'A', 'B', 'C')
toh.init()

const toh1 = new TowerOfHanoi(3, 'A', 'B', 'C')
toh1.init()
// Will log the following for n = 3
/*
-----------------------------
Starting new Tower of Hanoi Puzzle...
src: A, dst: B, aux: C
A: [ 1, 2, 3 ] B: [] C: []
disk Count: 3
Total moves: 0
-----------------------------
Move disk from A to B.
A: [ 2, 3 ] B: [ 1 ] C: []
Move disk from A to C.
A: [ 3 ] B: [ 1 ] C: [ 2 ]
Move disk from B to C.
A: [ 3 ] B: [] C: [ 1, 2 ]
Move disk from A to B.
A: [] B: [ 3 ] C: [ 1, 2 ]
Move disk from C to A.
A: [ 1 ] B: [ 3 ] C: [ 2 ]
Move disk from C to B.
A: [ 1 ] B: [ 2, 3 ] C: []
Move disk from A to B.
A: [] B: [ 1, 2, 3 ] C: []
-----------------------------
Total moves: 2^3 - 1 = 7
-----------------------------
*/
```
