import React from 'react'

import
{
	InputController,
	ReactInput,
	templateParser,
	templateFormatter,
	parseDigit,
	parse,
	format
}
from '../index.es6'

describe(`exports`, function()
{
	it(`should export ES6`, function()
	{
		new InputController({}, {})
		const render = (<ReactInput/>)

		templateParser('')
		templateFormatter('')
		parseDigit()
		parse('')
		format('', 0, () => {})
	})

	it(`should export CommonJS`, function()
	{
		const Library = require('../index.common')

		new Library.InputController({}, {})
		const ReactInput = Library.ReactInput
		const render = (<ReactInput/>)

		Library.templateParser('')
		Library.templateFormatter('')
		Library.parseDigit()
		Library.parse('')
		Library.format('', 0, () => {})
	})
})