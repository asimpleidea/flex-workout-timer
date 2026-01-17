export interface ExerciseDbApiResponse<T> {
	success: boolean;
	data: T;
}

export interface ExerciseSummary {
	exerciseId: string;
	name: string;
	imageUrl: string;
}

export interface ExerciseImageUrls {
	'360p'?: string;
	'480p'?: string;
	'720p'?: string;
	'1080p'?: string;
	// API may add more keys over time
	[key: string]: string | undefined;
}

export interface ExerciseDetail {
	exerciseId: string;
	name: string;
	imageUrl: string;
	imageUrls: ExerciseImageUrls;
	equipments: string[];
	bodyParts: string[];
	exerciseType: string;
	targetMuscles: string[];
	secondaryMuscles: string[];
	videoUrl: string;
	keywords: string[];
	overview: string;
	instructions: string[];
	exerciseTips: string[];
	variations: string[];
	relatedExerciseIds: string[];
}
