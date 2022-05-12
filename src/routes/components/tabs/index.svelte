<script lang="ts">
	import { BeTabs, BeTabPane } from '$lib';
	import type { TabItem } from '$lib/common';
  import DemoBlock from '$lib/demo/DemoBlock.svelte';

	let active = 'u2'
	const tabClick = (evt) => {
		active = evt.detail
	}
	let items:TabItem[] = [{ key: 'u1', label: '用户管理' }, { key: 'u2', label: '配置管理' }, { key: 'u3', label: '角色管理' }, { key: 'u4', label: '定时任务补偿' } ]

	const code = `
<BeTabs bind:active={active} {items} on:tabClick={tabClick}>
	{#each items as item}
	<BeTabPane {active} {...item}>
		<h3>{item.label}</h3>
		<h3>选项卡切换</h3>
	</BeTabPane>
	{/each}
</BeTabs>
`
	let active2 = 'u1';
</script>
<div class='page-container'>
	<h2>Tabs 选项卡切换</h2>
	<p class='desc'>选项卡切换。</p>
	<h3>基本用法</h3>
	<DemoBlock {code} js={`
import { BeTabs, BeTabPane } from '@brewer/beerui'
let active = 'u1'
const tabClick = (evt) => {
	active = evt.detail
}
let items:TabItem[] = [{ key: 'u1', label: '用户管理' }, { key: 'u2', label: '配置管理' }, { key: 'u3', label: '角色管理' }, { key: 'u4', label: '定时任务补偿' } ]
	`}>
		<div slot='source'>
			<BeTabs class='aaa' bind:active={active} {items} on:tabClick={tabClick}>
				{#each items as item, index}
				<BeTabPane {active} {...item}>
					<p>选项卡内容{index}</p>
				</BeTabPane>
				{/each}
			</BeTabs>
		</div>
	</DemoBlock>
	<hr>
	<h3>固定数据</h3>
	<p>BeTabPane上需要绑定 key 和 active </p>
	<DemoBlock js={`
let active2 = 'u1';`} code={`
<BeTabs bind:active={active2} items={[{ key: 'u1', label: '选项卡1' }, { key: 'u2', label: '选项卡2' }]} on:tabClick={ ({ detail }) => active2 = detail }>
	<BeTabPane active={active2} key='u1'>
		<p>选项卡内容1</p>
	</BeTabPane>
	<BeTabPane active={active2} key='u2'>
		<p>选项卡内容2</p>
	</BeTabPane>
</BeTabs >
	`}>
		<div slot='source'>
			<BeTabs bind:active={active2} items={[{ key: 'u1', label: '选项卡1' }, { key: 'u2', label: '选项卡2' }]} on:tabClick={ ({ detail }) => active2 = detail }>
				<BeTabPane active={active2} key='u1'>
					<p>选项卡内容1</p>
				</BeTabPane>
				<BeTabPane active={active2} key='u2'>
					<p>选项卡内容2</p>
				</BeTabPane>
			</BeTabs >
		</div>
	</DemoBlock>
</div>
