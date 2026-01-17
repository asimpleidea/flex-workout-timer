import type { Timer } from '$lib/models';

/**
 * Repository interface for Timer operations.
 * This contract allows switching between different storage implementations
 * (in-memory, localStorage, Firestore) without changing application code.
 */
export interface ITimerRepository {
	/**
	 * Retrieve all timers
	 */
	getAll(): Promise<Timer[]>;

	/**
	 * Retrieve a specific timer by ID
	 */
	getById(id: string): Promise<Timer | null>;

	/**
	 * Save a timer (create or update)
	 */
	save(timer: Timer): Promise<void>;

	/**
	 * Delete a timer by ID
	 */
	delete(id: string): Promise<void>;
}
