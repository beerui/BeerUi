<script lang='ts'>
	import { createEventDispatcher, getContext, tick } from 'svelte';

	export let value: string | number = '';
	export let placeholder = '';
	export let readonly = false;
	export let disabled = false;
	export let maxlength: string | number = '';
	export let validateEvent = true; // 是否发送验证表单

	let instance = null

	let dispatch = createEventDispatcher();
	// 设置焦点
	export const setBlur = () => instance.focus()
	// 仅在输入框失去焦点或用户按下回车时触发
	const blur = () => {
		dispatch('blur', value);
		if (ctx && prop && isInit && validateEvent) {
			ctx.FormItemEventCallback({ type: 'blur', value: [value] })
		}
	}
	let _class: $$props['class'] = '';
	export { _class as class };
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
	$: watchValue(value)
	tick().then(() => {
		isInit = true;
	})
</script>
<div
	role='searchbox'
	tabindex='-1'
	class='be-textarea {_class}'
	class:is-disabled={disabled}
	on:click
	on:contextmenu
	on:dblclick
	on:mousedown
	on:mouseup
	on:keydown
	on:keyup
>
	<textarea
		{...$$restProps}
		placeholder={placeholder}
		class:is-gray={!value}
		style={$$props.style}
		{maxlength}
		bind:value
		class='be-textarea__inner'
		{readonly}
		{disabled}
		on:blur={blur}
		on:focus
		on:change
		on:input
		bind:this={instance}
	></textarea>
</div>
