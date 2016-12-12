export default function parse(text, caret_position, parser, formatter, get_input_character_index)
{
	// Extract phone number digits (they may be altered later on).
	let { parsed, template, input_character_index } = parser(text)

	// Current digit index in the phone number
	// (not a character index, but a digit index)
	let  = get_input_character_index(text, caret_position)

	// In case `format` is specified, excessive
	// phone number digits may have been cut off,
	// so check that and adjust `digit_index` accordingly.
	if (input_character_index > parsed.length)
	{
		input_character_index = parsed.length
	}

	return { parsed, input_character_index }
}