<script lang='ts'>
	import BeInput from '../be-input/BeInput.svelte';
	import { createEventDispatcher, setContext, tick } from 'svelte';
	import clickOutside from '$lib/_actions/clickOutside';
	import SelectStore, { ArrayValue } from './select';
	import { debounce } from '$lib/utils/throttle';
	let dispatch = createEventDispatcher()
	// 下拉框选中的值
	export let value: string | number | ArrayValue;
	export let size:string = 'normal';
	export let maxHeight:string = '300px';
	export let multiple:boolean = false; // 是否多选
	export let multipleLimit:number = 0; // 多选时用户最多可以选择的项目数，为 0 则不限制
	export let collapseTags:boolean = false; // 多选 收缩
	export let disabled = false // 是否禁用
	export let position = 'bottom' // 位置
	export let clearable = false
	export let placeholder = '请选择'

	let inner = false; // 是否是内部改变的值
	let render = false
	const newInitStore = () => multiple ? store.setMultipleCurrentValue() : setCurrentValue()
	const store = new SelectStore({ value, multiple, multipleLimit, collapseTags })
	setContext('selectStore', store)
	const subscribeHandle = async item => {
		if (!render) return
		if (store.isChange) {
			inner = true // 内部更新值
			value = store.value // 设置value
			store.multipleValue = store.multipleValue
			inputValue = item.label // 设置输入框的值
			await tick()
			inner = false
			dispatch('change', store.value) // 值发生改变的时候发送给用户
		}
		if (!multiple) handleClosePopper()
	}
	store.subscribe.push(subscribeHandle)
	let optionSize = 0
	const getSize = async size => {
		optionSize = size;
		await tick()
		newInitStore() // fixed async load options data
	}
	store.sizeSubscribe.push(getSize)
	let inputValue = ''
	let visible = false // 下拉框
	let input // 获取输入框
	let showClose = false
	// $:initValue(value)
	$:if(visible) store.setHover(value)

	$: setValue(value) 
	export const setValue = (value) => {
		if(!inner) {
			store.value = value
			newInitStore()
		}
	}

	const setCurrentValue = () => {
		let node = store.getCurrent(value)
		inputValue = node?.label
	}
	// 打开关闭下拉功能
	const handleShowPopper = () => visible = true
	const handleClosePopper = () => {
		visible = false;
	}
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

	const closeMultipleHandle = (item) => {
	  store.toggleMultiple(item)
	}


	let _class: $$props["class"] = "";
	export {_class as class};
	tick().then(() => {
		render = true;
		newInitStore()
	})
