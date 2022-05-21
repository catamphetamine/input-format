import { expect } from 'chai'

import closeBraces from './closeBraces.js'

describe('closeBraces', function()
{
	it('should close braces', function()
	{
		expect(closeBraces('8', 'x (xxx) xxx-xx-xx')).to.equal('8')
		expect(closeBraces('8 ', 'x (xxx) xxx-xx-xx')).to.equal('8 ')
		expect(closeBraces('8 (', 'x (xxx) xxx-xx-xx')).to.equal('8 (   )')
		expect(closeBraces('8 (8', 'x (xxx) xxx-xx-xx')).to.equal('8 (8  )')
		expect(closeBraces('8 (80', 'x (xxx) xxx-xx-xx')).to.equal('8 (80 )')
		expect(closeBraces('8 (800', 'x (xxx) xxx-xx-xx')).to.equal('8 (800)')
		expect(closeBraces('8 (800)', 'x (xxx) xxx-xx-xx')).to.equal('8 (800)')
		expect(closeBraces('8 (800) ', 'x (xxx) xxx-xx-xx')).to.equal('8 (800) ')
		expect(closeBraces('8 (800) 5', 'x (xxx) xxx-xx-xx')).to.equal('8 (800) 5')

		expect(closeBraces('8 (8', 'A (AAA) AAA-AA-AA')).to.equal('8 (8AA)')
		expect(closeBraces('8 (8', 'A (AAA) AAA-AA-AA', 'A')).to.equal('8 (8  )')
		expect(closeBraces('8 (8', 'A (AAA) AAA-AA-AA', 'A', '_')).to.equal('8 (8__)')
	})
})