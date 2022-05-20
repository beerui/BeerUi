<script lang='ts'>
	import { createEventDispatcher } from 'svelte';

	export let value: string | number = '';
	export let placeholder: string = '';
	export let readonly: boolean = false;
	export let disabled: boolean = false;
	export let maxlength: string | number = '';

	let instance = null

	let dispatch = createEventDispatcher();
	// 设置焦点
	export const setBlur = () => instance.focus()
	// 仅在输入框失去焦点或用户按下回车时触发
	const onChange = evt => dispatch('onChange', evt.target.value);

	let _class: $$props['class'] = '';
	export { _class as class };
</script>
<div
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
		on:blur
		on:focus
		on:change
		on:input
		bind:this={instance}
	></textarea>
</div>
<style lang='scss'>
	@import '../assets/scss/common/var';
	.be-textarea {
		textarea {
			padding: 5px 15px;
			width: 100%;
			min-height: 34px;
			height: 34px;
			line-height: $--base-line-height;
			color: var(--text-primary);
			font-size: $--font-size-base;
			border-radius: $--border-radius-base;
			border: 1px solid #dcdfe6;
			resize: vertical;
			box-sizing: border-box;
			background-color: #ffffff;
			background-image: none;
			transition: border-color .2s cubic-bezier(.645,.045,.355,1);
		}
		textarea::placeholder {
			width: 100%;
			color: var(--text-placeholder);
			line-height: $--base-line-height;
			font-size: $--font-size-base;
		}
		textarea:focus {
			outline: none;
			border-color: #409eff;
		}
	}
</style>
