import {ConvolutionalCode} from "./ConvolutionalCode.js";

const convCode = new ConvolutionalCode(2, 3)

const data = [1, 1, 0, 0, 0, 0];

console.log("\nData:", data.join(""));

console.log("\n************** 6.2 ***************\n");

const encoded = convCode.encode(data);

console.log("\nEncoded:", encoded.join(""));

console.log("\n************** 6.3 ***************\n");

const decoded = convCode.decode(encoded);

console.log("\nDecoded:", decoded.join(""));

console.log("\n************** 6.4 ***************\n");

const encodedWithError = convCode.injectError(encoded, 2);

console.log("Encoded with inserted errors:", encodedWithError.join(""), "\n");

const decodedViterbi = convCode.decodeViterbi(encodedWithError);

console.log("\nDecoded via Viterbi", decodedViterbi.join(""));
