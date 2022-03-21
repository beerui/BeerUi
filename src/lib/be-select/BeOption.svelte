<script lang="ts">
	import { getContext } from "svelte";

	let hover = false;
	export let label:any;
	export let value:any = '';
	export let disabled:boolean = false

	const store = getContext("selectStore");

	// 订阅值的改变
	const subscribeHandle = item => isSelect = item.value === node.value
	store.subscribe.push(subscribeHandle)

	// 是否选中当前
	let isSelect = false
	// 鼠标移入
	const hoverCurrent = flag => hover = flag
	// 初始化创建节点
	let node = store.creatNode({ ...$$props, key: value, hover: hoverCurrent });
	isSelect = store.value === node.value

	// 点击设置当前
	const handleClick = () => {
		if(node.disabled) return
		store.setCurrent(node)
	}
	// 移入改变样式
	const hoverItem = (e)=> store.setHover(e.target.dataset.value)

	let _class: $$props["class"] = "";
	export {_class as class};
</script>
<li class="be-select-dropdown__item {_class}" data-value={value} on:mouseenter={hoverItem} class:selected={isSelect} class:is-disabled={disabled} class:hover={hover} on:click={handleClick}>{label}</li>
