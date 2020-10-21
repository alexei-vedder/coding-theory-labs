import math from "mathjs";

export class CyclicCodes {

	/**
	 * @param k: number (integer)
	 * @param n: number (integer)
	 * @param g: number[] (integer)
	 * @param t: number (integer)
	 * @param L: number (integer)
	 */
	constructor(k = 4, n = 7, g = [1, 0, 1, 1], t = 1, L) {
		this.k = k;
		this.n = n;
		this.g = g;
		this.t = t;
		this.L = L;
		this.syndromeTable = this.generateSyndromeTable();
	}

	/**
	 * format: [k0, k1, k2, ..., kn] represents k0 + k1*x + k2*x**2 + ... + kn*x**n
	 * @param a: number[]
	 * @returns number[]
	 */
	encode(a) {
		return CyclicCodes.#multPolynomials(a, this.g)
			.slice(0, this.n)
			.map(value => math.mod(value, 2));
	}

	/**
	 * format: [k0, k1, k2, ..., kn] represents k0 + k1*x + k2*x**2 + ... + kn*x**n
	 * @param c: number[]
	 * @returns number[]
	 */
	findRemainder(c) {
		return CyclicCodes.#dividePolynomialsWithRemainder(c, this.g).remainder
			.map(value => math.mod(value, 2));
	}

	/**
	 * format: [k0, k1, k2, ..., kn] represents k0 + k1*x + k2*x**2 + ... + kn*x**n
	 * @param a: number[]
	 * @returns number[]
	 */
	encodeSys(a) {
		const c_ = a.fill(0, 0, this.n - this.k);
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
				const c = Array.from(error.toString(2))
					.map(value => Number.parseInt(value));

				c.unshift(...new Array(this.n - c.length).fill(0));

				const syndrome = this.findRemainder(c)
					.reduce((str, value) => str.concat(value.toString()), "");

				syndromes[syndrome] = error.toString(2);
			}
		}
		return syndromes;
	}

	/**
	 * format: [k0, k1, k2, ..., kn] represents k0 + k1*x + k2*x**2 + ... + kn*x**n
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
	 * format: [k0, k1, k2, ..., kn] represents k0 + k1*x + k2*x**2 + ... + kn*x**n
	 * @param a: number[]
	 * @param b: number[]
	 * @returns number[]
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
	 * @returns number
	 */
	static #hammingWeight(code) {
		return code.toString(2).replace(/0/g, "").length;
	}
}
