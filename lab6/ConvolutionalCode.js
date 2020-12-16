import {Code} from "../lab4/Code.js";
import {stringToBitArray} from "../shared/Converters.js";

export class ConvolutionalCode extends Code {

	constructor(n, m) {
		super();
		this.n = n;
		this.m = m;

		Array.prototype.chunk = function (n) {
			return Array.from(Array(Math.ceil(this.length / n)), (_, i) => this.slice(i * n, i * n + n));
		}

		Array.prototype.last = function () {
			return this[this.length - 1];
		}

		if (n === 2 && m === 3) {
			this.diagram = {
				states: [
					"000",
					"001",
					"010",
					"011",
					"100",
					"101",
					"110",
					"111"
				],
				edges: [
					{
						from: "000",
						to: "000",
						output: "00"
					},
					{
						from: "000",
						to: "100",
						output: "11"
					},
					{
						from: "100",
						to: "010",
						output: "10"
					},
					{
						from: "100",
						to: "110",
						output: "01"
					},
					{
						from: "110",
						to: "111",
						output: "00"
					},
					{
						from: "110",
						to: "011",
						output: "11"
					},
					{
						from: "111",
						to: "111",
						output: "11"
					},
					{
						from: "111",
						to: "011",
						output: "00"
					},
					{
						from: "011",
						to: "101",
						output: "01"
					},
					{
						from: "011",
						to: "001",
						output: "10"
					},
					{
						from: "001",
						to: "000",
						output: "11"
					},
					{
						from: "001",
						to: "100",
						output: "00"
					},
					{
						from: "010",
						to: "101",
						output: "10"
					},
					{
						from: "010",
						to: "001",
						output: "01"
					},
					{
						from: "101",
						to: "110",
						output: "10"
					},
					{
						from: "101",
						to: "010",
						output: "01"
					},
				]
			}
		} else {
			throw new Error("Cannot handle input params")
		}
	}

	encode(a) {
		let state = "000";
		return a.reduce((result, bit) => {
			const nextState = (bit + state).slice(0, 3);
			const output = this.diagram.edges.find(edge => edge.from === state && edge.to === nextState).output;
			result.push(...stringToBitArray(output));
			state = nextState;
			return result;
		}, []);
	}

	decode(w) {
		let state = "000";
		const chunks = w.chunk(this.n);
		return chunks.reduce((result, chunk) => {
			const nextState = this.diagram.edges.find(edge => edge.from === state && edge.output === chunk.join("")).to;
			const bit = nextState[0];
			result.push(Number.parseInt(bit));
			state = nextState;
			return result;
		}, []);
	}

	decodeViterbi(w) {
		const chunks = w.chunk(this.n);
		let t = 0;
		const ways = [];

		for (let state of this.diagram.states) {
			ways.push({
				states: this.#findStateChain(stringToBitArray(state)),
			})
		}

		t = this.m;

		ways.forEach(way => {
			way.distance = this.#calcDistance(
				w.join("").slice(0, this.m * this.n),
				this.#extractEncodedMessageFromPath(way.states)
			);
		});

		console.log("WAYS", ways);

		const newWays = [];

		t++;

		for (let newState of this.diagram.states) {
			const state0 = newState.slice(1) + "0";
			const state1 = newState.slice(1) + "1";

			const way0 = ways.find(path => path.states.last() === state0);
			const way1 = ways.find(path => path.states.last() === state1);

			const distance0 = way0.distance + this.#calcDistance(
				chunks[t - 1].join(""),
				this.diagram.edges.find(edge => edge.from === state0 && edge.to === newState).output
			);
			const distance1 = way1.distance + this.#calcDistance(
				chunks[t - 1].join(""),
				this.diagram.edges.find(edge => edge.from === state1 && edge.to === newState).output
			);

			let newWay;

			if (distance0 < distance1) {
				newWay = {
					states: [...way0.states, newState],
					distance: distance0
				}
			} else if (distance1 < distance0) {
				newWay = {
					states: [...way1.states, newState],
					distance: distance1
				}
			} else {
				throw new Error("distances are equal, dunno what to do");
			}

			newWays.push(newWay);
		}

		console.log("NEW WAYS", newWays);
	}

	#extractEncodedMessageFromPath(states) {
		let encoded = "";
		for (let i = 1; i < states.length; ++i) {
			encoded += this.diagram.edges.find(edge => edge.from === states[i - 1] && edge.to === states[i]).output;
		}
		return encoded;
	}

	#findStateChain(endState) {
		let state = "000";
		return endState.reduce((result, bit) => {
			const nextState = (bit + state).slice(0, 3);
			result.push(nextState);
			state = nextState;
			return result;
		}, [state]);
	}

	/**
	 *
	 * @param a {(string | number)[]}
	 * @param b {(string | number)[]}
	 * @returns {number}
	 */
	#calcDistance(a, b) {
		let counter = 0;
		for (let i = 0; i < Math.min(a.length, b.length); ++i) {
			if (a[i] !== b[i]) {
				counter++;
			}
		}
		return counter;
	}
}
