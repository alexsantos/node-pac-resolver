/**
 * Module dependencies.
 */

const assert = require('assert');
const localHostOrDomainIs = require('../localHostOrDomainIs');

describe('localHostOrDomainIs(host, hostdom)', () => {
	'use strict';
	const tests = [
		['www.netscape.com', 'www.netscape.com', true],
		['www', 'www.netscape.com', true],
		['www.mcom.com', 'www.netscape.com', false],
		['home.netscape.com', 'www.netscape.com', false]
	];

	tests.forEach(test => {
		const expected = test.pop();
		it(`should return "${expected} for "${test.join('", "')}"`, () => {
			assert.equal(expected, localHostOrDomainIs(test[0], test[1]));
		});
	});
});
