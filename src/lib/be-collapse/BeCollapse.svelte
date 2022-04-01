<script lang="ts">
	import { createEventDispatcher, setContext } from 'svelte';
	import CollapseStore from '$lib/be-collapse/store';

	const dispatch = createEventDispatcher()
	export let value: string | string[]  = [''] // 当前激活的面板(如果是手风琴模式，绑定值类型需要为string，否则为array)
	export let accordion: boolean = false // 是否手风琴模式
	const subscribeHandle = item => {
		value = item;
		dispatch('change', item)
	}
	const store = new CollapseStore({ value, accordion })
	store.subscribe.push(subscribeHandle)
	setContext('collapseStore', store)

	let _class: $$props["class"] = "";
	export {_class as class};
</script>
<div role='tablist' aria-multiselectable='true' class='be-collapse {_class}'>
	<slot></slot>
</div>

