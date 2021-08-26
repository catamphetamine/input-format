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

// Deprecated.
// I don't know why this function exists.
export function onCut(event, input, _parse, _format, on_change)
{
	// The actual cut hasn't happened just yet hence the timeout.
	setTimeout(() => formatInputText(input, _parse, _format, undefined, on_change), 0)
}

// Deprecated.
// I don't know why this function exists.
export function onPaste(event, input, _parse, _format, on_change)
{
	const selection = getSelection(input)

	// If selection is made,
	// just erase the selected text
	// prior to pasting
	if (selection)
	{
		eraseSelection(input, selection)
	}

	formatInputText(input, _parse, _format, undefined, on_change)
}

export function onChange(event, input, _parse, _format, on_change)
{
	formatInputText(input, _parse, _format, undefined, on_change)
}

// "Delete" and "Backspace" keys are special
// in a way that they're not handled by the regular `onChange()` handler
// and instead are intercepted and re-applied manually.
// The reason is that normally hitting "Backspace" or "Delete"
// results in erasing a character, but that character might be any character,
// while it would be a better "user experience" if it erased not just any character
// but the closest "meaningful" character.
// For example, if a template is `(xxx) xxx-xxxx`,
// and the `<input/>` value is `(111) 222-3333`,
// then, if a user begins erasing the `3333` part via "Backspace"
// and reaches the "-" character, then it would just erase the "-" character.
// Nothing wrong with that, but it would be a better "user experience"
// if hitting "Backspace" at that position would erase the closest "meaningful"
// character, which would be the rightmost `2`.
// So, what this `onKeyDown()` handler does is it intercepts
// "Backspace" and "Delete" keys and re-applies those operations manually
// following the logic described above.
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

			// If a selection is made, just erase the selected text.
			if (selection)
			{
				eraseSelection(input, selection)
				return formatInputText(input, _parse, _format, undefined, on_change)
			}

			// Else, perform the (character erasing) operation manually.
			return formatInputText(input, _parse, _format, operation, on_change)

		default:
			// Will be handled normally as part of the `onChange` handler.
	}
}

/**
 * Erases the selected text inside an `<input/>`.
 * @param  {DOMElement} input
 * @param  {Selection} selection
 */
function eraseSelection(input, selection)
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
function formatInputText(input, _parse, _format, operation, on_change)
{
	// Parse `<input/>` textual value.
	// Get the `value` and `caret` position.
	let { value, caret } = parse(input.value, getCaretPosition(input), _parse)

	// If a user performed an operation ("Backspace", "Delete")
	// then apply that operation and get the new `value` and `caret` position.
	if (operation)
	{
		const newValueAndCaret = edit(value, caret, operation)

		value = newValueAndCaret.value
		caret = newValueAndCaret.caret
	}

	// Format the `value`.
	// (and reposition the caret accordingly)
	const formatted = format(value, caret, _format)

	const text = formatted.text
	caret      = formatted.caret

	// Set `<input/>` textual value manually
	// to prevent React from resetting the caret position
	// later inside a subsequent `render()`.
	// Doesn't work for custom `inputComponent`s for some reason.
	input.value = text
	// Position the caret properly.
	setCaretPosition(input, caret)

	// If the `<input/>` textual value did change,
	// then the parsed `value` may have changed too.
	on_change(value)
}