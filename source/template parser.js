import { count_occurences } from './helpers'

export default function create_template_parser(template, placeholder, parse)
{
	if (typeof placeholder === 'function')
	{
		parse = placeholder
		placeholder = 'x'
	}

	const max_characters = count_occurences(placeholder, template)

	return function parse_character(character, value)
	{
		if (value.length >= max_characters)
		{
			return
		}

		return parse(character, value)
	}
}