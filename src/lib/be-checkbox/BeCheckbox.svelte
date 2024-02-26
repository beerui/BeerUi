<script lang='ts'>
	import { createEventDispatcher, getContext, tick } from 'svelte';
	import { mapAttributes } from '$lib/utils/beerui';

	const store = getContext('checkStore')
	const dispatch = createEventDispatcher();
	// 选中
	export let checked = false;
	export let id = '';
	export let disabled = '';
	export let name = '';
	export let indeterminate = false;
	export let validateEvent = true; // 是否发送验证表单
	export let label = '';

	const _class = ['be-checkbox'];

	export { _class as class };

	// group的时候
	if (store) {
		checked = store.isChecked(label)
		const subscribeHandle = () => checked = store.isChecked(label)
		store.subscribe.push(subscribeHandle)
	}

	const handleClick = (evt) => {
		dispatch('click', { label, checked: checked });
		if (disabled) return
		// group的时候
		if (store) {
			store.setChecked(label)
			checked = store.isChecked(label)
		} else {
			checked = !checked
			dispatch('change', { label, checked: checked });
		}
	};
	// 表单验证
	const ctx = getContext('BeFormItem')
	let prop = '' // name
	let isInit = false

	if (ctx) {
		ctx.propWatch.subscribe(value => prop = value)
	}

	const watchValue = (checked) => {
		if (ctx && prop && isInit && validateEvent) {
			ctx.FormItemEventCallback({ type: 'change', value: [checked] })
		}
	}
	$: watchValue(checked)
	tick().then(() => {
		isInit = true;
	})
</script>
<div
	role='checkbox'
	tabindex='-1'
 	aria-checked={checked}
	class={_class}
	style={$$props.style}
	class:is-checked={checked}
	class:is-disabled={disabled}
	on:click|preventDefault={handleClick}
	on:keydown|preventDefault
>
  <span class='be-checkbox__input'
        class:is-indeterminate={indeterminate}
        class:is-checked={checked}
        class:is-disabled={disabled}
  >
    <span class='be-checkbox__inner'></span>
    <input
	    {...mapAttributes({ disabled, id, name })}
	    type='checkbox'
			tabindex='-1'
			aria-checked={checked}
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
</div>
