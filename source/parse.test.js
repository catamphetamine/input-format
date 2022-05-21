import { expect } from 'chai'

import parse from './parse.js'

const parse_digits = (text, caret_position) =>
{
	return parse(text, caret_position, character =>
	{
		if (character >= '0' && character <= '9')
		{
			return character
		}
	})
}

describe(`parse`, function()
{
	it(`should parse phone numbers`, function()
	{
		function test_caret(caret_in_text, caret_in_value)
		{
			expect(parse_digits('(123) 456-78-90', caret_in_text)).to.deep.equal({ value: '1234567890', caret: caret_in_value })
		}

		test_caret(0, 0)

		test_caret(1, 0)
		test_caret(2, 1)
		test_caret(3, 2)

		test_caret(4, 3)
		test_caret(5, 3)

		test_caret(6, 3)
		test_caret(7, 4)
		test_caret(8, 5)

		test_caret(9, 6)

		test_caret(10, 6)
		test_caret(11, 7)

		test_caret(12, 8)

		test_caret(13, 8)
		test_caret(14, 9)

		test_caret(15, 10)
	})

	it(`should parse without caret position specified`, function()
	{
		expect(parse_digits(' 1 2 3 ', undefined)).to.deep.equal({ value: '123', caret: 3 })
	})
})