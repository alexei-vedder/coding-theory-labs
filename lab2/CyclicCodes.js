import math from "mathjs";
import {bitArrayToString, stringToBitArray} from "./Converters.js";

/**
 * format of number[]: [k0, k1, k2, ..., kn] represents k0 + k1*x + k2*x**2 + ... + kn*x**n
 */
export class CyclicCodes {

	/**
	 * @param k: number (integer)
	 * @param n: number (integer)
	 * @param g: number[] (integer)
	 * @param t: number (integer)
	 */
	constructor(k = 4, n = 7, g = [1, 0, 1, 1], t = 1) {
		this.k = k;
		this.n = n;
		this.g = g;
		this.t = t;
		this.syndromeTable = this.generateSyndromeTable();
	}

	/**
	 * @param a: number[]
	 * @returns number[]
	 */
	encode(a) {
		return CyclicCodes.#multPolynomials(a, this.g)
			.slice(0, this.n)
			.map(value => math.mod(value, 2));
	}

	/**
	 * @param a: number[]
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
			result = CyclicCodes.#xor(a, stringToBitArray(error)).slice(this.k + 1);
		}

		return result;
	}

	/**
	 * @param c: number[]
	 * @returns number[]
	 */
	findRemainder(c) {
		return CyclicCodes.#dividePolynomialsWithRemainder(c, this.g).remainder
			.map(value => math.mod(value, 2));
	}

	/**
	 * @param a: number[]
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
			if (CyclicCodes.#hammingWeight(error) <= this.t) {
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

	/**
	 * @param dividend: number[]
	 * @param divisor: number[]
	 * @returns {{quotient: number[], remainder: number[]}}
	 */
	static #dividePolynomialsWithRemainder(dividend, divisor) {
		const remainder = [...dividend];
		const quotientLength = dividend.length - divisor.length + 1;
		if (quotientLength < 1) {
			return {quotient: [0], remainder};
		}
		const quotient = new Array(quotientLength);
		for (let i = 0; i < quotient.length; ++i) {
			let coeff = remainder[remainder.length - i - 1] / divisor[divisor.length - 1];
			quotient[quotient.length - i - 1] = coeff;
			for (let j = 0; j < divisor.length; ++j) {
				remainder[remainder.length - i - j - 1] -= coeff * divisor[divisor.length - j - 1];
			}
		}
		return {quotient, remainder};
	}

	/**
	 * @param a: number[]
	 * @param b: number[]
	 * @returns {number[]}
	 */
	static #multPolynomials(a, b) {
		const R = (a.length - 1) * (b.length - 1);
		const result = new Array(R).fill(0);

		for (let i = 0; i < a.length; ++i) {
			for (let j = 0; j < b.length; ++j) {
				if (i + j < R) {
					result[i + j] += a[i] * b[j];
				}
			}
		}

		return result;
	}

	/**
	 * @param code: number (integer)
	 * @returns {number} (integer)
	 */
	static #hammingWeight(code) {
		return code.toString(2).replace(/0/g, "").length;
	}

	/**
	 * @param a: number[]
	 * @param b: number[]
	 * @returns {number[]}
	 */
	static #xor(a, b) {
		let longest = a.length < b.length ? b : a;
		let shortest = a.length < b.length ? a : b;

		/* make equal lengths */
		shortest = shortest.concat(new Array(longest.length - shortest.length).fill(0));

		return math.xor(longest, shortest).map(value => value ? 1 : 0);
	}
}
