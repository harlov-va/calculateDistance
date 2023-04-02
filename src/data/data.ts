import cities from './cities';
import haversine from 'haversine-distance';

export type TCity = (typeof cities)[0];

const randomDelayPromise = <T>(data: T) => {
	const delay = Math.floor(Math.random() * 400) + 100;
	return new Promise<T>((resolve) => setTimeout(() => resolve(data), delay));
};

const db = {
	cities,
};

export const getCities = (cityStr: string) => {
	if (cityStr.toLowerCase() === 'fail') throw new Error('Oops. Something went wrong!');
	const filteredCities = db.cities
		.map((item) => item[0])
		.filter((city) => city.toLowerCase().indexOf(cityStr?.toLowerCase()) !== -1)
		.slice(0, 8);

	return randomDelayPromise<string[]>(filteredCities);
};

export async function calculateRoute(str: string): Promise<[string[][], number]> {
	const params = str.split(',');
	const arr = params.map((city) => {
		const a = db.cities.find((c) => c[0] === city);
		if (!a || city === 'Dijon') throw new Error('City not found');
		return a;
	});
	const cities = [[arr[0][0], '']];
	let total = 0;
	for (let i = 1; i < arr.length; i++) {
		const dist = haversine(
			{ lat: arr[i - 1][1], lng: arr[i - 1][2] },
			{ lat: arr[i][1], lng: arr[i][2] },
		);
		total += dist;
		cities.push([arr[i][0], (dist / 1000).toFixed(2) + ' km']);
	}
	return randomDelayPromise([cities, total]);
}
