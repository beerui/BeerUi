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

<svelte:head>
	<title>Tabs 选项卡切换 组件文档 BeerUi-官方文档</title>
	<meta name="description" content="BeerUi, 基于 svelte 的 PC端 组件库，base on svelte 3.0 web component">
	<meta name="keywords" content="Tabs 选项卡切换, beerui组件文档,beerui,beerui文档,beerui官网, BeerUi,@brewer/beerui,svelte,component,svelteKit">
</svelte:head>
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
	<h3 class='demo-table-title'>BeTabs Attributes</h3>
	<table class='demo-table'>
		<thead>
		<tr>
			<th>参数</th>
			<th>说明</th>
			<th>类型</th>
			<th>可选值</th>
			<th>默认值</th>
		</tr>
		</thead>
		<tbody>
			<tr>
				<td>active</td>
				<td>绑定值，选中选项卡的 key</td>
				<td>string</td>
				<td>-</td>
				<td>''</td>
			</tr>
			<tr>
				<td>items</td>
				<td>选项</td>
				<td>TabItem</td>
				<td>-</td>
				<td>''</td>
			</tr>
		</tbody>
	</table>
	<pre class='demo-pre'>
			{`
interface TabItem {
	key: string,
	label: string
}`}
	</pre>
	<h3 class='demo-table-title'>BeTabPane Attributes</h3>
	<table class='demo-table'>
		<thead>
		<tr>
			<th>参数</th>
			<th>说明</th>
			<th>类型</th>
			<th>可选值</th>
			<th>默认值</th>
		</tr>
		</thead>
		<tbody>
		<tr>
			<td>active</td>
			<td>绑定值，选中选项卡的 key</td>
			<td>string</td>
			<td>-</td>
			<td>''</td>
		</tr>
		<tr>
			<td>key</td>
			<td>判断选中的标识</td>
			<td>TabItem</td>
			<td>-</td>
			<td>''</td>
		</tr>
		</tbody>
	</table>
	<h3 class='demo-table-title'>BeTabs Events</h3>
	<table class='demo-table'>
		<thead>
		<tr>
			<th>事件名称</th>
			<th>说明</th>
			<th>回调参数</th>
		</tr>
		</thead>
		<tbody>
		<tr>
			<td>tabClick</td>
			<td>tab点击触发</td>
			<td>当前点击的key</td>
		</tr>
		</tbody>
	</table>
	<h3 class='demo-table-title'>BeTabPane Slot</h3>
	<table class='demo-table'>
		<thead>
		<tr>
			<th>name</th>
			<th>说明</th>
		</tr>
		</thead>
		<tbody>
		<tr>
			<td>default</td>
			<td>默认</td>
		</tr>
		</tbody>
	</table>
</div>
