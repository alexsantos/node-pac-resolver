/**
 * Module dependencies.
 */

const co = require('co');
const vm = require('vm');
const degenerator = require('degenerator');

/**
 * Built-in PAC functions.
 */

const dateRange = require('./dateRange');
const dnsDomainIs = require('./dnsDomainIs');
const dnsDomainLevels = require('./dnsDomainLevels');
const dnsResolve = require('./dnsResolve');
const isInNet = require('./isInNet');
const isPlainHostName = require('./isPlainHostName');
const isResolvable = require('./isResolvable');
const localHostOrDomainIs = require('./localHostOrDomainIs');
const myIpAddress = require('./myIpAddress');
const shExpMatch = require('./shExpMatch');
const timeRange = require('./timeRange');
const weekdayRange = require('./weekdayRange');

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
	const sandbox = {
		dateRange,
		dnsDomainIs,
		dnsDomainLevels,
		dnsResolve,
		isInNet,
		isPlainHostName,
		isResolvable,
		localHostOrDomainIs,
		myIpAddress,
		shExpMatch,
		timeRange,
		weekdayRange
	};
	if (!str || !str.match('^function FindProxyForURL.*')) {
		throw new TypeError('PAC file JavaScript contents must define a `FindProxyForURL` function');
	}
	// copy the properties from the user-provided `sandbox` onto ours
	if (opts && opts.sandbox) {
		Object.keys(opts.sandbox).forEach(key => {
			sandbox[key] = opts.sandbox[key];
		});
	}

	// construct the array of async function names to add `yield` calls to.
	// user-provided async functions added to the `sandbox` must have an
	// `async = true` property set on the function instance
	const names = [];
	Object.keys(sandbox).forEach(key => {
		if (sandbox[key].async) {
			names.push(key);
		}
	});
	// console.log(names);

	// convert the JS FindProxyForURL function into a generator function
	const js = degenerator(str, names);

	// filename of the pac file for the vm
	const filename = (opts && opts.filename) ? opts.filename : 'proxy.pac';

	// evaluate the JS string and extract the FindProxyForURL generator function
	const FindProxyForURL = vm.runInNewContext(`${js};FindProxyForURL`, sandbox, filename);

	return co.wrap(FindProxyForURL);
}

/**
 * Module exports.
 */

module.exports = generate;
