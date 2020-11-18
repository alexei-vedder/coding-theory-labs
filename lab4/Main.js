import {GolayCode} from "./GolayCode.js";
import {bitArrayToString} from "../shared/Converters.js";


const golayCode = new GolayCode();
const data = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0];
console.log("Data:", bitArrayToString(data));

const encoded = golayCode.encode(data);
console.log("Encoded:", bitArrayToString(encoded));

const encodedWithError = golayCode.injectError(encoded, 2);
console.log("Encoded with error:", bitArrayToString(encodedWithError));

const decoded = golayCode.decode(encodedWithError);
console.log("Decoded:", bitArrayToString(decoded));
