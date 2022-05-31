<script lang='ts'>
	import { createEventDispatcher } from 'svelte';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '$lib/utils/forwardEventsBuilder';
	import { writable } from 'svelte/store';
	import { eventBus } from '$lib/utils';
	const forwardEvents = forwardEventsBuilder(get_current_component());
	export let value = '';
	export let placeholder = '';
	export let size = '';
	export let readonly = false;
	export let disabled = false;
	// 是否显示清除按钮
	export let clearable = false;
	export let validateEvent = true;
	export let type = 'text';
	// 右侧icon
	export let suffixIcon = '';
	// let showClear = false;
	let input;

	function showClear() {
		return clearable && !readonly && !disabled;
	}

	let suffix;

	// 判断后置内容是否存在
	function getSuffixVisible() {
		return $$slots.suffix;
	}

	let dispatch = createEventDispatcher();

	// 在input失去焦点时触发
	function blur(event) {
		dispatch('blur', event);
		if (validateEvent) {
			eventBus.emit('BEFormItem', { key: 'be.form.blur', value: [value] });
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
		if (validateEvent) {
			eventBus.emit('BEFormItem', { key: 'be.form.change', value: [value] });
			console.log('eventBus', eventBus);
		}
	}

	// 在 input 值改变时触发
	function onInput(e) {
		dispatch('input', e.target.value);
	}

	function typeAction(node) {
		node.type = type;
	}
	let _class: $$props["class"] = "";
	export {_class as class};
</script>
<div
	class='be-input {_class}'
	class:is-disabled={disabled}
	class:be-input--medium={size === 'medium'}
	class:be-input--small={size === 'small'}
	class:be-input--mini={size === 'mini'}
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
	on:pointercancel
	on:pointerdown
	on:pointerenter
	on:pointerleave
	on:pointermove
	on:pointerout
	on:pointerup
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
		on:input={onInput}
		bind:this={input}
		use:forwardEvents
	/>
	{#if getSuffixVisible()}
	  <span class={['be-input__suffix',disabled ? ' is-disabled':''].join('')}>
	    <span class='be-input__suffix-inner '>
	      <template>
	        <slot name='suffix'></slot>
		      <!-- suffixIcon -->
		      {#if suffixIcon}
	        <i class={['be-input__icon ', suffixIcon].join('')}></i>
	        {/if}
	      </template>
	    </span>
	  </span>
	{/if}
</div>

