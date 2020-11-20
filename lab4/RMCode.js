import math from "mathjs";
import {Code} from "./Code.js";
import {argMax} from "../shared/MathFns.js";
import {stringToBitArray} from "../shared/Converters.js";

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
		this.k = this.#calcK();
		this.G = this.#generateG();
	}

	encode(a) {
		if (a.length === this.k) {
			return math.multiply(a, this.G)
				.map(value => math.mod(value, 2));
		} else {
			throw new Error("Param 'a' should have length of " + this.k);
		}
	}

	decode(w) {
		const w_ = w.map(value => value === 1 ? 1 : -1);
		let wi = math.multiply(w_, this.#calcH(this.m, 1));
		for (let i = 2; i <= this.m; ++i) {
			wi = math.multiply(wi, this.#calcH(this.m, i));
		}
		const wm = wi;
		const j = argMax(math.abs(wm));
		const v = stringToBitArray(j.toString(2)).reverse();
		v.push(...new Array(this.m - v.length).fill(0));
		return 0 < wm[j] ? [1].concat(...v) : [0].concat(...v);
	}

	/**
	 * @param r {number} integer, 0 <= r
	 * @param m {number} integer, r <= m
	 * @returns {number[][]}
	 */
	#generateG(r = this.r, m = this.m) {
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
				...this.#generateG(m - 1, m),
				new Array(2**m - 1).fill(0).concat(1)
			];
		} else {
			const G_ = this.#generateG(r, m - 1);
			const rightPart = [
				...G_,
				...this.#generateG(r - 1, m - 1)
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

	#calcK() {
		let k = 0;
		for (let i = 0; i <= this.r; ++i) {
			k += math.combinations(this.m, i);
		}
		return k;
	}

	#calcH(m, i) {
		const I1 = math.diag(math.ones(2**(m - i))).toArray();
		const H = [[1, 1], [1, -1]];
		const I2 = math.diag(math.ones(2**(i - 1))).toArray();
		return math.kron(math.kron(I1, H), I2);
	}
}
