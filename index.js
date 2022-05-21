export
{
	default as templateParser
}
from './modules/templateParser.js'

export
{
	default as templateFormatter
}
from './modules/templateFormatter.js'

export
{
	default as parseDigit
}
from './modules/parseDigit.js'

export
{
	default as parse
}
from './modules/parse.js'

export
{
	default as format
}
from './modules/format.js'

export
{
	onChange,
	onKeyDown,

	// Deprecated.
	// I don't know why these functions exist.
	onPaste,
	onCut
}
from './modules/inputControl.js'