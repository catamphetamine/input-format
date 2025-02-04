import { useCallback, useRef } from 'react'

import {
	onChange as onInputChange,
	onKeyDown as onInputKeyDown
} from '../inputControl.js'

export default function useInput({
	ref,
	parse,
	format,
	value,
	defaultValue,
	controlled = true,
	onChange,
	onKeyDown,
	...rest
}) {
	// It doesn't seem to be required to alert a developer about controlled/uncontrolled misuse:
	// if `controlled` is `true` then `defaultValue` is simply ignored.
	//
	// if (defaultValue && controlled) {
	// 	console.error('[input-format] You\'ve passed both `defaultValue` and `controlled: true` properties which is an invalid use case')
	// }

	const internalRef = useRef()
	const setRef = useCallback((instance) => {
		internalRef.current = instance
		if (ref) {
			if (typeof ref === 'function') {
				ref(instance)
			} else {
				ref.current = instance
			}
		}
	}, [ref])

	const _onChange = useCallback((event) => {
		return onInputChange(
			event,
			internalRef.current,
			parse,
			format,
			onChange
		)
	}, [
		internalRef,
		parse,
		format,
		onChange
	])

	const _onKeyDown = useCallback((event) => {
		if (onKeyDown) {
			onKeyDown(event)
		}
		// If `onKeyDown()` handler above has called `event.preventDefault()`
		// then ignore this `keydown` event.
		if (event.defaultPrevented) {
			return
		}
		return onInputKeyDown(
			event,
			internalRef.current,
			parse,
			format,
			onChange
		)
	}, [
		internalRef,
		parse,
		format,
		onChange,
		onKeyDown
	])

	const commonProps = {
		...rest,
		ref: setRef,
		onChange: _onChange,
		onKeyDown: _onKeyDown
	}

	if (controlled) {
		return {
			...commonProps,
			value: format(isEmptyValue(value) ? '' : value).text
		}
	}

	return {
		...commonProps,
		defaultValue: format(isEmptyValue(defaultValue) ? '' : defaultValue).text
	}
}

function isEmptyValue(value) {
	return value === undefined || value === null
}