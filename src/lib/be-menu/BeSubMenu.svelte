<script lang="ts">
	import { BeerPS, hasClass, addClass, removeClass } from "$lib/utils/beerui";
	import BeIcon from "$lib/be-icon/BeIcon.svelte";
	import { getContext, onMount, tick } from "svelte";

	export let index: String = "";
	const key = getContext("MenuTriggerKey");
	const trigger = getContext(`MenuTrigger_${ key }`);
	const mode = getContext(`MenuMode_${ key }`);
	let collapse = getContext(`MenuCollapse_${ key }`);

	let submenu = null;
	let subMenuContent = null;
	let hovered = trigger === "hover";
	let isOpen = false;
	let isActive = false;
	let timeout = null;

	BeerPS.subscribe(`MenuActiveChange_${ key }`, async items => {
		if (items.type === "setting" && submenu) {
			await tick();
			const els = submenu.querySelector(".is_active");
			computedActive(els);
		} else {
			computedActive(items.els);
		}
	});
	const computedActive = (els) => {
		if (!els || hasClass(els, "be-menu")) return;
		if (hasClass(els.parentElement, "be-submenu")) addClass(els.parentElement, "is_active");
		setTimeout(() => computedActive(els.parentElement), 60);
	};
	// 点击外部关闭子集弹框
	BeerPS.subscribe(`MenuCloseAll_${ key }`, () => isOpen = false);
	// 接收展开或收起的状态
	BeerPS.subscribe(`MenuCollapse_${ key }`, _collapse => {
		collapse = _collapse;
		changeActive(false, 0);
	});

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
	// 打开关闭菜单动画
	let subMenuContentHeight;
	const triggerMenu = async () => {
		let _isOpen = isOpen;
		if (!_isOpen) isOpen = !isOpen;
		subMenuContentHeight = subMenuContent.children.length * 50 + 10 + "px";
		if (mode === "vertical") {
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
</script>
<li role="menuitem"
    aria-haspopup="true"
    class="be-submenu"
    class:is_active={isActive}
    class:is_opened={isOpen}
    bind:this={submenu}
    on:mouseenter={enterMenu}
    on:mouseleave={leaveMenu}
    on:click|stopPropagation={triggerMenu}
    {index}
    {level}
>
	<div class="be-submenu__title" style:padding-left={level*20 + 'px'}>
		{#if collapse && level === 1}
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
	<ul class="be-submenu__content be-submenu__{level}" bind:this={subMenuContent}
	    style:display={isOpen ? 'block' : 'none'}>
		<slot></slot>
	</ul>
</li>
