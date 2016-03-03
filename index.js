/**
 * Module dependencies.
 */

var co = require('co');
var vm = require('vm');
var degenerator = require('degenerator');

/**
 * Built-in PAC functions.
 */

var dateRange = require('./dateRange');
var dnsDomainIs = require('./dnsDomainIs');
var dnsDomainLevels = require('./dnsDomainLevels');
var dnsResolve = require('./dnsResolve');
var isInNet = require('./isInNet');
var isPlainHostName = require('./isPlainHostName');
var isResolvable = require('./isResolvable');
var localHostOrDomainIs = require('./localHostOrDomainIs');
var myIpAddress = require('./myIpAddress');
var shExpMatch = require('./shExpMatch');
var timeRange = require('./timeRange');
var weekdayRange = require('./weekdayRange');

/**
 * Returns an asyncronous `FindProxyForURL` function from the
 * given JS string (from a PAC file).
 *
 * @param {String} str JS string
 * @param {Object} opts optional "options" object
 * @return {Function} async resolver function
 */

function generate(str, opts) {
    'use strict';
    // the sandbox to use for the vm
    var sandbox = {
        dateRange: dateRange,
        dnsDomainIs: dnsDomainIs,
        dnsDomainLevels: dnsDomainLevels,
        dnsResolve: dnsResolve,
        isInNet: isInNet,
        isPlainHostName: isPlainHostName,
        isResolvable: isResolvable,
        localHostOrDomainIs: localHostOrDomainIs,
        myIpAddress: myIpAddress,
        shExpMatch: shExpMatch,
        timeRange: timeRange,
        weekdayRange: weekdayRange
    };

    // copy the properties from the user-provided `sandbox` onto ours
    if (opts && opts.sandbox) {
        Object.keys.forEach(function (key) {
            sandbox[key] = opts.sandbox[key];
        });
    }

    // construct the array of async function names to add `yield` calls to.
    // user-provided async functions added to the `sandbox` must have an
    // `async = true` property set on the function instance
    var names = [];
    Object.keys(sandbox).forEach(function (key) {
        if (sandbox[key].async) {
            names.push(key);
        }
    });
    // console.log(names);

    // convert the JS FindProxyForURL function into a generator function
    var js = degenerator(str, names);

    // filename of the pac file for the vm
    var filename = (opts && opts.filename) ? opts.filename : 'proxy.pac';

    // evaluate the JS string and extract the FindProxyForURL generator function
    var FindProxyForURL = vm.runInNewContext(js + ';FindProxyForURL', sandbox, filename);
    if ('function' !== typeof FindProxyForURL) {
        throw new TypeError('PAC file JavaScript contents must define a `FindProxyForURL` function');
    }

    return co.wrap(FindProxyForURL);
}

/**
 * Module exports.
 */

module.exports = generate;