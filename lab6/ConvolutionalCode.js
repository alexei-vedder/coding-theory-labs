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
		let wayObjects = [];

		for (let state of this.diagram.states) {
			wayObjects.push({
				way: this.#findWay(stringToBitArray(state))
			})
		}

		t = this.m;

		wayObjects.forEach(way => {
			way.distance = this.#calcDistance(
				w.join("").slice(0, this.m * this.n),
				this.#extractEncodedMessageFromWay(way.way)
			);
		});

		console.log(`WAYS (t=${t})`, wayObjects);

		for (t++; t <= chunks.length; t++) {
			const newWayObjects = [];

			for (let newState of this.diagram.states) {
				const state0 = newState.slice(1) + "0";
				const state1 = newState.slice(1) + "1";

				const way0 = wayObjects.find(wayObj => wayObj.way.slice(0, this.m) === state0);
				const way1 = wayObjects.find(wayObj => wayObj.way.slice(0, this.m) === state1);

				const distance0 = way0.distance + this.#calcDistance(
					chunks[t - 1].join(""),
					this.diagram.edges
						.find(edge => edge.from === state0 && edge.to === newState)
						.output
				);
				const distance1 = way1.distance + this.#calcDistance(
					chunks[t - 1].join(""),
					this.diagram.edges
						.find(edge => edge.from === state1 && edge.to === newState)
						.output
				);

				let newWayObject;

				if (distance0 < distance1) {
					newWayObject = {
						way: newState[0] + way0.way,
						distance: distance0
					}
				} else if (distance1 < distance0) {
					newWayObject = {
						way: newState[0] + way1.way,
						distance: distance1
					}
				} else if (distance0 === distance1) {
					let way = newState[0];
					for (let i = 0; i < way0.way.length; ++i) {
						way += way0.way[i] === way1.way[i] ? way0.way[i] : "*";
					}
					newWayObject = {
						way,
						distance: distance0
					}
				}

				newWayObjects.push(newWayObject);
			}

			console.log(`WAYS (t=${t})`, newWayObjects);

			wayObjects = newWayObjects;
		}

		const shortestWay = wayObjects
			.reduce((shortest, wayObj) => (shortest.distance < wayObj.distance) ? shortest : wayObj, wayObjects[0])
			.way;

		console.log("Shortest way:", shortestWay);

		return this.decode(stringToBitArray(this.#extractEncodedMessageFromWay(shortestWay)));
	}

	/**
	 * @param way {string}
	 * @returns {string}
	 */
	#extractEncodedMessageFromWay(way) {
		let encoded = "";
		for (let i = 0; i < way.length - this.m; ++i) {
			const from = i === 0 ? way.slice(-this.m - i) : way.slice(-this.m - i, -i);
			const to = way.slice(-this.m - i - 1, -i - 1);
			encoded += this.diagram.edges
				.find(edge => edge.from === from &&
					edge.to === to).output;
		}
		return encoded;
	}

	/**
	 * @param endState {number[]}
	 * @returns {string}
	 */
	#findWay(endState) {
		let state = "000";
		return endState.reduce((result, bit) => {
			state = (bit + state).slice(0, 3);
			return state[0] + result;
		}, state);
	}

	/**
	 *
	 * @param a {string | number[]}
	 * @param b {string | number[]}
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
