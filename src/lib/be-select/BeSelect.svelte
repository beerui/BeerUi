<script lang='ts'>
	import BeIcon from './../be-icon/BeIcon.svelte';
	import BeInput from '../be-input/BeInput.svelte';
	import { createEventDispatcher, onMount, setContext, tick } from 'svelte';
	import clickOutside from '$lib/_actions/clickOutside';
	import SelectStore from './select'
	let dispatch = createEventDispatcher()
	// 下拉框选中的值
	export let value: string | number | string[] | number[];
	export let size:string = 'normal';
	export let maxHeight:string = '300px';
	export let multiple:boolean = false; // 是否多选
	export let collapseTags:boolean = false; // 多选 收缩

	if (multiple) value = []

	const store = new SelectStore({ value: $$props.value })
	setContext('selectStore', store)
	const subscribeHandle = async item => {
		if (store.isChange) {
			inner = true // 内部更新值
			value = store.value // 设置value
			inputValue = item.label // 设置输入框的值
			await tick()
			inner = false
			dispatch('change', store.value) // 值发生改变的时候发送给用户
		}
		handleClosePopper()
	}
	store.subscribe.push(subscribeHandle)
	let optionSize = 0
	const getSize = async size => {
		optionSize = size;
		await tick()
		setCurrentValue() // fixed async load options data
	}
	store.sizeSubscribe.push(getSize)
	let inputValue = ''
	export let disabled = false // 是否禁用
	export let position = 'bottom' // 位置
	export let clearable = false
	export let placeholder = '请选择'
	let visible = false // 下拉框
	let input // 获取输入框
	let showClose = false
	$:initValue(value)
	$:if(visible) store.setHover(value)
	$:if(value || value === 0) {
		store.value = value
		setCurrentValue();
	}

	let inner = false; // 是否是内部改变的值
	function initValue(value) {
		if (inner) return
		let node = store.getCurrent(value)
		if (node) store.setCurrent(node)
	}
	const setCurrentValue = () => {
		let node = store.getCurrent(String(value))
		inputValue = node?.label
	}
	onMount(async() => {
		await tick()
		setCurrentValue()
	})
	// 打开关闭下拉功能
	const handleShowPopper = () => visible = true
	const handleClosePopper = () => visible = false
	const toggleVisible = () => {
		if (disabled) return
		visible = !visible
	}
	const clearValue = () => {
		store.setCurrent({ label: '', value: '' })
		showClose = false
		handleClosePopper()
		dispatch('change', '')
	}

	let _class: $$props["class"] = "";
	export {_class as class};
</script>
<div class='be-select be-select--{size} {_class}' style={$$props.style} use:clickOutside={{ cb: handleClosePopper }}>
	{#if multiple}
		<div
			class='be-select__tags'
			on:click|stopPropagation={toggleVisible}
			on:mouseover={() => {if(clearable && inputValue) showClose = true}}
			on:mouseleave={() => {if(clearable && inputValue) showClose = false}}
		>
			{#each value as item}
				<span class="be-tag"><span class="be-tag-text">{item.label}</span><span>x</span></span>
			{/each}
		</div>
	{:else}
		<div on:click|stopPropagation={toggleVisible} on:focus on:mouseover={() => {if(clearable && inputValue) showClose = true}} on:mouseleave={() => {if(clearable && inputValue) showClose = false}}>
			<BeInput {placeholder} value={inputValue} bind:this={input} readonly disabled={disabled}>
				<div slot='suffix'>
					<div class="input-suffix-icon" class:is-reverse = {visible && !showClose} style="display:{!showClose ? 'block' : 'none'}">
						<BeIcon name='chevron-down' width='18' height='18' />
					</div>
					<div on:click|stopPropagation={clearValue} class:close={showClose} style="display:{showClose ? 'block' : 'none'};margin-right:2px">
						<BeIcon name='close-circle' width='14' height='14'/>
					</div>
				</div>
			</BeInput>
		</div>
	{/if}
	<div class='be-select__option' class:visible={visible}>
		<ul class={['be-select__option_content',position === 'top'?' is_top':''].join('')} style:max-height={maxHeight}>
			<slot></slot>
			{#if optionSize === 0}
			<div class="be-select-dropdown__empty">无数据</div>
			{/if}
		</ul>
		<div class="popper__arrow"></div>
	</div>
</div>

