<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount, setContext } from 'svelte';
	import clickOutside from "$lib/_actions/clickOutside";
	import MenuStore from './menu'

	export let active: string = "";
	export let mode: string = "vertical";
	export let trigger: string = "hover";
	export let data: any[] = [];
	export let collapse: boolean = false;
	export let isOnlyOne: boolean = false;
	const dispatch = createEventDispatcher();
	let BeMenu = null;
	let store = new MenuStore({ data, active, mode, trigger, collapse, dispatch})
	setContext('menuStore', store)

	const subscribeHandle = item => {
		if (active !== store.active) {
			dispatch('change', item.data[store.active])
			active = store.active
		}
	}
	store.subscribe.push(subscribeHandle)

	// // 发起展开或收起的状态
	$: if (collapse || !collapse) store.collapse = collapse;
	// 设置选中
	export const setMenuActive = active => store.setActiveKey(active);

	onMount(() => {
		if (!store.collapse && mode === 'vertical') setMenuActive(active)
	})
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
