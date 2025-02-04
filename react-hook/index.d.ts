// Experimental TypeScript typings.
// https://gitlab.com/catamphetamine/input-format/-/issues/1

import type {
	InputHTMLAttributes,
	Ref,
	KeyboardEvent,
	ChangeEvent
} from 'react';

import {
	ParseFunction,
	FormatFunction
} from '../index.d';

type Props<InputComponentProps> = InputComponentProps & {
	parse: ParseFunction;
	format: FormatFunction;
	onChange?(value?: string): void;
	onKeyDown?(value?: string): void;
};

type ControlledProps<InputComponentProps> = Props<InputComponentProps> & {
	value?: string;
	controlled?: true;
};

type UncontrolledProps<InputComponentProps> = Props<InputComponentProps> & {
	defaultValue?: string;
	controlled: false;
};

type CommonOutputProps = {
	// https://miroslavpetrik.medium.com/how-to-type-the-ref-prop-in-typescript-react-c0fffe939288
	ref: Ref<HTMLInputElement>;
	onChange(event: ChangeEvent<HTMLInputElement>): void;
	onKeyDown(event: KeyboardEvent<HTMLInputElement>): void;
};

export function useInput<InputComponentProps = InputHTMLAttributes<HTMLInputElement>>(props: ControlledProps<InputComponentProps>): InputComponentProps & CommonOutputProps & {
	value: string;
};

export function useInput<InputComponentProps = InputHTMLAttributes<HTMLInputElement>>(props: UncontrolledProps<InputComponentProps>): InputComponentProps & CommonOutputProps & {
	defaultValue?: string;
};
