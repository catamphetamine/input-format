import { expect } from 'chai'

import edit from './edit.js'

describe(`edit`, function()
{
	it(`should edit phone numbers`, function()
	{
		expect(edit('88005553535', 0)).to.deep.equal({ value: '88005553535', caret: 0 })
		expect(edit('88005553535', 1)).to.deep.equal({ value: '88005553535', caret: 1 })

		expect(edit('88005553535', 4, 'Delete')).to.deep.equal({ value: '8800553535', caret: 4 })
		expect(edit('88005553535', 4, 'Backspace')).to.deep.equal({ value: '8805553535', caret: 3 })

		// No more lefthand characters to erase
		expect(edit('88005553535', 0, 'Backspace')).to.deep.equal({ value: '88005553535', caret: 0 })
	})
})