function insertionSortIterative(arr) {
	const len = arr.length
	if (len <= 1) return

	for (let i = 1; i < len; i++) {
		const ith = arr[i]
		let j = i - 1

		while (j >= 0 && arr[j] > ith) {
			arr[j + 1] = arr[j]
			j--
		}

		arr[j + 1] = ith
	}

	return
}

/*
Time Complexity:
Average and Worse Case: O(n^2)
Best Case: O(n)
Space complexity - O(1)
*/

/* ---------------------------------------------------------------------------- */

const testCases = [
	[
		[5, 4, 3, 2, 1],
		[1, 2, 3, 4, 5],
	],
	[
		[5, 6, 1, 0, 6, 2],
		[0, 1, 2, 5, 6, 6],
	],
	[
		[-1, 6, 2, 100, 0, -11],
		[-11, -1, 0, 2, 6, 100],
	],
]

for (const test of testCases) {
	const arr = JSON.parse(JSON.stringify(test[0])) //copy of array
	insertionSortIterative(arr)
	console.log(JSON.stringify(arr) === JSON.stringify(test[1]))
}
