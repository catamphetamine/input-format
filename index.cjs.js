'use strict'

// This file is deprecated.
// It's the same as `index.cjs`, just with an added `.js` file extension.
// It only exists for compatibility with the software that doesn't like `*.cjs` file extension.
// https://gitlab.com/catamphetamine/libphonenumber-js/-/issues/61#note_950728292

exports = module.exports = {}

exports.templateParser    = require('./commonjs/templateParser.js').default
exports.templateFormatter = require('./commonjs/templateFormatter.js').default
exports.parseDigit        = require('./commonjs/parseDigit.js').default
exports.parse             = require('./commonjs/parse.js').default
exports.format            = require('./commonjs/format.js').default

// Deprecated.
// I don't know why these functions exist.
exports.onChange       = require('./commonjs/inputControl.js').onChange
exports.onPaste        = require('./commonjs/inputControl.js').onPaste

exports.onCut          = require('./commonjs/inputControl.js').onCut
exports.onKeyDown      = require('./commonjs/inputControl.js').onKeyDown

// exports['default'] = ...