// Counts all occurences of a symbol in a string
export function count_occurences(symbol, string)
{
	let count = 0

	for (let character of string)
	{
		if (character === symbol)
		{
			count++
		}
	}

	return count
}