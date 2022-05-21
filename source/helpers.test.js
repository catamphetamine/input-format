import { expect } from 'chai'

import { count_occurences } from './helpers.js'

describe(`helpers`, function()
{
	it(`should count occurences`, function()
	{
		expect(count_occurences('x', 'x (xxx) xxx-xx-xx')).to.equal(11)
	})
})