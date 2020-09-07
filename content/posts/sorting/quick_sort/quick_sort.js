// Quick Sort - With Lomuto partition
function quickSort(arr) {
	function recurse(start, end) {
		if (start >= end) return

		const pivot = partition(arr, start, end)

		recurse(start, pivot - 1)
		recurse(pivot + 1, end)
	}
	recurse(0, arr.length - 1)
}

function partition(arr, start, end) {
	const randomIndex = getRandomIntInclusive(start, end)

	swap(arr, randomIndex, start)

	const pivot = arr[start]
	let smaller = start,
		bigger = start + 1

	for (bigger; bigger <= end; bigger++) {
		if (arr[bigger] < pivot) {
			smaller++
			swap(arr, smaller, bigger)
		}
	}

	swap(arr, start, smaller)

	return smaller
}

// Helper util functions
function swap(array, i, j) {
	let temp = array[i]
	array[i] = array[j]
	array[j] = temp
}

function getRandomIntInclusive(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

/*
Time Complexity:
Best, Average - Θ(nlogn)
worst - Θ(n^2)
Space complexity - O(logn) auxillary space (for recursion call stack)
*/

/* ---------------------------------------------------------------------------- */
// Tests

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
	quickSort(test[0])
	console.log(test[0])
	console.log(JSON.stringify(test[0]) === JSON.stringify(test[1]))
}
