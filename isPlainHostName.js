/**
 * True iff there is no domain name in the hostname (no dots).
 *
 * Examples:
 *
 * ``` js
 * isPlainHostName("www")
 *   // is true.
 *
 * isPlainHostName("www.netscape.com")
 *   // is false.
 * ```
 *
 * @param {String} host The hostname from the URL (excluding port number).
 * @return {Boolean}
 */

function isPlainHostName(host) {
	'use strict';
	return !(/\./.test(host));
}

/**
 * Module exports.
 */

module.exports = isPlainHostName;
