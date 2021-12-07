const consecutiveSpace = / {2,}/;

/**
 * 删除类字符串中的额外空白。
 * @param {string} classString 要修剪的字符串
 * @returns {string} Clean class string
 */
export function stripClassWhitespace(classString) {
	return classString.replace(consecutiveSpace, ' ').trimRight();
}

/**
 * Filters out falsy classes.
 * @param {...(string | false | null)} args The classes to be filtered
 * @return {string} The classes without the falsy values
 */
export function classes(...args) {
	return args.filter(cls => !!cls).join(' ');
}
