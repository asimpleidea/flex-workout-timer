import type { Timer } from '$lib/models';
import type { ITimerRepository } from '$lib/repositories/interface';
import { InMemoryTimerRepository } from '$lib/repositories/in-memory-repository';

/**
 * Timer Store - Central state management for timers (Svelte 5).
 * Uses $state rune for reactive state management.
 */
class TimerStore {
	timers = $state<Timer[]>([]);
	private repository: ITimerRepository;

	constructor() {
		this.repository = new InMemoryTimerRepository();
		this.load();
	}

	private async load() {
		this.timers = await this.repository.getAll();
	}

	/**
	 * Save a timer (create or update)
	 */
	async save(timer: Timer): Promise<void> {
		await this.repository.save(timer);
		await this.load();
	}

	/**
	 * Delete a timer by ID
	 */
	async delete(id: string): Promise<void> {
		await this.repository.delete(id);
		await this.load();
	}

	/**
	 * Get a specific timer by ID
	 */
	async getById(id: string): Promise<Timer | null> {
		return await this.repository.getById(id);
	}

	/**
	 * Refresh the store from the repository
	 */
	async refresh(): Promise<void> {
		await this.load();
	}
}

export const timerStore = new TimerStore();
