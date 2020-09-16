const Math = require("mathjs");
const LineByLine = require("n-readlines");

const matrixHPath = "matrixH.txt";
const matrixGPath = "matrixG.txt";
const vectorAPath = "vectorA.txt";

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
		console.log(line);
		matrix.push(lineToArray(line.toString("ascii")));
	}

	return Math.matrix(matrix);
}

let matrixH = readMatrix(matrixHPath);
let matrixG = readMatrix(matrixGPath);
let vectorA = readMatrix(vectorAPath);

console.log("H", matrixH);
console.log("G", matrixG);
console.log("a", vectorA);

let vectorC = Math.multiply(vectorA, matrixG);
console.log("c", vectorC);
