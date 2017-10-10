import { expect } from 'chai'

import parse_digit from '../source/parse digit'

describe('parse digit', function()
{
	it('should parse digits', function()
	{
		expect(parse_digit('')).to.be.undefined
		expect(parse_digit('a')).to.be.undefined
		expect(parse_digit('5')).to.equal('5')
		// Arabic digits
		expect(parse_digit('١')).to.equal('1')
	})
})