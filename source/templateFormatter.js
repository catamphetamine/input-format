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
// If `shouldCloseBraces` is `true`,
// then it will also make sure all dangling braces are closed,
// e.g. "8 (8" -> "8 (8  )" (iPhone style phone number input).
//
export default function(template, placeholder = 'x', shouldCloseBraces) {
	if (!template) {
		return value => ({ text: value })
	}

	const placeholdersCountInTemplate = count_occurences(placeholder, template)

	return function(value) {
		if (!value) {
			return { text: '', template }
		}

		let characterIndexInValue = 0
		let templateWithFilledInPlaceholders = ''

		// Using `.split('')` here instead of normal `for ... of`
		// because the importing application doesn't neccessarily include an ES6 polyfill.
		// The `.split('')` approach discards "exotic" UTF-8 characters
		// (the ones consisting of four bytes)
		// but template placeholder characters don't fall into that range
		// and appending UTF-8 characters to a string in parts still works.
		for (const character of template.split('')) {
			if (character !== placeholder) {
				templateWithFilledInPlaceholders += character
				continue
			}

			templateWithFilledInPlaceholders += value[characterIndexInValue]
			characterIndexInValue++

			// If the last available value character has been filled in,
			// then return the filled in template
			// (either trim the right part or retain it,
			//  if no more character placeholders in there)
			if (characterIndexInValue === value.length) {
				// If there are more character placeholders
				// in the right part of the template
				// then simply trim it.
				if (value.length < placeholdersCountInTemplate) {
					break
				}
			}
		}

		if (shouldCloseBraces) {
			templateWithFilledInPlaceholders = close_braces(templateWithFilledInPlaceholders, template)
		}

		return { text: templateWithFilledInPlaceholders, template }
	}
}