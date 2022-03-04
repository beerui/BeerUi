<script lang="ts">
	import { genKey, hasClass } from '$lib/utils/beerui';
	import BeIcon from "$lib/be-icon/BeIcon.svelte";
	import { getContext, onMount, tick } from "svelte";

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
	let collapse = store.collapse

	const key = genKey();
	let submenu = null;
	let subMenuContent = null;
	let hovered = store.trigger;
	let isOpen = false;
	let isActive = false;
	let timeout = null;
	let node = { level: 1, id: 0 };
	//
	// const _MenuActiveChange = BeerPS.subscribe(`MenuActiveChange_${ key }`, async items => {
	// 	if (items.type === "setting" && submenu) {
	// 		await tick();
	// 		const els = submenu.querySelector(".is_active");
	// 		computedActive(els);
	// 	} else {
	// 		computedActive(items.els);
	// 	}
	// });
	// const computedActive = (els) => {
	// 	if (!els || hasClass(els, "be-menu")) return;
	// 	if (hasClass(els.parentElement, "be-submenu")) {
	// 		addClass(els.parentElement, 'is_active');
	// 		if (mode === "vertical" && !collapse) isActive = true
	// 	}
	// 	setTimeout(() => computedActive(els.parentElement), 60);
	// };
	// // 点击外部关闭子集弹框
	// const _MenuCloseAll = BeerPS.subscribe(`MenuCloseAll_${ key }`, () => isOpen = false);
	// // 接收展开或收起的状态
	// const _MenuCollapse = BeerPS.subscribe(`MenuCollapse_${ key }`, _collapse => {
	// 	collapse = _collapse;
	// 	changeActive(false, 0);
	// });
	//
	const enterMenu = () => {
		let isFlag: boolean = false;
		if (hovered || collapse) {
			isFlag = true;
			changeActive(isFlag);
		}
	};
	const leaveMenu = () => {
		let isFlag: boolean = true;
		if (hovered || collapse) {
			isFlag = false;
			changeActive(isFlag);
		}
	};

	const changeActive = (isFlag: boolean, handleTime: number = 300) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			isOpen = isFlag;
		}, handleTime);
	};
	// 计算层级
	let level = 1;
	const computedLevel = (els, _level = 1) => {
		if (hasClass(els.parentElement, "be-submenu__content")) _level++;
		if (!hasClass(els.parentElement, "be-menu")) return computedLevel(els.parentElement, _level);
		return _level;
	};
	onMount(() => {
		level = computedLevel(submenu);
	});
	//
	// onDestroy(() => {
	// 	BeerPS.unsubscribe(_MenuActiveChange);
	// 	BeerPS.unsubscribe(_MenuCloseAll);
	// 	BeerPS.unsubscribe(_MenuCollapse);
	// });
	// 打开关闭菜单动画
	let subMenuContentHeight;
	const triggerMenu = async () => {
		let _isOpen = isOpen;
		if (!_isOpen) isOpen = !isOpen;
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
			if (_isOpen) isOpen = !isOpen;
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
			if (_isOpen) isOpen = !isOpen;
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
    on:click|stopPropagation={handleClick}
    {key}
    data-type='submenu'
    data-index={node.index}
    data-level={node.level}
>
<!--	triggerMenu-->
	<div class="be-submenu__title" style:padding-left={node.level*20 + 'px'}>
		{#if collapse && node.level === 1}
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
