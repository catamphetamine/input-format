// Experimental TypeScript typings.
// https://gitlab.com/catamphetamine/input-format/-/issues/1

import * as React from 'react';

import {
	ParseFunction,
	FormatFunction
} from '../index.d';

type InputComponent<InputComponentProps> = (props: InputComponentProps) => JSX.Element;

type DefaultInputComponentProps = React.InputHTMLAttributes<HTMLInputElement>

type Props<InputComponentProps> = InputComponentProps & {
	value?: string;
	parse: ParseFunction;
	format: FormatFunction;
	type?: string;
	inputComponent?: InputComponent<InputComponentProps>;
	onChange?(value?: string): void;
	onKeyDown?(value?: string): void;
};

// React TypeScript Cheatsheet doesn't recommend using React.FunctionalComponent.
// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components
// declare const ReactInput: React.FC<Props>;

type ReactInputComponent<InputComponentProps = DefaultInputComponentProps> = (props: Props<InputComponentProps>) => JSX.Element;

declare const ReactInput: ReactInputComponent;

export default ReactInput;
