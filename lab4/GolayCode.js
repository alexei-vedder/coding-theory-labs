import math from "mathjs";
import {hammingWeight, xor} from "../shared/MathFns.js";
import {bitArrayToString} from "../shared/Converters.js";
import {Code} from "./Code.js";

export class GolayCode extends Code {
	/**
	 *
	 * @param k {number}
	 * @param n {number}
	 * @param B {number[][]}
	 */
	constructor(k = 12, n = 24, B) {
		super();
		this.k = k;
		this.n = n;
		this.B = B ? B : this.#generateB();
		this.I = math.diag(math.ones(this.k)).toArray();
		this.G = math.concat(this.I, this.B);
		this.H = [
			...this.I,
			...this.B
		];
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
		const syndrome = math.multiply(w, this.H).map(value => math.mod(value, 2));
		const syndromeWeight = hammingWeight((bitArrayToString(syndrome)));

		console.log("Syndrome:", bitArrayToString(syndrome));

		let u;
		if (syndromeWeight <= 3) {
			u = [...syndrome, ...new Array(this.k).fill(0)];
		} else if (u = this.#calcErrorViaB(syndrome, "ei_last")) {
		} else {
			const syndrome2 = math.multiply(syndrome, this.B).map(value => math.mod(value, 2));
			const syndrome2Weight = hammingWeight((bitArrayToString(syndrome2)));

			console.log("Syndrome2:", bitArrayToString(syndrome2));

			if (syndrome2Weight <= 3) {
				u = [...new Array(this.k).fill(0), ...syndrome2]
			} else {
				u = this.#calcErrorViaB(syndrome2, "ei_first");
			}
		}

		console.log("u:", bitArrayToString(u))
		return u ? xor(w, u).slice(0, this.k) : (() => {throw new Error("u is not found :(")})();
	}

	/**
	 * @returns {number[][]}
	 */
	#generateB() {
		// return math.randomInt([this.k, this.k], 0, 2);
		return [
			[1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1],
			[1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1],
			[0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1],
			[1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1],
			[1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1],
			[1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1],
			[0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1],
			[0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
			[0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1],
			[1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1],
			[0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
		];
	}

	/**
	 * @param syndrome {number[]}
	 * @param concatOption {"ei_first"|"ei_last"}
	 * @returns {number[]|null}
	 */
	#calcErrorViaB(syndrome, concatOption) {
		for (let i = 0; i < this.B.length; ++i) {
			const sPlusBi = math.add(syndrome, this.B[i]).map(value => math.mod(value, 2));
			const weight = hammingWeight(bitArrayToString(sPlusBi));
			if (weight <= 2) {
				switch (concatOption) {
					case "ei_last": return [...sPlusBi, ...this.I[i]];
					case "ei_first": return [...this.I[i], ...sPlusBi];
					default: return null;
				}
			}
		}
		return null;
	}
}
