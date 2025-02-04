// This is just `./ReactInput.js` rewritten in Hooks.

import React from 'react'
import PropTypes from 'prop-types'

import useInput from './useInput.js'

// Usage:
//
// <ReactInput
// 	value={this.state.phone}
// 	onChange={phone => this.setState({ phone })}
// 	parse={character => character}
// 	format={value => ({ text: value, template: 'xxxxxxxx' })}/>
//
function Input({
	inputComponent: InputComponent = 'input',
	parse,
	format,
	value,
	defaultValue,
	onChange,
	controlled,
	onKeyDown,
	// `<input/>` `type` attribute.
	type = 'text',
	...rest
}, ref) {
	const inputProps = useInput({
		ref,
		parse,
		format,
		value,
		defaultValue,
		onChange,
		controlled,
		onKeyDown,
		type,
		...rest
	})

	return (
		<InputComponent {...inputProps}/>
	)
}

Input = React.forwardRef(Input)

Input.propTypes = {
	// Parses a single characher of `<input/>` text.
	parse: PropTypes.func.isRequired,

	// Formats `value` into `<input/>` text.
	format: PropTypes.func.isRequired,

	// Renders `<input/>` by default.
	inputComponent: PropTypes.elementType,

	// `<input/>` `type` attribute.
	type: PropTypes.string,

	// Is parsed from <input/> text.
	value: PropTypes.string,

	// An initial value for an "uncontrolled" <input/>.
	defaultValue: PropTypes.string,

	// This handler is called each time `<input/>` text is changed.
	onChange: PropTypes.func,

	// Whether this input should be "controlled" or "uncontrolled".
	// The default value is `true` meaning "uncontrolled".
	controlled: PropTypes.bool,

	// Passthrough
	onKeyDown: PropTypes.func,
	onCut: PropTypes.func,
	onPaste: PropTypes.func
}

export default Input