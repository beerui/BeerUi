<script lang="ts">
import BeIcon from "$lib/be-icon/BeIcon.svelte";
import { createEventDispatcher, onDestroy } from "svelte";
import { getNodeKey } from "$lib/be-tree/model/util";

const dispatch = createEventDispatcher()

let handleContextMenu
export let node
let treeNode = null
export let tree = null
export let showCheckbox = null
export let props = null
export let key = null
export let renderContent: Function
export let renderAfterExpand = true

let indent = 18
let iconClass = ''
export let nodeKey: string = 'label';

let handleChildNodeExpand = (evt) => {
  dispatch('nodeExpand', evt)
}

let handleClick = () => {
  expandedHandle()
  dispatch('handleClick', node.data)
}
const expandedHandle = async () => {
  if (node.expanded) {
    node.collapse();
  } else {
    node.expand();
  }
  // TODO：待优化
  const timer = setInterval(() => {
    if (!node.loading) {
      node = node
      clearInterval(timer)
    }
  }, 100)
}

const handleExpandIconClick = () => {
  expandedHandle()
}
const handleCheckChange = () => {
  node.checked = !node.checked
  dispatch("checkChange", { data: node.data, checked: node.checked, indeterminate: node.indeterminate });
}
const getNodeKeyHandle = (child): void => {
  return getNodeKey(nodeKey, child);
}
const destroyNode = (evt) => {
  evt.detail.expanded = false
  evt.detail.checked = false
}

onDestroy(() => {
  dispatch('destroyNode', node)
})
</script>
<div class="be-tree-node"
     bind:this={treeNode}
     class:is_show={node.visible}
     class:is_expanded={node.expanded}
     class:is_current={node.isCurrent}
     class:is_hidden={!node.visible}
     class:is_focusable={!node.disabled}
     class:is_checked={!node.disabled && node.checked}
     on:click|stopPropagation={handleClick}
     on:contextmenu={handleContextMenu}
     role="treeitem"
     tabindex="-1"
     aria-expanded={node.expanded}
     aria-disabled={node.disabled}
     aria-checked={node.checked}
>
	<div class="be-tree-node__content" style={ 'padding-left: ' + (node.level - 1) * indent + 'px' }>
		<span on:click|stopPropagation={handleExpandIconClick}
		      class:is_leaf={node.isLeaf}
		      class:expanded={!node.isLeaf && node.expanded}
		>
			<BeIcon name="caret-right-small" />
		</span>
		{#if showCheckbox}
			<input
				class="be-tree-checkbox"
				class:indeterminate={node.indeterminate}
				type="checkbox"
				checked={node.checked}
				disabled={node.disabled}
				on:change={handleCheckChange}
				on:click|stopPropagation
			>
		{/if}
		{#if node.loading}
			<div class="be-tree-loading">
				<BeIcon name="loading" />
			</div>
		{/if}
		<span class="be-tree-node__label">{ node.label }</span>
	</div>
	{#if !renderAfterExpand || node.expanded}
		<div class="el-tree-node__children"
		     class:expanded={node.expanded}
		     role="group"
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
					on:destroyNode={destroyNode}
					on:nodeExpand={handleChildNodeExpand}
					key={getNodeKeyHandle(child)}
				/>
			{/each}
		</div>
	{/if}
</div>
