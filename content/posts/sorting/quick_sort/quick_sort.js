// Helper util functions
function swapArrItemsInPlace(array, i, j) {
	let temp = array[i]
	array[i] = array[j]
	array[j] = temp
}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

// Quick Sort - With Lomuto partition
function quickSort(arr) {
	function recurse(start, end) {
		if (start >= end || start > 15 || end > 15) return

		const randomIndex = getRandomIntInclusive(start, end)

		swapArrItemsInPlace(arr, randomIndex, start)

		const pivot = arr[start]
		let smaller = start,
			bigger

		for (bigger = start + 1; bigger <= end; bigger++) {
			if (arr[bigger] < pivot) {
				smaller++
				swapArrItemsInPlace(arr, smaller, bigger)
			}
		}
		bigger--

		swapArrItemsInPlace(arr, start, smaller)

		recurse(start, smaller - 1)
		recurse(smaller + 1, bigger)
	}
	recurse(0, arr.length - 1)
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
	[[5, 6, 1, 0, 6, 2], [0, 1, 2, 5, 6, 6]],
	[[-1, 6, 2, 100, 0, -11], [-11, -1, 0, 2, 6, 100]],
	[[7, 6, 5, 4, 3, 2, 1, 0], [0, 1, 2, 3, 4, 5, 6, 7]]
]

for (const test of testCases) {
	const arr = JSON.parse(JSON.stringify(test[0])) //copy of array
	quickSort(arr)
	console.log(arr)
	console.log(JSON.stringify(arr) === JSON.stringify(test[1]))
}
