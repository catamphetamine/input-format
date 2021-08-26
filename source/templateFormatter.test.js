import { expect } from 'chai'

import template_formatter from '../source/templateFormatter'

describe('templateFormatter', function()
{
	it('should format a phone number', function()
	{
		const formatter = template_formatter('x (xxx) xxx-xx-xx')

		expect(formatter('').template).to.equal('x (xxx) xxx-xx-xx')

		expect(formatter('8').text).to.equal('8')
		expect(formatter('88').text).to.equal('8 (8')
		expect(formatter('880').text).to.equal('8 (80')
		expect(formatter('8800').text).to.equal('8 (800')
		expect(formatter('88005').text).to.equal('8 (800) 5')
		expect(formatter('880055').text).to.equal('8 (800) 55')
		expect(formatter('8800555').text).to.equal('8 (800) 555')
		expect(formatter('88005553').text).to.equal('8 (800) 555-3')
		expect(formatter('880055535').text).to.equal('8 (800) 555-35')
		expect(formatter('8800555353').text).to.equal('8 (800) 555-35-3')
		expect(formatter('88005553535').text).to.equal('8 (800) 555-35-35')
	})

	it('should format for edge case templates', function()
	{
		const formatter = template_formatter('(x x x)')

		expect(formatter('').text).to.equal('')
		expect(formatter('0').text).to.equal('(0')
		expect(formatter('00').text).to.equal('(0 0')
		expect(formatter('000').text).to.equal('(0 0 0)')
		// More than the template can handle
		expect(formatter('0000').text).to.equal('(0 0 0)')
	})

	it('should default to "x" placeholder', function()
	{
		const formatter = template_formatter('A (AAA) AAA-AA-AA')

		expect(formatter('88005553535').text).to.equal('A (AAA) AAA-AA-AA')
	})

	it('should accept custom placeholder', function()
	{
		const formatter = template_formatter('A (AAA) AAA-AA-AA', 'A')

		expect(formatter('88005553535').text).to.equal('8 (800) 555-35-35')
	})

	it('should skip formatting when given no template', function()
	{
		const formatter = template_formatter()

		expect(formatter('88005553535').text).to.equal('88005553535')
	})

	it('should close braces', function()
	{
		const formatter = template_formatter('x (xxx) xxx-xx-xx', 'x', true)

		expect(formatter('88').text).to.equal('8 (8  )')
	})
})