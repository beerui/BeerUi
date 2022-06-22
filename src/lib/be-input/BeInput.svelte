<script lang='ts'>
	import { createEventDispatcher, getContext, tick } from 'svelte';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '$lib/utils/forwardEventsBuilder';
	const forwardEvents = forwardEventsBuilder(get_current_component());
	export let value = '';
	export let placeholder = '';
	export let size = '';
	export let readonly = false;
	export let disabled = false;
	// 是否显示清除按钮
	export let clearable = false;
	export let validateEvent: boolean = true; // 是否发送验证表单
	export let type = 'text';
	export let name = '';
	// 右侧icon
	export let suffixIcon = '';
	let input;
	let showClose = false

	// 表单验证
	const ctx = getContext('BeFormItem')
	let prop = '' // name
	if (ctx) {
		ctx.propWatch.subscribe(value => prop = value)
	}

	const showClear = () => showClose = clearable && value && !readonly && !disabled

	let suffix;
	let isInit: boolean = false;

	// 判断后置内容是否存在
	function getSuffixVisible() {
		return $$slots.suffix;
	}

	let dispatch = createEventDispatcher();

	// 在input失去焦点时触发
	function blur(event) {
		dispatch('blur', event);
		if (ctx && prop && isInit && validateEvent) {
			ctx.FormItemEventCallback({ type: 'blur', value: [value] })
		}
	}

	// 是输入框获取焦点
	export function getblur() {
		input.focus();
	}

	// 在input获得焦点时触发
	function focus(event) {
		dispatch('focus', event);
	}

	// 仅在输入框失去焦点或用户按下回车时触发
	function change(event) {
		dispatch('change', value);
	}

	// 在 input 值改变时触发
	const onInput = () => {
		showClear()
		dispatch('input', value);
	}

	function typeAction(node) {
		node.type = type;
	}
	const watchValue = (value) => {
		if (ctx && prop && isInit && validateEvent) {
			ctx.FormItemEventCallback({ type: 'change', value: [value] })
		}
	}
	const clearValue = () => {
		value = ''
	}
	$: watchValue(value)

	let _class: $$props["class"] = "";
	export {_class as class};
	tick().then(() => {
		isInit = true;
	})
</script>
<div
	class='be-input {_class}'
	class:is-disabled={disabled}
	class:be-input--medium={size === 'medium'}
	class:be-input--small={size === 'small'}
	class:be-input--mini={size === 'mini'}
	class:be-input--suffix={clearable || suffixIcon || $$slots.suffix}
	style={$$props.style}
	on:click
	on:contextmenu
	on:dblclick
	on:focusin
	on:mousedown
	on:mouseup
	on:focusout
	on:keydown
	on:keyup
	on:mouseover={showClear}
	on:mouseleave={() => showClose = false}
>
	<input
		{...$$restProps}
		use:typeAction
		placeholder={placeholder}
		bind:value
		class='be-input__inner'
		{readonly}
		{disabled}
		on:blur={blur}
		on:focus={focus}
		on:change={change}
		name={prop || name}
		on:input={onInput}
		bind:this={input}
		use:forwardEvents
	/>
	{#if clearable || suffixIcon || $$slots.suffix}
	  <span class={['be-input__suffix', disabled ? ' is-disabled':''].join('')}>
	    <span class='be-input__suffix-inner'>
	      <slot name='suffix'></slot>
	      {#if suffixIcon}
	        <i class={['be-input__icon be-icon ', suffixIcon].join('')}></i>
	      {/if}
		    {#if value && clearable && showClose}
			    <i class='be-input__icon be-icon be-icon-close-circle' on:click={clearValue}></i>
		    {/if}
	    </span>
	  </span>
	{/if}
</div>

