export function isReadOnly(element)
{
	return element.hasAttribute('readonly')
}

// Gets <input/> selection bounds
export function getSelection(element)
{
	// If no selection, return nothing
	if (element.selectionStart === element.selectionEnd)
	{
		return
	}

	return { start: element.selectionStart, end: element.selectionEnd }
}

// Key codes
export const Keys =
{
	Backspace : 8,
	Delete    : 46
}

// Finds out the operation to be intercepted and performed
// based on the key down event `keyCode`.
export function getOperation(event)
{
	switch (event.keyCode)
	{
		case Keys.Backspace:
			return 'Backspace'

		case Keys.Delete:
			return 'Delete'
	}
}

// Gets <input/> caret position
export function getCaretPosition(element)
{
	return element.selectionStart
}

// Sets <input/> caret position
export function setCaretPosition(element, caret_position)
{
	// Sanity check
	if (caret_position === undefined)
	{
		return
	}

	// Set caret position.
	// There has been an issue with caret positioning on Android devices.
	// https://github.com/catamphetamine/input-format/issues/2
	// I was revisiting this issue and looked for similar issues in other libraries.
	// For example, there's [`text-mask`](https://github.com/text-mask/text-mask) library.
	// They've had exactly the same issue when the caret seemingly refused to be repositioned programmatically.
	// The symptoms were the same: whenever the caret passed through a non-digit character of a mask (a whitespace, a bracket, a dash, etc), it looked as if it placed itself one character before its correct position.
	// https://github.com/text-mask/text-mask/issues/300
	// They seem to have found a basic fix for it: calling `input.setSelectionRange()` in a timeout rather than instantly for Android devices.
	// https://github.com/text-mask/text-mask/pull/400/files
	// I've implemented the same workaround here.
	if (isAndroid()) {
      setTimeout(() => element.setSelectionRange(caret_position, caret_position), 0)
	} else {
		element.setSelectionRange(caret_position, caret_position)
	}
}

function isAndroid() {
	// `navigator` is not defined when running mocha tests.
	if (typeof navigator !== 'undefined') {
		return ANDROID_USER_AGENT_REG_EXP.test(navigator.userAgent)
	}
}

const ANDROID_USER_AGENT_REG_EXP = /Android/i