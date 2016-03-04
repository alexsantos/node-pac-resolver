/**
 * Module dependencies.
 */

const assert = require('assert');
const dateRange = require('../dateRange');

describe('dateRange()', () => {
	'use strict';

	it(`should return "false" for`, () => {
		assert.equal(false, dateRange());
	});
});
