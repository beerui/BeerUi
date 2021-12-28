<script lang="ts">
	import type DragItem from '$lib/common.d.ts';
	import { flip } from 'svelte/animate';
	/**
	 * 拖拽上传文件可以参考链接
	 * https://segmentfault.com/a/1190000039109938?utm_source=sf-similar-article
	 */
	export let list: DragItem[]
	let draggingItem = null // 被拖动的元素
	let lastItem = null // 被拖动的元素

	let dragstartHandle = (item) => {
		draggingItem = item
	}
	let dragoverHandle = (item) => {
		if (item !== draggingItem && lastItem !== item) {
			const fromIndex = list.indexOf(draggingItem);
			const toIndex = list.indexOf(item);
			const temp = list[fromIndex];
			list[fromIndex] = list[toIndex];
			list[toIndex] = temp;
			list = [...list];
		}
		lastItem = item;
	}
</script>

<div class='be-drag'>
	{#each list as item , index (item.key)}
		<div
			class='be-drag-list'
			on:dragstart={() => dragstartHandle(item)}
			on:dragover={() => dragoverHandle(item)}
			draggable='true'
			animate:flip
		>
			<div class='be-drag-item'>
				<span>{item.key} {item.label}</span>
			</div>
		</div>
	{/each}
</div>

<style lang='scss'>
  @import '../assets/scss/modules/drag';
</style>
