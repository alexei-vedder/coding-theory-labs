import {CyclicCodes} from "./CyclicCodes.js";
import {JSONFileWorker} from "./FSWorker.js";
import {FileEncoder} from "./FileEncoder.js";
import {bitArrayToString} from "./Converters.js";

const cyclicCodes = new CyclicCodes();

const a = [1, 0, 1, 0];
const c = cyclicCodes.encode(a);
const r = cyclicCodes.findRemainder(c);
const c2 = cyclicCodes.encodeSys(a);

console.log("Data (tasks 1-5):", bitArrayToString(a));
console.log("Task 2. Encoded a:", bitArrayToString(c));
console.log("Task 3. Remainder of c:", bitArrayToString(r));
console.log("Task 4. Encoded sys a:", bitArrayToString(c2));
console.log("Task 5. Syndrome table:", cyclicCodes.generateSyndromeTable());

console.log("Task 6");

const fsWorker = new JSONFileWorker();
const fileEncoder = new FileEncoder(fsWorker, 7, 15, [1, 0, 0, 0, 1, 0, 1, 1, 1]);

await fileEncoder.encodeFile("in.json", "out.json");
await fileEncoder.injectError("out.json");
await fileEncoder.decodeFile("out.json", "decoded.json");
