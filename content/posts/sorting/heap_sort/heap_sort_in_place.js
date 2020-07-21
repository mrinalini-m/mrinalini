/*
Time Complexity = Time to build heap + Time to heapify n items 
T = O(n) + O(n * logn)
Since O(nlogn) > O(n), dropping O(n)
T = O(nlogn)

Space complexity - O(1) (Since heapify isn't recursive)
*/
function heapSort(arr) {
	// O(n)
	buildMaxHeap(arr)
	let lastHeapIndex = arr.length - 1

	// n items so T is O(n * logn)
	while (lastHeapIndex > 0) {
		swap(arr, 0, lastHeapIndex)
		lastHeapIndex--
		heapify(arr, 0, lastHeapIndex) // O(logn)
	}
}

// Time Complexity of buildMaxHeap O(n). It builds the max heap in place.
function buildMaxHeap(arr) {
	// start at rightmost node which is not a leaf
	let i = Math.floor(arr.length / 2 - 1)
	const lastIndex = arr.length - 1

	while (i >= 0) {
		heapify(arr, i, lastIndex)
		i--
	}
}

// Time Complexity of heapify - O(log n)
function heapify(heap, p, lastIndex) {
	while (p < lastIndex) {
		const r = 2 * p + 2,
			l = r - 1,
			right = heap[r],
			left = heap[l]

		let swapIndex = null,
			max = heap[p]

		if (l <= lastIndex && left > max) {
			swapIndex = l
			max = left
		}

		if (r <= lastIndex && right > max) {
			swapIndex = r
		}

		if (swapIndex === null) break
		swap(heap, p, swapIndex)
		p = swapIndex
	}
}

function swap(array, i, j) {
	let temp = array[i]
	array[i] = array[j]
	array[j] = temp
}
