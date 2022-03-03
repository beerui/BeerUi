<script lang="ts">
	// 选中的列表
	import { createEventDispatcher, setContext } from 'svelte';
	import RadioStore from './radio'
	const dispatch = createEventDispatcher();
	export let checked: string = '';
	const store = new RadioStore({ checked, dispatch })
	setContext('radioStore', store)

	// 设置选中数据
	export const setChecked = (items) => store.setChecked(items)
	export const clear = () => store.clear()

	const subscribeHandle = () => {
		checked = store.current
		console.log('subscribeHandle', checked);
	}
	store.subscribe.push(subscribeHandle)

	let _class: $$props["class"] = "";
	export {_class as class};

	$: if (checked) setChecked(checked)
</script>
<div role="group" aria-label="checkbox-group" class='be-radio-group {_class}' style={$$props.style}>
	<slot></slot>
</div>
