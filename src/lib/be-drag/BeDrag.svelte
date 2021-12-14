<script lang="ts">
	import type DragItem from '$lib/common.d.ts';

	export let list: DragItem[]

	let status = false
	let draggedIndex = null
	let dragEnterIndex = null
	let pIndex;
	let _list;

	let dragstartHandle = (evt) => {
		if (status) return
		console.log('dragstartHandle', evt);
		evt.dataTransfer.dropEffect = "copy";
		draggedIndex = evt.target.dataset.index
		_list = JSON.parse(JSON.stringify(list))
		status = true
		evt.stopPropagation();
	}
	let dragenterHandle = (evt) => {
		const { index, type } = evt.target.dataset
		if (index) {
			dragEnterIndex = index
			// TODO: 需要新增一个 key为999999的元素来解决延迟问题
			_list = JSON.parse(JSON.stringify(list))
			const oldIndex = _list.splice(draggedIndex, 1)
			_list.splice(dragEnterIndex, 0, ...oldIndex)
		}
	}
	let dragendHandle = (evt) => {
		console.log(`draggedIndex ${draggedIndex} dragEnterIndex ${dragEnterIndex}`);
		list = _list
		status = false
		dragEnterIndex = null
		pIndex = null
	};

</script>

<div class='be-drag'>
	{#each list as item , index (item.key)}
		<div
			class='be-drag-placeholder'
			on:dragenter={() => pIndex = index}
			class:overed={pIndex === index}
			data-index={index}
		></div>
		<div
			class='be-drag-list'
			class:visible={String(index) === dragEnterIndex}
			on:dragstart={dragstartHandle}
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
				data-index={index+1}
			></div>
		{/if}
	{/each}
</div>

<style lang='scss'>
.be-drag {
  width: 300px;margin: 50px auto;
  &-list {
	cursor: move;transition: .3s;
	&.visible {}
  }
  &-item {box-shadow: 0 0 3px rgba(31, 45, 61, .3);padding: 10px 15px;}
  &-placeholder {
	padding: 5px 15px;transition: .3s;border: 1px dashed transparent;
  	&.overed {padding: 20px 15px;border: 1px dashed #c2c2c2;}
  }
}
</style>
