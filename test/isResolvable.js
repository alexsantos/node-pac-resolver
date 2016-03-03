/**
 * Module dependencies.
 */

var isResolvable = require('../isResolvable');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.should();
chai.use(chaiAsPromised);

describe('isResolvable(host)', function () {
    'use strict';
    var tests = [
        ["www.netscape.com", true],
        ["bogus.domain.foobar", false]
    ];

    tests.forEach(function (test) {
        var expected = test.pop();
        it('should return `' + expected + '` for "' + test.join('", "') + '"', function (done) {
            isResolvable(test[0]).should.eventually.be.equal(expected).notify(done);
        });
    });

});