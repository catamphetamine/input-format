import
{
	onChange,
	onCut,
	onPaste,
	onKeyDown
}
from './inputControl.js'

import { Keys } from './dom.js'

import templateParser from './templateParser.js'
import templateFormatter from './templateFormatter.js'
import parseDigit from './parseDigit.js'

// US phone number template
const TEMPLATE = '(xxx) xxx-xxxx'
const parse = templateParser(TEMPLATE, parseDigit)
const format = templateFormatter(TEMPLATE)

describe('inputControl', function()
{
	it('should handle onChange', function()
	{
		const input =
		{
			value: '1234567-',
			selectionStart: 5,
			selectionEnd: 6,
			setSelectionRange(position) {
				this.selectionStart = position
			},
			hasAttribute(attribute) {
				return false
			}
		}

		let value
		const on_change = _ => value = _

		onChange({}, input, parse, format, on_change)

		expect(input.value).to.equal('(123) 456-7')
		expect(input.selectionStart).to.equal(8)
		expect(value).to.equal('1234567')
	})

	it('should handle onCut', function(done)
	{
		const input =
		{
			value: '1234567-',
			selectionStart: 5,
			selectionEnd: 6,
			setSelectionRange(position) {
				this.selectionStart = position
			},
			hasAttribute(attribute) {
				return false
			}
		}

		let value
		const on_change = _ => value = _

		onCut({}, input, parse, format, on_change)

		setTimeout(() =>
		{
			expect(input.value).to.equal('(123) 456-7')
			expect(input.selectionStart).to.equal(8)
			expect(value).to.equal('1234567')
			done()
		},
		0)
	})

	it('should handle onPaste', function()
	{
		const input =
		{
			value: '1234567-',
			selectionStart: 5,
			selectionEnd: 5,
			setSelectionRange(position) {
				this.selectionStart = position
			},
			hasAttribute(attribute) {
				return false
			}
		}

		let value
		const on_change = _ => value = _

		onPaste({}, input, parse, format, on_change)

		expect(input.value).to.equal('(123) 456-7')
		expect(input.selectionStart).to.equal(8)
		expect(value).to.equal('1234567')
	})

	it('should handle onPaste (with selection)', function()
	{
		const input =
		{
			value: '1234567-',
			selectionStart: 5,
			selectionEnd: 6,
			setSelectionRange(position) {
				this.selectionStart = position
			},
			hasAttribute(attribute) {
				return false
			}
		}

		let value
		const on_change = _ => value = _

		onPaste({}, input, parse, format, on_change)

		expect(input.value).to.equal('(123) 457')
		expect(input.selectionStart).to.equal(8)
		expect(value).to.equal('123457')
	})

	it('should not handle onKeyDown', function()
	{
		const input =
		{
			value: '1234567-',
			selectionStart: 5,
			selectionEnd: 6,
			setSelectionRange(position) {
				this.selectionStart = position
			},
			hasAttribute(attribute) {
				return false
			}
		}

		let value
		const on_change = _ => value = _

		onKeyDown({}, input, parse, format, on_change)

		expect(input.value).to.equal('1234567-')
		expect(input.selectionStart).to.equal(5)
		expect(value).to.be.undefined
	})

	it('should handle onKeyDown (Delete)', function()
	{
		const input =
		{
			value: '1234567-',
			selectionStart: 5,
			selectionEnd: 5,
			setSelectionRange(position) {
				this.selectionStart = position
			},
			hasAttribute(attribute) {
				return false
			}
		}

		const event =
		{
			keyCode: Keys.Delete,
			preventDefault() {}
		}

		let value
		const on_change = _ => value = _

		onKeyDown(event, input, parse, format, on_change)

		expect(input.value).to.equal('(123) 457')
		expect(input.selectionStart).to.equal(8)
		expect(value).to.equal('123457')
	})

	it('should handle onKeyDown (Backspace)', function()
	{
		const input =
		{
			value: '1234567-',
			selectionStart: 5,
			selectionEnd: 5,
			setSelectionRange(position) {
				this.selectionStart = position
			},
			hasAttribute(attribute) {
				return false
			}
		}

		const event =
		{
			keyCode: Keys.Backspace,
			preventDefault() {}
		}

		let value
		const on_change = _ => value = _

		onKeyDown(event, input, parse, format, on_change)

		expect(input.value).to.equal('(123) 467')
		expect(input.selectionStart).to.equal(7)
		expect(value).to.equal('123467')
	})

	it('should handle onKeyDown (Backspace with selection)', function()
	{
		const input =
		{
			value: '1234567-',
			selectionStart: 4,
			selectionEnd: 6,
			setSelectionRange(position) {
				this.selectionStart = position
			},
			hasAttribute(attribute) {
				return false
			}
		}

		const event =
		{
			keyCode: Keys.Backspace,
			preventDefault() {}
		}

		let value
		const on_change = _ => value = _

		onKeyDown(event, input, parse, format, on_change)

		expect(input.value).to.equal('(123) 47')
		expect(input.selectionStart).to.equal(7)
		expect(value).to.equal('12347')
	})

	it('should handle onKeyDown (Delete with selection)', function()
	{
		const input =
		{
			value: '1234567-',
			selectionStart: 4,
			selectionEnd: 6,
			setSelectionRange(position) {
				this.selectionStart = position
			},
			hasAttribute(attribute) {
				return false
			}
		}

		const event =
		{
			keyCode: Keys.Delete,
			preventDefault() {}
		}

		let value
		const on_change = _ => value = _

		onKeyDown(event, input, parse, format, on_change)

		expect(input.value).to.equal('(123) 47')
		expect(input.selectionStart).to.equal(7)
		expect(value).to.equal('12347')
	})
})