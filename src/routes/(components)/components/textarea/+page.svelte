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

<svelte:head>
	<title>Textarea 文本框 组件文档 BeerUi-官方文档</title>
	<meta name="description" content="BeerUi, 基于 svelte 的 PC端 组件库，base on svelte 3.0 web component">
	<meta name="keywords" content="Textarea 文本框, beerui组件文档,beerui,beerui文档,beerui官网, BeerUi,@brewer/beerui,svelte,component,svelteKit">
</svelte:head>
<div class="page-container content">
	<h2>Textarea 文本框</h2>
	<p>通过鼠标或键盘输入字符</p>
	<h3>基本用法</h3>
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
			<td>value</td>
			<td>绑定的值</td>
			<td>string / number</td>
			<td>-</td>
			<td>''</td>
		</tr>
		<tr>
			<td>placeholder</td>
			<td>提示文字</td>
			<td>string</td>
			<td>-</td>
			<td>''</td>
		</tr>
		<tr>
			<td>readonly</td>
			<td>只读</td>
			<td>boolean</td>
			<td>true/false</td>
			<td>false</td>
		</tr>
		<tr>
			<td>disabled</td>
			<td>禁用</td>
			<td>boolean</td>
			<td>true/false</td>
			<td>false</td>
		</tr>
		<tr>
			<td>maxlength</td>
			<td>最大长度</td>
			<td>string / number</td>
			<td>-</td>
			<td>''</td>
		</tr>
		<tr>
			<td>validateEvent</td>
			<td>开启表单验证</td>
			<td>boolean</td>
			<td>true/false</td>
			<td>true</td>
			</tr>
		</tbody>
	</table>
</div>
