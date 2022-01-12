import {CodeJar} from "codejar";
import 'highlight.js/styles/default.css';
import hljs from 'highlight.js';
import {withLineNumbers as _withLineNumbers} from "codejar/linenumbers";

import type {IHighlightElement, IOptions} from "$lib/common";

import type {IActionHandle} from "./actions";

export type ICodeJarAction = IActionHandle;

export type IHighlightCode = (code: string, syntax?: string) => string;

export interface ICodeJarOptions extends Partial<IOptions> {
	highlight?: IHighlightCode;

	onUpdate?: (value: string) => void;

	syntax?: string;

	withLineNumbers?: boolean;

	value: string;
}

export function codejar(element: HTMLElement, options: ICodeJarOptions): ICodeJarAction {
	let {highlight, onUpdate, syntax, value, withLineNumbers = false, ...extendedOptions} = options;

	let jar = CodeJar(element, wrapHighlight(highlight), extendedOptions);

	function destroy() {
		jar.destroy();

		const wrap = element.parentElement as HTMLDivElement | null;
		if (wrap && wrap.classList.contains("codejar-wrap")) {
			const parent = wrap.parentElement as HTMLElement;
			element.style.padding = "";

			parent.appendChild(element);
			wrap.remove();
		}
	}

	function onInput(event: Event): void {
		if (onUpdate) onUpdate(jar.toString());
	}

	function wrapHighlight(highlight?: IHighlightCode): IHighlightElement {
		const _highlight = highlight
			? (element: HTMLElement) => {
				element.innerHTML = highlight(element.textContent ?? "", syntax);
			}
			: (element: HTMLElement) => void 0;

		return withLineNumbers ? _withLineNumbers(_highlight) : _highlight;
	}

	element.addEventListener("input", onInput);
	return {
		destroy() {
			destroy();
			element.removeEventListener("input", onInput);
		},

		update(newOptions) {
			({
				highlight,
				onUpdate,
				syntax,
				value,
				withLineNumbers = false,
				...extendedOptions
			} = newOptions);

			if (options.highlight !== highlight || options.withLineNumbers !== withLineNumbers) {
				destroy();
				jar = CodeJar(element, wrapHighlight(highlight), options);
			} else jar.updateOptions(extendedOptions);

			if (value !== jar.toString()) jar.updateCode(value);
			options = {highlight, value, withLineNumbers, ...extendedOptions};
		},
	};
}
