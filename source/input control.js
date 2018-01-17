import edit   from './edit'
import parse  from './parse'
import format from './format'

import
{
	getOperation,
	getSelection,
	getCaretPosition,
	setCaretPosition
}
from './dom'

export function onCut(event, input, _parse, _format, on_change)
{
	// The actual cut hasn't happened just yet hence the timeout.
	setTimeout(() => format_input_text(input, _parse, _format, undefined, on_change), 0)
}

export function onPaste(event, input, _parse, _format, on_change)
{
	const selection = getSelection(input)

	// If selection is made,
	// just erase the selected text
	// prior to pasting
	if (selection)
	{
		erase_selection(input, selection)
	}

	format_input_text(input, _parse, _format, undefined, on_change)
}

export function onChange(event, input, _parse, _format, on_change)
{
	format_input_text(input, _parse, _format, undefined, on_change)
}

// Intercepts "Delete" and "Backspace" keys.
// (hitting "Delete" or "Backspace" at any caret
//  position should always result in rasing a digit)
export function onKeyDown(event, input, _parse, _format, on_change)
{
	const operation = getOperation(event)

	switch (operation)
	{
		case 'Delete':
		case 'Backspace':
			// Intercept this operation and perform it manually.
			event.preventDefault()

			const selection = getSelection(input)

			// If selection is made,
			// just erase the selected text,
			// and don't apply any more operations to it.
			if (selection)
			{
				erase_selection(input, selection)
				return format_input_text(input, _parse, _format, undefined, on_change)
			}

			// Else, perform the (character erasing) operation manually
			return format_input_text(input, _parse, _format, operation, on_change)

		default:
			// Will be handled when `onChange` fires.
	}
}

/**
 * Erases the selected text inside an `<input/>`.
 * @param  {DOMElement} input
 * @param  {Selection} selection
 */
function erase_selection(input, selection)
{
	let text = input.value
	text = text.slice(0, selection.start) + text.slice(selection.end)

	input.value = text
	setCaretPosition(input, selection.start)
}

/**
 * Parses and re-formats `<input/>` textual value.
 * E.g. when a user enters something into the `<input/>`
 * that raw input must first be parsed and the re-formatted properly.
 * Is called either after some user input (e.g. entered a character, pasted something)
 * or after the user performed an `operation` (e.g. "Backspace", "Delete").
 * @param  {DOMElement} input
 * @param  {Function} parse
 * @param  {Function} format
 * @param  {string} [operation] - The operation that triggered `<input/>` textual value change. E.g. "Backspace", "Delete".
 * @param  {Function} onChange
 */
function format_input_text(input, _parse, _format, operation, on_change)
{
	// Parse `<input/>` textual value.
	// Get `value` and `caret` position.
	let { value, caret } = parse(input.value, getCaretPosition(input), _parse)

	// If a user performed an operation (e.g. "Backspace", "Delete")
	// then apply that operation and get new `value` and `caret` position.
	if (operation)
	{
		const operation_applied = edit(value, caret, operation)

		value = operation_applied.value
		caret = operation_applied.caret
	}

	// Format the `value`.
	// (and reposition the caret accordingly)
	const formatted = format(value, caret, _format)

	const text = formatted.text
	caret      = formatted.caret

	// Set `<input/>` textual value manually
	// to prevent React from resetting the caret position
	// later inside subsequent `render()`.
	// Doesn't work for custom `inputComponent`s for some reason.
	input.value = text
	// Position the caret properly.
	setCaretPosition(input, caret)

	// `<input/>` textual value may have changed,
	// so the parsed `value` may have changed too.
	// The `value` didn't neccessarily change
	// but it might have.
	on_change(value)
}