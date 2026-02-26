# input-format

[![npm version](https://img.shields.io/npm/v/input-format.svg?style=flat-square)](https://www.npmjs.com/package/input-format)
[![npm downloads](https://img.shields.io/npm/dm/input-format.svg?style=flat-square)](https://www.npmjs.com/package/input-format)
[![coverage](https://img.shields.io/coveralls/catamphetamine/input-format/master.svg?style=flat-square)](https://coveralls.io/r/catamphetamine/input-format?branch=master)

Formatting user's text input on-the-fly

[See Demo](https://catamphetamine.gitlab.io/input-format/)

## GitHub Ban

On March 9th, 2020, GitHub, Inc. silently [banned](https://medium.com/@catamphetamine/how-github-blocked-me-and-all-my-libraries-c32c61f061d3) my account (and all my libraries) without any notice for an unknown reason. I opened a support ticked but they didn't answer. Because of that, I had to move all my libraries to [GitLab](https://gitlab.com/catamphetamine).

## Install

```
npm install input-format --save
```

## Concept

`input-format` operates on two representations of the same "value":
* A "parsed" value
* A "formatted" value

An example could be a phone number:
* A "parsed" phone number is `"2133734253"`
* A "formatted" phone number is `"(213) 373-4253"`

When a user inputs any text into the input field, that text gets "parsed" in order to get the "parsed" `value`. After that, the "parsed" `value` is "formatted" again in order to force the input field text to adhere to that specific format.

For example, consider a user that inputs `"213-373-42-53"` into the input field. That text gets "parsed" into `value: "2133734253"`. One could notice that while the "parsed" `value` is correct, the input text itself has incorrect "format", which should be fixed. So the `value` gets "formatted" using the proper format, and the resulting string `"(213) 373-4253"` is set as the input field value. This is how "parse" and "format" functions work together and are two sides of the same coin.

## Usage

Start by defining `parse()` and `format()` functions:

* `parse()` will be called for each character in the input string and its job is to "parse" each such individual character, i.e. to filter out any "punctuation". After "parsing" each individual character, `input-format` will concatenate those parsed characters into a combined "parsed" string and will set the `value` to that string.
  * For example, when "parsing" a phone number input text `"(213) 373-4253"`, the `parse()` function would filter out any non-digit characters — `return isDigit(char) ? char : ""` — resulting in a combined "parsed" string `"2133734253"`.
* `format()` function transforms the "parsed" value back into a "formatted" string. It should return an object of shape: `{ value: string, template: string }`, where `value: string` is a "formatted" string and `template: string` is the template that was used for "formatting".
  * For example, when "formatting" a phone number, the `format()` function would transform a "parsed" value `"2133734253"` into a "formatted" value `"(213) 373-4253"`.

The ability to provide custom `parse()` and `format()` functions provides a degree of flexibility for this input component. However, the most common use case would still be "masked input" where the input value must adhere to a certain pre-defined "template". To support this common case, the package exports two utility functions that create `parse()` and `format()` functions from just a custom template string:

* `templateParser(template, parseCharacter)` creates a `parse()` function for a given `template` string.
  * Arguments:
    * `template: string` — A template string with `"x"` character used as a placeholder. Example: `"(xxx) xxx-xxxx"`.
    * `parseCharacter: (string) => string` — Parses a single input character. Basically, this is the `parse()` function itself, in which case one could ask: "What's the point of calling `templateParser()` to get the `parse()` function when the `parse()` function is already known?". The answer would be: "The `parse()` function returned from `templateParser()` function has a correct maximum character limit that is derived from the template string".
      * For example, in case of a phone number input, the `parseCharacter()` function should only leave the digits and ignore any "punctuation", so it could look like `return isDigit(char) ? char : ""`.
* `templateFormatter(template)` creates a `format()` function for a given `template` string.

An example of getting `parse()` and `format()` functions for a US phone number input:

```js
import { templateParser, templateFormatter, parseDigit } from 'input-format'

// US phone number template
const TEMPLATE = '(xxx) xxx-xxxx'

// `parse` function parses input text characters one-by-one.
//
// `function parse(character, value, context) { return character }`
//
// Arguments:
//  * `character` is the currently parsed input text character.
//  * `value` is the parsed value so far.
//  * `context` is just a utility empty object that is shared within the bounds
//    of parsing a single input string. The `parse()` function could
//    use that object to store any kind of "flags" in it in order to alter
//    its behavior based when parsing next characters within the same string.
//    Or it could completely ignore it.
//
// Returns:
//  * If it returns anything (not `undefined`) then it is appended to the `value`
//
// `parseDigit` is an exported helper `parse` function
// that returns `character` if it's a digit
// (a common case, e.g. phone numbers input).
//
// `templateParser` wrapper is a small helper
// which enhances `parse` function to limit `value` max length
// to the number of "x"-es in the template.
//
const parse = templateParser(TEMPLATE, parseDigit)

// `format` function formats parsed value.
//
// function format(value) { return { text: '(800) 555-3535', template: '(xxx) xxx-xxxx' } }
//
// Arguments:
//  * `value` is the parsed value to be formatted.
//
// Returns `{ text, template }`, where:
//  * `text` is the formatted text
//  * `template` is the template used to format the `text`
//    (can be a partial template or a full template)
//
// If the `value` couldn't be formatted then
// `format()` should just return `undefined`.
//
// `templateFormatter` helper creates a formatter based on a template.
//
const format = templateFormatter(TEMPLATE)
```

Having `parse()` and `format()` functions, one could use them to render the actual input component.

### React Hook

```js
import { useInput } from 'input-format/react-hook'

const [phone, setPhone] = useState('2133734253')

// Returns "controlled" `<input/>` `props`.
const inputProps = useInput({
  value: phone,
  onChange: setPhone,
  parse: templateParser("(xxx) xxx-xxxx", parseDigit),
  format: templateFormatter("(xxx) xxx-xxxx")
})

// Outputs "(213) 373-4253"
<input type="tel" {...inputProps}/>
```

`useInput()` hook parameters:

* `ref` — An optional `ref`. Supports both `setRef(element)` functions and `useRef()` objects.
* `value: string?` — "Parsed" value. Can be `undefined` or `null`.
* `onChange(value: string?)` — Will be called when a new value is "parsed". Also note that it should be a function of `value` rather than a function of `event`.
* `parse()` — A `parse()` function.
* `format()` — A `format()` function.

`useInput()` hook returns `<input/>` props:

* `ref` — Specifically, a `setRef(element)` function.
* `value: string`
* `onChange(event: Event)`
* `onKeyDown(event: Event)`

By default, `useInput()` hook works in "controlled" mode. It could be changed to "uncontrolled" mode, if required. In that case, pass slightly different parameters to the hook:

* `value: string?` — Don't pass this parameter.
* `defaultValue: string?` — (optional) Pass this parameter to specify the initial `value`.
* `controlled: boolean?` — Pass `false` as the value for this parameter.

The `<input/>` props returned from `useInput()` hook in "uncontrolled" mode will also be slightly different:

* `value: string` — This property won't be present.
* `defaultValue: string` — This property will be present.

### React

The React component is simply a wrapper around `useInput()` hook described above.

```js
import ReactInput from 'input-format/react'

const [phone, setPhone] = useState('2133734253')

// Renders a "controlled" `<input/>.
<ReactInput
  value={phone}
  onChange={setPhone}
  parse={templateParser("(xxx) xxx-xxxx", parseDigit)}
  format={templateFormatter("(xxx) xxx-xxxx")}
/>

// Outputs "(213) 373-4253"
{phone}
```

P.S. Note that the `onChange()` property of the `<ReactInput/>` component should be a function of `value`, not a function of `event`.

### DOM

```js
import {
  onChange,
  onKeyDown
} from 'input-format'

// `parse()` and `format()` functions should be defined.
const parse = ...
const format = ...

// Get the `<input/>` element.
const input = document.querySelector('input')

// Get notified when the `<input/>` value changes.
const onChangeListener = (value) => {
  console.log('Value has changed:', value)
}

// Add "onchange" listener to the `<input/>` element.
input.addEventListener('change', (event) => {
  onChange(event, input, parse, format, onChangeListener)
})

// Add "onkeydown" listener to the `<input/>` element.
input.addEventListener('keydown', (event) => {
  onKeyDown(event, input, parse, format, onChangeListener)
})
```

## Low-level API

This is an example of using "low-level API" — the exported `parse()` and `format()` functions themselves — by calling them directly rather than passing them to one of the package's "high-level API" (DOM or React). For example, this "low-level API" could be used to create a new "high-level API" for some new DOM framework, or to implement an input component for a non-DOM environment.

```js
import { parse, format } from 'input-format'

// Input character parser for `parse()`.
//
// `context` argument is just a utility empty object that is shared within the bounds
// of parsing a single input string. The `_parse()` function could use that object
// to store any kind of "flags" in it in order to alter its behavior based when
// parsing next characters within the same string. Or it could completely ignore it.
//
function _parse(character, value, context) {
  if (value.length < 10) {
    if (character >= '0' && character <= '9') {
      return character
    }
  }
}

// Output text formatter for `format()`.
function _format(value) {
  ...
  // Just as an example of a return value
  return {
    text: '(800) 555-3535',
    template: '(xxx) xxx-xxxx'
  }
}

// Testing.

let value
let text = '(800) 555-3535'
let caret = 4 // before the first zero

// `parse()`.

{ value, caret } = parse(text, caret, _parse)

value === '8005553535'
caret === 2

// `format()`.

{ text, caret } = format(value, caret, _format)

value === '(800) 555-3535'
caret === 4
```

<!--
## Android

There have been some [reports](https://github.com/catamphetamine/input-format/issues/2) of some Android devices not positioning the caret correctly. A workaround has been added for that. In case of any issues with Android devices, report them to the aforementioned issue.
-->

## Contributing

After cloning this repo, ensure dependencies are installed by running:

```sh
npm install
```

This module is written in ES6 and uses [Babel](http://babeljs.io/) for ES5
transpilation. Widely consumable JavaScript can be produced by running:

```sh
npm run build
```

Once `npm run build` has run, you may `import` or `require()` directly from
node.

After developing, the full test suite can be evaluated by running:

```sh
npm test
```

When you're ready to test your new functionality on a real project, you can run

```sh
npm pack
```

It will `build`, `test` and then create a `.tgz` archive which you can then install in your project folder

```sh
npm install [module name with version].tar.gz
```

## License

[MIT](LICENSE)