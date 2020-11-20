export class Code {
	/**
	 * @param a {number[]}
	 * @returns {number[]}
	 */
	encode(a) {
		throw new Error("'encode' method has no implementation!")
	}

	/**
	 * @param w {number[]}
	 * @returns {number[]}
	 */
	decode(w) {
		throw new Error("'decode' method has no implementation!")
	}

	/**
	 * @param encodedData {number[]}
	 * @param errorsTotal {number} integer, greater than 0
	 * @returns {number[]}
	 */
	injectError(encodedData, errorsTotal = 1) {
		const encodedDataWithError = [...encodedData];
		for (let i = 0; i < errorsTotal; ++i) {
			encodedDataWithError[i] = encodedData[i] ? 0 : 1;
		}
		return encodedDataWithError;
	}
}
