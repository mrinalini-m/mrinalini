/* 
First intuition
- Iterate through arrays and merge one array with the current merged(result) array

Time Complexity —  O(nk^2), where n is length of each array and k is the total number of arrays
Space Complexity - O(n*k)

Array of k arrays of length n
[ [   n    ] [   n    ] [   n    ] .... [   n    ]]
      1          2          3      ...      k

| iteration | work done at iteration |
| --------- | ---------------------- |
| 1         | 0 + n                  |
| 2         | n + n                  |
| 3         | 2n + n                 |
| ...       | ...                    |
| k         | (k-1) + n              |

Total work done =  n + 2n + 3n + .... + kn
T(n) = n * (1 + 2 + ..... + k)

https://en.wikipedia.org/wiki/1_%2B_2_%2B_3_%2B_4_%2B_%E2%8B%AF
kth partial sum of the series from 1 to k is:
    k(k + 1)/2
Therefore, T(n) = nk^2
*/

function mergeArrays(arrays) {
	const k = arrays.length,
		increasingOrder = isIncreasingOrder(arrays)

	let merged = []

	for (let i = 0; i < k; i++) {
		merged = merge(arrays[i], merged, increasingOrder)
	}

	return merged
}
