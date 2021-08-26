import { expect } from 'chai'

import parseDigit from '../source/parseDigit'

describe('parseDigit', function()
{
	it('should parse digits', function()
	{
		expect(parseDigit('')).to.be.undefined
		expect(parseDigit('a')).to.be.undefined
		expect(parseDigit('5')).to.equal('5')
		// Arabic digits
		expect(parseDigit('١')).to.equal('1')
	})
})