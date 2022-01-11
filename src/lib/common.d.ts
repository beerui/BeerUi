export interface TabItem {
	key: string,
	label: string
}
export interface DragItem {
	key: string,
	label: string
}
export type IOptions = {
	// SOURCE: https://github.com/antonmedv/codejar/blob/59da1f959f95ae2315ca26f98fe7da05b8c04d1b/codejar.ts#L3-L12
	tab: string;
	indentOn: RegExp;
	spellcheck: boolean;
	catchTab: boolean;
	preserveIdent: boolean;
	addClosing: boolean;
	history: boolean;
	window: typeof window;
};

export type IHighlightElement = (element: HTMLElement) => void;
