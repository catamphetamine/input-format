'use strict'

exports = module.exports = {}

exports.ReactInput        = require('./commonjs/ReactInput').default
exports.templateParser    = require('./commonjs/template parser').default
exports.templateFormatter = require('./commonjs/template formatter').default
exports.parseDigit        = require('./commonjs/parse digit').default
exports.parse             = require('./commonjs/parse').default
exports.format            = require('./commonjs/format').default

exports.onChange       = require('./commonjs/input control').onChange
exports.onPaste        = require('./commonjs/input control').onPaste
exports.onCut          = require('./commonjs/input control').onCut
exports.onKeyDown      = require('./commonjs/input control').onKeyDown

// exports['default'] = ...