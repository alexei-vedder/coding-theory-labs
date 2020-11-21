import {bitArrayToString, stringToBitArray} from "../shared/Converters.js";
import {FileEncoder} from "../lab4/FileEncoder.js";

export class CyclicCodesFileEncoder extends FileEncoder {

	/**
	 * @param fsWorker {FSWorker}
	 * @param cyclicCodes {CyclicCodes}
	 */
	constructor(fsWorker, cyclicCodes) {
		super(fsWorker, cyclicCodes)
	}

	/**
	 * @param inputFilePath {string}
	 * @param outputFilePath {string}
	 * @returns {Promise<void>}
	 */
	async encodeSysFile(inputFilePath, outputFilePath) {
		const data = stringToBitArray(await this.fsWorker.readDataFromFile(inputFilePath));
		const encodedData = this.code.encodeSys(data);
		const encodedDataAsString = bitArrayToString(encodedData);

		console.log("Data", bitArrayToString(data));
		console.log("Syndrome table", this.code.syndromeTable);
		console.log("Encoded data", encodedDataAsString);

		await this.fsWorker.writeDataToFile(encodedDataAsString, outputFilePath);
	}

	/**
	 * @param filePath {string}
	 * @param errorsTotal {number}
	 * @returns {Promise<void>}
	 */
	async injectError(filePath, errorsTotal) {
		const data = stringToBitArray(await this.fsWorker.readDataFromFile(filePath));

		console.log("Data without an error:", bitArrayToString(data));

		errorsTotal = errorsTotal ? errorsTotal : Math.min(this.code.t, data.length);
		const dataWithErrorAsString = bitArrayToString(this.code.injectError(data, errorsTotal));

		console.log("Data with an error:   ", dataWithErrorAsString);

		await this.fsWorker.writeDataToFile(dataWithErrorAsString, filePath);
	}
}
