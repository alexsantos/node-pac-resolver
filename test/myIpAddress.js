/**
 * Module dependencies.
 */

const isIP = require('net').isIP;
const myIpAddress = require('../myIpAddress');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.should();
chai.use(chaiAsPromised);

describe('myIpAddress()', () => {
	'use strict';
	it('should return an IPv4 address', done => {
		myIpAddress().then(isIP).should.eventually.be.equal(4).notify(done);
	});
});
