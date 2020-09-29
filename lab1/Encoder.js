import math from "mathjs"

export class Encoder {
	/**
	 * @param encodingMatrix: Array<Array<number>> | Matrix
	 */
	constructor(encodingMatrix) {
		this.encodingMatrix = encodingMatrix;
	}

	/**
	 * c = a * G, where a - bit array, G - encoding matrix
	 * @param bitArray: Array<number | boolean>
	 * @returns Array<number>
	 */
	encode(bitArray) {
		// split into 4-bit arrays
		const fourBitArrays = [];
		for (let i = 0; i < bitArray.length - 4; i += 4) {
			fourBitArrays.push(bitArray.slice(i, i + 4));
		}

		// encode each of them
		const encodedFourBitArrays = fourBitArrays.map(array => math.mod(math.multiply(array, this.encodingMatrix), 2));

		// concat all the arrays with encoded data
		return encodedFourBitArrays.flat();
	}

}
