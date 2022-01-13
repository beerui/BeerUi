<script>
	import { BeButton } from '$lib';
  import DemoBlock from '$lib/demo/DemoBlock.svelte';
  import BeIcon from '$lib/be-icon/BeIcon.svelte';

  let js = `import { BeButton } from '@beerui/beerui'`
  let code = `
<div class='demo-list'>
	<BeButton size="normal" type="default">默认按钮</BeButton>
	<BeButton size="normal" type="primary">主要按钮</BeButton>
	<BeButton size="normal" type="success">成功按钮</BeButton>
	<BeButton size="normal" type="info">信息按钮</BeButton>
	<BeButton size="normal" type="warning">警告按钮</BeButton>
	<BeButton size="normal" type="danger">危险按钮</BeButton>
</div>
<div class='demo-list'>
	<BeButton size="normal" round='lg' type="default">圆角按钮</BeButton>
	<BeButton size="normal" round='lg' type="primary">主要按钮</BeButton>
	<BeButton size="normal" round='lg' type="success">成功按钮</BeButton>
	<BeButton size="normal" round='lg' type="info">信息按钮</BeButton>
	<BeButton size="normal" round='lg' type="warning">警告按钮</BeButton>
	<BeButton size="normal" round='lg' type="danger">危险按钮</BeButton>
</div>
<BeButton class='demo-button' size="normal" round='circle' icon='IconActivity' type="default">
	<BeIcon name='add' fill='#000' />
</BeButton>
<BeButton class='demo-button' size="normal" round='circle' type="primary">
	<BeIcon name='books' fill='#fff' />
</BeButton>
<BeButton class='demo-button' size="normal" round='circle' type="success">
	<BeIcon name='call' fill='#fff' />
</BeButton>
<BeButton class='demo-button' size="normal" round='circle' type="info">
	<BeIcon name='chat' fill='#fff' />
</BeButton>
<BeButton class='demo-button' size="normal" round='circle' type="warning">
	<BeIcon name='clear' fill='#fff' />
</BeButton>
<BeButton class='demo-button' size="normal" round='circle' type="danger">
	<BeIcon name='cloud' fill='#fff' />
</BeButton>
`
</script>
<div class='page-container'>
	<DemoBlock {code} {js}>
		<div slot='source'>
			<div class='demo-list'>
				<BeButton class='demo-button' size="normal" type="default">默认按钮</BeButton>
				<BeButton class='demo-button' size="normal" type="primary">主要按钮</BeButton>
				<BeButton class='demo-button' size="normal" type="success">成功按钮</BeButton>
				<BeButton class='demo-button' size="normal" type="info">信息按钮</BeButton>
				<BeButton class='demo-button' size="normal" type="warning">警告按钮</BeButton>
				<BeButton class='demo-button' size="normal" type="danger">危险按钮</BeButton>
			</div>
			<div class='demo-list'>
				<BeButton class='demo-button' size="normal" round='lg' type="default">圆角按钮</BeButton>
				<BeButton class='demo-button' size="normal" round='lg' type="primary">主要按钮</BeButton>
				<BeButton class='demo-button' size="normal" round='lg' type="success">成功按钮</BeButton>
				<BeButton class='demo-button' size="normal" round='lg' type="info">信息按钮</BeButton>
				<BeButton class='demo-button' size="normal" round='lg' type="warning">警告按钮</BeButton>
				<BeButton class='demo-button' size="normal" round='lg' type="danger">危险按钮</BeButton>
			</div>
			<div class='demo-list'>
				<BeButton class='demo-button' size="normal" round='circle' icon='IconActivity' type="default">
					<BeIcon name='add' fill='#000' />
				</BeButton>
				<BeButton class='demo-button' size="normal" round='circle' type="primary">
					<BeIcon name='books' fill='#fff' />
				</BeButton>
				<BeButton class='demo-button' size="normal" round='circle' type="success">
					<BeIcon name='call' fill='#fff' />
				</BeButton>
				<BeButton class='demo-button' size="normal" round='circle' type="info">
					<BeIcon name='chat' fill='#fff' />
				</BeButton>
				<BeButton class='demo-button' size="normal" round='circle' type="warning">
					<BeIcon name='clear' fill='#fff' />
				</BeButton>
				<BeButton class='demo-button' size="normal" round='circle' type="danger">
					<BeIcon name='cloud' fill='#fff' />
				</BeButton>
			</div>
		</div>
		<div slot='description'>
			使用type、plain、round和circle属性来定义 Button 的样式。
		</div>
	</DemoBlock>
</div>

<style lang='scss' global>
	.demo-title {font-size: 22px;color: var(--text-color-primary);margin: 15px 0;}
	.demo-list {margin: 16px 0;}
</style>
