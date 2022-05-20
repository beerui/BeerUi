<script lang="ts">
    import DemoBlock from '$lib/demo/DemoBlock.svelte';
    import { BeTextarea } from '$lib';
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
	<DemoBlock code={`
<BeTextarea
	bind:value
	placeholder="请输入内容"
	on:blur={onBlurHandle}
	on:focus={onFocusHandle}
	on:change={onChangeHandle}
	on:input={onInputHandle}
/>
`} js={`
import { BeTextarea } from '@brewer/beerui';
let value = ''
`}>
		<div slot="source">
			<div class="demo-list">
				value: {value}
				<BeTextarea
					bind:value
					placeholder="请输入内容"
					on:blur={onBlurHandle}
					on:focus={onFocusHandle}
					on:change={onChangeHandle}
					on:input={onInputHandle}
					style='height: 100px;'
				/>
			</div>
		</div>
	</DemoBlock>
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
</div>
