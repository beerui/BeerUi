<script lang='ts'>
	import { BeerPS, removeClass } from '$lib/utils/beerui';
	import { createEventDispatcher, onMount, setContext, tick } from 'svelte';
	import clickOutside from '$lib/_actions/clickOutside';

	export let active: string = '';
	export let mode: string = 'vertical';
	export let trigger: string = 'hover';
	export let collapse: boolean = false;
	export let key: string = '1';
	const dispatch = createEventDispatcher();

	let BeMenu;
	if (trigger === 'click' || mode === 'vertical') trigger = 'click';
	setContext('MenuTrigger', trigger);
	setContext('MenuCollapse', collapse);
	setContext('MenuTriggerKey', key);
	$: {
		// 发起展开或收起的状态
		BeerPS.publish(`MenuCollapse_${ key }`, collapse);
	}
	// 设置选中
	export const setMenuActive = (key) => {
		BeerPS.publish('MenuActiveChange', { index: key, type: 'setting' });
	};
	BeerPS.subscribe('MenuActiveChange', items => {
		if (items.type === 'init' || items.type === 'setting') return
		if (BeMenu) {
			const allSub = BeMenu.querySelectorAll('.be-submenu');
			allSub.forEach(el => removeClass(el, 'is_active'));
		}
		active = items.index;
		dispatch('change', active);
	});
	onMount(async () => {
		// 初始化
		await tick();
		setMenuActive(active);
	});

	const clickMenuOutside = () => {
		if (mode !== 'vertical') BeerPS.publish(`MenuCloseAll_${ key }`);
	};
</script>
<svelte:options accessors />
<ul role='menubar' bind:this={BeMenu} class='be-menu be-menu--{mode}' class:be-menu--collapse={collapse}
	use:clickOutside={{ cb: clickMenuOutside }}>
	<slot></slot>
</ul>
