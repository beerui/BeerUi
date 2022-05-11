<script lang='ts'>
	import BeTree from '../be-tree/BeTree.svelte';
	import { createEventDispatcher, onMount, tick } from 'svelte';
	import clickOutside from '$lib/_actions/clickOutside';
	import BeIcon from '../be-icon/BeIcon.svelte';
	import { slide } from 'svelte/transition';
	let dispatch = createEventDispatcher()
	// 下拉框选中的值
	export let value = [];
	export let lazy: boolean = false;

	export let clearable = true
	export let load: Function = null;
	export let nodeKey = 'label'
	export let placeholder = '请选择'
	// Tree
	export let data = []
	export let defaultProps = { children: 'children', label: 'label', id: 'id' }
	export let emptyText: string = '暂无数据';
	export let showCheckbox: boolean = false;
	export let showCount: boolean = false; // 展示子集的数量
	export let defaultExpandAll: boolean = false;
	export let renderAfterExpand: boolean = true;
	export let highlightCurrent: boolean = false;
	export let checkStrictly: boolean = false;
	export let checkDescendants: boolean = false;
	export let autoExpandParent: boolean = true;
	export let clickLabelIsExpanded: boolean = true;
	export let defaultCheckedKeys: [] = [];
	export let defaultExpandedKeys: [] = [];
	export let currentNodeKey: [String, Number] = [];
	export let renderContent: Function = null;

	let visible = false // 选框是否展示
	let inputVal = '' // 输入框的值
	let isFocus = false // 输入框是否聚焦
	let theFilter = null

	onMount(async () => {
		await tick()
		setCurrentValue()
	})
	// set init value
	let initChecked = {
		label: ''
	}
	const setCurrentValue = () => {
		filterInitChecked(value[0], data)
		inputVal = initChecked?.label || ''
	}

	const filterInitChecked = (value, data) => {
		for (let i = 0; i < data.length; i++) {
			if (data[i].children && data[i].children.length > 0) {
				filterInitChecked(value, data[i].children)
			}
			if (data[i][defaultProps.id] === value) {
				initChecked = { label: data[i][defaultProps.label], id: data[i][defaultProps.id] }
				return
			}
		}
	}

	const handleNodeClick = ({ detail }) => {
		// id: 9 label: "三级 1-1-1"
		value = [detail[defaultProps.id]]
		inputVal = detail[defaultProps.label]
		visible = !visible
		theFilter.setCurrentKey(detail[defaultProps.id])
	}
	// 输入框被点击
	const handleInputClick = () => visible = !visible
	// 输入框输入
	const handleInput = () => {
		if (!visible) visible = true
		filterText();
	}
	const clearInput = () => {
		inputVal = '';
		value = []
		visible = false
	}
	const checkChange = ({ detail }) => {
		dispatch('checkChange', detail)
	};
	const filterText = () => theFilter.filter(inputVal);
	const filterNodeMethod = (value, data) => {
		if (!value) return true;
		return data.label.indexOf(value) !== -1;
	}

	const clickMenuOutside = () => visible = false;

	let _class: $$props["class"] = "";
	export {_class as class};
</script>

<div
	class='be-select-tree {_class}'
	style={$$props.style}
	use:clickOutside={{ cb: clickMenuOutside }}
>
	<div
		class='be-select-tree__control'
		class:is-open={visible}
	>
		<div
			class='be-select-tree__value-container'
		    class:is-focus={visible && isFocus}
		    on:click={handleInputClick}
		>
			<div class='be-select-tree__input-container'>
				<input
					class="be-select-tree__input"
					type='text'
					autocomplete="off"
					tabindex='0'
					bind:value={inputVal}
					{placeholder}
					on:input={handleInput}
					on:focus={() => isFocus = true}
					on:focusout={() => isFocus = false}
				>
			</div>
		</div>
		{#if clearable && inputVal}
			<div class='be-select-tree__close' on:click={clearInput}>
				<BeIcon name='close' />
			</div>
		{/if}
		<div class='be-select-tree__arrow' class:is-open={visible} on:click={() => visible = !visible}>
			<BeIcon name='caret-down-small' width='24' height='24' />
		</div>
	</div>
	{#if visible}
		<div class='be-select-tree__menu-container' transition:slide>
				<div class='be-select-tree__menu'>
					<BeTree
						bind:this={theFilter}
						bind:data={data}
						bind:value={value}
						bind:lazy={lazy}
						bind:emptyText={emptyText}
						bind:showCheckbox={showCheckbox}
						bind:defaultExpandAll={defaultExpandAll}
						bind:renderAfterExpand={renderAfterExpand}
						bind:checkStrictly={checkStrictly}
						bind:checkDescendants={checkDescendants}
						bind:autoExpandParent={autoExpandParent}
						bind:currentNodeKey={currentNodeKey}
						bind:renderContent={renderContent}
						props={defaultProps}
						on:nodeClick={handleNodeClick}
						on:checkChange={checkChange}
						showCount
						load={load}
						clickLabelIsExpanded={false}
						defaultCheckedKeys={value}
						defaultExpandedKeys={value}
						highlightCurrent
						filterNodeMethod={filterNodeMethod}
						nodeKey={nodeKey}
					/>
				</div>
		</div>
	{/if}
</div>

