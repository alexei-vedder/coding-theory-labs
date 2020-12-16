import {ConvolutionalCode} from "./ConvolutionalCode.js";
import {bitArrayToString} from "../shared/Converters.js";

const convCode = new ConvolutionalCode(2, 3)

const data = [1, 1, 0, 0, 0, 0];

console.log("\nData:", bitArrayToString(data));

console.log("\n************** 6.2 ***************\n");

const encoded = convCode.encode(data);

console.log("Encoded", bitArrayToString(encoded));

console.log("\n************** 6.3 ***************\n");

const decoded = convCode.decode(encoded);

console.log("Decoded", bitArrayToString(decoded));

console.log("\n************** 6.4 ***************\n");

const encodedWithError = convCode.injectError(encoded, 2);

console.log("Encoded with error", bitArrayToString(encodedWithError), "\n");

const decodedViterbi = convCode.decodeViterbi(encodedWithError);

console.log("\nDecoded via Viterbi", bitArrayToString(decodedViterbi));
