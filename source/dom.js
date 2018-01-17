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

	// Set caret position
	element.setSelectionRange(caret_position, caret_position)
}