import math from "mathjs";
import {Code} from "./Code.js";

export class RMCode extends Code {

	/**
	 * @param r {number} integer, 0 <= r
	 * @param m {number} integer, r <= m
	 */
	constructor(r, m) {
		super();
		if (r < 0 || m < r) {
			throw new Error("Incorrect params!");
		}
		this.r = r;
		this.m = m;
	}

	/**
	 * @param r {number} integer, 0 <= r
	 * @param m {number} integer, r <= m
	 * @returns {number[][]}
	 */
	generateG(r = this.r, m = this.m) {
		if (r < 0 || m < r) {
			throw new Error("Incorrect params!");
		}

		if (r === 0 && m === 1) {
			return [[1, 1]];
		}

		if (r === 1 && m === 1) {
			return [
				[1, 1],
				[0, 1]
			];
		}

		if (r === 0) {
			return [new Array(2**m).fill(1)];
		} else if (r === m) {
			return [
				...this.generateG(m - 1, m),
				new Array(2**m - 1).fill(0).concat(1)
			];
		} else {
			const G_ = this.generateG(r, m - 1);
			const rightPart = [
				...G_,
				...this.generateG(r - 1, m - 1)
			];
			const leftPart = [
				...G_,
				...new Array(rightPart.length - G_.length)
					.fill(new Array(2**(m - 1)).fill(0))
			];
			const G = math.concat(leftPart, rightPart);
			return G;
		}
	}
}

