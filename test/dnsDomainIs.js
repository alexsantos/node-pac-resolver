/**
 * Module dependencies.
 */

const assert = require('assert');
const dnsDomainIs = require('../dnsDomainIs');

describe('dnsDomainIs(host, domain)', () => {
	'use strict';
	const tests = [
		['www.netscape.com', '.netscape.com', true],
		['www", ".netscape.com', false],
		['www.mcom.com', '.netscape.com', false]
	];

	tests.forEach(test => {
		const expected = test.pop();
		it(`should return "${expected}" for "${test.join('", "')}"`, () => {
			assert.equal(expected, dnsDomainIs(test[0], test[1]));
		});
	});
});
