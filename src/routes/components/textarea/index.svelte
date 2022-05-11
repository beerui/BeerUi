<script lang="ts">
    import DemoBlock from '$lib/demo/DemoBlock.svelte';
    import BeTextarea from '$lib/be-textarea/BeTextarea.svelte';
    let value = ''
    let input
    let maxlength;
    let number;
    let password;
    let email;
	const onBlurHandle = ({ detail }) => {
		console.log('onBlurHandle', detail);
	}
	const onFocusHandle = ({ detail }) => {
		console.log('onFocusHandle', detail);
	}
	const onChangeHandle = ({ detail }) => {
		console.log('onChangeHandle', detail);
	}
	const onInputHandle = ({ detail }) => {
		console.log('onInputHandle', detail);
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
`} js={`
import { BeInput } from '@brewer/beerui';
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
				/>
			</div>
		</div>
	</DemoBlock>
	<h3>禁用状态</h3>
	<p>通过<code>disabled</code> 属性指定是否禁用 BeTextarea 组件</p>
	<DemoBlock code={`
<BeInput placeholder="请输入内容" disabled />
`}>
		<div slot="source">
			<div class="demo-list">
				<BeTextarea bind:value placeholder="请输入内容" disabled />
				<BeTextarea bind:value placeholder="请输入内容" readonly />
			</div>
		</div>
	</DemoBlock>
</div>
