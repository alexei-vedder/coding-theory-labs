import {CyclicCodes} from "./CyclicCodes.js";
import {JSONFileWorker} from "./FSWorker.js";
import {FileEncoder} from "./FileEncoder.js";

const cyclicCodes = new CyclicCodes();

const a = [1, 0, 1, 0];
const c = cyclicCodes.encode(a);
const r = cyclicCodes.findRemainder(c);
const c2 = cyclicCodes.encodeSys(a);

console.log("Task 2. Encoded a:", c);
console.log("Task 3. Remainder of c:", r);
console.log("Task 4. Encoded sys a:", c2);
console.log("Task 5. Syndrome table:", cyclicCodes.generateSyndromeTable());

console.log("Task 6");

const fsWorker = new JSONFileWorker();

const fileEncoder = new FileEncoder(fsWorker, 7, 15, [1, 0, 0, 0, 1, 0, 1, 1, 1]);
fileEncoder.encodeFile("in.json", "out.json")
