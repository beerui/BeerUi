<script lang="ts">
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import type DragItem from '$lib/common.d.ts';

	export let list: DragItem[]

	const [send, receive] = crossfade({
		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});
	let dragstartHandle = (evt) => {
		console.log('dragstartHandle', evt);
	}
	let dragoverHandle = (evt) => {
		console.log('dragoverHandle ', evt);
	}
	let dragenterHandle = (evt) => {
		console.log('dragenterHandle', evt);
	}
	let dragHandle = (evt) => {
		console.log('dragHandle', evt);
	};

</script>

<div class='be-drag'>
	{#each list as item (item.key)}
		<div
			on:drag={dragHandle}
			on:dragstart={dragstartHandle}
			on:dragover={dragoverHandle}
			on:dragenter={dragenterHandle}
			class='be-drag-list'
			in:receive="{{key: item.key}}"
			out:send="{{key: item.key}}"
			animate:flip
		>
			<span>{item.label}</span>
		</div>
	{/each}
</div>

<style lang='scss'>
.be-drag {
  width: 300px;margin: 50px auto;
  &-list {
	box-shadow: 0 0 3px rgba(31, 45, 61, .3);margin-bottom: 10px;padding: 10px 15px;cursor: move;transition: .3s;
	&:hover {padding-left: 25px;}
  }
}
</style>
