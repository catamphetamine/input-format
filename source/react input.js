import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

import Input_controller from './input'

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
		// Parses <input/> text into a `value`
		parse  : PropTypes.func.isRequired,

		// Formats `value` into <input/> text
		format : PropTypes.func.isRequired,

		// Is parsed from <input/> text
		value  : PropTypes.string,

		// This handler is called each time <input/> text is changed
		onChange : PropTypes.func.isRequired,

		// This `onBlur` interceptor is a workaround for `redux-form`,
		// so that it gets the parsed `value` in its `onBlur` handler,
		// not the formatted text.
		onBlur : PropTypes.func
	}

	constructor(props)
	{
		super()

		this.on_blur           = this.on_blur.bind(this)
		this.get_input_element = this.get_input_element.bind(this)

		this.input_controller = new Input_controller(this.get_input_element, props.parse, props.format, props.onChange)
	}

	render()
	{
		const { value, format, ...rest } = this.props

		return (
			<input
				{...rest}
				ref={ ref => this.input = ref }
				value={ value === undefined ? '' : format(value).text }
				onKeyDown={this.input_controller.onKeyDown}
				onChange={this.input_controller.onChange}
				onPaste={this.input_controller.onPaste}
				onCut={this.input_controller.onCut}
				onBlur={this.on_blur}/>
		)
	}

	// Returns <input/> DOM Element
	get_input_element()
	{
		return ReactDOM.findDOMNode(this.input)
	}

	// This handler is a workaround for `redux-form`
	on_blur(event)
	{
		const { onBlur } = this.props

		// This `onBlur` interceptor is a workaround for `redux-form`,
		// so that it gets a parsed `value` in its `onBlur` handler,
		// not the formatted one.
		if (onBlur)
		{
			onBlur(parse(this.get_input_element().value, undefined, this.props.parse))
		}
	}
}