import { count_occurences } from './helpers'

export default function close_braces(retained_template, template, placeholder = 'x', empty_placeholder = ' ')
{
	let cut_before = retained_template.length

	const opening_braces = count_occurences('(', retained_template)
	const closing_braces = count_occurences(')', retained_template)

	let dangling_braces = opening_braces - closing_braces

	while (dangling_braces > 0 && cut_before < template.length)
	{
		retained_template += template[cut_before].replace(placeholder, empty_placeholder)

		if (template[cut_before] === ')')
		{
			dangling_braces--
		}

		cut_before++
	}

	return retained_template
}
