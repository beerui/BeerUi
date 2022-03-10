<script lang='ts'>
	import BeIcon from './../be-icon/BeIcon.svelte';
	import BeInput from '../be-input/BeInput.svelte';
	import { createEventDispatcher, getContext, onMount, setContext } from "svelte";
	import clickOutside from '$lib/_actions/clickOutside';
	import { BeerPS, genKey } from "$lib/utils/beerui";
	import SelectStore from './select'
	let dispatch = createEventDispatcher()

	export let options;
	// 下拉框选中的值
	export let value;
	export let size = 'normal';
	const selectStore = new SelectStore({ value: $$props.value })
	setContext('selectStore', selectStore)
	let inputValue = getContext('lable')
	// 是否禁用
	export let disabled = false;
	// 位置
	export let position = 'bottom'
	export let clearable = false
	export let placeholder = '请选择'
	// 下拉框
	let visible = false;
	// 获取输入框
	let input
	let showClose = false
	const key = `selectChange_${ genKey() }`

	setContext('selectChangeKey', key)

	BeerPS.subscribe(key, items => {
		visible = false
		value = items.value
		inputValue = items.label
	})

	$:if(visible) {
		selectStore.setHover(value)
	}
	onMount(() => {
		let node = selectStore.getCurrent(value)
		inputValue = node?.label
	})
	function handleShowPopper() {
		visible = true;
	}
	function handleClosePopper(){
		visible = false
	}
	const toggleVisible = () => {
		if (disabled) return
		visible = !visible
	}
	const clearValue = () => {
		inputValue = ''
		value = -1
		showClose = false
		selectStore.setCurrent({})
		handleClosePopper()
	}
	const change = (e) => {
		dispatch('change', selectStore.value)
	}
	let _class: $$props["class"] = "";
	export {_class as class};
</script>

<div class='be-select be-select--{size} {_class}' style={$$props.style} use:clickOutside={{ cb: handleClosePopper }}>
	<div on:click|stopPropagation={toggleVisible} on:mouseover={() => {if(clearable && inputValue) showClose = true}} on:mouseleave={() => {if(clearable && inputValue) showClose = false}}>
		<BeInput {placeholder} value={inputValue} bind:this={input} readonly disabled={disabled}>
			<div slot='suffix'>
				<div class="input-suffix-icon" class:is-reverse = {visible && !showClose} style="display:{!showClose ? 'block' : 'none'}">
					<BeIcon name='chevron-down' width='18' height='18' />
				</div>
				<div on:click={clearValue} class:close={showClose} style="display:{showClose ? 'block' : 'none'};margin-right:2px">
					<BeIcon name='close-circle' width='14' height='14'/>
				</div>
			</div>
		</BeInput>
	</div>
	<div class='be-select__option' class:visible={visible}>
		<ul class={['be-select__option_content',position === 'top'?' is_top':''].join('')}>
			<slot></slot>
		</ul>
		<div class="popper__arrow"></div>
	</div>
</div>

