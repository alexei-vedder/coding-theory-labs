import math from "mathjs";

export class CyclicCodes {

	/**
	 *
	 * @param k: number (integer)
	 * @param n: number (integer)
	 * @param g: number[]
	 * @param t: number (integer)
	 * @param L: number (integer)
	 */
	constructor(k = 4, n = 7, g = [1, 0, 1, 1], t = 1, L) {
		this.k = k;
		this.n = n;
		this.g = g;
		this.t = t;
		this.L = L;
	}

	/**
	 * format: [k0, k1, k2, ..., kn] represents k0 + k1*x + k2*x**2 + ... + kn*x**n
	 * @param a: number[]
	 * @returns number[]
	 */
	encode(a) {
		return CyclicCodes.#multPolynomes(a, this.g).slice(0, this.n);
	}

	/**
	 * format: [k0, k1, k2, ..., kn] represents k0 + k1*x + k2*x**2 + ... + kn*x**n
	 * @param c: number[]
	 * @returns number[]
	 */
	findRemainder(c) {
		return CyclicCodes.#dividePolynomesWithRemainder(c, this.g).remainder;
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
	 * format: [k0, k1, k2, ..., kn] represents k0 + k1*x + k2*x**2 + ... + kn*x**n
	 * @param dividend: number[]
	 * @param divisor: number[]
	 * @returns {{quotient: number[], remainder: number[]}}
	 */
	static #dividePolynomesWithRemainder(dividend, divisor) {
		const remainder = [...dividend];
		const quotient = new Array(dividend.length - divisor.length + 1);
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
	static #multPolynomes(a, b) {
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
}

const cyclicCodes = new CyclicCodes();

const a = [0, 0, 0, 1];
const c =  cyclicCodes.encode(a);
const r = cyclicCodes.findRemainder(c);
const c2 = cyclicCodes.encodeSys(a);

console.log("Task 2. Encoded a:", c);
console.log("Task 3. Remainder of c:", r);
console.log("Task 4. Encoded sys a:", c2);
