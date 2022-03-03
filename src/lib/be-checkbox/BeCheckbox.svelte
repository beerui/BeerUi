<script lang='ts'>
	import { createEventDispatcher, getContext } from 'svelte';
	import { mapAttributes } from '$lib/utils/beerui';

	const store = getContext('checkStore')
	const dispatch = createEventDispatcher();
	// 选中
	export let checked: boolean = false;
	export let id = '';
	export let disabled = '';
	export let name = '';
	export let indeterminate: boolean = false;
	export let value = '';
	export let label = '';

	const _class = ['be-checkbox'];

	export { _class as class };

	let isChecked = checked

	// group的时候
	if (store) {
		isChecked = store.isChecked(label)
		const subscribeHandle = () => isChecked = store.isChecked(label)
		store.subscribe.push(subscribeHandle)
	}

	const handleClick = (evt) => {
		dispatch('click', evt);
		if (disabled) return
		// group的时候
		if (store) {
			store.setChecked(label)
			isChecked = store.isChecked(label)
		} else {
			isChecked = !isChecked
			dispatch('change', { label, checked: isChecked });
		}
	};
</script>
<label class={_class}
       style={$$props.style}
       class:is-checked={isChecked}
       class:is-disabled={disabled}
       on:click|preventDefault={handleClick}
>
  <span class='be-checkbox__input'
        class:is-indeterminate={indeterminate}
        class:is-checked={isChecked}
        class:is-disabled={disabled}
  >
    <span class='be-checkbox__inner'></span>
    <input
	    {...mapAttributes({ disabled, id, name, value })}
	    type='checkbox'
	    aria-hidden='false'
	    class='be-checkbox__original'
	    value={label}
    >
  </span>
	<span class='be-checkbox__label'>
		{#if $$slots.default}
			<slot />
		{:else}
		    {label}
		{/if}
  </span>
</label>
