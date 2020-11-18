import math from "mathjs";

export class Decoder {
	/**
	 * @param decodingMatrix: Array<Array<number>> | Matrix
	 */
	constructor(decodingMatrix) {
		this.decodingMatrix = decodingMatrix;
	}

	/**
	 *
	 * @param encodedBitArray: Array<number | boolean>
	 * @returns Array<number>
	 */
	decode(encodedBitArray) {
		// split into 4-bit arrays
		const fourBitArrays = [];
		for (let i = 0; i < encodedBitArray.length - 7; i += 7) {
			fourBitArrays.push(encodedBitArray.slice(i, i + 4));
		}

		return fourBitArrays
			.flat()
			.map(matrix => matrix.toArray())
			.flat();
	}
}
