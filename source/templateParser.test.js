import { expect } from 'chai'

import template_parser from './templateParser.js'

describe('templateParser', function()
{
	it('should parse a phone number', function()
	{
		const parse = template_parser('x (xxx) xxx-xx-xx', (character, value) =>
		{
			if (character >= '0' && character <= '9')
			{
				return character
			}
		})

		expect(parse('', '')).to.be.undefined
		expect(parse('a', '')).to.be.undefined
		expect(parse('5', '8800555353')).to.equal('5')
		expect(parse('5', '88005553535')).to.be.undefined
	})

	it('should accept placeholder parameter', function()
	{
		const parse = template_parser('A (AAA) AAA-AA-AA', 'A', (character, value) =>
		{
			if (character >= '0' && character <= '9')
			{
				return character
			}
		})

		expect(parse('5', '8800555353')).to.equal('5')
		expect(parse('5', '88005553535')).to.be.undefined
	})
})