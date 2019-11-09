import React from 'react'
import PropTypes from 'prop-types'

import _parse from './parse'

import
{
	onChange,
	onCut,
	onPaste,
	onKeyDown
}
from './input control'

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
		// Parses a single characher of `<input/>` text.
		parse  : PropTypes.func.isRequired,

		// Formats `value` into `<input/>` text.
		format : PropTypes.func.isRequired,

		// Renders `<input/>` by default.
		inputComponent : PropTypes.elementType.isRequired,

		// `<input/>` `type` attribute.
		type : PropTypes.string.isRequired,

		// Is parsed from <input/> text.
		value  : PropTypes.string,

		// This handler is called each time `<input/>` text is changed.
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
		// Renders `<input/>` by default.
		inputComponent : 'input',

		// `<input/>` `type` attribute.
		type : 'text'
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

		// Non-string `inputComponent`s would work in this case
		// but it would also introduce a caret reset bug:
		// the caret position would reset on each input.
		// The origins of this bug are unknown, they may be
		// somehow related to the `ref` property
		// being intercepted by React here.
		return React.createElement(inputComponent,
		{
			...rest,
			ref       : this.storeInstance,
			value     : format(isEmpty(value) ? '' : value).text,
			onKeyDown : this.onKeyDown,
			onChange  : this.onChange,
			onPaste   : this.onPaste,
			onCut     : this.onCut,
			onBlur    : this.onBlur
		})
	}

	storeInstance = (instance) =>
	{
		this.input = instance
	}

	/**
	 * Returns `<input/>` DOM Element.
	 * @return {DOMElement}
	 */
	getInputElement = () =>
	{
		return this.input
	}

	onChange = (event) =>
	{
		const
		{
			parse,
			format
		}
		= this.props

		return onChange
		(
			event,
			this.getInputElement(),
			parse,
			format,
			this.props.onChange
		)
	}

	onPaste = (event) =>
	{
		const
		{
			parse,
			format
		}
		= this.props

		return onPaste
		(
			event,
			this.getInputElement(),
			parse,
			format,
			this.props.onChange
		)
	}

	onCut = (event) =>
	{
		const
		{
			parse,
			format
		}
		= this.props

		return onCut
		(
			event,
			this.getInputElement(),
			parse,
			format,
			this.props.onChange
		)
	}

	// This handler is a workaround for `redux-form`.
	onBlur = (event) =>
	{
		const { parse, onBlur } = this.props

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
					value: _parse(this.getInputElement().value, undefined, parse).value
				}
			}

			// For `redux-form` event detection.
			// https://github.com/erikras/redux-form/blob/v5/src/events/isEvent.js
			_event.stopPropagation = event.stopPropagation
			_event.preventDefault  = event.preventDefault

			onBlur(_event)
		}
	}

	onKeyDown = (event) =>
	{
		const
		{
			parse,
			format
		}
		= this.props

		if (this.props.onKeyDown)
		{
			this.props.onKeyDown(event)
		}

		return onKeyDown
		(
			event,
			this.getInputElement(),
			parse,
			format,
			this.props.onChange
		)
	}

	/**
	 * Focuses the `<input/>`.
	 * Can be called manually.
	 */
	focus()
	{
		this.getInputElement().focus()
	}
}

function isEmpty(value)
{
	return value === undefined || value === null
}