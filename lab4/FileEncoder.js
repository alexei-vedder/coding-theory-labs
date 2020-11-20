import {bitArrayToString, stringToBitArray} from "../shared/Converters.js";

export class FileEncoder {
	/**
	 * @param fsWorker {FSWorker}
	 * @param code {Code}
	 */
	constructor(fsWorker, code) {
		this.fsWorker = fsWorker;
		this.code = code;
	}

	/**
	 * @param inputFilePath {string}
	 * @param outputFilePath {string}
	 * @returns {Promise<void>}
	 */
	async encodeFile(inputFilePath, outputFilePath) {
		const data = stringToBitArray(await this.fsWorker.readDataFromFile(inputFilePath));
		const encodedData = this.code.encode(data);
		const encodedDataAsString = bitArrayToString(encodedData);

		console.log("Data:", bitArrayToString(data));
		console.log("Encoded:", encodedDataAsString);

		await this.fsWorker.writeDataToFile(encodedDataAsString, outputFilePath);
	}

	/**
	 * @param inputFilePath {string}
	 * @param outputFilePath {string}
	 * @returns {Promise<void>}
	 */
	async decodeFile(inputFilePath, outputFilePath) {
		const data = stringToBitArray(await this.fsWorker.readDataFromFile(inputFilePath));
		const decodedData = this.code.decode(data);
		const decodedDataAsString = bitArrayToString(decodedData);

		console.log("Decoded:", decodedDataAsString);

		await this.fsWorker.writeDataToFile(decodedDataAsString, outputFilePath);
	}


	/**
	 * @param filePath {string}
	 * @param errorsTotal {number}
	 * @returns {Promise<void>}
	 */
	async injectError(filePath, errorsTotal) {
		const data = stringToBitArray(await this.fsWorker.readDataFromFile(filePath));

		console.log("Data without errors:", bitArrayToString(data));

		const dataWithErrorAsString = bitArrayToString(this.code.injectError(data, errorsTotal));

		console.log("Data with errors:   ", dataWithErrorAsString);

		await this.fsWorker.writeDataToFile(dataWithErrorAsString, filePath);
	}
}
