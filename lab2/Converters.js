/**
 * @param bitArray: number[]
 * @returns {string}
 */
export function bitArrayToString(bitArray) {
	return bitArray.reduce((str, value) => str.concat(value.toString()), "");
}

/**
 * @param string: string
 * @returns {number[]}
 */
export function stringToBitArray(string) {
	return Array.from(string)
		.map(value => Number.parseInt(value, 2));
}
