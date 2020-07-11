/*
Time Complexity: Best, worst and average case - О(nlogn)
Space complexity - O(n) (for the auxiliary array only, no stack space required)
*/

function mergeSortIterative(arr) {
	let len = arr.length

	for (let interval = 1; interval < len; interval *= 2) {
		for (let start = 0; start < len - interval; start += interval * 2) {
			const mid = Math.min(start + interval - 1, len - 1),
				end = Math.min(start + 2 * interval - 1, len - 1)
			merge(arr, start, mid, end) //Same merge function we used for recursive merge sort
		}
	}

	return arr
}

/* 
Recursive merge sort uses recursive call stack
to keep track of which section of the array we're merging.
Eg. for an array of size 4, the recursive call stack will look like

  recurse(3, 3)
  recurse(2, 2)
  recurse(2, 3) merge(2, 2, 3)
  recurse(1, 1)
  recurse(0, 0)
  recurse(0, 1) merge(0, 0, 1)
  recurse(0, 3) merge(0, 1 , 3)

Iterative merge sort uses a variable(interval in this case)
to keep track of which section of the array we're merging.
Eg. For array of size 4, merge calls will look like:

  Interval 1
    merge(0, 0, 1)
    merge(2, 2, 2)
  Interval 2
    merge(0, 1, 3)

----------------------------------------------------------------------------
*/

const testCases = [
	[
		[5, 6, 1, 0, 6, 2],
		[0, 1, 2, 5, 6, 6],
	],
	[
		[-1, 6, 2, 100, 0, -11],
		[-11, -1, 0, 2, 6, 100],
	],
	[
		[7, 6, 5, 4, 3, 2, 1, 0],
		[0, 1, 2, 3, 4, 5, 6, 7],
	],
]

for (const test of testCases) {
	mergeSortIterative(test[0])
	console.log(test[0])
	console.log(JSON.stringify(test[0]) === JSON.stringify(test[1]))
}
