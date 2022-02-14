<script lang="ts">
import BeCheckbox from "$lib/be-checkbox/BeCheckbox.svelte";
import BeIcon from "$lib/be-icon/BeIcon.svelte";
import { createEventDispatcher } from "svelte";
import { getNodeKey } from "$lib/be-tree/model/util";

const dispatch = createEventDispatcher()

let handleContextMenu;
export let node;
export let expanded;
let treeNode = null;
export let tree = null;
export let showCheckbox = null;
export let props = null;
export let key = null;
export let renderContent: Function;
export let renderAfterExpand;

let handleExpandIconClick;
let handleCheckChange;
let indent = 18;
let iconClass = '';
export let nodeKey: string = 'label';

console.log('node', node);
let childNodeRendered;

let handleChildNodeExpand = (evt) => {
  dispatch('nodeExpand', evt)
};

let handleClick = (evt) => {
  dispatch('handleClick', evt)
};
const getNodeKeyHandle = (child): void => {
  return getNodeKey(nodeKey, child);
}

</script>
<div class="be-tree-node"
     bind:this={treeNode}
	class:is_show={node.visible}
	class:is_expanded={expanded}
	class:is_current={node.isCurrent}
	class:is_hidden={!node.visible}
	class:is_focusable={!node.disabled}
	class:is_checked={!node.disabled && node.checked}
	on:click|stopPropagation={handleClick}
	on:contextmenu={handleContextMenu}
	 role="treeitem"
	 tabindex="-1"
	 aria-expanded={expanded}
	 aria-disabled={node.disabled}
	 aria-checked={node.checked}
>
	<div class="be-tree-node__content" style={ 'padding-left: ' + (node.level - 1) * indent + 'px' }>
		<span on:click|stopPropagation={handleExpandIconClick}
		      class:is_leaf={node.isLeaf}
		      class:expanded={!node.isLeaf && expanded}
		>
			<BeIcon name="caret-right-small" />
		</span>
		{#if showCheckbox}
			<BeCheckbox
				checked={node.checked}
				indeterminate={node.indeterminate}
				disabled={!!node.disabled}
				on:click
				on:change={handleCheckChange}
			>
			</BeCheckbox>
		{/if}
		{#if node.loading}
			<span class="be-tree-node__loading-icon be-icon-loading"></span>
		{/if}
		<span class="be-tree-node__label">{ node.label }</span>
	</div>
	{#if !renderAfterExpand || childNodeRendered}
		<div class="el-tree-node__children"
		     class:expanded={expanded}
		     role="group"
		     aria-expanded={expanded}
		>
			{#each node.childNodes as child}
			<svelte:self
				renderContent={renderContent}
				renderAfterExpand={renderAfterExpand}
				showCheckbox={showCheckbox}
				key={getNodeKeyHandle(child)}
				node={child}
				on:nodeExpand={handleChildNodeExpand}
			/>
			{/each}
		</div>
	{/if}
</div>
