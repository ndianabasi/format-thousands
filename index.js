'use strict';
exports.__esModule = true;
/**
 * Non-Breaking Space `&nbsp;`
 * @const {string}
 */
var NBSP = String.fromCharCode(160);
/**
 * @typedef {Object} ParsedNumber
 * @prop {string} integer
 * @prop {string} fraction
 * @prop {string} sign
 */
/**
 * @param {number} number The number to parse
 * @returns The parsed object
 */
function parseNumber(number) {
    var isNegative = number < 0;
    var numberString = String(number);
    if (isNegative) {
        numberString = numberString.slice(1);
    }
    var decimal = numberString.split('.');
    return {
        integer: decimal[0],
        fraction: decimal[1] || '',
        sign: isNegative ? '-' : '',
    };
}
/**
 * @param {number} number The number to format with the separator
 * @param {string} separator The separator for formatting the number
 * @returns {string} The formatted string
 */
function format(number, separator) {
    var parsedNumber = String(number);
    while (parsedNumber.length % 3) {
        parsedNumber = '#' + parsedNumber;
    }
    var result = parsedNumber.substr(0, 3);
    result = result.replace(/#/g, '');
    var i;
    var length = parsedNumber.length;
    for (i = 3; i < length; i += 3) {
        result = result + separator + parsedNumber.substr(i, 3);
    }
    return result;
}
/**
 * @param {number} number
 * @param {Object|string} [options=" "]
 * @param {string} [options.separator=" "]
 * @param {boolean} [options.formatFourDigits=true]
 * @returns {string}
 *
 * @example
 * formatThousands(1000);
 * //=> '1 000'
 *
 * formatThousands(5000, {formatFourDigits: false});
 * //=> '5000'
 *
 * formatThousands(10000, {separator: "'"});
 * //=> "10'000"
 */
function default_1(number, options) {
    var _a;
    var result = '';
    var separator = NBSP;
    var formatFourDigits = true;
    if (number === undefined || !number || number === 0) {
        return result;
    }
    var numberObject = parseNumber(number);
    var numberString = String(number);
    if (typeof options === 'object') {
        if ('separator' in options) {
            separator =
                (_a = options === null || options === void 0 ? void 0 : options.separator) !== null && _a !== void 0
                    ? _a
                    : '';
        }
        if (typeof options.formatFourDigits === 'boolean') {
            formatFourDigits = options.formatFourDigits;
        }
    } else if (typeof options !== 'undefined') {
        separator = options;
    }
    if (numberObject.integer.length <= 3 || (numberObject.integer.length === 4 && !formatFourDigits)) {
        result = numberString;
    } else {
        result += numberObject.sign;
        result += format(Number(numberObject.integer), separator);
        if (numberObject.fraction) {
            result += '.';
            result += numberObject.fraction;
        }
    }
    return result;
}
exports['default'] = default_1;
