# input-format

[![NPM Version][npm-badge]][npm]
[![Build Status][travis-badge]][travis]
[![Test Coverage][coveralls-badge]][coveralls]

Formatting user's text input on-the-fly

## Installation

```
npm install input-format --save
```

## Usage

Phone number formatting example

```js
import { templateFormatter } from 'input-format'

// Parses input text characters one-by-one.
// `character` is the currently parsed input text character.
// `value` is the parsed value so far.
//
const parse = (character, value) =>
{
  if (character >= '0' && character <= '9')
  {
    return character
  }
}

// Formats phone number digits using a template.
// Can also be a function of `value` returning `{ text, template }`.
const format = 'x (xxx) xxx-xx-xx'
```

React Component usage

```js
import { ReactInput } from 'input-format'

<ReactInput
  value={this.state.phone}
  onChange={phone => this.setState({ phone })}
  parse={parse}
  format={format}/>
```

Low level API (for component developers)

```js
import { InputController } from 'input-format'

const input = document.querySelector('input')

const inputController = new InputController(input, parse, format, onChange)

inputController.onCut(event)
inputController.onPaste(event)
inputController.onChange(event)
inputController.onKeyDown(event)
```

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
[npm]: https://www.npmjs.org/package/input-format
[npm-badge]: https://img.shields.io/npm/v/input-format.svg?style=flat-square
[travis]: https://travis-ci.org/halt-hammerzeit/input-format
[travis-badge]: https://img.shields.io/travis/halt-hammerzeit/input-format/master.svg?style=flat-square
[coveralls]: https://coveralls.io/r/halt-hammerzeit/input-format?branch=master
[coveralls-badge]: https://img.shields.io/coveralls/halt-hammerzeit/input-format/master.svg?style=flat-square
