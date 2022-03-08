<script lang="ts">
	import { getContext, onDestroy } from 'svelte';

	export let id: string = "";
	const store = getContext("menuStore");

	const subscribeHandle = item => node = item.data[id]
	store.subscribe.push(subscribeHandle)
	let node = store.nodesMap[id] || { level: 1, id: 0 }

	onDestroy(() => node = null)
	let _class: $$props["class"] = "";
	export {_class as class};

	const handleClick = (evt) => evt.which === 1 && store.setActive(node)
</script>
<li role="menuitem"
    tabindex="0"
    class="be-menu-item {_class}"
    class:is_active={node.active}
    on:click|stopPropagation
    on:dblclick|stopPropagation
    on:mousedown|stopPropagation={handleClick}
    on:mouseup|stopPropagation
    style:padding-left={node.level*20 + 'px'}
>
	{#if store.collapse && node.level === 1}
		<span class="icon-left">
			<slot name="icon"></slot>
		</span>
		<div class="be-menu-tooltip">
			<slot></slot>
		</div>
	{:else}
		{#if $$slots.icon}
			<span class="icon-left">
				<slot name="icon"></slot>
			</span>
		{/if}
		<slot></slot>
	{/if}
</li>
