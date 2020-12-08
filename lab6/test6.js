import {ConvolutionalCode} from "./ConvolutionalCode.js";
import {bitArrayToString} from "../shared/Converters.js";

const convCode = new ConvolutionalCode(2, 3)
const data = [1, 0, 1, 0, 0];
console.log("Data:", bitArrayToString(data));

console.log("\n************** 6.2 ***************\n");

const encoded = convCode.encode(data);

console.log("\nEncoded", bitArrayToString(encoded));

console.log("\n************** 6.3 ***************\n");

const decoded = convCode.decode(encoded);

console.log("\nDecoded", bitArrayToString(decoded));
