/**
 * Module dependencies.
 */

const assert = require('assert');
const isPlainHostName = require('../isPlainHostName');

describe('isPlainHostName(host)', () => {
	'use strict';
	const tests = [
		['www', true],
		['www.netscape.com', false]
	];

	tests.forEach(test => {
		const expected = test.pop();
		it(`should return "${expected} for "${test.join('", "')}"`, () => {
			assert.equal(expected, isPlainHostName(test[0]));
		});
	});
});
