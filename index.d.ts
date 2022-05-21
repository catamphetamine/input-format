// Experimental TypeScript typings.
// https://gitlab.com/catamphetamine/input-format/-/issues/1

export type ParseFunctionResult = string | void;

export interface FormatFunctionResult {
	text: string;
	template: string;
}

export type ParseFunction = (character: string, value: string) => ParseFunctionResult;
export type FormatFunction = (value?: string) => FormatFunctionResult;

export interface ExportedParseFunctionResult {
	value: string;
	caret: number;
}

export interface ExportedFormatFunctionResult {
	text: string;
	caret: number;
}

export function parse(text: string, caretPosition: number, parse: ParseFunction): ExportedParseFunctionResult;
export function format(value: string, caretPosition: number, format: FormatFunction): ExportedFormatFunctionResult;

export function onChange(event: React.ChangeEvent<HTMLInputElement>, input: HTMLInputElement, parseCharacter: ParseFunction, format: FormatFunction, onChangeHandler: (value: string) => void): void;
export function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>, input: HTMLInputElement, parseCharacter: ParseFunction, format: FormatFunction, onChangeHandler: (value: string) => void): void;

export function templateParser(template: string, placeholder: string, parseCharacter: ParseFunction): ParseFunction;
export function templateParser(template: string, parseCharacter: ParseFunction): ParseFunction;
export function templateFormatter(template: string, placeholder?: string, shouldCloseBraces?: boolean): FormatFunction;

export function parseDigit(value: string): string;
