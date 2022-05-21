'use strict'

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