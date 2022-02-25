<script lang='ts'>
	import BeIcon from './../be-icon/BeIcon.svelte';
	import BeInput from '../be-input/BeInput.svelte';
	import { cubicInOut } from 'svelte/easing';
	import { createEventDispatcher, getContext, setContext } from 'svelte'
	import clickOutside from '$lib/_actions/clickOutside';
	import { BeerPS, genKey } from "$lib/utils/beerui";
	import SelectStore from './select'
	let dispatch = createEventDispatcher()
	export let options;
	// 下拉框选中的值
	export let value;	
	// const selectStore = new SelectStore({value})
	// setContext('selectStore', selectStore)
	let inputValue = getContext('lable')
	// 是否禁用
	export let disabled = false;
	// 位置
	export let position = 'bottom'
	// 下拉框
	let visible = false;
	// 获取输入框
	let input
	const key = `selectChange_${ genKey() }` 

	setContext('selectChangeKey', key)

	$: {
		setContext('selectValue', value)
	}

	setTimeout(() => {
		BeerPS.publish('test','11231323')
	}, 1010);

	BeerPS.subscribe(key, items => {
		console.log(items);
		visible = false
		value = items.value
		inputValue = items.label
	})



	function handleShowPopper() {
			visible = true;
	}
	function handleClosePopper(){
			visible = false
	}
	const change = (e) => {
		console.log(e);
	}
	function zoomIn(node, params) {
		return {
			duration:params.duration,
			easing: cubicInOut,
			css: t => {
				return `
        opacity: ${t};
        transform: scaleY(${t});
        transform-origin: center ${position === 'top' ?'bottom':'top'};`
			}
		};
	}
</script>

<div class='be-select' use:clickOutside={{ cb: handleClosePopper }}>
	<!-- <div class={['be-select__content',disabled ? ' is-disabled':''].join('')}> -->
		<BeInput on:focus={handleShowPopper} value={inputValue} bind:this={input} readonly disabled={disabled}>
			<div slot='suffix' class="input-suffix-icon" class:is-reverse = {visible}>
				<BeIcon name='chevron-down' width='20' height='20' />
			</div>
		</BeInput>
	<!-- </div> -->
	{#if visible}
		<div class='be-select__option' in:zoomIn="{{duration: 300}}" out:zoomIn="{{duration: 200}}">
			<ul class={['be-select__option_content',position === 'top'?' is_top':''].join('')}>
				<slot></slot>
			</ul>
			<div class="popper__arrow"></div>
		</div>
	{/if}
</div> 

