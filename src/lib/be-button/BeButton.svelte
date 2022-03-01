<script lang="ts">
  import { filterClass } from "$lib/utils/beerui";

  export let style = null;
  export let nativeType = "button";

  const preClass = ["type", "size", "round", "loading", "disabled"];
  const _class = ["be-button", ...filterClass($$props, "be-button--", preClass)].join(" ");
</script>
<button
	class={_class}
	{style}
	on:click
	on:contextmenu
	on:dblclick
	on:focusin
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
	type={nativeType}
>
	<span>
			<slot></slot>
	</span>
</button>
