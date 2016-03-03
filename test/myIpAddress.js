/**
 * Module dependencies.
 */

var isIP = require('net').isIP;
var myIpAddress = require('../myIpAddress');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.should();
chai.use(chaiAsPromised);

describe('myIpAddress()', function () {
    'use strict';
    it('should return an IPv4 address', function (done) {
        myIpAddress().then(isIP).should.eventually.be.equal(4).notify(done);
    });

});