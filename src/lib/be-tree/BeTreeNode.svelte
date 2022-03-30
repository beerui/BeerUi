<script lang='ts'>
	import BeIcon from '$lib/be-icon/BeIcon.svelte';
	import { createEventDispatcher } from 'svelte';
	import { getNodeKey } from '$lib/be-tree/model/util';
	import BeCheckbox from '../be-checkbox/BeCheckbox.svelte';

	const dispatch = createEventDispatcher();

	let handleContextMenu;
	export let node;
	let treeNode = null;
	export let showCheckbox = null;
	export let props = null;
	export let renderContent: Function;
	export let renderAfterExpand = true;

	let indent = 18;
	let iconClass = '';
	export let nodeKey: string = 'label';

	let handleChildNodeExpand = (evt) => {
		dispatch('nodeExpand', evt);
	};

	let handleClick = () => {
		expandedHandle();
		dispatch('handleClick', node.data);
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

	const getNodeKeyHandle = (child): void => {
		return getNodeKey(nodeKey, child);
	};
</script>
<div class='be-tree-node'
     bind:this={treeNode}
     class:is-show={node.visible}
     class:is-expanded={node.expanded}
     class:is-current={node.isCurrent}
     class:is-hidden={!node.visible}
     class:is-focusable={!node.disabled}
     class:is-checked={!node.disabled && node.checked}
     on:contextmenu={handleContextMenu}
     role='treeitem'
     tabindex='-1'
     aria-expanded={node.expanded}
     aria-disabled={node.disabled}
     aria-checked={node.checked}
>
<!--	on:click|stopPropagation={handleClick}-->
	<div class='be-tree-node__content' style={ 'padding-left: ' + (node.level - 1) * indent + 'px' }>
		<span on:click|stopPropagation={handleExpandIconClick}
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
		<span class='be-tree-node__label' on:click|stopPropagation={handleClick}>{ node.label }</span>
	</div>
	{#if !renderAfterExpand || node.expanded}
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
					{renderContent}
					{renderAfterExpand}
					on:checkChange={handleChildCheckChange}
					on:nodeExpand={handleChildNodeExpand}
					key={getNodeKeyHandle(child)}
				/>
			{/each}
		</div>
	{/if}
</div>
