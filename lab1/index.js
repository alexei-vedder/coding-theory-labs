/*
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let matrixH;

let matrixG;

let vectorA;

function stringToArrayOfNumbers(str) {
    return Array.from(str)
        .map(item => item !== " " ? Number.parseInt(item) : null)
        .filter(item => (item !== " ") && (item !== null));
}

function initMatrixH() {
    matrixH = [];

    function readLine(line) {
        rl.question("Enter " + line + " line of matrix H: ", (str) => {
            matrixH.push(stringToArrayOfNumbers(str));
            console.log(matrixH)
            if (line < 3) {
                readLine(line + 1)
            }
        });
    }

    readLine(1)
}

function initMatrixG() {
    matrixG = [];

    function readLine(line) {
        rl.question("Enter " + line + " line of matrix G: ", (str) => {
            matrixH.push(stringToArrayOfNumbers(str));
            console.log(matrixG)
            if (line < 4) {
                readLine(line + 1)
            }
        });
    }

    readLine(1)
}

function initVectorA() {
    vectorA = [];
    rl.question("Enter of vector A: ", (str) => {
        vectorA = stringToArrayOfNumbers(str);
        console.log(vectorA)
        rl.close();
    });
}

initMatrixH();

initMatrixG();

initVectorA();
*/

/*const inputReader = require("wait-console-input");

let matrixH;

let matrixG;

let vectorA;

for (let i = 0; i < 3; ++i) {
    let input = inputReader.readNumberArray("Enter a line of matrix H", {
        reInputOnError: true,
        separator: 'space',
        size: 5
    });
    console.log(input);
}*/

const math = require("mathjs");
const lineReader = require("line-reader");


let matrixH = [];
let matrixG = [];
let vectorA = [];

function getLine(line) {
    let inputArray = line.split(' ');
    for (let index = 0; index < inputArray.length; index++) {
        const element = inputArray[index];
        if (isNaN(parseInt(element, 10))) {
            console.log('Wrong input entered');
        }
    }
    return inputArray.map(item => +item);
}

// TODO what the fuck with eachLine ?

lineReader.eachLine("./matrixH.txt", line => {
    console.log(line);
    matrixH.push(getLine(line));
});

lineReader.eachLine("matrixG.txt", line => {
    console.log(line);
    matrixG.push(getLine(line));
});

lineReader.eachLine("vectorA.txt", line => {
    console.log(line);
    vectorA.push(getLine(line));
});

console.log(matrixH);
console.log(matrixG);
console.log(vectorA);

let vectorC = math.multiply(math.matrix(vectorA), math.matrix(matrixG));
console.log(vectorC);

// TODO исходный файл в закодированный
// TODO закодированный в исходный
// TODO скрипт, вносящий ошибку
