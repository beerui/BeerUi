<script lang="ts">
    import DemoBlock from '$lib/demo/DemoBlock.svelte';
    import { BeTextarea } from '$lib';
    import ReplBlock from '$lib/demo/ReplBlock.svelte';
    let value = ''
    let value1 = 'BeTextarea disabled'
    let value2 = 'BeTextarea readonly'
	const onBlurHandle = () => {
		console.log('onBlurHandle', value);
	}
	const onFocusHandle = () => {
		console.log('onFocusHandle', value);
	}
	const onChangeHandle = () => {
		console.log('onChangeHandle', value);
	}
	const onInputHandle = () => {
		console.log('onInputHandle', value);
	}
</script>
<div class="page-container content">
	<h2>textarea 文本框</h2>
	<p>通过鼠标或键盘输入字符</p>
	<h3>基本用法</h3>

	<ol>
		<li>value</li>
		<li>placeholder</li>
		<li>readonly</li>
		<li>disabled</li>
		<li>maxlength</li>
		<li>blur 事件监听</li>
		<li>focus 事件监听</li>
		<li>change 事件监听</li>
		<li>input 事件监听</li>
	</ol>

	<ReplBlock
		js={`import BeTextarea from '@brewer/beerui/be-textarea';
	let value = ''

	const onBlurHandle = () => {
		console.log('onBlurHandle', value);
	}
	const onFocusHandle = () => {
		console.log('onFocusHandle', value);
	}
	const onChangeHandle = () => {
		console.log('onChangeHandle', value);
	}
	const onInputHandle = () => {
		console.log('onInputHandle', value);
	}
	`}
		html={`
<div style='padding: 20px;'>
	<BeTextarea
		bind:value
		placeholder="请输入内容"
		on:blur={onBlurHandle}
		on:focus={onFocusHandle}
		on:change={onChangeHandle}
		on:input={onInputHandle}
		style='height: 100px;'
	/>
	<BeTextarea
		value='disabled'
		disabled
	/>
	<BeTextarea
		value='readonly'
		readonly
	/>
</div>
`}
	/>
	<h3>禁用状态</h3>
	<p>通过<code>disabled</code> 属性指定是否禁用 BeTextarea 组件</p>
	<DemoBlock code={`
<BeTextarea bind:value={value1} placeholder="请输入内容" disabled />
<BeTextarea bind:value={value2} placeholder="请输入内容" readonly />
`}>
		<div slot="source">
			<div class="demo-list">
				<div>disabled</div>
				<hr>
				<BeTextarea bind:value={value1} placeholder="请输入内容" disabled />
				<div>readonly</div>
				<hr>
				<BeTextarea bind:value={value2} placeholder="请输入内容" readonly />
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
