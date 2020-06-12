/* 
  Time Complexity - O(nklog(k))
  Space Complexity - O(nk) 
*/

function mergeSort(arr, increasingOrder) {
	const len = arr.length

	if (len <= 1) {
		return arr[0]
	}

	const mid = Math.floor(len / 2),
		left = mergeSort(arr.slice(0, mid), increasingOrder),
		right = mergeSort(arr.slice(mid), increasingOrder)

	return merge(left, right, increasingOrder)
}

function mergeArrays(arrays) {
	const increasingOrder = isIncreasingOrder(arrays)
	return mergeSort(arrays, increasingOrder)
}
