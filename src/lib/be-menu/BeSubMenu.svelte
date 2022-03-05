<script lang="ts">
	import { genKey } from '$lib/utils/beerui';
	import BeIcon from "$lib/be-icon/BeIcon.svelte";
	import { getContext, onDestroy, tick } from 'svelte';

	export let index: String = "";
	const store = getContext("menuStore");

	const subscribeHandle = item => {
		if (item.status === 'done') {
			node = item.data[key]
		}
		if (item.status === 'update') {
			node = item.data[key]
		}
		if (item.status === 'close') {
			node = item.data[key]
		}
	}
	store.subscribe.push(subscribeHandle)

	const key = genKey(4);
	let submenu = null;
	let subMenuContent = null;
	let timeout = null;
	let node = { level: 1, id: 0, open: false };

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

	onDestroy(() => {
		node = null
	});
	// 打开关闭菜单动画
	let subMenuContentHeight;
	const triggerMenu = async () => {
		if (store.trigger === 'hover') return
		let _isOpen = node.open;
		if (!_isOpen) node.open = !node.open;
		subMenuContentHeight = subMenuContent.children.length * 50 + 10 + "px";
		if (store.mode === "vertical") {
			subMenuContent.style.overflow = "hidden";
			const animate = subMenuContent.animate([
				{ height: _isOpen ? subMenuContentHeight : "0px", opacity: _isOpen ? "1" : "0" },
				{ height: _isOpen ? "0px" : subMenuContentHeight, opacity: _isOpen ? "0" : "1" }
			], {
				duration: 120
			});
			await animate.finished;
			if (_isOpen) node.open = !node.open;
			subMenuContentHeight = "auto";
			subMenuContent.style.overflow = "";
		} else {
			const child = submenu.querySelectorAll(".be-submenu__content > .be-menu-item");
			child.forEach(el => {
				el.animate([
					{ height: _isOpen ? "50px" : "0px", opacity: _isOpen ? "1" : "0" },
					{ height: _isOpen ? "0px" : "50px", opacity: _isOpen ? "0" : "1" }
				], {
					duration: 120
				});
			});
			await tick();
			if (_isOpen) node.open = !node.open;
		}
	};

	const handleClick = () => {
		store.setActive(node)
	}
	let _class: $$props["class"] = "";
	export {_class as class};
</script>
<li role="menuitem"
    aria-haspopup="true"
    class="be-submenu {_class}"
    class:is_active={node.active}
    class:is_opened={node.open}
    bind:this={submenu}
    on:mouseenter={enterMenu}
    on:mouseleave={leaveMenu}
    on:dblclick|stopPropagation
    on:mousedown|stopPropagation
    on:mouseup|stopPropagation
    on:click|stopPropagation={triggerMenu}
    {key}
    {index}
    data-type='submenu'
    data-index={node.index}
    data-level={node.level}
>
<!--	triggerMenu-->
	<div class="be-submenu__title" style:padding-left={node.level*20 + 'px'}>
		{#if store.collapse && node.level === 1}
			<slot name="icon"></slot>
		{:else}
			<div class="be-menu__icon">
			<span class="icon-left">
				<slot name="icon"></slot>
			</span>
				<slot name="title"></slot>
			</div>
			<div class="icon-right">
				<BeIcon name="chevron-down" />
			</div>
		{/if}
	</div>
	<ul class="be-submenu__content be-submenu__{node.level}"
	    bind:this={subMenuContent}
	    style:display={node.open ? 'block' : 'none'}
	>
		<slot></slot>
	</ul>
</li>
