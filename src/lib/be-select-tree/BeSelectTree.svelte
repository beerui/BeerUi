<script lang='ts'>
	import BeInput from '../be-input/BeInput.svelte';
	import BeTree from '../be-tree/BeTree.svelte';
	import { createEventDispatcher } from 'svelte';
	import clickOutside from '$lib/_actions/clickOutside';
	import BeIcon from '../be-icon/BeIcon.svelte';
	let dispatch = createEventDispatcher()
	export let options;
	// 下拉框选中的值
	export let value;
	export let size = 'normal';

	export let position = 'bottom' // 位置
	export let clearable = false
	export let placeholder = '请选择'
	// Tree
	export let data = []
	export let defaultProps = { children: 'children', label: 'label' }

	const handleNodeClick = (evt) => console.log('handleNodeClick', evt.detail)

	let _class: $$props["class"] = "";
	export {_class as class};
</script>

<div class='be-select-tree {_class}' style={$$props.style}>
	<div class='be-select-tree__control'>
		<div class='be-select-tree__value-container'>
			<BeInput />
		</div>
		<div class='be-select-tree__close'>
			<BeIcon name='close' />
		</div>
		<div class='be-select-tree__arrow'>
			<BeIcon name='arrow' />
		</div>
	</div>
	<div class='be-select-tree__menu-container'>
		<div class='be-select-tree__menu'>
			<BeTree bind:data={data} props={defaultProps} on:nodeClick={handleNodeClick} />
		</div>
	</div>
</div>

