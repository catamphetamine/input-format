import { count_occurences } from './helpers.js'
import close_braces from './closeBraces.js'

// Takes a `template` where character placeholders
// are denoted by 'x'es (e.g. 'x (xxx) xxx-xx-xx').
//
// Returns a function which takes `value` characters
// and returns the `template` filled with those characters.
// If the `template` can only be partially filled
// then it is cut off.
//
// If `should_close_braces` is `true`,
// then it will also make sure all dangling braces are closed,
// e.g. "8 (8" -> "8 (8  )" (iPhone style phone number input).
//
export default function(template, placeholder = 'x', should_close_braces)
{
	if (!template)
	{
		return value => ({ text: value })
	}

	const characters_in_template = count_occurences(placeholder, template)

	return function(value)
	{
		if (!value)
		{
			return { text: '', template }
		}

		let value_character_index = 0
		let filled_in_template = ''

		// Using `.split('')` here instead of normal `for ... of`
		// because the importing application doesn't neccessarily include an ES6 polyfill.
		// The `.split('')` approach discards "exotic" UTF-8 characters
		// (the ones consisting of four bytes)
		// but template placeholder characters don't fall into that range
		// and appending UTF-8 characters to a string in parts still works.
		for (const character of template.split(''))
		{
			if (character !== placeholder)
			{
				filled_in_template += character
				continue
			}

			filled_in_template += value[value_character_index]
			value_character_index++

			// If the last available value character has been filled in,
			// then return the filled in template
			// (either trim the right part or retain it,
			//  if no more character placeholders in there)
			if (value_character_index === value.length)
			{
				// If there are more character placeholders
				// in the right part of the template
				// then simply trim it.
				if (value.length < characters_in_template)
				{
					break
				}
			}
		}

		if (should_close_braces)
		{
			filled_in_template = close_braces(filled_in_template, template)
		}

		return { text: filled_in_template, template }
	}
}