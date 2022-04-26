<script lang="ts">
  import { filterClass } from "$lib/utils/beerui";

  export let style = null;
  export let nativeType = "button";
  export let disabled = false;
	export let circle = false;
	export let round = false;

  const preClass = ["type", "size", "round", "loading"];
  const _class = ["be-button",...filterClass($$props, "be-button--", preClass)].join(" ");
</script>
<button
	class={_class}
	class:is-circle={circle}
	class:is-round={round}
	{style}
	on:click
	on:contextmenu
	on:dblclick
	on:focusin
	on:mousedown
	on:mouseup
	on:focusout
	on:keydown
	on:keyup
	on:pointercancel
	on:pointerdown
	on:pointerenter
	on:pointerleave
	on:pointermove
	on:pointerout
	on:pointerup
	on:input
	class:is-disabled={disabled}
	{disabled}
	type={nativeType}
>
	<span>
		<slot></slot>
	</span>
</button>
