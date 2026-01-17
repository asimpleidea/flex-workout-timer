/**
 * ExerciseDB Equipment Name Translations (English → Italian)
 * 
 * This constant map provides Italian translations for equipment names
 * returned by the ExerciseDB API.
 */
export const EQUIPMENT_TRANSLATIONS: Record<string, string> = {
	'stepmill machine': 'Macchina step mill',
	'elliptical machine': 'Ellittica',
	'trap bar': 'Trap bar',
	'tire': 'Pneumatico',
	'stationary bike': 'Cyclette',
	'wheel roller': 'Rullo',
	'smith machine': 'Smith machine',
	'hammer': 'Martello',
	'skierg machine': 'Skierg',
	'roller': 'Rullo',
	'resistance band': 'Banda elastica',
	'bosu ball': 'Bosu ball',
	'weighted': 'Con peso',
	'olympic barbell': 'Bilanciere olimpico',
	'kettlebell': 'Kettlebell',
	'upper body ergometer': 'Ergometro parte superiore',
	'sled machine': 'Slitta',
	'ez barbell': 'Bilanciere EZ',
	'dumbbell': 'Manubrio',
	'rope': 'Corda',
	'barbell': 'Bilanciere',
	'band': 'Banda',
	'stability ball': 'Palla da stabilità',
	'medicine ball': 'Palla medica',
	'assisted': 'Assistito',
	'leverage machine': 'Macchina a leva',
	'cable': 'Cavo',
	'body weight': 'Corpo libero'
};

/**
 * Translates an English equipment name to Italian.
 * Returns the original name if no translation is found.
 * 
 * @param equipmentName - The English equipment name from ExerciseDB
 * @returns The Italian translation or the original name
 */
export function translateEquipment(equipmentName: string): string {
	const normalized = equipmentName.toLowerCase().trim();
	return EQUIPMENT_TRANSLATIONS[normalized] || equipmentName;
}
