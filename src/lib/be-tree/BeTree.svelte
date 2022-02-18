<script lang="ts">
import BeTreeNode from "$lib/be-tree/BeTreeNode.svelte";
import { getNodeKey } from "$lib/be-tree/model/util";
import TreeStore from "$lib/be-tree/model/TreeStore";
import { createEventDispatcher } from "svelte";

const dispatch = createEventDispatcher()

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
export let showCheckbox: boolean = false;
export let defaultExpandAll: boolean = false;
export let renderAfterExpand: boolean = true;
export let highlightCurrent: boolean = false;
export let checkStrictly: boolean = false;
export let checkDescendants: boolean = false;
export let autoExpandParent: boolean = true;
export let load: Function = null;
export let defaultCheckedKeys: [] = [];
export let defaultExpandedKeys: [] = [];
export let currentNodeKey: [String, Number] = [];
export let renderContent: Function;
export let filterNodeMethod: Function = null;

export let props: DefaultProps = {
  label: 'label',
  children: 'children'
}

let beTree = null
let isEmpty;
// 拖拽状态
let dragState = {
  showDropIndicator: null
};
let dropIndicator = null; // 拖拽指示线

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
let root = store['root'];
let handleChildNodeExpand = (evt) => {
  dispatch('nodeExpand', evt.detail)
}
const handleClick = (evt) => {
  dispatch('nodeClick', evt.detail)
}
const handleCheckChange = (items) => {
  dispatch('checkChange', {
    ...items,
    checkedNodes: store.getCheckedNodes(),
    checkedKeys: store.getCheckedKeys(),
    halfCheckedNodes: store.getHalfCheckedNodes(),
    halfCheckedKeys: store.getHalfCheckedKeys()
  })
}

export const filter = (value) => {
  if (!filterNodeMethod) throw new Error('[Tree] filterNodeMethod is required when filter');
  store.filter(value);
  root = store['root']
}
export const getNodeKeys = (node) => {
  return getNodeKey(nodeKey, node.data);
}

export const getNodePath = (data) => {
  if (!nodeKey) throw new Error('[Tree] nodeKey is required in getNodePath');
  const node = store.getNode(data);
  if (!node) return [];
  const path = [node.data];
  let parent = node.parent;
  while (parent && parent !== this.root) {
    path.push(parent.data);
    parent = parent.parent;
  }
  return path.reverse();
}

export const getCheckedNodes = (leafOnly, includeHalfChecked) => {
  return store.getCheckedNodes(leafOnly, includeHalfChecked);
}

export const getCheckedKeys = (leafOnly) => {
  return store.getCheckedKeys(leafOnly);
}
export const getCurrentNode = () => {
  const currentNode = store.getCurrentNode();
  return currentNode ? currentNode.data : null;
}
export const getCurrentKey = () => {
  if (!nodeKey) throw new Error('[Tree] nodeKey is required in getCurrentKey');
  const currentNode = this.getCurrentNode();
  return currentNode ? currentNode[nodeKey] : null;
}
export const setCheckedNodes = (nodes, leafOnly) => {
  if (!nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodes');
  store.setCheckedNodes(nodes, leafOnly);
  root = store['root']
}
export const setCheckedKeys = (keys, leafOnly) => {
  if (!nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedKeys');
  store.setCheckedKeys(keys, leafOnly);
  root = store['root']
}
export const setChecked = (data, checked, deep) => {
  store.setChecked(data, checked, deep);
  root = store['root']
}
export const getHalfCheckedNodes = () => {
  return store.getHalfCheckedNodes();
}
export const getHalfCheckedKeys = () => {
  return store.getHalfCheckedKeys();
}
export const setCurrentNode = (node) => {
  if (!nodeKey) throw new Error('[Tree] nodeKey is required in setCurrentNode');
  store.setUserCurrentNode(node);
  root = store['root']
}
export const setCurrentKey = (key) => {
  if (!nodeKey) throw new Error('[Tree] nodeKey is required in setCurrentKey');
  store.setCurrentNodeKey(key);
  root = store['root']
}
export const getNode = (data) => {
  return store.getNode(data);
}
export const remove = (data) => {
  store.remove(data);
  root = store['root']
}
export const append = (data, parentNode) => {
  store.append(data, parentNode);
  root = store['root']
}
export const insertBefore = (data, refNode) => {
  store.insertBefore(data, refNode);
  root = store['root']
}
export const insertAfter = (data, refNode) => {
  store.insertAfter(data, refNode);
  root = store['root']
}
export const handleNodeExpand = (nodeData, node, instance) => {
  // this.broadcast('ElTreeNode', 'tree-node-expand', node);
  // this.$emit('node-expand', nodeData, node, instance);
  dispatch('nodeExpand', {nodeData, node, instance})
}
export const updateKeyChildren = (key, data) => {
  if (!nodeKey) throw new Error('[Tree] nodeKey is required in updateKeyChild');
  store.updateChildren(key, data);
  root = store['root']
}
export const initTabIndex = () => {
  treeItems = beTree.querySelectorAll('.is-focusable[role=treeitem]');
  checkboxItems = beTree.querySelectorAll('input[type=checkbox]');
  const checkedItem = beTree.querySelectorAll('.is-checked[role=treeitem]');
  if (checkedItem.length) {
    checkedItem[0].setAttribute('tabindex', 0);
    return;
  }
  treeItems[0] && treeItems[0].setAttribute('tabindex', 0);
}
let treeItems = null
let checkboxItems = null
const treeItemArray = () => {
  return Array.prototype.slice.call(treeItems);
}
export const handleKeydown = (ev) => {
  const currentItem = ev.target;
  if (currentItem.className.indexOf('el-tree-node') === -1) return;
  const keyCode = ev.keyCode;
  treeItems = beTree.querySelectorAll('.is-focusable[role=treeitem]');
  const currentIndex = treeItemArray.indexOf(currentItem);
  let nextIndex;
  if ([38, 40].indexOf(keyCode) > -1) { // up、down
    ev.preventDefault();
    if (keyCode === 38) { // up
      nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0;
    } else {
      nextIndex = (currentIndex < treeItemArray.length - 1) ? currentIndex + 1 : 0;
    }
    treeItemArray[nextIndex].focus(); // 选中
  }
  if ([37, 39].indexOf(keyCode) > -1) { // left、right 展开
    ev.preventDefault();
    currentItem.click(); // 选中
  }
  const hasInput = currentItem.querySelector('[type="checkbox"]');
  if ([13, 32].indexOf(keyCode) > -1 && hasInput) { // space enter选中checkbox
    ev.preventDefault();
    hasInput.click();
  }
}

const destroyNode = (evt) => {
  evt.detail.expanded = false
  evt.detail.checked = false
}
</script>
<svelte:options accessors />
<div class="be-tree" class:highlightCurrent role="tree" bind:this={beTree}>
	{#each root.childNodes as child}
	<BeTreeNode
		bind:node={child}
		{nodeKey}
        {props}
        {showCheckbox}
        {renderContent}
        {renderAfterExpand}
		on:handleClick={handleClick}
		on:checkChange={handleCheckChange}
		on:destroyNode={destroyNode}
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
