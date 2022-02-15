<script lang="ts">
import BeTreeNode from "$lib/be-tree/BeTreeNode.svelte";
import { getNodeKey } from "$lib/be-tree/model/util";
import TreeStore from "$lib/be-tree/model/TreeStore";

type TreeDate = {
  label: string,
  children: TreeDate[]
}
type DefaultProps = {
  label: string,
  children: string
}
export let emptyText: string = '暂无数据';
export let nodeKey: string = 'label';
export let data: TreeDate[] = [];
export let lazy: boolean = false;
export let defaultExpandAll: boolean = false;
export let renderAfterExpand: boolean = true;
export let highlightCurrent: boolean = false;
export let checkStrictly: boolean = false;
export let checkDescendants: boolean = false;
export let autoExpandParent: boolean = true;
export let load: Function;
export let defaultCheckedKeys: [];
export let defaultExpandedKeys: [];
export let currentNodeKey: [String, Number];
export let renderContent: Function;
export let filterNodeMethod: Function;

export let props: DefaultProps = {
  label: 'label',
  children: 'children'
}
let isEmpty;
// 拖拽状态
let dragState = {
  showDropIndicator: null
};
let dropIndicator = null; // 拖拽指示线
let showCheckbox = false;

const getNodeKeyHandle = (child): void => {
  return getNodeKey(nodeKey, child);
}

const isTree = true;
const store = new TreeStore({
  key: nodeKey,
  data: data,
  lazy: lazy,
  props: props,
  load: load,
  currentNodeKey: currentNodeKey,
  checkStrictly: checkStrictly,
  checkDescendants: checkDescendants,
  defaultCheckedKeys: defaultCheckedKeys,
  defaultExpandedKeys: defaultExpandedKeys,
  autoExpandParent: autoExpandParent,
  defaultExpandAll: defaultExpandAll,
  filterNodeMethod: filterNodeMethod
});
const root = store['root'];
let handleChildNodeExpand = (evt) => {
  console.log('handleChildNodeExpand', evt);
};

</script>
<div class="be-tree" role="tree">
	{#each root.childNodes as child}
	<BeTreeNode
		node={child}
		{nodeKey}
        {props}
        {showCheckbox}
        {renderContent}
        {renderAfterExpand}
		on:nodeExpand={handleChildNodeExpand}
        key={getNodeKeyHandle(child)}
	/>
	{/each}
	{#if isEmpty}
	<div class="be-tree__empty-block">
		<span class="be-tree__empty-text">{ emptyText }</span>
	</div>
	{/if}
	<div
		class="be-tree__drop-indicator"
		class:show={dragState.showDropIndicator}
		bind:this={dropIndicator}>
	</div>
</div>
