/*
Time Complexity:
Best, worst and average case - О(nlogn)
Space complexity - O(n)
*/

function mergeSort(arr) {
	// [0]
	function recurse(start, end) {
		if (start >= end) return

		const mid = start + Math.floor((end - start) / 2)

		recurse(start, mid)
		recurse(mid + 1, end)

		// [1]
		merge(arr, start, mid, end)

		return
	}
	recurse(0, arr.length - 1)
}

/* 
Notes:
[0] Recursive function that divides the array and recurses on the
    left half and right half and finally merges the left and right halves.
[1] Merge the sorted left and right halves
----------------------------------------------------------------
*/

// Tests
const testCases = [
	[[5, 6, 1, 0, 6, 2], [0, 1, 2, 5, 6, 6]],
	[[-1, 6, 2, 100, 0, -11], [-11, -1, 0, 2, 6, 100]],
	[[7, 6, 5, 4, 3, 2, 1, 0], [0, 1, 2, 3, 4, 5, 6, 7]]
]

for (const test of testCases) {
	mergeSort(test[0])
	console.log(test[0])
	console.log(JSON.stringify(test[0]) === JSON.stringify(test[1]))
}
