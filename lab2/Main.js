import {CyclicCodes} from "./CyclicCodes.js";

const cyclicCodes = new CyclicCodes();

const a = [1, 0, 1, 0];
const c = cyclicCodes.encode(a);
const r = cyclicCodes.findRemainder(c);
const c2 = cyclicCodes.encodeSys(a);

console.log("Task 2. Encoded a:", c);
console.log("Task 3. Remainder of c:", r);
console.log("Task 4. Encoded sys a:", c2);
console.log("Task 5. Syndrome table:", cyclicCodes.generateSyndromeTable())

/* 	TODO Task 6: How to represent a file? As an array of bits? Then how to convert a file this way?
 * 		Recollect how to read and write files
 */
