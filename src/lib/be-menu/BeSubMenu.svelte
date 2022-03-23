<script lang="ts">
	import BeIcon from "$lib/be-icon/BeIcon.svelte";
	import { getContext, onDestroy } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	export let id: String = "";
	const store = getContext("menuStore");

	const subscribeHandle = item => node = item.data[id];
	store.subscribe.push(subscribeHandle)

	let timeout = null
	let node = store.nodesMap[id] || { level: 1, id: 0, open: false }

	const enterMenu = () => {
		let isFlag: boolean = false;
		if (store.trigger === 'hover' || store.collapse) {
			isFlag = true;
			changeActive(isFlag);
		}
	};
	const leaveMenu = () => {
		let isFlag: boolean = true;
		if (store.trigger === 'hover' || store.collapse) {
			isFlag = false;
			changeActive(isFlag);
		}
	};

	const changeActive = (isFlag: boolean, handleTime: number = 300) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			node.open = isFlag;
		}, handleTime);
	};

	onDestroy(() => node = null)

	const handleClick = evt => evt.which === 1 && store.setActive(node, 'click')
	let _class: $$props["class"] = "";
	export {_class as class};

	function slideIn(node, params) {
		return {
			duration:params.duration,
			easing: cubicInOut,
			css: t => {
				return `
				height: ${node.offsetHeight * t}px;
				overflow: hidden;
				display: block;
				`
			}
		};
	}
	function slideOut(node, params) {
		return {
			duration: params.duration,
			easing: cubicInOut,
			css: t => {
				return `
				height: ${node.offsetHeight * t}px;
				overflow: hidden;
				display: none;
				`
			}
		};
	}
</script>
<li role="menuitem"
    aria-haspopup="true"
    class="be-submenu {_class}"
    class:is_active={node.active}
    class:is_opened={node.open}
    on:mouseenter={enterMenu}
    on:mouseleave={leaveMenu}
    on:dblclick|stopPropagation
    on:mousedown|stopPropagation={handleClick}
    on:mouseup|stopPropagation
    on:click|stopPropagation
>
	<div class="be-submenu__title" style:padding-left={node.level*20 + 'px'}>
		{#if store.collapse && node.level === 1}
			<slot name="icon"></slot>
		{:else}
			<div class="be-menu__icon">
				{#if $$slots.icon}
					<span class="icon-left">
						<slot name="icon"></slot>
					</span>
				{/if}
				<slot name="title"></slot>
			</div>
			<div class="icon-right">
				<BeIcon name="chevron-down" />
			</div>
		{/if}
	</div>
	{#if store.mode === 'horizontal'}
		{#if node.open}
			<ul class="be-submenu__content be-submenu__{node.level}"
			    in:fly="{{ y: -10, duration: 160 }}"
			    out:fade
			>
				<slot></slot>
			</ul>
		{/if}
	{:else}
		{#if node.open}
			<ul class="be-submenu__content be-submenu__{node.level}"
			    in:slideIn={{duration: 160}}
			    out:slideOut={{duration: 120}}
			>
				<slot></slot>
			</ul>
		{/if}
	{/if}
</li>
