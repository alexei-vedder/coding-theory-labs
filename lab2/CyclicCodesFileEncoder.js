import {CyclicCodes} from "./CyclicCodes.js";
import {bitArrayToString, stringToBitArray} from "../shared/Converters.js";

export class CyclicCodesFileEncoder {
	constructor(fsWorker, k, n, g, t) {
		this.fsWorker = fsWorker;
		this.cyclicCodes = new CyclicCodes(k, n, g, t);
	}

	/**
	 * @param inputFilePath
	 * @param outputFilePath
	 */
	async encodeFile(inputFilePath, outputFilePath) {
		const data = stringToBitArray(await this.fsWorker.readDataFromFile(inputFilePath));
		const encodedData = this.cyclicCodes.encodeSys(data);
		const encodedDataAsString = bitArrayToString(encodedData);

		console.log("Data", bitArrayToString(data));
		console.log("Syndrome table", this.cyclicCodes.syndromeTable);
		console.log("Encoded data", encodedDataAsString);

		await this.fsWorker.writeDataToFile(encodedDataAsString, outputFilePath);
	}

	async decodeFile(inputFilePath, outputFilePath) {
		const data = stringToBitArray(await this.fsWorker.readDataFromFile(inputFilePath));
		const decodedData = this.cyclicCodes.decode(data);
		const decodedDataAsString = bitArrayToString(decodedData);

		console.log("Decoded data", decodedDataAsString);

		await this.fsWorker.writeDataToFile(decodedDataAsString, outputFilePath);
	}

	async injectError(filePath) {
		const data = stringToBitArray(await this.fsWorker.readDataFromFile(filePath));

		console.log("Data without an error:", bitArrayToString(data));

		const errorsTotal = Math.min(this.cyclicCodes.t, data.length);

		for (let i = 0; i < errorsTotal; ++i) {
			data[i] = data[i] ? 0 : 1;
		}

		const dataWithErrorAsString = bitArrayToString(data);

		console.log("Data with an error:   ", dataWithErrorAsString);

		await this.fsWorker.writeDataToFile(dataWithErrorAsString, filePath);
	}
}
