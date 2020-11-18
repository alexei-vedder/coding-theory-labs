import math from "mathjs";
import {bitArrayToString, stringToBitArray} from "../shared/Converters.js";
import {dividePolynomialsWithRemainder, hammingWeight, multPolynomials, xor} from "../shared/MathFns.js";

/**
 * Note about the format of number[] used in this class:
 * [k0, k1, k2, ..., kn] represents k0 + k1*x + k2\*x\*\*2 + ... + kn\*x\*\*n
 */
export class CyclicCodes {

	/**
	 * @param k {number} (integer)
	 * @param n {number} (integer)
	 * @param g {number[]} (integer)
	 * @param t {number} (integer)
	 */
	constructor(k = 4, n = 7, g = [1, 0, 1, 1], t = 1) {
		this.k = k;
		this.n = n;
		this.g = g;
		this.t = t;
		this.syndromeTable = this.generateSyndromeTable();
	}

	/**
	 * @param a {number[]}
	 * @returns number[]
	 */
	encode(a) {
		return multPolynomials(a, this.g)
			.slice(0, this.n)
			.map(value => math.mod(value, 2));
	}

	/**
	 * @param a {number[]}
	 * @returns number[]
	 */
	decode(a) {
		let result;
		let remainder = this.findRemainder(a);
		console.log("Decode remainder", bitArrayToString(remainder));
		if (remainder.every((value => value === 0))) {
			result = a.slice(this.k + 1);
		} else {
			remainder = remainder.slice(0, this.n);
			const error = this.syndromeTable[bitArrayToString(remainder)];
			if (!error) {
				throw new Error("Unable to decode this message: " + bitArrayToString(a) + ". Syndrome: " + bitArrayToString(remainder));
			}
			result = xor(a, stringToBitArray(error)).slice(this.k + 1);
		}

		return result;
	}

	/**
	 * @param c {number[]}
	 * @returns number[]
	 */
	findRemainder(c) {
		return dividePolynomialsWithRemainder(c, this.g).remainder
			.map(value => math.mod(value, 2));
	}

	/**
	 * @param a {number[]}
	 * @returns number[]
	 */
	encodeSys(a) {
		const c_ = new Array(this.n - this.k).fill(0).concat(...a);
		const r = this.findRemainder(c_);
		const c = math.add(c_, r);
		return c;
	}

	/**
	 * @returns {{}}
	 */
	generateSyndromeTable() {
		const syndromes = {};
		for (let error = 0; error < math.pow(2, this.n); ++error) {
			if (hammingWeight(error.toString(2)) <= this.t) {
				const c = stringToBitArray(error.toString(2));
				c.unshift(...new Array(this.n - c.length).fill(0));
				const syndrome = bitArrayToString(this.findRemainder(c));
				let errorAsBitString = error.toString(2);
				errorAsBitString = "0".repeat(this.n - errorAsBitString.length) + errorAsBitString;
				syndromes[syndrome] = errorAsBitString;
			}
		}
		return syndromes;
	}
}
