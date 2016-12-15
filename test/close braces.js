import { expect } from 'chai'

import close_braces from '../source/close braces'

describe('close braces', function()
{
	it('should close braces', function()
	{
		expect(close_braces('8', 'x (xxx) xxx-xx-xx')).to.equal('8')
		expect(close_braces('8 ', 'x (xxx) xxx-xx-xx')).to.equal('8 ')
		expect(close_braces('8 (', 'x (xxx) xxx-xx-xx')).to.equal('8 (   )')
		expect(close_braces('8 (8', 'x (xxx) xxx-xx-xx')).to.equal('8 (8  )')
		expect(close_braces('8 (80', 'x (xxx) xxx-xx-xx')).to.equal('8 (80 )')
		expect(close_braces('8 (800', 'x (xxx) xxx-xx-xx')).to.equal('8 (800)')
		expect(close_braces('8 (800)', 'x (xxx) xxx-xx-xx')).to.equal('8 (800)')
		expect(close_braces('8 (800) ', 'x (xxx) xxx-xx-xx')).to.equal('8 (800) ')
		expect(close_braces('8 (800) 5', 'x (xxx) xxx-xx-xx')).to.equal('8 (800) 5')

		expect(close_braces('8 (8', 'A (AAA) AAA-AA-AA')).to.equal('8 (8AA)')
		expect(close_braces('8 (8', 'A (AAA) AAA-AA-AA', 'A')).to.equal('8 (8  )')
		expect(close_braces('8 (8', 'A (AAA) AAA-AA-AA', 'A', '_')).to.equal('8 (8__)')
	})
})