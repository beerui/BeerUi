<script>
	import { BeSwitch } from '$lib';
	import DemoBlock from '$lib/demo/DemoBlock.svelte';
	let switchValue = true
	let switchValue1 = true
	let switchValue2 = true
	let disabled = true
	let width = 40
	let activeColor = ''
	let inactiveColor = ''
	function change(val) {
		console.log(val)
		// setTimeout(() => {
		// 	switchValue = true
		// }, 3000);
	}
</script>

<svelte:head>
	<title>Switch 开关 组件文档 BeerUi-官方文档</title>
	<meta name="description" content="BeerUi, 基于 svelte 的 PC端 组件库，base on svelte 3.0 web component">
	<meta name="keywords" content="Switch 开关, beerui组件文档,beerui,beerui文档,beerui官网, BeerUi,@brewer/beerui,svelte,component,svelteKit">
</svelte:head>

<div class='page-container'>
		<h2>Switch 开关</h2>
		<p>表示两种相互对立的状态间的切换，多用于触发「开/关」。</p>
		<h3>基本用法</h3>

	<DemoBlock code={`
<BeSwitch bind:checked={switchValue} on:change={change} inactiveColor="#fff000"/>
`}
	js={`
import { BeSwitch } from '@brewer/beerui';
let switchValue = true`}>
		<div slot="source">
			<div class="demo-list">
				<BeSwitch bind:checked={switchValue} on:change={change} inactiveColor="#fff000"/>
			</div>
		</div>
	</DemoBlock>
	<h3>禁用状态</h3>
	<DemoBlock code={`
<BeSwitch disabled={disabled} />
`}>
		<div slot="source">
			<div class="demo-list">
				<BeSwitch bind:checked={switchValue1} disabled={disabled} />
			</div>
		</div>
	</DemoBlock>
	<h3>改变前的回调</h3>
	<p>返回false会阻止Switch的切换</p>
	<DemoBlock code={`
<BeSwitch bind:checked={switchValue} beforeChange = {() => {return false}} />
`}>
		<div slot="source">
			<div class="demo-list">
				<BeSwitch bind:checked={switchValue2} beforeChange = {() => {return false}} />
			</div>
		</div>
	</DemoBlock>
	<h3 class='demo-table-title'>Attributes</h3>
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
			<td>checked</td>
			<td>绑定值</td>
			<td>booleanx</td>
			<td>—</td>
			<td>false</td>
		</tr>
		<tr>
			<td>disabled</td>
			<td>是否禁用</td>
			<td>boolean</td>
			<td>—</td>
			<td>false</td>
		</tr>
		<tr>
			<td>width</td>
			<td>switch 的宽度（像素）</td>
			<td>number</td>
			<td>—</td>
			<td>40</td>
		</tr>
		<tr>
			<td>activeColor</td>
			<td>switch 打开时的背景色</td>
			<td>string</td>
			<td>—</td>
			<td>#409EFF</td>
		</tr>
		<tr>
			<td>inactiveColor</td>
			<td>switch 关闭时的背景色</td>
			<td>string</td>
			<td>—</td>
			<td>#C0CCDA</td>
		</tr>
		<tr>
			<td>name</td>
			<td>switch 对应的 name 属性</td>
			<td>string</td>
			<td>—</td>
			<td>—</td>
		</tr>
		</tbody>
	</table>
	<h3 class='demo-table-title'>Events</h3>
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
			<td>change</td>
			<td>switch 状态发生变化时的回调函数</td>
			<td>新状态的值</td>
		</tr>
		</tbody>
	</table>
	<h3 class='demo-table-title'>Slot</h3>
	<table class='demo-table'>
		<thead>
		<tr>
			<th>name</th>
			<th>说明</th>
		</tr>
		</thead>
		<tbody>
		<tr>
			<td>checked-slot</td>
			<td>?</td>
		</tr>
		</tbody>
	</table>
</div>


