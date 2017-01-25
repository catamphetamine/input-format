import edit   from './edit'
import parse  from './parse'
import format from './format'

import { getSelection, getOperation, getCaretPosition, setCaretPosition } from './dom'

export default class Input_controller
{
	constructor(get_input_element, parse, format, on_change)
	{
		if (typeof get_input_element !== 'function')
		{
			const element = get_input_element
			get_input_element = () => element
		}

		this.get_input_element = get_input_element
		this.parse = parse
		this.format = format
		this.on_change = on_change

		this.onCut = this.onCut.bind(this)
		this.onPaste = this.onPaste.bind(this)
		this.onChange = this.onChange.bind(this)
		this.onKeyDown = this.onKeyDown.bind(this)
		this.format_input_text = this.format_input_text.bind(this)
	}

	// Special handling for "Cut" event because
	// it wouldn't copy to clipboard otherwise.
	onCut(event)
	{
		setTimeout(this.format_input_text, 0)
	}

	onPaste(event)
	{
		const input = this.get_input_element()

		const selection = getSelection(input)

		// If selection is made,
		// just erase the selected text
		// prior to pasting
		if (selection)
		{
			this.erase_selection(input, selection)
		}

		this.format_input_text()
	}

	onChange(event)
	{
		this.format_input_text()
	}

	// Intercepts "Delete" and "Backspace" keys
	// (hitting "Delete" or "Backspace"
	//  at any caret position should always result in
	//  erasing a digit)
	onKeyDown(event)
	{
		const operation = getOperation(event)

		switch (operation)
		{
			case 'Delete':
			case 'Backspace':
				// Intercept this operation and perform it manually.
				event.preventDefault()

				const input = this.get_input_element()

				const selection = getSelection(input)

				// If selection is made,
				// just erase the selected text,
				// and don't apply any more operations to it.
				if (selection)
				{
					this.erase_selection(input, selection)
					return this.format_input_text()
				}

				// Else, perform the (character erasing) operation manually
				return this.format_input_text(operation)
		}
	}

	// Erases the selected text inside an `<input/>`
	erase_selection(input, selection)
	{
		let text = input.value
		text = text.slice(0, selection.start) + text.slice(selection.end)

		input.value = text
		setCaretPosition(input, selection.start)

		return this.format_input_text()
	}

	// Formats <input/> textual value as a phone number
	format_input_text(operation)
	{
		// <input/> DOM element
		const input = this.get_input_element()

		let { value, caret } = parse(input.value, getCaretPosition(input), this.parse)

		// Apply the pending operation to the <input/> textual value (if any)
		if (operation)
		{
			const edit_result = edit(value, caret, operation)

			value = edit_result.value
			caret = edit_result.caret
		}

		// Format the <input/> textual value as a phone number
		// (and reposition the caret accordingly)

		const format_result = format(value, caret, this.format)

		const text = format_result.text
		caret      = format_result.caret

		// Set <input/> textual value manually to also set caret position
		// and prevent React from resetting the caret position later
		// inside subsequent `render()`.
		input.value = text
		// Set caret position (with the neccessary adjustments)
		setCaretPosition(input, caret)

		// <input/> textual value may have been changed,
		// so `value` may have been changed too.
		this.on_change(value)
	}

	// Parses `<input/>` text
	getParsedValue()
	{
		// <input/> DOM element
		const input = this.get_input_element()

		return parse(input.value, undefined, this.parse)
	}
}