// This is just `./ReactInput.js` rewritten in Hooks.

import React, { useCallback, useRef } from 'react'
import PropTypes from 'prop-types'

import {
	onChange as onInputChange,
	onCut as onInputCut,
	onPaste as onInputPaste,
	onKeyDown as onInputKeyDown
} from '../input control'

// Usage:
//
// <ReactInput
// 	value={this.state.phone}
// 	onChange={phone => this.setState({ phone })}
// 	parse={character => character}
// 	format={value => ({ text: value, template: 'xxxxxxxx' })}/>
//
function Input({
	value,
	parse,
	format,
	inputComponent: InputComponent,
	onChange,
	onCut,
	onPaste,
	onKeyDown,
	...rest
}, ref) {
	const ownRef = useRef()
	ref = ref || ownRef
	const _onChange = useCallback((event) => {
		return onInputChange(
			event,
			ref.current,
			parse,
			format,
			onChange
		)
	}, [ref, parse, format, onChange])

	const _onPaste = useCallback((event) => {
		if (onPaste) {
			onPaste(event)
		}
		return onInputPaste(
			event,
			ref.current,
			parse,
			format,
			onChange
		)
	}, [ref, parse, format, onChange, onPaste])

	const _onCut = useCallback((event) => {
		if (onCut) {
			onCut(event)
		}
		return onInputCut(
			event,
			ref.current,
			parse,
			format,
			onChange
		)
	}, [ref, parse, format, onChange, onCut])

	const _onKeyDown = useCallback((event) => {
		if (onKeyDown) {
			onKeyDown(event)
		}
		return onInputKeyDown(
			event,
			ref.current,
			parse,
			format,
			onChange
		)
	}, [ref, parse, format, onChange, onKeyDown])

	return (
		<InputComponent
			{...rest}
			ref={ref}
			value={format(isEmptyValue(value) ? '' : value).text}
			onKeyDown={_onKeyDown}
			onChange={_onChange}
			onPaste={_onPaste}
			onCut={_onCut} />
	)
}

Input = React.forwardRef(Input)

Input.propTypes = {
	// Parses a single characher of `<input/>` text.
	parse: PropTypes.func.isRequired,

	// Formats `value` into `<input/>` text.
	format: PropTypes.func.isRequired,

	// Renders `<input/>` by default.
	inputComponent: PropTypes.elementType.isRequired,

	// `<input/>` `type` attribute.
	type: PropTypes.string.isRequired,

	// Is parsed from <input/> text.
	value: PropTypes.string,

	// This handler is called each time `<input/>` text is changed.
	onChange: PropTypes.func.isRequired,

	// Passthrough
	onKeyDown: PropTypes.func,
	onCut: PropTypes.func,
	onPaste: PropTypes.func
}

Input.defaultProps = {
	// Renders `<input/>` by default.
	inputComponent: 'input',

	// `<input/>` `type` attribute.
	type: 'text'
}

export default Input

function isEmptyValue(value) {
	return value === undefined || value === null
}