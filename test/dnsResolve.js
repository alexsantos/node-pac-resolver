/**
 * Module dependencies.
 */

const isIP = require('net').isIP;
const dnsResolve = require('../dnsResolve');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.should();
chai.use(chaiAsPromised);

describe('dnsResolve(host)', () => {
	'use strict';
	const tests = [
		['www.netscape.com', true],
		['bogus.domain.foobar', false]
	];

	tests.forEach(test => {
		const expected = test.pop();
		if (expected) {
			it(`should resolve an IPv4 address for "${test.join('", "')}" and is a string`, done => {
				dnsResolve(test[0]).should.eventually.be.a('string').notify(done);
			});
			it(`should resolve an IPv4 address for "${test.join('", "')}" and isIP`, done => {
				dnsResolve(test[0]).then(isIP).should.eventually.be.equal(4).notify(done);
			});
		} else {
			it(`should throw a not found Error for "${test.join('", "')}"`, done => {
				dnsResolve(test[0]).should.be.rejected.notify(done);
			});
		}
	});
});
