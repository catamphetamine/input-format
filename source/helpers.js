// Counts all occurences of a symbol in a string
export function count_occurences(symbol, string) {
	let count = 0
	// Using `.split('')` here instead of normal `for ... of`
	// because the importing application doesn't neccessarily include an ES6 polyfill.
	// The `.split('')` approach discards "exotic" UTF-8 characters
	// (the ones consisting of four bytes)
	// but template placeholder characters don't fall into that range
	// so skipping such miscellaneous "exotic" characters
	// won't matter here for just counting placeholder character occurrences.
	for (const character of string.split('')) {
		if (character === symbol) {
			count++
		}
	}
	return count
}