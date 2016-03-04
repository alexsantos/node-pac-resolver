/**
 * Module dependencies.
 */

const assert = require('assert');
const timeRange = require('../timeRange');

describe('dateRange()', () => {
	'use strict';

	it(`should return "false" for`, () => {
		assert.equal(false, timeRange());
	});
});
