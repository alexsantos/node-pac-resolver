/**
 * Module dependencies.
 */

var dns = require('dns');

/**
 * Resolves the given DNS hostname into an IP address, and returns it in the dot
 * separated format as a string.
 *
 * Example:
 *
 * ``` js
 * dnsResolve("home.netscape.com")
 *   // returns the string "198.95.249.79".
 * ```
 *
 * @param {String} host hostname to resolve
 * @return {String} resolved IP address
 */

function dnsResolve(host) {
    'use strict';
    var family = 4;
    return new Promise(function (resolve, reject) {
        dns.lookup(host, family, function (err, ip) {
            if (err) {
                reject(err);
            }
            resolve(ip || '127.0.0.1');
        });
    });
}

dnsResolve.async = true;

/**
 * Module exports.
 */

module.exports = dnsResolve;