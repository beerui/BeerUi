<script lang='ts'>
	import { BeerPS, hasClass } from '$lib/utils/beerui';
	import { getContext, onMount } from 'svelte';

	const key = getContext('MenuTriggerKey');
	let collapse = getContext('MenuCollapse');

	export let index = '';
	let isActive = false;
	const activeChange = () => BeerPS.publish('MenuActiveChange', { els: MenuContent, index });
	BeerPS.subscribe('MenuActiveChange', items => {
		if (items.type === 'setting') BeerPS.publish('MenuActiveChange', { els: MenuContent, index: items.index, type: 'init' })
		isActive = index === items.index
	})

	// 接收展开或收起的状态
	BeerPS.subscribe(`MenuCollapse_${ key }`, _collapse => collapse = _collapse);

	let level = 1;
	const computedLevel = (els, _level = 1) => {
		if (hasClass(els, 'be-submenu__content')) _level++;
		if (!hasClass(els.parentElement, 'be-menu')) return computedLevel(els.parentElement, _level);
		return _level;
	};
	onMount(() => level = computedLevel(MenuContent));
	let MenuContent;
</script>
<li bind:this={MenuContent}
	role='menuitem'
	tabindex='0'
	class='be-menu-item'
	class:is_active={isActive}
	on:click|stopPropagation={activeChange}
	{index}
	{level}
	style:padding-left={level*20 + 'px'}
>
	{#if collapse && level === 1}
		<slot name='icon'></slot>
		<div class='be-tooltip'>
			<slot></slot>
		</div>
	{:else}
		<span class='icon-left'>
			<slot name='icon'></slot>
		</span>
		<slot></slot>
	{/if}
</li>
