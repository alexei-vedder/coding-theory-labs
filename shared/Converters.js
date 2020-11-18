/**
 * @param bitArray {number[]}
 * @returns {string}
 */
export function bitArrayToString(bitArray) {
	return bitArray ? bitArray.reduce((str, value) => str.concat(value.toString()), "") : "";
}

/**
 * @param string {string}
 * @returns {number[]}
 */
export function stringToBitArray(string) {
	return Array.from(string)
		.map(value => Number.parseInt(value, 2));
}

/**
 * @param matrix {number[][]}
 * @returns {string}
 */
export function bitMatrixToString(matrix) {
	return matrix ? matrix.reduce((str, array) => str.concat(bitArrayToString(array) + "\n"), "") : "";
}

/**
 * @param string {string}
 * @returns {number[][]}
 */
export function stringToBitMatrix(string) {
	const matrix = [[]];
	Array.from(string)
		.forEach((value, index, array) => {
			if (value !== "\n") {
				matrix[matrix.length - 1].push(Number.parseInt(value,2));
			} else if (index !== array.length - 1) {
				matrix.push([]);
			}
		});
	return matrix;
}
