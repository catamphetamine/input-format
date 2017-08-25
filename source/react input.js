import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import Input_controller from './input controller'

// Usage:
//
// <ReactInput
// 	value={this.state.phone}
// 	onChange={phone => this.setState({ phone })}
// 	parse={character => character}
// 	format={value => ({ text: value, template: 'xxxxxxxx' })}/>
//
export default class ReactInput extends React.Component
{
	static propTypes =
	{
		// Parses a single characher of `<input/>` text
		parse  : PropTypes.func.isRequired,

		// Formats `value` into `<input/>` text
		format : PropTypes.func.isRequired,

		// (doesn't work)
		// Custom `<input/>` may be supplied.
		// Can be either a string or a React component class.
		// Cannot be a React "stateless" (function) component.
		inputComponent : PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,

		// `<input/>` `type` attribute
		type : PropTypes.string.isRequired,

		// Is parsed from <input/> text
		value  : PropTypes.string,

		// This handler is called each time `<input/>` text is changed
		onChange : PropTypes.func.isRequired,

		// This `onBlur` interceptor is a workaround for `redux-form`,
		// so that it gets the parsed `value` in its `onBlur` handler,
		// not the formatted text.
		onBlur : PropTypes.func,

		// Passthrough
		onKeyDown : PropTypes.func
	}

	static defaultProps =
	{
		// Render basic `<input/>` component by default
		inputComponent : 'input',

		// `<input/>` `type` attribute
		type : 'text'
	}

	constructor(props)
	{
		super(props)

		const { parse, format, onChange } = this.props

		this.input_controller = new Input_controller(this.get_input_element, parse, format, onChange)
	}

	store_instance = (instance) =>
	{
		this.input = instance
	}

	render()
	{
		const
		{
			value,
			parse,
			format,
			inputComponent,
			...rest
		}
		= this.props

		return React.createElement(inputComponent,
		{
			...rest,
			ref: this.store_instance,
			value: format(is_empty(value) ? '' : value).text,
			onKeyDown: this.on_key_down,
			onChange: this.input_controller.onChange,
			onPaste: this.input_controller.onPaste,
			onCut: this.input_controller.onCut,
			onBlur: this.on_blur
		})
	}

	// Returns <input/> DOM Element
	get_input_element = () =>
	{
		return ReactDOM.findDOMNode(this.input)
	}

	// This handler is a workaround for `redux-form`
	on_blur = (event) =>
	{
		const { onBlur } = this.props

		// This `onBlur` interceptor is a workaround for `redux-form`,
		// so that it gets the right (parsed, not the formatted one)
		// `event.target.value` in its `onBlur` handler.
		if (onBlur)
		{
			const _event =
			{
				...event,
				target:
				{
					...event.target,
					value: this.input_controller.getParsedValue().value
				}
			}

			// For `redux-form` event detection.
			// https://github.com/erikras/redux-form/blob/v5/src/events/isEvent.js
			_event.stopPropagation = event.stopPropagation
			_event.preventDefault  = event.preventDefault

			onBlur(_event)
		}
	}

	on_key_down = (event) =>
	{
		const { onKeyDown } = this.props

		if (onKeyDown)
		{
			onKeyDown(event)
		}

		this.input_controller.onKeyDown(event)
	}

	focus()
	{
		this.get_input_element().focus()
	}
}

function is_empty(value)
{
	return value === undefined || value === null
}