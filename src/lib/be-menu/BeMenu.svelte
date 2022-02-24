<script lang="ts">
	import { BeerPS, genKey, removeClass } from "$lib/utils/beerui";
	import { createEventDispatcher, onDestroy, onMount, setContext, tick } from "svelte";
	import clickOutside from "$lib/_actions/clickOutside";

	export let active: string = "";
	export let mode: string = "vertical";
	export let trigger: string = "hover";
	export let collapse: boolean = false;
	const dispatch = createEventDispatcher();
	let BeMenu;
	if (trigger === "click" || mode === "vertical") trigger = "click";
	const key = genKey();
	setContext(`MenuTriggerKey`, key);
	setContext(`MenuTrigger_${ key }`, trigger);
	setContext(`MenuMode_${ key }`, mode);
	setContext(`MenuCollapse_${ key }`, collapse);
	// 发起展开或收起的状态
	$: if (collapse || !collapse) BeerPS.publish(`MenuCollapse_${ key }`, collapse);
	// 设置选中
	export const setMenuActive = active => BeerPS.publish(`MenuActiveChange_${ key }`, {
		index: active,
		type: "setting"
	});
	const _menuActiveChange = BeerPS.subscribe(`MenuActiveChange_${ key }`, items => {
		if (BeMenu) {
			const allSub = BeMenu.querySelectorAll(".be-submenu");
			allSub.forEach(el => removeClass(el, "is_active"));
		}
		if (items.type === "setting") return;
		active = items.index;
		dispatch("change", active);
		clickMenuOutside();
	});
	onMount(async () => {
		// 初始化
		await tick();
		setMenuActive(active);
	});
	onDestroy(() => {
		BeerPS.unsubscribe("_menuActiveChange");
	})
	const clickMenuOutside = () => mode !== "vertical" ? BeerPS.publish(`MenuCloseAll_${ key }`) : "";
</script>
<svelte:options accessors />
<ul role="menubar" bind:this={BeMenu} class="be-menu be-menu--{mode}" class:be-menu--collapse={collapse}
    use:clickOutside={{ cb: clickMenuOutside }}>
	<slot></slot>
</ul>
