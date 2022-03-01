<script lang="ts">
	// 选中的列表
	import { createEventDispatcher, onDestroy, setContext } from "svelte";
	import { BeerPS, genKey } from "$lib/utils/beerui";

	const key = genKey();
	setContext("CheckboxKey", key);
	const dispatch = createEventDispatcher();
	export let checked: String[] = [];
	// 初始化数据
	setContext(`checkGroupInit_${ key }`, { _checked: checked });

	// 监听选项改变
	const checkGroupHandle = BeerPS.subscribe(`checkGroupChange_${ key }`, ({ label, isChecked }) => {
		if (isChecked) {
			checked.push(label);
		} else {
			const index = checked.findIndex(el => label === el);
			checked.splice(index, 1);
		}
		dispatch("change", checked);
	});

	onDestroy(() => BeerPS.unsubscribe(checkGroupHandle));

	// 设置选中数据
	export const setCheckedList = (items) => {
		checked = items;
		BeerPS.publish(`setCheckedList_${ key }`, checked);
	};

</script>
<div role="group" aria-label="checkbox-group" class="el-checkbox-group"
	on:contextmenu
	on:dblclick
	on:focusin
	on:focusout
	on:keydown
	on:keyup
	on:pointercancel
	on:pointerdown
	on:pointerenter
	on:pointerleave
	on:pointermove
	on:pointerout
	on:pointerup
	on:input
>
	<slot></slot>
</div>
