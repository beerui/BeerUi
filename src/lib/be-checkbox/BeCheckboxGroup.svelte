<script lang="ts">
	// 选中的列表
	import { createEventDispatcher, getContext, setContext, tick } from 'svelte';
	import CheckStore from './check'
	const dispatch = createEventDispatcher();
	export let checked: String[] = [];
	export let validateEvent: boolean = true; // 是否发送验证表单
	const store = new CheckStore({ checked, dispatch })
	setContext('checkStore', store)

	// 设置选中数据
	export const setCheckedList = (items) => {
		store.setCheckedList(items);
		console.log('setCheckedList', items);
	}

	const subscribeHandle = () => checked = store.optionList
	store.subscribe.push(subscribeHandle)

	let _class: $$props["class"] = "";
	export {_class as class};

	$: if (checked) setCheckedList(checked)

	// 表单验证
	const ctx = getContext('BeFormItem')
	let prop = '' // name
	let isInit: boolean = false
	ctx.propWatch.subscribe(value => prop = value)

	const watchValue = (checked) => {
		if (isInit && validateEvent) {
			console.log('watchValue checkGroup', checked);
			ctx.FormItemEventCallback({ type: 'change', value: [checked] })
		}
	}
	$: watchValue(checked)
	tick().then(() => {
		isInit = true;
	})
</script>
<div role="group" aria-label="checkbox-group" class="be-checkbox-group {_class}">
	<slot></slot>
</div>
