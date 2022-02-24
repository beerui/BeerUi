<script lang='ts'>
	import BeIcon from './../be-icon/BeIcon.svelte';
	import BeInput from '../be-input/BeInput.svelte';
	import { cubicInOut, sineIn } from 'svelte/easing';
	import { createEventDispatcher } from 'svelte'
	import clickOutside from '$lib/_actions/clickOutside';
	import { BeerPS } from "$lib/utils/beerui";
	let dispatch = createEventDispatcher()

	// export let value = '1';
	export let options;
	// 下拉框选中的值
	export let value;
	// 是否禁用
	export let disabled = false;
	// 位置
	export let position = 'bottom'
	// 下拉框
	let visible = false;
	// 获取输入框
	let input

	BeerPS.subscribe('selectChange', data => {
		console.log('---', data);
		value = data.label
		handleClosePopper()
		dispatch('change', data.value)
	})
	

	function handleShowPopper() {
			visible = true;
	}
	function handleClosePopper(){
			visible = false
	}
	// 箭头动画
	function arrowsRotate(node, params) {
		return {
			duration: 300,
			css: (t) => {
				const eased = sineIn(t);
				return `transform: rotate(${ eased * (visible ? -45 : 135) }deg);`;
			}
		};
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
		<BeInput on:focus={handleShowPopper} bind:value bind:this={input} readonly disabled={disabled}>
			<div slot='suffix' class="input-suffix-icon" class:is-reverse = {visible}>
				<BeIcon name='chevron-down' width='20' height='20' />
			</div>
		</BeInput>
	<!-- </div> -->
	{#if visible}
		<div class='be-select__option' in:zoomIn="{{duration: 300}}" out:zoomIn="{{duration: 300}}">
			<ul class={['be-select__option_content',position === 'top'?' is_top':''].join('')}>
				<slot></slot>
			</ul>
			<div class="popper__arrow"></div>
		</div>
	{/if}
</div> 

