import math from "mathjs";

/**
 * @param dividend {number[]}
 * @param divisor {number[]}
 * @returns {{quotient: number[], remainder: number[]}}
 */
export function dividePolynomialsWithRemainder(dividend, divisor) {
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
 * @param a {number[]}
 * @param b {number[]}
 * @returns {number[]}
 */
export function multPolynomials(a, b) {
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
 * @param code {string}
 * @returns {number} (integer)
 */
export function hammingWeight(code) {
	return code.replace(/0/g, "").length;
}

/**
 * @param a {number[]}
 * @param b {number[]}
 * @returns {number[]}
 */
export function xor(a, b) {
	let longest = a.length <= b.length ? b : a;
	let shortest = a.length <= b.length ? a : b;

	/* make equal lengths */
	shortest = shortest.concat(new Array(longest.length - shortest.length).fill(0));

	return math.xor(longest, shortest).map(value => value ? 1 : 0);
}
