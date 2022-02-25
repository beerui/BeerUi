<script lang='ts'>
	import BeIcon from './../be-icon/BeIcon.svelte';
	import BeInput from '../be-input/BeInput.svelte';
	import { cubicInOut } from 'svelte/easing';
	import { createEventDispatcher, getContext, onMount, setContext } from "svelte";
	import clickOutside from '$lib/_actions/clickOutside';
	import { BeerPS, genKey } from "$lib/utils/beerui";
	import SelectStore from './select'
	let dispatch = createEventDispatcher()
	export let options;
	// 下拉框选中的值
	export let value;
	const selectStore = new SelectStore({ value: $$props.value })
	setContext('selectStore', selectStore)
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

	BeerPS.subscribe(key, items => {
		visible = false
		value = items.value
		inputValue = items.label
	})


	onMount(() => {
		let node = selectStore.getCurrent(value)
		inputValue = node.label
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
</script>

<div class='be-select' use:clickOutside={{ cb: handleClosePopper }}>
	<!-- <div class={['be-select__content',disabled ? ' is-disabled':''].join('')}> -->
		<BeInput on:focus={handleShowPopper} value={inputValue} bind:this={input} readonly disabled={disabled}>
			<div slot='suffix' class="input-suffix-icon" class:is-reverse = {visible}>
				<BeIcon name='chevron-down' width='20' height='20' />
			</div>
		</BeInput>
	<!-- </div> -->
	<div class='be-select__option' class:visible={visible}>
		<ul class={['be-select__option_content',position === 'top'?' is_top':''].join('')}>
			<slot></slot>
		</ul>
		<div class="popper__arrow"></div>
	</div>
</div> 

