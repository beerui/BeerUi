<script lang="ts">
	import { BeerPS, genKey, removeClass } from "$lib/utils/beerui";
	import { createEventDispatcher, onDestroy, onMount, setContext, tick } from "svelte";
	import clickOutside from "$lib/_actions/clickOutside";
	import MenuStore from './menu'

	export let active: string = "";
	export let mode: string = "vertical";
	export let trigger: string = "hover";
	export let collapse: boolean = false;
	export let isOnlyOne: boolean = false;
	const dispatch = createEventDispatcher();
	let BeMenu = null;
	let store = new MenuStore({ active, mode, trigger, collapse, dispatch})
	setContext('menuStore', store)

	const subscribeHandle = item => {
		if (item.status === 'update' && item.menu.type !== 'submenu') {
			console.log('change', item.menu);
		}
	}
	store.subscribe.push(subscribeHandle)

	// // 发起展开或收起的状态
	$: if (collapse || !collapse) store.collapse = collapse;
	// 设置选中
	export const setMenuActive = active => store.setActiveKey(active);
	// const _menuActiveChange = BeerPS.subscribe(`MenuActiveChange_${ key }`, items => {
	// 	if (BeMenu) {
	// 		const allSub = BeMenu.querySelectorAll(".be-submenu");
	// 		allSub.forEach(el => removeClass(el, "is_active"));
	// 	}
	// 	if (items.type === "setting") return;
	// 	active = items.index;
	// 	dispatch("change", active);
	// 	clickMenuOutside();
	// });
	onMount(async () => {
		// 初始化
		await tick();
		store.initTree(BeMenu)
	});
	onDestroy(() => {
		store = null
	})
	const clickMenuOutside = () => mode !== "vertical" ? store.closeMenu() : "";

	let _class: $$props["class"] = "";
	export {_class as class};
</script>
<ul role="menubar"
    bind:this={BeMenu}
    class="be-menu be-menu--{mode} {_class}"
    class:be-menu--collapse={collapse}
    use:clickOutside={{ cb: clickMenuOutside }}
>
	<slot></slot>
</ul>
