<script lang='ts'>
	import BeIcon from '$lib/be-icon/BeIcon.svelte';
	import BeInput from '$lib/be-input/BeInput.svelte';
	import { createEventDispatcher, onDestroy, onMount, setContext, tick } from 'svelte';
	import clickOutside from '$lib/_actions/clickOutside';
	import { filterClass, getScrollContainer } from '$lib/utils/beerui';
	import CascaderPanel from './cascader-panel.svelte';
	import Store from './store';

	const dispatch = createEventDispatcher();
	export let options;
	export let expandTrigger = 'click';
	// 下拉框选中的值
	export let value = []
	// export let size;
	// 是否显示所有层级
	export let showAllLevels = true;
	// 是否取消父子关联
	export let checkStrictly = false;
	// 配置选项
	export let config = {
		value: 'value',
		label: 'label',
		children: 'children'
	};
	// 是否开启动态加载
	export let lazy = false
	// 动态加载方法
	export let lazyLoad = (node, resolve) => {}
	// 是否禁用
	export let disabled = false;
	// 位置
	export let clearable = true;
	export let placeholder = '请选择';
	let store = new Store(options, $$props);
	setContext('store', store);
	// 显示的值
	let inputValue = store.label

	// let cascaderStore
	let hasChildren = false;
	const preClass = ['size'];
	const _class = ['be-cascader', ...filterClass($$props, 'be-cascader--', preClass)].join(' ');
	// 下拉框
	let visible = false;
	let cascaderRect;
	let left;
	let bottom;
	let clientRect;
	let scrollDom;
	// 获取输入框
	let showClose = false;
	config = store.config;
	// const findPathByValue = (list, val) => {
	// 	if (!list || list.length === 0) return false;
	// 	for (let i = 0; i < list.length; i++) {
	// 		const item = list[i];
	// 		if (item[config.value] === val) {
	// 			// 如果是父子不关联的 赋值找到的最后一个值
	// 			if (checkStrictly) value = [item[config.value]];
	// 			hasChildren = item[config.children] && item[config.children].length;
	// 			inputValue.push(item[config.label]);
	// 			return true;
	// 		}
	// 		if (findPathByValue(item[config.children], val)) {
	// 			inputValue.unshift(item[config.label]);
	// 			return true;
	// 		}
	// 	}
	// 	return false;
	// };
	// if (value && value.length) {
	// 	if (Array.isArray(value)) {
	// 		findPathByValue(options, value[value.length - 1]);
	// 	} else {
	// 		findPathByValue(options, value);
	// 	}
		if (!showAllLevels) inputValue = inputValue.slice(inputValue.length - 1, inputValue.length);
	// 	if (hasChildren && !checkStrictly) inputValue = [];
	// }
	$: {
		store.menus = []
		store.label = []
		store.value = []
		store.level = 0
		store.options = options
		store.defaultValue = value
		store.init()
	}
	const clearValue = () => {
		inputValue = [];
		value = [];
		showClose = false;
		visible = false;
		store.clear();
	};
	const mousedownHandle = () => {
		visible = true;
	};
	window.onresize = function() {
		getLeft();
	};
	$:if(visible) {
		getLeft();
	}
	onMount(() => {
		scrollDom = getScrollContainer(cascaderRect, true);
		if (scrollDom) {
			scrollDom.addEventListener('scroll', calcBottom)
		}
	})
	const calcBottom = () => {
		clientRect = cascaderRect.getBoundingClientRect();
		bottom = { status: 'scroll', value: clientRect.bottom };
	}
	onDestroy(() => {
		scrollDom.removeEventListener('scroll', calcBottom)
	})
	const getLeft = () => {
		clientRect = cascaderRect.getBoundingClientRect();
		left = clientRect.left;
		bottom = { status: 'update', value: clientRect.bottom };
	};
	const change = (e) => {
		inputValue = showAllLevelsData(e.detail.label);
		value = checkStrictly ? [e.detail.selectValue] : showAllLevelsData(e.detail.value);
		if (!checkStrictly) visible = false;
		dispatch('change', value);
	};
	const showAllLevelsData = (data) => {
		return showAllLevels ? data : data.slice(data.length - 1, data.length);
	};
</script>
<div
	class={_class}
	class:be-select--disabled={disabled}
	style={$$props.style}
	bind:this={cascaderRect}
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
	<div
		on:mouseover={() => {if(clearable && inputValue.length) showClose = true}}
	    on:mouseleave={() => {if(clearable && inputValue.length) showClose = false}}
		on:focus
	>
		<BeInput {placeholder} value={inputValue.join('/')} readonly disabled={disabled}>
			<div slot='suffix'>
				<div class='input-suffix-icon' class:is-reverse={visible && !showClose}
				     style="display:{!showClose ? 'block' : 'none'}">
					<BeIcon name='chevron-down' width='18' height='18' />
				</div>
				<div on:click={clearValue} class:close={showClose}
				     style="display:{showClose ? 'block' : 'none'};margin-right:2px">
					<BeIcon name='close-circle' width='14' height='14' />
				</div>
			</div>
		</BeInput>
	</div>
	<CascaderPanel {visible} {bottom} {left} {config} {expandTrigger} {checkStrictly} {lazy} {lazyLoad} on:change={change} />
</div>

