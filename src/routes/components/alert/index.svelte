<script lang='ts'>
	import { BeAlert } from '$lib';
	import DemoBlock from '$lib/demo/DemoBlock.svelte';
	import ReplBlock from '$lib/demo/ReplBlock.svelte';
</script>
<div class='page-container content'>
	<h2>Alert 警告</h2>
	<p>用于页面中展示重要的提示信息</p>
	<h3>基本用法</h3>
	<DemoBlock code={`
<BeAlert title='这是消息提示' type='info' />
<BeAlert title='成功提示的文案' type='success' />
<BeAlert title='警告提示的文案' type='warning' />
<BeAlert title='错误提示的文案' type='danger' />
`} js={`
import { BeAlert } from '@brewer/beerui';
`}>
		<div slot='source'>
			<div class='demo-list'>
				<BeAlert title='这是消息提示' type='info' description="This is Alert Desc" />
				<hr>
				<BeAlert title='成功提示的文案' type='success'>
					<i slot='icon' class='be-icon be-icon-check'></i>
				</BeAlert>
				<hr>
				<BeAlert title='警告提示的文案' type='warning' closeText='关闭' />
				<hr>
				<BeAlert title='错误提示的文案' type='danger' center />
			</div>
		</div>
	</DemoBlock>
	<h3>Repl</h3>
	<ReplBlock
		js={`import { BeAlert, BeSelect, BeOption } from '@brewer/beerui'
		let type = 'info'`}
		html={`<div style="padding: 20px;">
	<BeAlert title='这是消息提示' {type} description="This is Alert Desc" />
	<hr>
	<BeSelect bind:value={type}>
		<BeOption label='info' value='info'></BeOption>
		<BeOption label='success' value='success'></BeOption>
		<BeOption label='warning' value='warning'></BeOption>
		<BeOption label='danger' value='danger'></BeOption>
	</BeSelect>
</div>
`}
	/>

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
			<tr>
				<td>description</td>
				<td>辅助性文字</td>
				<td>string</td>
				<td>-</td>
				<td>''</td>
			</tr>
			<tr>
				<td>type</td>
				<td>类型</td>
				<td>string</td>
				<td>success/warning/info/error</td>
				<td>''</td>
			</tr>
			<tr>
				<td>closable</td>
				<td>是否可关闭</td>
				<td>boolean</td>
				<td>true/false</td>
				<td>true</td>
			</tr>
			<tr>
				<td>center</td>
				<td>是否居中</td>
				<td>boolean</td>
				<td>true/false</td>
				<td>false</td>
			</tr>
			<tr>
				<td>closeText</td>
				<td>关闭按钮自定义</td>
				<td>string</td>
				<td>-</td>
				<td>-</td>
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

