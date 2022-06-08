<script lang='ts'>
	import CascaderMenu from './cascader-menu.svelte';
	import { createEventDispatcher, getContext } from 'svelte';

	const dispatch = createEventDispatcher();
	// export let options = [];
	export let visible = false;
	export let checkStrictly;
	// export let showAllLevels;
	export let expandTrigger;
	export let config;
	export let left;
	export let lazy = false
	export let lazyLoad = (node, resolve) => {}
	export let bottom: { status: string, value: number } = { status: 'init', value: 0 };
	// const store = new Store(options, $$props)
	export let selectValue
	export let menus = []
	const store = getContext('store');
	let value = [];
	let curLoadingId = null
	let cascaderRect;
	let popperArrow;
	let cascaderWidth;
	let isLoading = false
	$:if (visible) {
		value = store.value;
		cascaderRect.style.top = bottom.value + 'px';
	}

	$: {
		// 处理右边边界问题 优化性能：滚动时不触发左位置的改变
		if (bottom.status === 'update' && visible) {
			const clientWidth = document.body.clientWidth;
			const clientRect = cascaderRect && cascaderRect.getBoundingClientRect();
			if (clientRect && cascaderWidth) {
				const distance = left + cascaderWidth - clientWidth + 10;
				if (distance > 0) {
					const curleft = left - distance;
					cascaderRect.style.left = curleft + 'px';
					popperArrow.style.left = distance + 35 + 'px';
				} else {
					cascaderRect.style.left = left + 'px';
					popperArrow.style.left = '35px';
				}
			}
		}
	}
	const subscribeHandle = items => {
		bottom.status = 'update'; // 数据改变的时候 重置状态
		if (items.disabled) return;
		store.level = items.level;
		if (checkStrictly && items.type == 'radio') {
			store.setCurrent(items);
			selectValue = items[config.value];
			dispatch('change', {selectValue, value: store.value, label: store.label});
		} else {
			if (items[config.children] && items[config.children].length) {
				store.setMenu(items[config.children]);
				store.setCurrent(items);
				// value = store.value;
				menus = store.getMenus();
				curLoadingId = null
			} else {
				// 动态加载：没有子集并且规定了有下级
				if(lazy && items.hasChild){
					if(isLoading) return
					isLoading = true
					lazyLoad(items, (nodes) => {
						store.setMenu(nodes, items[config.value])
						store.setCurrent(items);
						// value = store.value;
						menus = store.getMenus()
						isLoading = false
						curLoadingId = null
					})
				} else {
					if(!checkStrictly) {
						store.setCurrent(items);
						// value = store.value;
						let params = {
							value: store.value,
							label: store.label,
							store: store
						}
						dispatch('change', params)
					}
				}
			}
		}
	}
	store.subscribe.push(subscribeHandle);
</script>


<div class='be-cascader-panel' bind:this={cascaderRect} bind:clientWidth={cascaderWidth} class:visible={visible}>
	{#if menus && menus.length > 0}
		{#each menus as menu, index}
			<CascaderMenu {expandTrigger} {selectValue} {config} {menu} bind:curLoadingId={curLoadingId} {checkStrictly} {lazy} value={ value[index] || selectValue } {store} />
		{/each}
	{:else}
		<div class='be-cascader-dropdown__empty'>暂无数据</div>
	{/if}
	<div class='popper__arrow' bind:this={popperArrow}></div>
</div>
