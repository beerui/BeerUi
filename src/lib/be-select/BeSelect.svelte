<script lang='ts'>
	import BeInput from '../be-input/BeInput.svelte';
	import { createEventDispatcher, getContext, setContext, tick } from 'svelte';
	import clickOutside from '$lib/_actions/clickOutside';
	import SelectStore, { ArrayValue } from './select';
	import { debounce } from '$lib/utils/throttle';
	let dispatch = createEventDispatcher()
	// 下拉框选中的值
	export let value: string | number | ArrayValue;
	export let size:string = 'normal';
	export let name:string;
	export let maxHeight:string = '300px';
	export let multiple:boolean = false; // 是否多选
	export let multipleLimit:number = 0; // 多选时用户最多可以选择的项目数，为 0 则不限制
	export let collapseTags:boolean = false; // 多选 收缩
	export let autocomplete:string = 'off'; // 多选 收缩
	export let disabled = false // 是否禁用
	export let position = 'bottom' // 位置
	export let clearable = false
	export let placeholder = '请选择'
	export let validateEvent: boolean = true; // 是否发送验证表单

	let inner = false; // 是否是内部改变的值
	let render = false
	const newInitStore = () => multiple ? store.setMultipleCurrentValue() : setCurrentValue()
	const store = new SelectStore({ value, multiple, multipleLimit, collapseTags })
	setContext('selectStore', store)
	const subscribeHandle = debounce(async item => {
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
	}, 20)
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
	$:if(visible) {
		dispatch('visibleChange', visible)
		store.setHover(value)
	}

	export const setValue = (value) => {
		if(!inner) {
			store.value = value
			newInitStore()
		}
	}
	$: setValue(value)

	// 表单验证
	const ctx = getContext('BeFormItem')
	let prop = '' // name
	if (ctx) {
		ctx.propWatch.subscribe(value => prop = value)
	}
	let isInit: boolean = false
	const watchValue = (value) => {
		if (ctx && prop && isInit && validateEvent) {
			ctx.FormItemEventCallback({ type: 'change', value: [value] })
		}
	}
	$: watchValue(value)

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
		dispatch('clear', '')
	}

	const closeMultipleHandle = (item) => {
	  store.toggleMultiple(item)
		dispatch('removeTag', item)
	}

	let _class: $$props["class"] = "";
	export {_class as class};
	tick().then(() => {
		render = true;
		isInit = true;
		newInitStore()
	})
</script>
<div class='be-select be-select--{size} {_class}' style={$$props.style} use:clickOutside={{ cb: handleClosePopper }}>
	{#if multiple}
		<div
			class='be-select__tags'
			on:click|stopPropagation={toggleVisible}
			on:mouseover={() => {if(clearable && inputValue) showClose = true}}
			on:mouseleave={() => {if(clearable && inputValue) showClose = false}}
			on:focus
		>
			{#if collapseTags && store.value.length > 0}
				<span class="be-tag">
					<span class="be-tag-text">{store.multipleValue[0].label}</span>
					<span class="be-tag-close" on:click|stopPropagation={() => closeMultipleHandle(store.multipleValue[0])}>
					  <i class='be-icon be-icon-close'></i>
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
						<span class="be-tag-close" on:click|stopPropagation={() => closeMultipleHandle(item)}>
							<i class='be-icon be-icon-close'></i>
						</span>
					</span>
				{/each}
			{/if}
			<div class='be-tag-suffix'>
				<div class="be-tag-suffix-icon" class:is-reverse={visible && !showClose} style="display:{!showClose ? 'block' : 'none'}">
					<i class='be-icon be-icon-chevron-down'></i>
				</div>
				<div on:click|stopPropagation={clearValue} class:close={showClose} style="display:{showClose ? 'block' : 'none'};margin-right:2px">
					<i class='be-icon be-icon-close-circle'></i>
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
			<BeInput
				{placeholder}
				value={inputValue}
				bind:this={input}
				readonly
				on:blur={e => dispatch('blur', e)}
				on:focus={e => dispatch('focus', e)}
				disabled={disabled}
				autocomplete={autocomplete !== 'off'}
			>
				<div slot='suffix'>
					<div class="input-suffix-icon" class:is-reverse = {visible && !showClose} style="display:{!showClose ? 'block' : 'none'}">
						<i class='be-icon be-icon-chevron-down'></i>
					</div>
					<div on:click|stopPropagation={clearValue} class:close={showClose} style="display:{showClose ? 'block' : 'none'};margin-right:2px">
						<i class='be-icon be-icon-close-circle'></i>
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

