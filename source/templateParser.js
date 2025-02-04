import { count_occurences } from './helpers.js'

// `placeholder` argument is optional. By default, it's "x".
export default function(template, placeholder, parse) {
	if (typeof placeholder === 'function') {
		parse = placeholder
		placeholder = 'x'
	}

	const placeholdersCountInTemplate = count_occurences(placeholder, template)

	return function(character, value) {
		if (value.length < placeholdersCountInTemplate) {
			return parse(character, value)
		}
	}
}