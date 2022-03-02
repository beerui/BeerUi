<script lang="ts">
	import { createEventDispatcher, getContext, setContext } from "svelte";
	import { mapAttributes } from "$lib/utils/beerui";

	const key = getContext("CheckboxKey");
	setContext('CheckboxKey', key);
	const dispatch = createEventDispatcher();
	const initData = getContext(`checkGroupInit_${ key }`);
	// 选中
	export let id = "";
	export let disabled = "";
	export let name = "";
	export let indeterminate: boolean = false;
	export let checked = "";
	export let label = "";
	const _class = ['be-radio']

	export { _class as class };

	$: isChecked = checked === label;

	const handleClick = (evt) => {
		if (disabled) return
		checked = label
		dispatch("change", checked);
	}
</script>
<label class={_class}
       class:is-checked={isChecked}
       class:is-disabled={disabled}
       style={$$props.style}
       on:click|stopPropagation={handleClick}
>
  <span class="be-radio__input"
        class:is-checked={isChecked}
        class:is-disabled={disabled}
        class:is-indeterminate={indeterminate}
  >
    <span class="be-radio__inner"></span>
    <input
	    {...mapAttributes({ disabled, id, name })}
	    type="radio"
	    aria-hidden="false"
	    class="be-radio__original"
    >
  </span>
	<span class="be-radio__label">
	  {#if $$slots.default}
	    <slot />
	  {:else}
	    {label}
	  {/if}
  </span>
</label>
