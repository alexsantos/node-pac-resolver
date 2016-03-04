/**
 * Module dependencies.
 */

const isInNet = require('../isInNet');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.should();
chai.use(chaiAsPromised);

describe('isInNet(host, pattern, mask)', () => {
	'use strict';
	const tests = [
		['198.95.249.79', '198.95.249.79', '255.255.255.255', true],
		['198.95.249.78', '198.95.249.79', '255.255.255.255', false],
		['198.95.1.1', '198.95.0.0', '255.255.0.0', true],
		['198.94.1.1', '198.95.0.0', '255.255.0.0', false],
        ['', '127.0.0.1', '255.255.255.255', true],
        ['xxx.xx', '192.168.1.1', '255.255.255.255', 'ENOTFOUND']
	];

	tests.forEach(test => {
		const expected = test.pop();
		it(`should return "${expected}" for "${test.join('", "')}"`, done => {
			isInNet(test[0], test[1], test[2]).should.eventually.be.equal(expected).notify(done);
		});
	});
});
