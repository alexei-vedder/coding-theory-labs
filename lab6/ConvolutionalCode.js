import {Code} from "../lab4/Code.js";
import {isDeepStrictEqual} from "util";

export class ConvolutionalCode extends Code {

	constructor(n, m) {
		super();
		this.n = n;
		this.m = m;

		Array.prototype.chunk = function (n) {
			return Array.from(Array(Math.ceil(this.length / n)), (_, i) => this.slice(i * n, i * n + n));
		}

		/*
		this.diagram2 = new Map([
			[{state: [0, 0, 0], input: [0]}, {state: [0, 0, 0], output: [0, 0]}],
			[{state: [0, 0, 0], input: [0]}, {state: [1, 0, 0], output: [1, 1]}],
			[{state: [0, 0, 0], input: [1]}, {state: [0, 0, 0], output: [0, 0]}],
			[{state: [0, 0, 0], input: [1]}, {state: [1, 0, 0], output: [1, 1]}],

			[{state: [1, 0, 0], input: [1]}, {state: [1, 1, 0], output: [0, 1]}],
			[{state: [1, 0, 0], input: [1]}, {state: [0, 1, 0], output: [1, 0]}],
			[{state: [1, 0, 0], input: [0]}, {state: [1, 1, 0], output: [0, 1]}],
			[{state: [1, 0, 0], input: [0]}, {state: [0, 1, 0], output: [1, 0]}],

			[{state: [1, 1, 0], input: [0]}, {state: [1, 1, 1], output: [0, 0]}],
			[{state: [1, 1, 0], input: [0]}, {state: [0, 1, 1], output: [1, 1]}],
			[{state: [1, 1, 0], input: [1]}, {state: [1, 1, 1], output: [0, 0]}],
			[{state: [1, 1, 0], input: [1]}, {state: [0, 1, 1], output: [1, 1]}],

			[{state: [1, 1, 1], input: [0]}, {state: [1, 1, 1], output: [1, 1]}],
			[{state: [1, 1, 1], input: [0]}, {state: [0, 1, 1], output: [0, 0]}],
			[{state: [1, 1, 1], input: [1]}, {state: [1, 1, 1], output: [1, 1]}],
			[{state: [1, 1, 1], input: [1]}, {state: [0, 1, 1], output: [0, 0]}],

			[{state: [0, 1, 1], input: [0]}, {state: [1, 0, 1], output: [0, 1]}],
			[{state: [0, 1, 1], input: [0]}, {state: [0, 0, 1], output: [1, 0]}],
			[{state: [0, 1, 1], input: [1]}, {state: [1, 0, 1], output: [0, 1]}],
			[{state: [0, 1, 1], input: [1]}, {state: [0, 0, 1], output: [1, 0]}],

			[{state: [0, 0, 1], input: [1]}, {state: [1, 0, 0], output: [0, 0]}],
			[{state: [0, 0, 1], input: [1]}, {state: [0, 0, 0], output: [1, 1]}],
			[{state: [0, 0, 1], input: [0]}, {state: [1, 0, 0], output: [0, 0]}],
			[{state: [0, 0, 1], input: [0]}, {state: [0, 0, 0], output: [1, 1]}],

			[{state: [0, 1, 0], input: [1]}, {state: [0, 0, 1], output: [0, 1]}],
			[{state: [0, 1, 0], input: [1]}, {state: [1, 0, 1], output: [1, 0]}],
			[{state: [0, 1, 0], input: [0]}, {state: [0, 0, 1], output: [0, 1]}],
			[{state: [0, 1, 0], input: [0]}, {state: [1, 0, 1], output: [1, 0]}],

			[{state: [1, 0, 1], input: [1]}, {state: [1, 1, 0], output: [1, 0]}],
			[{state: [1, 0, 1], input: [1]}, {state: [0, 1, 0], output: [0, 1]}],
			[{state: [1, 0, 1], input: [0]}, {state: [1, 1, 0], output: [1, 0]}],
			[{state: [1, 0, 1], input: [0]}, {state: [0, 1, 0], output: [0, 1]}]
		])

		this.diagram3 = new Map([

			[{state: [0, 0, 0], input: [0]}, [
				{state: [0, 0, 0], output: [0, 0]},
				//{state: [1, 0, 0], output: [1, 1]}
			]],

			[{state: [0, 0, 0], input: [1]}, [
				//{state: [0, 0, 0], output: [0, 0]},
				{state: [1, 0, 0], output: [1, 1]}
			]],

			[{state: [1, 0, 0], input: [1]}, [
				//{state: [1, 1, 0], output: [0, 1]},
				{state: [0, 1, 0], output: [1, 0]}
			]],

			[{state: [1, 0, 0], input: [0]}, [
				{state: [1, 1, 0], output: [0, 1]},
				//{state: [0, 1, 0], output: [1, 0]}
			]],

			[{state: [1, 1, 0], input: [0]}, [
				{state: [1, 1, 1], output: [0, 0]},
				//{state: [0, 1, 1], output: [1, 1]}
			]],

			[{state: [1, 1, 0], input: [1]}, [
				{state: [1, 1, 1], output: [0, 0]},
				{state: [0, 1, 1], output: [1, 1]}
			]],

			[{state: [1, 1, 1], input: [0]}, [
				{state: [1, 1, 1], output: [1, 1]},
				{state: [0, 1, 1], output: [0, 0]}
			]],

			[{state: [1, 1, 1], input: [1]}, [
				{state: [1, 1, 1], output: [1, 1]},
				{state: [0, 1, 1], output: [0, 0]}
			]],

			[{state: [0, 1, 1], input: [0]}, [
				{state: [1, 0, 1], output: [0, 1]},
				{state: [0, 0, 1], output: [1, 0]}
			]],

			[{state: [0, 1, 1], input: [1]}, [
				{state: [1, 0, 1], output: [0, 1]},
				{state: [0, 0, 1], output: [1, 0]}
			]],

			[{state: [0, 0, 1], input: [1]}, [
				{state: [1, 0, 0], output: [0, 0]},
				{state: [0, 0, 0], output: [1, 1]}
			]],

			[{state: [0, 0, 1], input: [0]}, [
				{state: [1, 0, 0], output: [0, 0]},
				{state: [0, 0, 0], output: [1, 1]}
			]],

			[{state: [0, 1, 0], input: [1]}, [
				{state: [0, 0, 1], output: [0, 1]},
				{state: [1, 0, 1], output: [1, 0]}
			]],

			[{state: [0, 1, 0], input: [0]}, [
				{state: [0, 0, 1], output: [0, 1]},
				{state: [1, 0, 1], output: [1, 0]}
			]],

			[{state: [1, 0, 1], input: [1]}, [
				{state: [1, 1, 0], output: [1, 0]},
				{state: [0, 1, 0], output: [0, 1]}
			]],

			[{state: [1, 0, 1], input: [0]}, [
				{state: [1, 1, 0], output: [1, 0]},
				{state: [0, 1, 0], output: [0, 1]}
			]],
		])
		*/


		this.diagram = [
			[{state: [0, 0, 0], input: [0]},
				{state: [0, 0, 0], output: [0, 0]}],

			[{state: [0, 0, 0], input: [1]},
				{state: [1, 0, 0], output: [1, 1]}],

			[{state: [1, 0, 0], input: [1]},
				{state: [1, 1, 0], output: [0, 1]}],

			[{state: [1, 0, 0], input: [0]},
				{state: [0, 1, 0], output: [1, 0]}],

			[{state: [1, 1, 0], input: [0]},
				{state: [0, 1, 1], output: [1, 1]}],

			[{state: [1, 1, 0], input: [1]},
				{state: [1, 1, 1], output: [0, 0]}],

			[{state: [1, 1, 1], input: [0]},
				{state: [0, 1, 1], output: [0, 0]}],

			[{state: [1, 1, 1], input: [1]},
				{state: [1, 1, 1], output: [1, 1]}],

			[{state: [0, 1, 1], input: [0]},
				{state: [0, 0, 1], output: [1, 0]}],

			[{state: [0, 1, 1], input: [1]},
				{state: [1, 0, 1], output: [0, 1]}],

			[{state: [0, 0, 1], input: [1]},
				{state: [1, 0, 0], output: [0, 0]}],

			[{state: [0, 0, 1], input: [0]},
				{state: [0, 0, 0], output: [1, 1]}],

			[{state: [0, 1, 0], input: [1]},
				{state: [1, 0, 1], output: [1, 0]}],

			[{state: [0, 1, 0], input: [0]},
				{state: [0, 0, 1], output: [0, 1]}],

			[{state: [1, 0, 1], input: [1]},
				{state: [1, 1, 0], output: [1, 0]}],

			[{state: [1, 0, 1], input: [0]},
				{state: [0, 1, 0], output: [0, 1]}],
		]
	}

	encode(a) {
		let state = [0, 0, 0];

		return a.reduce((result, bit) => {

			const node = this.diagram
				.filter(node => isDeepStrictEqual(node[0].state, state))
				.find(node => isDeepStrictEqual(node[0].input, [bit]));

			console.log("\nNode:", node);

			state = node[1].state;
			result.push(...node[1].output);
			return result;
		}, []);
	}

	decode(w) {
		const chunks = w.chunk(this.n);
		let state = [0, 0, 0];

		return chunks.reduce((result, bits) => {
			const node = this.diagram
				.filter(node => isDeepStrictEqual(node[0].state, state))
				.find(node => isDeepStrictEqual(node[1].output, [...bits]));
			console.log("\nNode:", node);

			state = node[1].state;
			result.push(...node[0].input);
			return result;
		}, []);
	}
}
