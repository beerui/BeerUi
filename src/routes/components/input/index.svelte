<script lang="ts">
    import ReplBlock from '$lib/demo/ReplBlock.svelte';
    import BeInput from '$lib/be-input/index.js';
</script>
<div class="page-container content">
	<h2>input 输入框</h2>
	<p>通过鼠标或键盘输入字符</p>
	<h3>基本用法</h3>
	<BeInput placeholder="请输入内容" />
	<BeInput placeholder="请输入内容" clearable />
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
	<BeInput placeholder="请输入内容" clearable />
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
			<td>string</td>
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
			<td>size</td>
			<td>尺寸</td>
			<td>string</td>
			<td>medium/small/mini</td>
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
			<td>clearable</td>
			<td>是否显示清除按钮</td>
			<td>boolean</td>
			<td>true/false</td>
			<td>false</td>
		</tr>
		<tr>
			<td>validateEvent</td>
			<td>是否发送验证表单</td>
			<td>boolean</td>
			<td>true/false</td>
			<td>true</td>
		</tr>
		<tr>
			<td>type</td>
			<td>input的type</td>
			<td>string</td>
			<td>-</td>
			<td>text</td>
		</tr>
		<tr>
			<td>name</td>
			<td>input的name</td>
			<td>string</td>
			<td>-</td>
			<td>''</td>
		</tr>
		<tr>
			<td>suffixIcon</td>
			<td>后置图标</td>
			<td>string</td>
			<td>-</td>
			<td>''</td>
		</tr>
		<tr>
			<td>validateEvent</td>
			<td>输入时是否触发表单的校验</td>
			<td>boolean</td>
			<td>true/false</td>
			<td>true</td>
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
				<td>blur</td>
				<td>在 Input 失去焦点时触发</td>
				<td>(event: Event)</td>
			</tr>
			<tr>
				<td>focus</td>
				<td>在 Input 获得焦点时触发</td>
				<td>(event: Event)</td>
			</tr>
			<tr>
				<td>change</td>
				<td>仅在输入框失去焦点或用户按下回车时触发</td>
				<td>(value: string | number)</td>
			</tr>
			<tr>
				<td>change</td>
				<td>仅在输入框失去焦点或用户按下回车时触发</td>
				<td>(value: string | number)</td>
			</tr>
			<tr>
				<td>input</td>
				<td>在 Input 值改变时触发</td>
				<td>(value: string | number)</td>
			</tr>
			<tr>
				<td>clear</td>
				<td>在点击由 clearable 属性生成的清空按钮时触发</td>
				<td>-</td>
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
