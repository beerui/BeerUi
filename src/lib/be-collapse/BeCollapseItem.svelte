<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import { slide } from "svelte/transition";
	import BeIcon from '../be-icon/BeIcon.svelte';
	const store = getContext('collapseStore')
	const dispatch = createEventDispatcher()
	export let name: string | number  = '' // 唯一标志符
	export let title: string = '' // 面板标题
	export let disabled: boolean = false // 是否禁用
	const subscribeHandle = () => node = node
	let node = store.creatNode({ name, title, disabled, handler: subscribeHandle });
	const handlerClick = () => store.clickNode(node)
</script>
<div
	class='be-collapse-item'
	class:is-disabled={node.disabled}
    class:is-active={node.active}
>
	<div
		role='tab'
	    aria-controls='be-collapse-content-{node.index}'
	    aria-describedby='be-collapse-content'
	>
		<div
			role='button'
			tabindex={node.index}
			id="be-collapse-head-{node.index}"
			class='be-collapse-item__header'
			class:is-active={node.active}
			on:click={handlerClick}
		>
			<slot name='title' prop={node}>
				{node.title}
				<div class='be-collapse-item__arrow'>
					<BeIcon name='chevron-down' />
				</div>
			</slot>
		</div>
	</div>
	{#key node.active}
	<div
		role='tabpanel'
		aria-labelledby='be-collapse-head-{node.index}'
		id="be-collapse-content-{node.index}"
		class='be-collapse-item__wrap'
		aria-hidden='true'
		style:display={ node.active ? 'block' : 'none' }
		transition:slide={node.active}
	>
		<div class='be-collapse-item__content'>
			<slot></slot>
		</div>
	</div>
	{/key}
</div>
