<script lang="ts">
	import { genKey } from '$lib/utils/beerui';
	import { getContext, onDestroy } from 'svelte';

	export let index:string = ''
	const store = getContext("menuStore");

	const subscribeHandle = item => node = item.data[key]
	store.subscribe.push(subscribeHandle)
	const key = genKey(5)
	let node = { level: 1, id: 0 }

	onDestroy(() => node = null)
	let _class: $$props["class"] = "";
	export {_class as class};

	const handleClick = () => {
		store.setActive(node)
	}
</script>
<li role="menuitem"
    tabindex="0"
    {key}
    {index}
    class="be-menu-item {_class}"
    class:is_active={node.active}
    on:click|stopPropagation={handleClick}
    on:dblclick|stopPropagation
    on:mousedown|stopPropagation
    on:mouseup|stopPropagation
    data-id={node.id}
    data-level={node.level}
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
