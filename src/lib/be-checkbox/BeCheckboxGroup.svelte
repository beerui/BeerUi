<script lang="ts">
	// 选中的列表
	import { createEventDispatcher, setContext } from 'svelte';
	import CheckStore from './check'
	const dispatch = createEventDispatcher();
	export let checked: String[] = [];
	const store = new CheckStore({ checked, dispatch })
	setContext('checkStore', store)

	// 设置选中数据
	export const setCheckedList = (items) => store.setCheckedList(items)

	const subscribeHandle = () => checked = store.optionList
	store.subscribe.push(subscribeHandle)

	let _class: $$props["class"] = "";
	export {_class as class};

	$: if (checked) setCheckedList(checked)
</script>
<div role="group" aria-label="checkbox-group" class="be-checkbox-group {_class}">
	<slot></slot>
</div>
