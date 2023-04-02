import { getCities, calculateRoute } from './data';
import cities from './cities';
const data = cities.map((item) => item[0]);

describe('Should get a list of cities by keydown', () => {
	it('Should get all cities', async () => {
		const expected = data.filter((item) => item.toLowerCase().includes('a')).slice(0, 8);
		const result = await getCities('a');
		expect(result).toStrictEqual(expected);
	});

	it('Should get an Error', async () => {
		const q = 'fail';
		try {
			const result = await getCities(q);
			const expected = new Error('Internal Server Error');
			expect(result).toThrow(expected);
		} catch (error) {}
	});
});

describe('calculateRoute function', () => {
	it('Should calculate the distance between 2 cities', async () => {
		const expected = [
			[
				['Paris', ''],
				['Marseille', '661.22 km'],
			],
			661220.4658782075,
		];
		const result = await calculateRoute('Paris,Marseille');
		expect(result).toStrictEqual(expected);
	});

	it('Should get an error', async () => {
		try {
			const expected = new Error('Internal Server Error');
			const result = await calculateRoute('Dijon,Marseille');
			expect(result).toThrow(expected);
		} catch (error) {}
	});
});
