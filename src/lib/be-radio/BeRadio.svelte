<script lang="ts">
	import { createEventDispatcher, getContext } from "svelte";
	import { mapAttributes } from "$lib/utils/beerui";

	const store = getContext("radioStore");
	const dispatch = createEventDispatcher();
	// 选中
	export let id = "";
	export let disabled = "";
	export let name = "";
	export let checked = "";
	export let label = "";

	let _class: $$props["class"] = "";
	export {_class as class};

	let isChecked: boolean;

	if (store) {
		isChecked = store.isChecked(label)
		const subscribeHandle = () => isChecked = store.isChecked(label)
		store.subscribe.push(subscribeHandle)
	}
	$: {
		if (!store) isChecked = checked === label
	}
	const handleClick = (evt) => {
		dispatch('click', evt);
		if (disabled) return
		// group的时候
		if (store) {
			store.setChecked(label)
			isChecked = store.isChecked(label)
		} else {
			checked = label
			dispatch("change", checked);
		}
	}
</script>
<div class='be-radio {_class}'
       class:is-checked={isChecked}
       class:is-disabled={disabled}
       style={$$props.style}
       on:click|stopPropagation={handleClick}
>
  <span class="be-radio__input"
        class:is-checked={isChecked}
        class:is-disabled={disabled}
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
</div>
