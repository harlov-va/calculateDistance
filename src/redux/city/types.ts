export interface ICity {
	type: string;
	value: string;
	label: string;
	isValid: boolean;
}
export interface ICitiesForRenderPayload {
	firstIndex: number;
	lastIndex: number;
}

export interface IDeleteUserPayload {
	id: number;
}

export interface IPagination {
	currentPage: number;
	rowsPerPage: number;
	firstIndex: number;
	lastIndex: number;
}

export interface IPaginationPayload {
	currentPage: number;
}

export interface IFetchCitiesPayload {
	cityStr: string;
}

export interface IFetchDistancesPayload {
	params: string;
}

export type TDistances = [string[][], number];
