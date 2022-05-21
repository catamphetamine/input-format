import React from 'react'

import ReactInput from '../react/index.js'

import
{
	templateParser,
	templateFormatter,
	parseDigit,
	parse,
	format,
	onChange,
	onPaste,
	onCut,
	onKeyDown
}
from '../index.js'

import Library from '../index.cjs'

import ReactInputLibrary from '../react/index.cjs'

describe(`exports`, function()
{
	it(`should export ES6`, function()
	{
		expect(ReactInput.render).to.be.a('function')

		templateParser('')
		templateFormatter('')
		parseDigit()
		parse('')
		format('', 0, () => {})

		expect(onChange).to.be.a('function')
		expect(onPaste).to.be.a('function')
		expect(onCut).to.be.a('function')
		expect(onKeyDown).to.be.a('function')
	})

	it(`should export CommonJS`, function()
	{
		expect(ReactInputLibrary.default.render).to.be.a('function')

		Library.templateParser('')
		Library.templateFormatter('')
		Library.parseDigit()
		Library.parse('')
		Library.format('', 0, () => {})

		expect(Library.onChange).to.be.a('function')
		expect(Library.onPaste).to.be.a('function')
		expect(Library.onCut).to.be.a('function')
		expect(Library.onKeyDown).to.be.a('function')
	})
})