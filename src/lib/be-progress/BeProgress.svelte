<script lang="ts">
	import type DragItem from '$lib/common.d.ts';
	import { onMount } from 'svelte';

	export let list: DragItem[]

	let status = false
	let draggedIndex = null
	let dragEnterIndex = null
	let pIndex;
	let _list;

	let dragstartHandle = (evt) => {
		if (status) return
		evt.dataTransfer.dropEffect = "copy";
		draggedIndex = evt.target.dataset.index
		_list = JSON.parse(JSON.stringify(list))
		status = true
		evt.stopPropagation();
	}
	let dragenterHandle = (evt) => {
		const { index } = evt.target.dataset
		if (index) {
			dragEnterIndex = index
			// TODO: 需要新增一个 key为999999的元素来解决延迟问题
			// const oldIndex = _list.splice(draggedIndex, 1)
			// _list.splice(dragEnterIndex, 0, ...oldIndex)
			// list = _list
		}
	}
	let dragendHandle = (evt) => {
		status = false
		dragEnterIndex = null
		pIndex = null
	};
	let dropHandler = (evt) => {
		const { index } = evt.target.dataset
		const oldIndex = _list.splice(index, 1)
		_list.splice(dragEnterIndex, 0, ...oldIndex)
		list = _list
	};
	onMount(() => {

		document.addEventListener("drop", function(event) {
			event.preventDefault();
		});
	})
</script>

<div class='be-drag'>
	{#each list as item , index (item.key)}
		<div
			class='be-drag-placeholder'
			on:ondrop={dropHandler}
			class:overed={pIndex === index}
			data-index={index}
		></div>
		<div
			class='be-drag-list'
			class:visible={String(index) === dragEnterIndex}
			on:dragstart={dragstartHandle}
			on:drop={dropHandler}
			on:dragover={dragenterHandle}
			on:dragend={dragendHandle}
			draggable='true'
			data-index={index}
		>
			<div class='be-drag-item' data-index={index}>
				<span>{item.label}</span>
			</div>
		</div>
		{#if index === list.length-1}
			<div
				class='be-drag-placeholder'
				on:dragenter={() => pIndex = index+1}
				class:overed={pIndex === index+1}
				on:drop={dropHandler}
				data-index={index+1}
			></div>
		{/if}
	{/each}
</div>

<style lang='scss'>
.be-drag {
  width: 300px;margin: 50px auto;
  &-list {
	cursor: move;
	&.visible {}
  }
  &-item {padding: 10px 15px;border: 1px solid #000;}
  &-placeholder {
	padding: 5px 15px;transition: .1s;border: 1px dashed transparent;
  	&.overed {padding: 20px 15px;border: 1px dashed #c2c2c2;}
  }
}
</style>
