import {CyclicCodes} from "./CyclicCodes.js";
import {bitArrayToString, stringToBitArray} from "./Converters.js";

export class FileEncoder {
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
		console.log("Syndrome table", this.cyclicCodes.syndromeTable)
		console.log("Encoded", encodedDataAsString);
		await this.fsWorker.writeDataToFile(encodedDataAsString, outputFilePath);
	}

	decodeFile(path) {

	}

	injectError() {

	}
}
