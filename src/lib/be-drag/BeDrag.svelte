<script lang="ts">
	import type DragItem from '$lib/common.d.ts';
	import { flip } from 'svelte/animate';
  import { createEventDispatcher } from 'svelte';
  import { classes } from '$lib/utils';
	/**
	 * 拖拽上传文件可以参考链接
	 * https://segmentfault.com/a/1190000039109938?utm_source=sf-similar-article
	 */
	export let list: DragItem[]
	let draggingItem = null // 被拖动的元素
	let lastItem = null // 被拖动的元素
	let times = 0 // 被拖动的次数
  let _class = null;
  export { _class as class };

  const dispatch = createEventDispatcher()

  const drag = {
	  list,
	  times
  }

	let dragstartHandle = (item) => {
	  times++
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
	let dragendHandle = () => {
	  dispatch('getDrag', {
			list,
			times
		})
	}
</script>

<div class={classes('be-drag', _class)}>
	{#each list as item , index (item.key)}
		<div
			class='be-drag-list'
			on:dragstart={() => dragstartHandle(item)}
			on:dragover={() => dragoverHandle(item)}
			on:dragend={() => dragendHandle(item)}
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
