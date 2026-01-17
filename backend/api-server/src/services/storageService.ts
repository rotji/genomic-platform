import { IStorageAdapter } from '../adapters/IStorageAdapter';

export class StorageService {
	private adapter: IStorageAdapter;

	constructor(adapter: IStorageAdapter) {
		this.adapter = adapter;
	}

	async uploadFile(file: Buffer, filename: string) {
		return this.adapter.uploadFile(file, filename);
	}

	async deleteFile(filename: string) {
		return this.adapter.deleteFile(filename);
	}

	async getFileUrl(filename: string) {
		return this.adapter.getFileUrl(filename);
	}

	// Add more methods as needed, delegating to the adapter
}