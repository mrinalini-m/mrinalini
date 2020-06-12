function merge(arr, start, mid, end) {
	const aux = []
	let i = start,
		j = mid + 1

	// [0]
	while (i <= mid && j <= end) {
		if (arr[i] < arr[j]) {
			aux.push(arr[i])
			i++
		} else {
			aux.push(arr[j])
			j++
		}
	}
	// [1]
	while (i <= mid) {
		aux.push(arr[i])
		i++
	}
	// [2]
	while (j <= end) {
		aux.push(arr[j])
		j++
	}

	// [3]
	for (let i = 0; i < aux.length; i++) {
		arr[start + i] = aux[i]
	}
}

/* 
Notes:
[0] Until we reach either the end of the right array or end of the left array,
    keep comparing and pushing items into the aux array
[1] Push leftover values from right array
[2] Push leftover values from left array.
    There will only be one side with leftover values
[3] Set values of arr[start...end] = aux[0...n-1]
    Space complexity O(n) comes from the aux array
*/
