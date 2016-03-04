/**
 * Module dependencies.
 */

const isResolvable = require('../isResolvable');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.should();
chai.use(chaiAsPromised);

describe('isResolvable(host)', () => {
	'use strict';
	const tests = [
		['www.netscape.com', true],
		['bogus.domain.foobar', false]
	];

	tests.forEach(test => {
		const expected = test.pop();
		it(`should return "${expected}" for "${test.join('", "')}"`, done => {
			isResolvable(test[0]).should.eventually.be.equal(expected).notify(done);
		});
	});
});
