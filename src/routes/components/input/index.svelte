<script lang="ts">
    import BeInput from '$lib/be-input/BeInput.svelte'
    import { onMount } from 'svelte'
    import DemoBlock from '$lib/demo/DemoBlock.svelte';
    let value = ''
    let input
    onMount(()=>{
      console.log(input)
    })
    let number;
    let password;
    let email;
</script>
<div class="page-container content">
	<h2>input 输入框</h2>
	<p>通过鼠标或键盘输入字符</p>
	<h3>基本用法</h3>

	<ol>
		<li>checked 绑定选中的值</li>
		<li>inactiveColor 选中颜色</li>
		<li>change 事件监听</li>
	</ol>
	<h3>尺寸</h3>
	<p>可通过 size 属性指定输入框的尺寸，除了默认的大小外，还提供了<code>medium</code> 、<code>small</code> 和<code>mini</code>  三种尺寸。</p>
	<DemoBlock code={`
<BeInput bind:value placeholder="请输入内容" />
<BeInput bind:value placeholder="请输入内容"  size="medium" />
<BeInput bind:value placeholder="请输入内容"  size="small" />
<BeInput bind:value placeholder="请输入内容"  size="mini" />
`} js={`
import { BeInput } from '@brewer/beerui';
let value = ''
`}>
		<div slot="source">
			<div class="demo-list">
				<BeInput bind:value placeholder="请输入内容" />
				<hr>
				<BeInput bind:value placeholder="请输入内容" size="medium" />
				<hr>
				<BeInput bind:value placeholder="请输入内容" size="small" />
				<hr>
				<BeInput bind:value placeholder="请输入内容" size="mini" />
			</div>
		</div>
	</DemoBlock>
	<h3>禁用状态</h3>
	<p>通过<code>disabled</code> 属性指定是否禁用 input 组件</p>
	<DemoBlock code={`
<BeInput placeholder="请输入内容" disabled />
`}>
		<div slot="source">
			<div class="demo-list">
				<BeInput bind:value placeholder="请输入内容" disabled />
			</div>
		</div>
	</DemoBlock>
	<h3>类型</h3>
	<p>通过<code>type</code> 属性指定</p>
	<DemoBlock code={`
<BeInput bind:value={number} type='number' placeholder="请输入数字" />
<BeInput bind:value={password} type='password' placeholder="请输入密码" />
`}>
		<div slot="source">
			<div class="demo-list">
				number：{number}<BeInput bind:value={number} type='number' placeholder="请输入数字" />
				<hr>
				password：{password}<BeInput bind:value={password} type='password' placeholder="请输入密码" />
			</div>
		</div>
	</DemoBlock>
</div>
