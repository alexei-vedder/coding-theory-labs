import {GolayCode} from "./GolayCode.js";
import {bitArrayToString, bitMatrixToString} from "../shared/Converters.js";
import {RMCode} from "./RMCode.js";

console.log("\n************** 4.1 ***************\n");

const golayCode = new GolayCode();
console.log("B:");
console.log(bitMatrixToString(golayCode.B));
console.log("G:");
console.log(bitMatrixToString(golayCode.G));
console.log("H:");
console.log(bitMatrixToString(golayCode.H));
const data = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0];
console.log("Data:", bitArrayToString(data));

const encoded = golayCode.encode(data);
console.log("Encoded:", bitArrayToString(encoded));

const encodedWithError = golayCode.injectError(encoded, 2);
console.log("Encoded with error:", bitArrayToString(encodedWithError));

const decoded = golayCode.decode(encodedWithError);
console.log("Decoded:", bitArrayToString(decoded), "\n");

const w1 = [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0];

console.log("Lecture 1st example data:", bitArrayToString(w1));
const w1Decoded = golayCode.decode(w1);
console.log("Decoded:", bitArrayToString(w1Decoded), "\n");

const w2 = [0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0];

console.log("Lecture 2nd example data:", bitArrayToString(w2));
const w2Decoded = golayCode.decode(w2);
console.log("Decoded:", bitArrayToString(w2Decoded), "\n");

console.log("************** 4.2 ***************\n");

const rmCode = new RMCode(1, 3);
const G = rmCode.generateG();
console.log(`G(${rmCode.r}, ${rmCode.m}):`);
console.log(bitMatrixToString(G))
