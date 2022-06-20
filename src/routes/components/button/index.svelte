<script>
	import { BeButton } from '$lib';
  import DemoBlock from '$lib/demo/DemoBlock.svelte';
  import BeIcon from '$lib/be-icon/BeIcon.svelte';

  const code = `
<div class='demo-list'>
	<BeButton class='demo-button' type="default">默认按钮</BeButton>
	<BeButton class='demo-button' type="primary">主要按钮</BeButton>
	<BeButton class='demo-button' type="success">成功按钮</BeButton>
	<BeButton class='demo-button' type="info">信息按钮</BeButton>
	<BeButton class='demo-button' type="warning">警告按钮</BeButton>
	<BeButton class='demo-button' type="danger">危险按钮</BeButton>
</div>
<div class='demo-list'>
	<BeButton class='demo-button' type="default" round>圆角按钮</BeButton>
	<BeButton class='demo-button' type="primary">主要按钮</BeButton>
	<BeButton class='demo-button' type="success">成功按钮</BeButton>
	<BeButton class='demo-button' type="info">信息按钮</BeButton>
	<BeButton class='demo-button' type="warning">警告按钮</BeButton>
	<BeButton class='demo-button' type="danger">危险按钮</BeButton>
</div>
<BeButton class='demo-button' disabled type="default" round>圆角按钮</BeButton>
<BeButton class='demo-button' disabled type="primary" round>主要按钮</BeButton>
<BeButton class='demo-button' disabled type="success" round>成功按钮</BeButton>
<BeButton class='demo-button' disabled type="info" round>信息按钮</BeButton>
<BeButton class='demo-button' disabled type="warning" round>警告按钮</BeButton>
<BeButton class='demo-button' disabled type="danger" round>危险按钮</BeButton>
<BeButton class='demo-button' icon='IconActivity' type="default" circle>
	<BeIcon name='add' color='#000' />
</BeButton>
<BeButton class='demo-button' type="primary" circle>
	<BeIcon name='books' color='#fff' />
</BeButton>
<BeButton class='demo-button' type="success" circle>
	<BeIcon name='call' color='#fff' />
</BeButton>
<BeButton class='demo-button' type="info" circle>
	<BeIcon name='chat' color='#fff' />
</BeButton>
<BeButton class='demo-button' type="warning" circle>
	<BeIcon name='clear' color='#fff' />
</BeButton>
<BeButton class='demo-button' type="danger" circle>
	<BeIcon name='cloud' color='#fff' />
</BeButton>
`
	const code2 = `
<div class='demo-list'>
	<BeButton class='demo-button' type="default">默认按钮</BeButton>
	<BeButton class='demo-button' type="default" size="medium">主要按钮</BeButton>
	<BeButton class='demo-button' type="default" size="small">成功按钮</BeButton>
	<BeButton class='demo-button' type="default" size="mini">信息按钮</BeButton>
</div>
<div class='demo-list'>
	<BeButton class='demo-button' type="default" round>圆角按钮</BeButton>
	<BeButton class='demo-button' type="default" size="medium" round>圆角按钮</BeButton>
	<BeButton class='demo-button' type="default" size="small" round>圆角按钮</BeButton>
	<BeButton class='demo-button' type="default" size="mini" round>圆角按钮</BeButton>
</div>
`
</script>
<div class='page-container'>
	<h2>BeButton 按钮</h2>
	<DemoBlock {code} js={`import { BeButton } from '@brewer/beerui`}>
		<div slot='source'>
			<div class='demo-list'>
				<BeButton class='demo-button' type="default">默认按钮</BeButton>
				<BeButton class='demo-button' type="primary">主要按钮</BeButton>
				<BeButton class='demo-button' type="success">成功按钮</BeButton>
				<BeButton class='demo-button' type="info">信息按钮</BeButton>
				<BeButton class='demo-button' type="warning">警告按钮</BeButton>
				<BeButton class='demo-button' type="danger">危险按钮</BeButton>
			</div>
			<div class='demo-list'>
				<BeButton class='demo-button' type="default" round>圆角按钮</BeButton>
				<BeButton class='demo-button' type="primary" round>主要按钮</BeButton>
				<BeButton class='demo-button' type="success" round>成功按钮</BeButton>
				<BeButton class='demo-button' type="info" round>信息按钮</BeButton>
				<BeButton class='demo-button' type="warning" round>警告按钮</BeButton>
				<BeButton class='demo-button' type="danger" round>危险按钮</BeButton>
			</div>
			<div class='demo-list'>
				<BeButton class='demo-button' disabled type="default" round>圆角按钮</BeButton>
				<BeButton class='demo-button' disabled type="primary">主要按钮</BeButton>
				<BeButton class='demo-button' disabled type="success">成功按钮</BeButton>
				<BeButton class='demo-button' disabled type="info">信息按钮</BeButton>
				<BeButton class='demo-button' disabled type="warning">警告按钮</BeButton>
				<BeButton class='demo-button' disabled type="danger">危险按钮</BeButton>
			</div>
			<div class='demo-list'>
				<BeButton class='demo-button' icon='IconActivity' type="default" circle>
					<BeIcon name='add' color='#000' />
				</BeButton>
				<BeButton class='demo-button' type="primary" circle>
					<BeIcon name='books' color='#fff' />
				</BeButton>
				<BeButton class='demo-button' type="success" circle>
					<BeIcon name='call' color='#fff' />
				</BeButton>
				<BeButton class='demo-button' type="info" circle>
					<BeIcon name='chat' color='#fff' />
				</BeButton>
				<BeButton class='demo-button' type="warning" circle>
					<BeIcon name='clear' color='#fff' />
				</BeButton>
				<BeButton class='demo-button' type="danger" circle>
					<BeIcon name='cloud' color='#fff' />
				</BeButton>
			</div>
		</div>
		<div slot='description'>
			使用type、plain、round、disabled和circle属性来定义 Button 的样式。
		</div>
	</DemoBlock>
	<h2>不同尺寸</h2>
	<DemoBlock code={code2}>
		<div slot='source'>
			<div class='demo-list'>
				<BeButton class='demo-button' type="default">默认按钮</BeButton>
				<BeButton class='demo-button' type="default" size="medium">主要按钮</BeButton>
				<BeButton class='demo-button' type="default" size="small">成功按钮</BeButton>
				<BeButton class='demo-button' type="default" size="mini">信息按钮</BeButton>
			</div>
			<div class='demo-list'>
				<BeButton class='demo-button' type="default" round>圆角按钮</BeButton>
				<BeButton class='demo-button' type="default" size="medium" round>圆角按钮</BeButton>
				<BeButton class='demo-button' type="default" size="small" round>圆角按钮</BeButton>
				<BeButton class='demo-button' type="default" size="mini" round>圆角按钮</BeButton>
			</div>
		</div>
		<div slot='description'>
			额外的尺寸：medium、small、mini，通过设置size属性来配置它们。
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
			<td>style</td>
			<td>style标签</td>
			<td>string</td>
			<td>-</td>
			<td>''</td>
		</tr>
		<tr>
			<td>nativeType</td>
			<td>按钮type</td>
			<td>string</td>
			<td>-</td>
			<td>button</td>
		</tr>
		<tr>
			<td>disabled</td>
			<td>禁用</td>
			<td>boolean</td>
			<td>true/false</td>
			<td>false</td>
		</tr>
		<tr>
			<td>circle</td>
			<td>圆形</td>
			<td>boolean</td>
			<td>true/false</td>
			<td>false</td>
		</tr>
		<tr>
			<td>round</td>
			<td>圆角按钮</td>
			<td>boolean</td>
			<td>true/false</td>
			<td>false</td>
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
			<td>default</td>
			<td>默认slot</td>
		</tr>
		</tbody>
	</table>
</div>

<style lang='scss' global>
	.demo-title {font-size: 22px;color: var(--text-color-primary);margin: 15px 0;}
	.demo-list {margin: 16px 0;}
</style>
