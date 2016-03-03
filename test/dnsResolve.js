/**
 * Module dependencies.
 */

var isIP = require('net').isIP;
var dnsResolve = require('../dnsResolve');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.should();
chai.use(chaiAsPromised);

describe('dnsResolve(host)', function () {
    'use strict';
    var tests = [
        ["www.netscape.com", true],
        ["bogus.domain.foobar", false]
    ];

    tests.forEach(function (test) {
        var expected = test.pop();
        if (expected) {
            it('should resolve an IPv4 address for "' + test.join('", "') + '" and is a string', function (done) {
                dnsResolve(test[0]).should.eventually.be.a('string').notify(done);
            });
            it('should resolve an IPv4 address for "' + test.join('", "') + '" and isIP', function (done) {
                dnsResolve(test[0]).then(isIP).should.eventually.be.equal(4).notify(done);
            });
        } else {
            it('should throw a not found Error for "' + test.join('", "') + '"', function (done) {
                dnsResolve(test[0]).should.be.rejected.notify(done);
            });
        }
    });

});