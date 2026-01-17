/**
 * ExerciseDB Muscle Name Translations (English → Italian)
 * 
 * This constant map provides Italian translations for muscle names
 * returned by the ExerciseDB API.
 */
export const MUSCLE_TRANSLATIONS: Record<string, string> = {
	'shins': 'Stinchi',
	'hands': 'Mani',
	'sternocleidomastoid': 'Sternocleidomastoideo',
	'soleus': 'Soleo',
	'inner thighs': 'Interno coscia',
	'lower abs': 'Addominali bassi',
	'grip muscles': 'Muscoli della presa',
	'abdominals': 'Addominali',
	'wrist extensors': 'Estensori del polso',
	'wrist flexors': 'Flessori del polso',
	'latissimus dorsi': 'Gran dorsale',
	'upper chest': 'Petto superiore',
	'rotator cuff': 'Cuffia dei rotatori',
	'wrists': 'Polsi',
	'groin': 'Inguine',
	'brachialis': 'Brachiale',
	'deltoids': 'Deltoidi',
	'feet': 'Piedi',
	'ankles': 'Caviglie',
	'trapezius': 'Trapezio',
	'rear deltoids': 'Deltoidi posteriori',
	'chest': 'Petto',
	'quadriceps': 'Quadricipiti',
	'back': 'Schiena',
	'core': 'Core',
	'shoulders': 'Spalle',
	'ankle stabilizers': 'Stabilizzatori della caviglia',
	'rhomboids': 'Romboidi',
	'obliques': 'Obliqui',
	'lower back': 'Parte bassa della schiena',
	'hip flexors': 'Flessori dell\'anca',
	'levator scapulae': 'Elevatore della scapola',
	'abductors': 'Abduttori',
	'serratus anterior': 'Dentato anteriore',
	'traps': 'Trapezi',
	'forearms': 'Avambracci',
	'delts': 'Deltoidi',
	'biceps': 'Bicipiti',
	'upper back': 'Parte alta della schiena',
	'spine': 'Colonna vertebrale',
	'cardiovascular system': 'Sistema cardiovascolare',
	'triceps': 'Tricipiti',
	'adductors': 'Adduttori',
	'hamstrings': 'Ischiocrurali',
	'glutes': 'Glutei',
	'pectorals': 'Pettorali',
	'calves': 'Polpacci',
	'lats': 'Dorsali',
	'quads': 'Quadricipiti',
	'abs': 'Addominali'
};

/**
 * Translates an English muscle name to Italian.
 * Returns the original name if no translation is found.
 * 
 * @param muscleName - The English muscle name from ExerciseDB
 * @returns The Italian translation or the original name
 */
export function translateMuscle(muscleName: string): string {
	const normalized = muscleName.toLowerCase().trim();
	return MUSCLE_TRANSLATIONS[normalized] || muscleName;
}
