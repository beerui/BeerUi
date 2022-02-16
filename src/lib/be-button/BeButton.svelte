<script lang="ts">
  import { filterClass } from "$lib/utils/beerui";

  export let style = null;
  export let type = "";
  export let size = "";
  export let round = "";
  export let nativeType = "button";
  export let autofocus = false;
  export let disabled = false;
  export let loading = false;
  export let icon = "";

  const preClass = ["type", "size", "round", "loading", "disabled"];
  const _class = ["be-button", ...filterClass($$props, "be-button--", preClass)].join(" ");
</script>
<button
	{autofocus}
	class={_class}
	{style}
	on:click
	on:dblclick
	on:focusin
	on:focusout
	on:keydown
	on:keyup
	type={nativeType}
>
	<span>
			<slot></slot>
	</span>
</button>
