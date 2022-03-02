<script lang="ts">
	// 选中的列表
	import { createEventDispatcher, setContext } from 'svelte';
	import CheckStore from './check'

	const dispatch = createEventDispatcher();
	export let checked: String[] = [];
	const store = new CheckStore({ checked, dispatch })
	setContext('checkStore', store)

	// 设置选中数据
	export const setCheckedList = (items) => store.setSelectList(items)

</script>
<div role="group" aria-label="checkbox-group" class="el-checkbox-group">
	<slot></slot>
</div>
