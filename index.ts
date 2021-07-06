type Options = {
    separator: string;
    formatFourDigits: boolean
  }

/**
 * Non-Breaking Space `&nbsp;`
 * @const {string}
 */
const NBSP = String.fromCharCode(160);

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
function parseNumber(number: number): {integer: string, fraction: string, sign: string} {
  const isNegative = number < 0;
  let numberString = String(number);

  if (isNegative) {
    numberString = numberString.slice(1);
  }

  const decimal = numberString.split('.');

  return {
    integer: decimal[0],
    fraction: decimal[1] || '',
    sign: isNegative ? '-' : ''
  };
}

/**
 * @param {number} number The number to format with the separator
 * @param {string} separator The separator for formatting the number
 * @returns {string} The formatted string
 */
function format(number: number, separator: string): string {
  let parsedNumber = String(number);

  while (parsedNumber.length % 3) {
    parsedNumber = '#' + parsedNumber;
  }

  let result = parsedNumber.substr(0, 3);
  result = result.replace(/#/g, '');

  let i;
  const {length} = parsedNumber;
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
export default function (number: number, options: Options | string): string {
  let result = '';
  let separator = NBSP;
  let formatFourDigits = true;

  if (!number && number !== 0) {
    return result;
  }

  const numberObject = parseNumber(number);
  const numberString = String(number);

  if (typeof options === 'object') {
    if ('separator' in options) {
      ({separator} = options);
    }

    if (typeof options.formatFourDigits === 'boolean') {
      ({formatFourDigits} = options);
    }
  } else if (typeof options !== 'undefined') {
    separator = options;
  }

  if (
    numberObject.integer.length <= 3 ||
    (numberObject.integer.length === 4 && !formatFourDigits)
  ) {
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
};
