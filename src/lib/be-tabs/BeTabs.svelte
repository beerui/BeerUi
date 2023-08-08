<script lang="ts">
import type { TabItem } from '../common.d.ts';
import { createEventDispatcher, onMount } from 'svelte';
import { classes } from '../utils';

let _class = null;
export { _class as class };

const dispatcher = createEventDispatcher()

export let active:string // 当前选中的key
export let items:TabItem[] // tab的元素

let index = 0 // 当前选中的key 索引
let navbarList:number[] = [] // 获取选项卡的元素的宽度

$: navbarWidth = navbarList[index] - 40 // 获取选项卡的元素的宽度

// 计算选中状态的动画偏移
const transX = (index: number) => {
	const getSum = (t, n, i) => i < index ? t + n : t
	return navbarList.reduce(getSum, 20)
}

$: navbarTansX = transX(index) // 选中状态偏移量

// tab 点击传参
function tabClick(key, i) {
	index = i
	dispatcher('tabClick', key)
}

const initTableActive = () => {
	for (let i = 0; i < items.length; i++) {
		if (active === items[i].key) {
			if (index !== i) {
				index = i
			}
			break
		}
	}
}

onMount(() => {
	initTableActive()
})
</script>
<div class={classes('be-tab', _class)}>
	<div class="be-tabs-pane">
		<div class='be-tabs__header'>
			<div class='be-tabs__nav-wrap'>
				<div class='be-tabs__nav-scroll'>
					<div class='be-tabs__nav'>
						<div class="be-tabs__active-bar is-top" style="width: {navbarWidth}px; transform: translateX({navbarTansX}px);"></div>
						{#each items as item, i}
						<div
							class='be-tabs__item'
							bind:clientWidth={navbarList[i]}
							class:is-active={active === item.key}
							on:click={() => tabClick(item.key, i)}
							on:keydown
						>{item.label}</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
		<slot></slot>
	</div>
</div>

