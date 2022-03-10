<script lang='ts'>
	import BeIcon from '$lib/be-icon/BeIcon.svelte';
	import BeInput from '$lib/be-input/BeInput.svelte';
	import { createEventDispatcher } from "svelte";
	import clickOutside from '$lib/_actions/clickOutside';
	import { filterClass } from "$lib/utils/beerui";
	import CascaderPanel from './cascader-panel.svelte';
	const dispatch = createEventDispatcher()
	export let options
	export let expandTrigger = 'click'
	// 下拉框选中的值
	export let value = [];
	export let size;
	// 是否禁用
	export let disabled = false;
	// 位置
	export let clearable = true
	export let placeholder = '请选择'
	let inputValue = []
	let cascaderStore
	const preClass = ["size"];
	const _class = ["be-cascader", ...filterClass($$props, "be-cascader--", preClass)].join(" ");
	// 下拉框
	let visible = false;
	// 获取输入框
	let showClose = false
	const initInputValue = (arrs, level = 0) => {
		for(let i = 0; i < arrs.length; i++) {
      const item = arrs[i]
      if(item.value == value[level]) {
        inputValue.push(item.label)
        if(item.children && item.children.length) {
          initInputValue(item.children, ++level)
        } else {
          return
        }
      }
    }
	}
	if(value && value.length) initInputValue(options)

	const clearValue = () => {
		inputValue = []
		value = []
		showClose = false
		visible = false
		cascaderStore.clear()
	}
	const mousedownHandle = () => {
		visible = true
	}
	const change = (e) => {
		cascaderStore = e.detail.store
		inputValue = e.detail.label
		value = e.detail.value
		visible = false
		dispatch('change', value)
	}
</script>

<div
	class={_class}
	class:be-select--disabled={disabled}
	style={$$props.style}
	use:clickOutside={{ cb: () => visible = false }}
	on:click
	on:contextmenu
	on:dblclick
	on:focusin
	on:mousedown
	on:mouseup={mousedownHandle}
	on:focusout
	on:keydown
	on:keyup
>
	<div on:mouseover={() => {if(clearable && inputValue) showClose = true}} on:mouseleave={() => {if(clearable && inputValue) showClose = false}}>
		<BeInput {placeholder} value={inputValue.join('/')} readonly disabled={disabled}>
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
	<CascaderPanel {visible} {options} {expandTrigger} defaultValue = {value} on:change={change}/>
</div>

