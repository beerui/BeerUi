<script lang="ts">
	import { createEventDispatcher, getContext, tick } from 'svelte';
	import { mapAttributes } from "$lib/utils/beerui";

	const store = getContext("radioStore");
	const dispatch = createEventDispatcher();
	// 选中
	export let id = "";
	export let disabled = "";
	export let name = "";
	export let checked = "";
	export let label = "";
	export let border = false;
	export let size = '';
	export let validateEvent = true; // 是否发送验证表单

	let _class: $$props["class"] = "";
	export {_class as class};

	let isChecked: boolean;

	let textColor
	let fill
	if (store) {
		isChecked = store.isChecked(label)
		const subscribeHandle = () => isChecked = store.isChecked(label)
		store.subscribe.push(subscribeHandle)
		if (store.size !== undefined) size = store.size
		if (store.border !== undefined) border = store.border
		if (store.disabled !== undefined) disabled = store.disabled
		if (store.textColor !== undefined) textColor = store.textColor
		if (store.fill !== undefined) fill = store.fill
	}
	$: if (!store) isChecked = checked === label

	// 表单验证
	const ctx = getContext('BeFormItem')
	let prop = '' // name
	let isInit = false
	if (ctx) {
		ctx.propWatch.subscribe(value => prop = value)
	}

	const watchValue = (value) => {
		if (ctx && prop && isInit && validateEvent) {
			ctx.FormItemEventCallback({ type: 'change', value: [value] })
		}
	}
	$: watchValue(checked)
	tick().then(() => {
		isInit = true;
	})

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
     class:is-bordered={border}
     class:be-radio--medium={size === 'medium'}
     class:be-radio--small={size === 'small'}
     class:be-radio--mini={size === 'mini'}
		 style={$$props.style}
     style:background-color={isChecked ? fill : ''}
		 on:click|stopPropagation={handleClick}
		 on:keydown|stopPropagation
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
	<span class="be-radio__label" style:color={isChecked ? textColor : ''}>
	  {#if $$slots.default}
	    <slot />
	  {:else}
	    {label}
	  {/if}
  </span>
</div>
