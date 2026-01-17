import type { Timer } from '$lib/models';
import type { ITimerRepository } from './interface';

/**
 * In-memory implementation of ITimerRepository.
 * Stores timers in a simple array. Data is lost on page refresh.
 */
export class InMemoryTimerRepository implements ITimerRepository {
	private timers: Timer[] = [];

	async getAll(): Promise<Timer[]> {
		return [...this.timers];
	}

	async getById(id: string): Promise<Timer | null> {
		const timer = this.timers.find((t) => t.id === id);
		return timer ?? null;
	}

	async save(timer: Timer): Promise<void> {
		const index = this.timers.findIndex((t) => t.id === timer.id);

		if (index >= 0) {
			// Update existing timer
			this.timers[index] = timer;
		} else {
			// Create new timer
			this.timers.push(timer);
		}
	}

	async delete(id: string): Promise<void> {
		this.timers = this.timers.filter((t) => t.id !== id);
	}
}
