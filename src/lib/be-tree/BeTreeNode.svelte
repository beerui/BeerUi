<script lang='ts'>
	import BeIcon from '../be-icon/BeIcon.svelte';
	import { createEventDispatcher } from 'svelte';
	import { getNodeKey } from './model/util';
	import BeCheckbox from '../be-checkbox/BeCheckbox.svelte';

	const dispatch = createEventDispatcher();

	let handleContextMenu;
	export let node;
	export let value: string[] | number[] = [];
	let treeNode = null;
	export let showCheckbox = null;
	export let highlightCurrent = false;
	export let props = null;
	export let renderContent: Function;
	export let renderAfterExpand = true;
	export let clickLabelIsExpanded = true
	export let showCount = false

	let indent = 18;
	let iconClass = '';
	export let nodeKey = 'label';

	let handleChildNodeExpand = (evt) => {
		dispatch('nodeExpand', evt);
	};

	const dispatchClick = (data) => dispatch('dispatchClick', data);
	let handleClick = () => {
		// 点击label是否展开
		if (clickLabelIsExpanded) expandedHandle();
		dispatchClick(node.data);
	};
	const expandedHandle = async () => {
		if (node.expanded) {
			node.collapse(node);
			node = node;
		} else {
			node.expand(() => {
				node = node;
			}, node.parent);
			node = node;
		}
	};

	const handleExpandIconClick = () => {
		expandedHandle();
	};

	const handleChildCheckChange = () => {
		dispatch('checkChange', { data: node.data, checked: node.checked, level: node.level });
	};
	const handleCheckChange = () => {
		node.setChecked(node.checked, true);
		node = node
		dispatch('checkChange', { data: node.data, checked: node.checked, level: node.level });
	};

	$: isSelected = value.includes(node.data[nodeKey])
	const getNodeKeyHandle = (child): string => getNodeKey(nodeKey, child);
</script>
<div class='be-tree-node'
     bind:this={treeNode}
     class:is-show={node.visible}
     class:is-expanded={node.expanded}
     class:is-current={node.isCurrent}
     class:is-hidden={!node.visible}
     class:is-focusable={!node.disabled}
     class:is-checked={!node.disabled && node.checked}
     class:is-selected={isSelected}
     on:contextmenu={handleContextMenu}
     role='treeitem'
     tabindex='-1'
		 aria-selected={isSelected}
     aria-expanded={node.expanded}
     aria-disabled={node.disabled}
     aria-checked={node.checked}
>
<!--	on:click|stopPropagation={handleClick}-->
	<div class='be-tree-node__content' style={ 'padding-left: ' + (node.level - 1) * indent + 'px' }>
		<span on:click|stopPropagation={handleExpandIconClick}
					on:keydown|stopPropagation
		      class:is-leaf={node.isLeaf}
		      class:expanded={!node.isLeaf && node.expanded}
		>
			<BeIcon name='caret-right-small' />
		</span>
		{#if showCheckbox}
			<BeCheckbox
				bind:indeterminate={node.indeterminate}
				bind:checked={node.checked}
				bind:disabled={node.disabled}
				on:change={handleCheckChange}
			/>
		{/if}
		{#if node.loading}
			<div class='be-tree-loading'>
				<BeIcon name='loading' />
			</div>
		{/if}
		<span class='be-tree-node__label' on:click|stopPropagation={handleClick} on:keydown>
			{ node.label }
			{#if showCount && node.childNodes.length}
				<span class='be-tree-node__label-num'>
					({node.childNodes.length || 0})
				</span>
			{/if}
		</span>
	</div>
	{#if !renderAfterExpand || node.expanded }
		<div class='el-tree-node__children'
		     class:expanded={node.expanded}
		     role='group'
		     aria-expanded={node.expanded}
		>
			{#each node.childNodes as child}
				<svelte:self
					bind:node={child}
					{nodeKey}
					{props}
					{showCheckbox}
					{highlightCurrent}
					{value}
					{renderContent}
					{renderAfterExpand}
					{clickLabelIsExpanded}
					{showCount}
					on:checkChange={handleChildCheckChange}
					on:nodeExpand={handleChildNodeExpand}
					on:dispatchClick
					key={getNodeKeyHandle(child) || ''}
				/>
			{/each}
		</div>
	{/if}
</div>
