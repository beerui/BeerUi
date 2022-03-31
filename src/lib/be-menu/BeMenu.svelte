<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount, setContext } from 'svelte';
	import clickOutside from "$lib/_actions/clickOutside";
	import MenuStore from './menu'
	import { debounce } from '$lib/utils/throttle';

	export let active: string = "";
	export let mode: string = "vertical";
	export let trigger: string = "hover";
	export let data: any[] = [];
	export let collapse: boolean = false;
	export let isOnlyOne: boolean = false;
	const dispatch = createEventDispatcher();
	let BeMenu = null;
	let store = new MenuStore({ data, active, mode, trigger, collapse, dispatch, isOnlyOne })
	setContext('menuStore', store)

	const subscribeHandle = debounce(item => {
		if (active !== store.active && item.menu.type !== 'submenu') active = store.active
		if (item.type === 'click') dispatch('click', item.data[store.active])
		dispatch('change', item.data[store.active])
	}, 60)
	store.subscribe.push(subscribeHandle)

	$: if (data) store.initTree();
	// // 发起展开或收起的状态
	$: if (collapse || !collapse) store.collapse = collapse;
	// 设置选中
	export const setMenuActive = active => store.setActiveKey(active);

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
