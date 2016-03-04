/**
 * Module dependencies.
 */

const assert = require('assert');
const weekdayRange = require('../weekdayRange');

describe('weekdayRange(wd1, wd2, gmt)', () => {
	'use strict';
	const tests = [];

	tests.forEach(test => {
		const expected = test.pop();
		it(`should return "${expected}" for "${test.join('", "')}"`, () => {
			assert.equal(expected, weekdayRange(test[0], test[1], test[2]));
		});
	});
});
