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
			<td>title</td>
			<td>标题</td>
			<td>string</td>
			<td>-</td>
			<td>''</td>
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
			<td>close</td>
			<td>关闭的回调</td>
			<td>''</td>
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
			<td>icon</td>
			<td>标题前的icon</td>
		</tr>
		</tbody>
	</table>
</div>


