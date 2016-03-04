/**
 * Module dependencies.
 */

const dns = require('dns');
const Netmask = require('netmask').Netmask;

/**
 * True iff the IP address of the host matches the specified IP address pattern.
 *
 * Pattern and mask specification is done the same way as for SOCKS configuration.
 *
 * Examples:
 *
 * ``` js
 * isInNet(host, "198.95.249.79", "255.255.255.255")
 *   // is true iff the IP address of host matches exactly 198.95.249.79.
 *
 * isInNet(host, "198.95.0.0", "255.255.0.0")
 *   // is true iff the IP address of the host matches 198.95.*.*.
 * ```
 *
 * @param {String} host a DNS hostname, or IP address. If a hostname is passed,
 *   it will be resoved into an IP address by this function.
 * @param {String} pattern an IP address pattern in the dot-separated format mask.
 * @param {String} mask for the IP address pattern informing which parts of the
 *   IP address should be matched against. 0 means ignore, 255 means match.
 * @return {Boolean}
 */

function isInNet(host, pattern, mask) {
	'use strict';
	const options = {
		family: 4
	};
	return new Promise(resolve => {
		dns.lookup(host, options, (err, ip) => {
			if (err) {
				resolve(err.code);
			}
			if (!ip) {
				ip = '127.0.0.1';
			}
			const netmask = new Netmask(pattern, mask);
			resolve(netmask.contains(ip));
		});
	});
}

isInNet.async = true;

/**
 * Module exports.
 */

module.exports = isInNet;
