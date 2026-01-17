/**
 * ExerciseDB Body Part Name Translations (English → Italian)
 * 
 * This constant map provides Italian translations for body part names
 * returned by the ExerciseDB API.
 */
export const BODY_PART_TRANSLATIONS: Record<string, string> = {
	'neck': 'Collo',
	'lower arms': 'Avambracci',
	'shoulders': 'Spalle',
	'cardio': 'Cardio',
	'upper arms': 'Parte superiore delle braccia',
	'chest': 'Petto',
	'lower legs': 'Parte inferiore delle gambe',
	'back': 'Schiena',
	'upper legs': 'Parte superiore delle gambe',
	'waist': 'Vita'
};

/**
 * Translates an English body part name to Italian.
 * Returns the original name if no translation is found.
 * 
 * @param bodyPartName - The English body part name from ExerciseDB
 * @returns The Italian translation or the original name
 */
export function translateBodyPart(bodyPartName: string): string {
	const normalized = bodyPartName.toLowerCase().trim();
	return BODY_PART_TRANSLATIONS[normalized] || bodyPartName;
}
