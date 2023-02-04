// via https://github.com/teamwethrift/xml-sanitize-string/blob/master/lib/index.js

/* eslint no-control-regex: "off" */

const unicodeCharToHexCodePoint = char => {
  const hex = char.codePointAt(0).toString(16)
  const result = '0000'.substring(0, 4 - hex.length) + hex
  return result
}

const sanitizeEmoji = str => {
  if (str && str.length) {
    str = str.replace(/([\uD800-\uDBFF][\uDC00-\uDFFF])/g, c => {
      return `&#${unicodeCharToHexCodePoint(c)}`
    })
    // replace remaining non-safe characters
    str = str.replace(/[^\u0009\u000a\u000d\u0020-\uD7FF\uE000-\uFFFD]/g, '')
  }
  return str
}

// via https://stackoverflow.com/questions/30106476/
const b64EncodeUnicode = str => {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
      return String.fromCharCode('0x' + p1)
    }),
  )
}

export { sanitizeEmoji, b64EncodeUnicode }
