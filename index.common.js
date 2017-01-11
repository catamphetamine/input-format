'use strict'

exports = module.exports = {}

exports.InputController = require('./build/input controller').default
exports.ReactInput = require('./build/react input').default
exports.templateParser = require('./build/template parser').default
exports.templateFormatter = require('./build/template formatter').default
exports.parseDigit = require('./build/parse digit').default
exports.parse = require('./build/parse').default
exports.format = require('./build/format').default

// exports['default'] = ...