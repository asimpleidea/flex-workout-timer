import { env } from '$env/dynamic/private';
import type {
	ExerciseDbApiResponse,
	ExerciseDetail,
	ExerciseSummary
} from '$lib/models/exercisedb';

const DEFAULT_HOST = 'exercise-db-with-videos-and-images-by-ascendapi.p.rapidapi.com';
const DEFAULT_BASE_URL = `https://${DEFAULT_HOST}`;

function getConfig() {
	const rapidApiKey = env.EXERCISEDB_RAPIDAPI_KEY;
	const rapidApiHost = env.EXERCISEDB_RAPIDAPI_HOST ?? DEFAULT_HOST;
	const baseUrl = env.EXERCISEDB_BASE_URL ?? DEFAULT_BASE_URL;

	if (!rapidApiKey) {
		throw new Error('Server not configured: EXERCISEDB_RAPIDAPI_KEY is missing');
	}

	return { rapidApiKey, rapidApiHost, baseUrl };
}

async function fetchJson<T>(fetchFn: typeof fetch, url: string, headers: Record<string, string>) {
	const response = await fetchFn(url, {
		method: 'GET',
		headers
	});

	if (!response.ok) {
		throw new Error(`ExerciseDB upstream error: ${response.status} ${response.statusText}`);
	}

	return (await response.json()) as T;
}

export async function searchExercises(fetchFn: typeof fetch, search: string) {
	const { rapidApiKey, rapidApiHost, baseUrl } = getConfig();
	const upstreamUrl = new URL('/api/v1/exercises/search', baseUrl);
	upstreamUrl.searchParams.set('search', search);

	return await fetchJson<ExerciseDbApiResponse<ExerciseSummary[]>>(fetchFn, upstreamUrl.toString(), {
		'X-Rapidapi-Key': rapidApiKey,
		'X-Rapidapi-Host': rapidApiHost
	});
}

export async function getExerciseById(fetchFn: typeof fetch, id: string) {
	const { rapidApiKey, rapidApiHost, baseUrl } = getConfig();
	const upstreamUrl = new URL(`/api/v1/exercises/${encodeURIComponent(id)}`, baseUrl);

	return await fetchJson<ExerciseDbApiResponse<ExerciseDetail>>(fetchFn, upstreamUrl.toString(), {
		'X-Rapidapi-Key': rapidApiKey,
		'X-Rapidapi-Host': rapidApiHost
	});
}
