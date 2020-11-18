/**
 * @param bitArray {number[]}
 * @returns {string}
 */
export function bitArrayToString(bitArray) {
	return bitArray ? bitArray.reduce((str, value) => str.concat(value.toString()), "") : "";
}

/**
 * @param matrix {number[][]}
 * @returns {string}
 */
export function matrixToString(matrix) {
	return matrix ? matrix.reduce((str, array) => str.concat(bitArrayToString(array) + "\n"), "") : "";
}

/**
 * @param string {string}
 * @returns {number[]}
 */
export function stringToBitArray(string) {
	return Array.from(string)
		.map(value => Number.parseInt(value, 2));
}
