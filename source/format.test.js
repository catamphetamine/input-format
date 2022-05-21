import { expect } from 'chai'

import format from './format.js'
import template_formatter from './templateFormatter.js'

describe(`format`, function()
{
	it(`should format phone numbers`, function()
	{
		const formatter = template_formatter('(xxx) xxx-xx-xx')

		const test_caret_position = (digit_index, caret_in_formatted) =>
		{
			expect(format
			(
				'8005553535',
				digit_index,
				formatter
			))
			.to.deep.equal
			({
				text: '(800) 555-35-35',
				caret: caret_in_formatted
			})
		}

		test_caret_position(0, 1)
		test_caret_position(1, 2)
		test_caret_position(2, 3)

		test_caret_position(3, 6)
		test_caret_position(4, 7)
		test_caret_position(5, 8)

		test_caret_position(6, 10)
		test_caret_position(7, 11)

		test_caret_position(8, 13)
		test_caret_position(9, 14)

		// After the last digit
		test_caret_position(10, 15)
	})

	it('should autoconstruct template formatter from a template', function()
	{
		expect(format
		(
			'8005553535',
			0,
			'(xxx) xxx-xx-xx'
		))
		.to.deep.equal
		({
			text: '(800) 555-35-35',
			caret: 1
		})
	})

	it('should format value with no caret position', function()
	{
		expect(format
		(
			'8005553535',
			undefined,
			'(xxx) xxx-xx-xx'
		))
		.to.deep.equal
		({
			text: '(800) 555-35-35',
			caret: 15
		})
	})

	it('should format value with no template preserving caret position', function()
	{
		expect(format
		(
			'8005553535',
			2,
			// () => { text: '8005553535' }
			() => {}
		))
		.to.deep.equal
		({
			text: '8005553535',
			caret: 2
		})
	})

	// it('should position caret correctly with partially filled templates using spacers', function()
	// {
	// 	expect(format
	// 	({
	// 		'88005',
	// 		0
	// 	},
	// 	(value) =>
	// 	{
	// 		const result =
	// 		{
	// 			'8 (800) 5  -  -  ',
	// 			template: 'x (xxx) xxx-xx-xx'
	// 		}
	//
	// 		return result
	// 	})
	// 	.to.deep.equal
	// 	({
	// 		text: '(800) 555-35-35',
	// 		caret: 1
	// 	})
	// })
})