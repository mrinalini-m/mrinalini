/*
Space Complexity - < O(k*n x log(n)). Because the actual array is being overwritten.
So at each level, it's kn - n * number of merged arrays

Time Complexity —  O( kn x log(k)), where n is length of each array and k is the total number of arrays
*/

function mergeArrays(arr) {
	let total = arr.length,
		interval = 1
	const sortOrder = isIncreasingOrder(arr)

	while (interval < total) {
		for (let i = 0; i < total - interval; i += interval * 2) {
			arr[i] = merge(arr[i], arr[i + interval], sortOrder)
		}
		interval *= 2
	}

	return arr[0]
}
