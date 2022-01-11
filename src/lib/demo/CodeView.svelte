<script lang="ts">
	import {createEventDispatcher} from "svelte";
  import { codejar, ICodeJarOptions } from '$lib/_actions/codejar';
	type $$Events = {
		change: CustomEvent<{value: string}>;
	};
	type $$Props = {
		element?: HTMLPreElement;
		class?: string;
		style?: string;
		syntax?: string;
	} & ICodeJarOptions;

	const dispatch = createEventDispatcher();
	export let element: $$Props["element"] = undefined;
	let _class: $$Props["class"] = undefined;
	export let style: $$Props["style"] = undefined;
	export {_class as class};
	export let addClosing: $$Props["addClosing"] = true;
	export let catchTab: $$Props["catchTab"] = true;
	export let history: $$Props["history"] = true;
	export let indentOn: $$Props["indentOn"] = /{$/;
	export let preserveIdent: $$Props["preserveIdent"] = true;
	export let spellcheck: $$Props["spellcheck"] = false;
	export let tab: $$Props["tab"] = "\t";
	export let withLineNumbers: $$Props["withLineNumbers"] = undefined;
	export let highlight: $$Props["highlight"] = undefined;
	export let syntax: $$Props["syntax"] = undefined;
	export let value: $$Props["value"] = "";

  console.log(value);
	function onUpdate(new_value: string): void {
		value = new_value;
		dispatch("change", {value: new_value});
	}
</script>

<!-- prettier-ignore -->
<pre
	bind:this={element}
	class="{syntax ? `language-${syntax}` : ''} {_class ?? ''}"
	style={style ? style : ""}
	use:codejar={{
        addClosing,
        catchTab,
        highlight,
        history,
        indentOn,
        onUpdate,
        preserveIdent,
        spellcheck,
        syntax,
        tab,
        value,
        withLineNumbers
    }}><code class={syntax ? `language-${syntax}` : ''}>{value}</code></pre>

