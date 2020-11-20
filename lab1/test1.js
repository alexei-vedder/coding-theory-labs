import BitSet from "bitset";
import math from "mathjs"
import LineByLine from "n-readlines"
import {Encoder} from "./Encoder.js";
import {Decoder} from "./Decoder.js";

const H_PATH = "H.txt";
const G_PATH = "G.txt";
const a_PATH = "a.txt";
const data_PATH = "data.txt";

function lineToArray(line) {
	let inputArray = line.split(' ');
	for (let index = 0; index < inputArray.length; index++) {
		const element = inputArray[index];
		if (isNaN(parseInt(element, 10))) {
			console.log('Wrong input entered');
		}
	}
	return inputArray.map(item => +item);
}

function readMatrix(matrixFilePath) {
	const lineReader = new LineByLine(matrixFilePath);
	let line;
	let matrix = [];

	while (line = lineReader.next()) {
		matrix.push(lineToArray(line.toString("ascii")));
	}

	return math.matrix(matrix);
}

function readDataAndConvertToBitArray(path) {
	const lineReader = new LineByLine(path);
	const data = lineReader.next();
	console.log(data);

	const hexData = Buffer.from(data).toString("hex");

	const bitData = BitSet.fromHexString(hexData).toString(2);
	console.log(bitData);

	/*
	const bitSetData = BitSet.fromBinaryString(bitData);
	console.log(bitArrayData);
	return bitSetData
	*/

	return [Array.from(bitData).map(char => Number.parseInt(char))];
}

const H = readMatrix(H_PATH);
const G = readMatrix(G_PATH);
const a = readMatrix(a_PATH);

console.log("H:", H.toArray());
console.log("G:", G.toArray());
console.log("a:", a.toArray());

const c = math.mod(math.multiply(a, G), 2);
console.log("c:", c.toArray());

const b = math.mod(math.multiply(H, math.transpose(c)), 2);
console.log("b:", b.toArray());

/** error vector */
const e = [[0, 0, 0, 1, 0, 0, 0]];

/*

const c2 = math.add(c, e);
console.log("c':", c2.toArray());

const b2 = math.multiply(H, math.transpose(c2));
console.log("b':", b2.toArray())

*/


const bitArrayData = readDataAndConvertToBitArray(data_PATH);

console.log("BIT ARRAY DATA", bitArrayData);

const encoder = new Encoder(G);

const encodedData = encoder.encode(bitArrayData.flat(1)).flat(-1);

const decoder = new Decoder(H);

const decodedData = decoder.decode(encodedData);

console.log("DECODED", decodedData);
