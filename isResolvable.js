/**
 * Module dependencies.
 */

var dns = require('dns');

/**
 * Tries to resolve the hostname. Returns true if succeeds.
 *
 * @param {String} host is the hostname from the URL.
 * @return {Boolean}
 */

function isResolvable(host) {
    'use strict';
    var family = 4;
    return new Promise(function (resolve) {
        dns.lookup(host, family, function (err) {
            resolve(!err);
        });
    });
}

isResolvable.async = true;

/**
 * Module exports.
 */

module.exports = isResolvable;