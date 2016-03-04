/**
 * Module dependencies.
 */

const assert = require('assert');
const dnsDomainLevels = require('../dnsDomainLevels');

describe('dnsDomainLevels(host)', () => {
	'use strict';
	const tests = [
		['www', 0],
		['www.netscape', 1],
		['www.netscape.com', 2]
	];

	tests.forEach(test => {
		const expected = test.pop();
		it(`should return "${expected}" for "${test.join('", "')}"`, () => {
			assert.equal(expected, dnsDomainLevels(test[0]));
		});
	});
});