</script>
{store.value}
<div class='be-select be-select--{size} {_class}' style={$$props.style} use:clickOutside={{ cb: handleClosePopper }}>
	{#if multiple}
		<div
			class='be-select__tags'
			on:click|stopPropagation={toggleVisible}
			on:mouseover={() => {if(clearable && inputValue) showClose = true}}
			on:mouseleave={() => {if(clearable && inputValue) showClose = false}}
		>
			{#if collapseTags && store.value.length > 0}
				<span class="be-tag">
					<span class="be-tag-text">{store.multipleValue[0].label}</span>
					<span class="be-icon be-tag-close" style="width: 14px; height: 14px;" on:click|stopPropagation={() => closeMultipleHandle(store.multipleValue[0])}>
						<svg class="be-svg" width="100%" height="100%" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8.00005 8.91923L11.076 11.9951L11.9952 11.0759L8.91929 7.99999L11.9952 4.92409L11.076 4.00485L8.00005 7.08075L4.92412 4.00482L4.00488 4.92406L7.08081 7.99999L4.00488 11.0759L4.92412 11.9952L8.00005 8.91923Z" fill="currentColor" fill-opacity="0.9"></path></svg>
					</span>
				</span>
				{#if store.value.length > 1}
					<span class="be-tag">
						<span class="be-tag-text">+{store.value.length-1}</span>
					</span>
				{/if}
			{:else}
				{#each store.multipleValue as item}
					<span class="be-tag">
						<span class="be-tag-text">{item.label}</span>
						<span class="be-icon be-tag-close" style="width: 14px; height: 14px;" on:click|stopPropagation={() => closeMultipleHandle(item)}>
							<svg class="be-svg" width="100%" height="100%" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8.00005 8.91923L11.076 11.9951L11.9952 11.0759L8.91929 7.99999L11.9952 4.92409L11.076 4.00485L8.00005 7.08075L4.92412 4.00482L4.00488 4.92406L7.08081 7.99999L4.00488 11.0759L4.92412 11.9952L8.00005 8.91923Z" fill="currentColor" fill-opacity="0.9"></path></svg>
						</span>
					</span>
				{/each}
			{/if}
			<div class='be-tag-suffix'>
				<div class="be-tag-suffix-icon" class:is-reverse={visible && !showClose} style="display:{!showClose ? 'block' : 'none'}">
					<div class="be-icon" style="width: 18px; height: 18px;"><svg class="be-svg" width="100%" height="100%" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M3.54028 6.45964L4.45952 5.54041L7.9999 9.08079L11.5403 5.54041L12.4595 6.45964L7.9999 10.9193L3.54028 6.45964Z" fill="currentColor" fill-opacity="0.9"></path></svg></div>
				</div>
				<div on:click|stopPropagation={clearValue} class:close={showClose} style="display:{showClose ? 'block' : 'none'};margin-right:2px">
					<div class="be-icon" style="width: 14px; height: 14px;"><svg class="be-svg" width="100%" height="100%" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M4.98094 10.3119L7.29289 7.99995L4.98104 5.6881L5.68814 4.98099L8 7.29284L10.3119 4.98099L11.019 5.6881L8.7071 7.99995L11.0191 10.3119L10.3119 11.019L8 8.70706L5.68805 11.019L4.98094 10.3119Z" fill="currentColor" fill-opacity="0.9"></path><path d="M8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.134 15 0.999998 11.866 1 8C1 4.134 4.13401 0.999998 8 1ZM8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2Z" fill="currentColor" fill-opacity="0.9"></path></svg></div>
				</div>
			</div>
		</div>
		<div class='be-select__option' class:visible={visible}>
			<ul class={['be-select__option_content',position === 'top'?' is_top':''].join('')} style:max-height={maxHeight}>
				<slot></slot>
				{#if optionSize === 0}
					<div class="be-select-dropdown__empty">无数据</div>
				{/if}
			</ul>
			<div class="popper__arrow"></div>
		</div>
	{:else}
		<div on:click|stopPropagation={toggleVisible} on:focus on:mouseover={() => {if(clearable && inputValue) showClose = true}} on:mouseleave={() => {if(clearable && inputValue) showClose = false}}>
			<BeInput {placeholder} value={inputValue} bind:this={input} readonly disabled={disabled}>
				<div slot='suffix'>
					<div class="input-suffix-icon" class:is-reverse = {visible && !showClose} style="display:{!showClose ? 'block' : 'none'}">
						<div class="be-icon" style="width: 18px; height: 18px;"><svg class="be-svg" width="100%" height="100%" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M3.54028 6.45964L4.45952 5.54041L7.9999 9.08079L11.5403 5.54041L12.4595 6.45964L7.9999 10.9193L3.54028 6.45964Z" fill="currentColor" fill-opacity="0.9"></path></svg></div>
					</div>
					<div on:click|stopPropagation={clearValue} class:close={showClose} style="display:{showClose ? 'block' : 'none'};margin-right:2px">
						<div class="be-icon" style="width: 14px; height: 14px;"><svg class="be-svg" width="100%" height="100%" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M4.98094 10.3119L7.29289 7.99995L4.98104 5.6881L5.68814 4.98099L8 7.29284L10.3119 4.98099L11.019 5.6881L8.7071 7.99995L11.0191 10.3119L10.3119 11.019L8 8.70706L5.68805 11.019L4.98094 10.3119Z" fill="currentColor" fill-opacity="0.9"></path><path d="M8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.134 15 0.999998 11.866 1 8C1 4.134 4.13401 0.999998 8 1ZM8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2Z" fill="currentColor" fill-opacity="0.9"></path></svg></div>
					</div>
				</div>
			</BeInput>
		</div>
		<div class='be-select__option' class:visible={visible}>
			<ul class={['be-select__option_content',position === 'top'?' is_top':''].join('')} style:max-height={maxHeight}>
				<slot></slot>
				{#if optionSize === 0}
					<div class="be-select-dropdown__empty">无数据</div>
				{/if}
			</ul>
			<div class="popper__arrow"></div>
		</div>
	{/if}
</div>

