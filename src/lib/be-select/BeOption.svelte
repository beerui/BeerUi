<script lang="ts">
	import { getContext } from "svelte";

	let hover = false;
	export let label: string | number;
	export let value: string | number = '';
	export let disabled = false

	const store = getContext("selectStore");

	const isSelectHandle = (item) => multiple && Array.isArray(item) ? isSelect = item.includes(value) : isSelect = item.value === node.value;
	// 订阅值的改变
	const subscribeHandle = item => {
		isSelectHandle(item)
	}
	store.subscribe.push(subscribeHandle)

	$: multiple = store.multiple;
	$: collapseTags = store.collapseTags;

	// 是否选中当前
	let isSelect = false
	// 鼠标移入
	const hoverCurrent = flag => hover = flag
	// 初始化创建节点
	let node = store.creatNode({ label, value, disabled, key: value, hover: hoverCurrent, disabledCb: (flag) => {
		disabled = flag
	} });
	isSelectHandle(store)

	// 点击设置当前
	const handleClick = () => {
		if(node.disabled) return
		store.multiple ? store.toggleMultiple(node) : store.setCurrent(node)
	}
	// 移入改变样式
	const hoverItem = (e)=> store.setHover(e.target.dataset.value)

	let _class: $$props["class"] = "";
	export {_class as class};
</script>
<li
	class="be-select-dropdown__item {_class}"
	class:is-multiple={multiple}
	data-value={value}
	on:mouseenter={hoverItem}
	class:selected={isSelect}
	class:is-disabled={disabled}
	class:hover={hover}
>
	<div
		role='button'
		tabindex='-1'
		on:click={handleClick}
		on:keydown
	>
		{#if $$slots.default}
			<slot prop={value} />
		{:else}
			{label}
		{/if}
		{#if multiple && isSelect}
			<div class='be-icon-inner' class:is-block={isSelect}>
				{#if $$slots.default}
					<slot />
				{:else}
					<div class="be-icon" style="width: 16px; height: 16px;">
						<svg class="be-svg" width="100%" height="100%" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style="color: rgb(64, 158, 255);">
							<path d="M6.43348 9.92151L12.6561 3.69885L13.5754 4.61809L6.43348 11.76L1.97412 7.30063L2.89336 6.38139L6.43348 9.92151Z" fill="currentColor" fill-opacity="0.9"></path>
						</svg>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</li>
