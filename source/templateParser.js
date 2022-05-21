import { count_occurences } from './helpers.js'

export default function(template, placeholder, parse)
{
	if (typeof placeholder === 'function')
	{
		parse = placeholder
		placeholder = 'x'
	}

	const max_characters = count_occurences(placeholder, template)

	return function(character, value)
	{
		if (value.length < max_characters)
		{
			return parse(character, value)
		}
	}
}