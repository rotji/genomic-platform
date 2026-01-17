import { IDatabaseAdapter } from '../adapters/IDatabaseAdapter';

export class DatabaseService {
	private adapter: IDatabaseAdapter;

	constructor(adapter: IDatabaseAdapter) {
		this.adapter = adapter;
	}

	async getUserById(id: string) {
		return this.adapter.findUserById(id);
	}

	async saveUser(user: any) {
		await this.adapter.saveUser(user);
	}

	// Add more methods as needed, delegating to the adapter
}