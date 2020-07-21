function merge(arr, start, mid, end) {
	const aux = []
	let i = start,
		j = mid + 1

	// [0]
	while (i <= mid && j <= end) {
		// [1]
		if (arr[i] < arr[j]) {
			aux.push(arr[i])
			i++
		} else {
			aux.push(arr[j])
			j++
		}
	}
	// [2]
	while (i <= mid) {
		aux.push(arr[i])
		i++
	}
	// [3]
	while (j <= end) {
		aux.push(arr[j])
		j++
	}

	// [4]
	for (let i = 0; i < aux.length; i++) {
		arr[start + i] = aux[i]
	}
}

/* 
Notes:
[0] Until we reach either the end of the right array or end of the left array,
    keep comparing and pushing items into the aux array
[1] arr[i] < arr[j] will result in an unstable sort.
    A stable sort is one which preserves the order of repeated values.
[2] Push leftover values from right array
[3] Push leftover values from left array.
    There will only be one side with leftover values
[4] Set values of arr[start...end] = aux[0...n-1]
    Space complexity O(n) comes from the aux array
*/
