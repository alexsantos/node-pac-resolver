/**
 * Module dependencies.
 */

var pac = require('../');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.should();
chai.use(chaiAsPromised);

describe('FindProxyForURL', function () {
    'use strict';
    it('should return `undefined` by default', function (done) {
        var FindProxyForURL = pac(
            'function FindProxyForURL (url, host) {' +
            '  /* noop */' +
            '}'
        );
        FindProxyForURL('http://foo.com/', 'foo.com').should.become(undefined).and.notify(done);
    });

    it('should return the value that gets returned', function (done) {
        var FindProxyForURL = pac(
            'function FindProxyForURL (url, host) {' +
            '  return { foo: "bar" };' +
            '}'
        );
        FindProxyForURL('http://foo.com/', 'foo.com').should.become({
            foo: 'bar'
        }).and.notify(done);
    });

    describe('offical docs Example #1', function () {
        var FindProxyForURL = pac(
            'function FindProxyForURL(url, host) {' +
            '  if (isPlainHostName(host) ||' +
            '      dnsDomainIs(host, ".netscape.com"))' +
            '      return "DIRECT";' +
            '  else' +
            '      return "PROXY w3proxy.netscape.com:8080; DIRECT";' +
            '}'
        );

        it('should return "DIRECT" for "localhost"', function (done) {
            FindProxyForURL('http://localhost/hello', 'localhost').should.become('DIRECT').and.notify(done);
        });

        it('should return "DIRECT" for "foo.netscape.com"', function (done) {
            FindProxyForURL('http://foo.netscape.com/', 'foo.netscape.com').should.become('DIRECT').and.notify(done);
        });

        it('should return "PROXY …" for "google.com"', function (done) {
            FindProxyForURL('http://google.com/t', 'google.com').should.become('PROXY w3proxy.netscape.com:8080; DIRECT').and.notify(done);
        });

    });

    describe('offical docs Example #1b', function () {
        var FindProxyForURL = pac(
            'function FindProxyForURL(url, host)' +
            '{' +
            '    if ((isPlainHostName(host) ||' +
            '         dnsDomainIs(host, ".netscape.com")) &&' +
            '        !localHostOrDomainIs(host, "www.netscape.com") &&' +
            '        !localHostOrDomainIs(host, "merchant.netscape.com"))' +
            '        return "DIRECT";' +
            '    else' +
            '        return "PROXY w3proxy.netscape.com:8080; DIRECT";' +
            '}'
        );

        it('should return "DIRECT" for "localhost"', function (done) {
            FindProxyForURL('http://localhost/hello', 'localhost').should.become('DIRECT').and.notify(done);
        });

        it('should return "DIRECT" for "foo.netscape.com"', function (done) {
            FindProxyForURL('http://foo.netscape.com/', 'foo.netscape.com').should.become('DIRECT').and.notify(done);
        });

        it('should return "PROXY …" for "www.netscape.com"', function (done) {
            FindProxyForURL('http://www.netscape.com/', 'www.netscape.com').should.become('PROXY w3proxy.netscape.com:8080; DIRECT').and.notify(done);
        });

        it('should return "PROXY …" for "merchant.netscape.com"', function (done) {
            FindProxyForURL('http://merchant.netscape.com/', 'merchant.netscape.com').should.become('PROXY w3proxy.netscape.com:8080; DIRECT').and.notify(done);
        });

    });

    describe('offical docs Example #5', function () {
        var FindProxyForURL = pac(
            'function FindProxyForURL(url, host)' +
            '{' +
            '    if (url.substring(0, 5) == "http:") {' +
            '        return "PROXY http-proxy.mydomain.com:8080";' +
            '    }' +
            '    else if (url.substring(0, 4) == "ftp:") {' +
            '        return "PROXY ftp-proxy.mydomain.com:8080";' +
            '    }' +
            '    else if (url.substring(0, 7) == "gopher:") {' +
            '        return "PROXY gopher-proxy.mydomain.com:8080";' +
            '    }' +
            '    else if (url.substring(0, 6) == "https:" ||' +
            '             url.substring(0, 6) == "snews:") {' +
            '        return "PROXY security-proxy.mydomain.com:8080";' +
            '    }' +
            '    else {' +
            '        return "DIRECT";' +
            '    }' +
            '}'
        );

        it('should return "DIRECT" for "foo://netscape.com"', function (done) {
            FindProxyForURL('foo://netscape.com/hello', 'netscape.com').should.become('DIRECT').and.notify(done);
        });

        it('should return "PROXY http…" for "http://netscape.com"', function (done) {
            FindProxyForURL('http://netscape.com/hello', 'netscape.com').should.become('PROXY http-proxy.mydomain.com:8080').and.notify(done);
        });

        it('should return "PROXY ftp…" for "ftp://netscape.com"', function (done) {
            FindProxyForURL('ftp://netscape.com/hello', 'netscape.com').should.become('PROXY ftp-proxy.mydomain.com:8080').and.notify(done);
        });

        it('should return "PROXY gopher…" for "gopher://netscape.com"', function (done) {
            FindProxyForURL('gopher://netscape.com/hello', 'netscape.com').should.become('PROXY gopher-proxy.mydomain.com:8080').and.notify(done);
        });

        it('should return "PROXY security…" for "https://netscape.com"', function (done) {
            FindProxyForURL('https://netscape.com/hello', 'netscape.com').should.become('PROXY security-proxy.mydomain.com:8080').and.notify(done);
        });

        it('should return "PROXY security…" for "snews://netscape.com"', function (done) {
            FindProxyForURL('snews://netscape.com/hello', 'netscape.com').should.become('PROXY security-proxy.mydomain.com:8080').and.notify(done);
        });

    });

    describe('GitHub issue #3', function () {
        var FindProxyForURL = pac(
            'function FindProxyForURL(url, host) {\n' +
            '    if (isHostInAnySubnet(host, ["10.1.2.0", "10.1.3.0"], "255.255.255.0")) {\n' +
            '        return "HTTPS proxy.example.com";\n' +
            '    }\n' +
            '\n' +
            '    if (isHostInAnySubnet(host, ["10.2.2.0", "10.2.3.0"], "255.255.255.0")) {\n' +
            '        return "HTTPS proxy.example.com";\n' +
            '    }\n' +
            '\n' +
            '    // Everything else, go direct:\n' +
            '    return "DIRECT";\n' +
            '}\n' +
            '\n' +
            '// Checks if the single host is within a list of subnets using the single mask.\n' +
            'function isHostInAnySubnet(host, subnets, mask) {\n' +
            '    var subnets_length = subnets.length;\n' +
            '    for (i = 0; i < subnets_length; i++) {\n' +
            '        if (isInNet(host, subnets[i], mask)) {\n' +
            '            return true;\n' +
            '        }\n' +
            '    }\n' +
            '}\n'
        );

        it('should return "HTTPS proxy.example.com" for "http://10.1.2.3/bar.html"', function (done) {
            FindProxyForURL('http://10.1.2.3/bar.html', '10.1.2.3').should.become('HTTPS proxy.example.com').and.notify(done);
        });

        it('should return "DIRECT" for "http://foo.com/bar.html"', function (done) {
            FindProxyForURL('http://foo.com/bar.html', 'foo.com').should.become('DIRECT').and.notify(done);
        });

    });

});