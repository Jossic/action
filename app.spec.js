const { Action, User } = require('./app');

const user1 = new User('Jossic', 100);

// First Add
user1.addActions([
	[1, 'A'],
	[1, 'B'],
	[1, 'C'],
]);

// Second add
user1.addActions([
	[2, 'A'],
	[5, 'B'],
	[2, 'C'],
	[2, 'A'],
]);

describe('User tests', () => {
	it('have addActions method that add actions and check if array if ok', () => {
		expect(user1.actions.length).toBe(14);
		const numberOfA = user1.actions.reduce((n, action) => {
			return n + (action.name == 'A');
		}, 0);
		const numberOfB = user1.actions.reduce((n, action) => {
			return n + (action.name == 'B');
		}, 0);
		const numberOfC = user1.actions.reduce((n, action) => {
			return n + (action.name == 'C');
		}, 0);
		expect(numberOfA).toBe(5);
		expect(numberOfB).toBe(6);
		expect(numberOfC).toBe(3);
	});

	it('have a calculateCredit method that return a credit between 80 & 100% of the max value', () => {
		const actionToTest = 3;
		const previousVal = user1.actions[actionToTest].currentCredit;

		user1.calculateQueueCredit();

		const newVal = user1.actions[actionToTest].currentCredit;

		// La valeur actuelle doit avoir baisse d'au plus 20% de la valeur max
		const minValue = 0;
		const maxValue = user1.actions[actionToTest].maxCredit * 0.201;

		expect(previousVal - newVal).toBeGreaterThanOrEqual(minValue);
		expect(previousVal - newVal).toBeLessThan(maxValue);
	});

	it('display queue', () => {
		expect(user1.displayQueue()).toEqual([
			'A',
			'B',
			'C',
			'A',
			'A',
			'B',
			'B',
			'B',
			'B',
			'B',
			'C',
			'C',
			'A',
			'A',
		]);
	});

	it('have decreaseCreditBy that decrease creditTotal by X', () => {
		const decreaseBy = 14;
		const expectedValue = user1.creditTotal - decreaseBy;
		expect(user1.decreaseCreditBy(decreaseBy)).toBe(expectedValue);
	});
});
