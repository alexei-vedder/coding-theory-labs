import {GolayCode} from "./GolayCode.js";
import {bitArrayToString, bitMatrixToString} from "../shared/Converters.js";
import {RMCode} from "./RMCode.js";
import {FileEncoder} from "./FileEncoder.js";
import {JSONFileWorker} from "../shared/FSWorker.js";

const FILES_FOLDER = "D:/@PROJECTS/coding-theory-labs/lab4/files/";

console.log("\n************** 4.1 ***************\n");

const golayCode = new GolayCode();
console.log("B:");
console.log(bitMatrixToString(golayCode.B));
console.log("G:");
console.log(bitMatrixToString(golayCode.G));
console.log("H:");
console.log(bitMatrixToString(golayCode.H));

const w1 = [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0];
console.log("Lecture 1st example data (encoded with errors):", bitArrayToString(w1));
const w1Decoded = golayCode.decode(w1);
console.log("Decoded:", bitArrayToString(w1Decoded), "\n");

const w2 = [0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0];
console.log("Lecture 2nd example data (encoded with errors):", bitArrayToString(w2));
const w2Decoded = golayCode.decode(w2);
console.log("Decoded:", bitArrayToString(w2Decoded), "\n");

const golayCodeFileEncoder = new FileEncoder(new JSONFileWorker(), golayCode);
await golayCodeFileEncoder.encodeFile(FILES_FOLDER + "data.4.1.json", FILES_FOLDER + "encoded.4.1.json");
await golayCodeFileEncoder.injectError(FILES_FOLDER + "encoded.4.1.json", 2);
await golayCodeFileEncoder.decodeFile(FILES_FOLDER + "encoded.4.1.json", FILES_FOLDER + "decoded.4.1.json")


console.log("\n************** 4.2 ***************\n");

const rmCode = new RMCode(1, 3);
console.log("k:", rmCode.k, "\n");
console.log(`G(${rmCode.r}, ${rmCode.m}):`);
console.log(bitMatrixToString(rmCode.G));

const w3 = [1, 0, 1, 0, 1, 0, 1, 1];
console.log("Lecture 1nd example data (encoded with errors):", bitArrayToString(w3));
const w3Decoded = rmCode.decode(w3);
console.log("Decoded", bitArrayToString(w3Decoded), "\n");

const w4 = [1, 0, 0, 0, 1, 1, 1, 1];
console.log("Lecture 1nd example data (encoded with errors):", bitArrayToString(w4));
const w4Decoded = rmCode.decode(w4);
console.log("Decoded", bitArrayToString(w4Decoded), "\n");

const rmCodeFileEncoder = new FileEncoder(new JSONFileWorker(), rmCode);
await rmCodeFileEncoder.encodeFile(FILES_FOLDER + "data.4.2.json", FILES_FOLDER + "encoded.4.2.json");
await rmCodeFileEncoder.injectError(FILES_FOLDER + "encoded.4.2.json", 1);
await rmCodeFileEncoder.decodeFile(FILES_FOLDER + "encoded.4.2.json", FILES_FOLDER + "decoded.4.2.json");
