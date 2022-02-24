<script lang="ts">
	import { BeerPS, hasClass } from "$lib/utils/beerui";
	import { getContext, onDestroy, onMount } from "svelte";

	const key = getContext("MenuTriggerKey");
	let collapse = getContext(`MenuCollapse_${ key }`);
	let MenuContent;
	export let index = "";
	let isActive = false;
	const activeChange = () => BeerPS.publish(`MenuActiveChange_${ key }`, { els: MenuContent, index });
	const _menuActiveChange = BeerPS.subscribe(`MenuActiveChange_${ key }`, items => {
		isActive = index === items.index;
	});

	// 接收展开或收起的状态
	const _menuCollapse = BeerPS.subscribe(`MenuCollapse_${ key }`, _collapse => collapse = _collapse);

	let level = 1;
	const computedLevel = (els, _level = 1) => {
		if (hasClass(els, "be-submenu__content")) _level++;
		if (!hasClass(els.parentElement, "be-menu")) return computedLevel(els.parentElement, _level);
		return _level;
	};
	onMount(() => level = computedLevel(MenuContent));
	onDestroy(() => {
		BeerPS.unsubscribe("_menuActiveChange");
		BeerPS.unsubscribe("_menuCollapse");
	})
</script>
<li bind:this={MenuContent}
    role="menuitem"
    tabindex="0"
    class="be-menu-item"
    class:is_active={isActive}
    on:click|stopPropagation={activeChange}
    {index}
    {level}
    style:padding-left={level*20 + 'px'}
>
	{#if collapse && level === 1}
		<slot name="icon"></slot>
		<div class="be-tooltip">
			<slot></slot>
		</div>
	{:else}
		<span class="icon-left">
			<slot name="icon"></slot>
		</span>
		<slot></slot>
	{/if}
</li>
