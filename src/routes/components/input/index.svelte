<script lang="ts">
    import ReplBlock from '$lib/demo/ReplBlock.svelte';
</script>
<div class="page-container content">
	<h2>input 输入框</h2>
	<p>通过鼠标或键盘输入字符</p>
	<h3>基本用法</h3>
	<ol>
		<li>value = ''; 绑定选中的值</li>
		<li>placeholder = '';</li>
		<li>size = '';</li>
		<li>readonly = false;</li>
		<li>disabled = false;</li>
		<li>clearable = false; // 是否显示清除按钮</li>
		<li>validateEvent: boolean = true; // 是否发送验证表单</li>
		<li>type = 'text';</li>
		<li>name = '';</li>
		<li>suffixIcon = '';// 右侧icon TODO</li>
	</ol>
	<ReplBlock
		height='100vh'
		js={`import BeInput from '@brewer/beerui/be-input';
	let value = ''
	let maxlength = ''
	`}
		html={`
<div style='padding: 20px;'>
	<h3>尺寸</h3>
	<p>可通过 size 属性指定输入框的尺寸，除了默认的大小外，还提供了<code>medium</code> 、<code>small</code> 和<code>mini</code>  三种尺寸。</p>
	<BeInput placeholder="请输入内容" />
	<BeInput placeholder="请输入内容" size="medium" />
	<BeInput placeholder="请输入内容" size="small" />
	<BeInput placeholder="请输入内容" size="mini" />

	<h3>禁用状态</h3>
	<p>通过<code>disabled</code> 属性指定是否禁用 input 组件</p>
	<BeInput placeholder="请输入内容" disabled />
	<h3>类型</h3>
	<p>通过<code>type</code> 属性指定</p>
	maxlength='1'
	<BeInput maxlength='1' placeholder="请输入数字" />
	type='number'
	<BeInput type='number' maxlength='1' placeholder="请输入数字" />
	type='password'
	<BeInput type='password' placeholder="请输入密码" />
</div>
`}
	/>
</div>
