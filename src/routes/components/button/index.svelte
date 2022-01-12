<script>
	import { BeButton } from '$lib';
  import DemoBlock from '$lib/demo/DemoBlock.svelte';

  let js = `import { BeButton } from '$lib'`
  let code =
`
// Size
<BeButton size="large" type="primary">提交</BeButton>
<BeButton size="medium" type="primary">提交</BeButton>
<BeButton size="normal" type="primary">提交</BeButton>
<BeButton size="small" type="primary">提交</BeButton>
<BeButton size="mini" type="primary">提交</BeButton>
// Type
<BeButton size="normal" type="default">提交</BeButton>
<BeButton size="normal" type="primary">提交</BeButton>
<BeButton size="normal" type="success">提交</BeButton>
<BeButton size="normal" type="info">提交</BeButton>
<BeButton size="normal" type="warning">提交</BeButton>
<BeButton size="normal" type="danger">提交</BeButton>
// Round
<BeButton size="normal" round='circle' type="primary">circle</BeButton>
<BeButton size="normal" round='lg' type="primary">lg</BeButton>
<BeButton size="normal" round='md' type="primary">md</BeButton>
<BeButton size="normal" round='mini' type="primary">mini</BeButton>
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
				<BeButton class='demo-button' size="normal" round='circle' type="default"><div class='be-icon'>+</div></BeButton>
				<BeButton class='demo-button' size="normal" round='circle' type="primary"><div class='be-icon'>-</div></BeButton>
				<BeButton class='demo-button' size="normal" round='circle' type="success"><div class='be-icon'>*</div></BeButton>
				<BeButton class='demo-button' size="normal" round='circle' type="info"><div class='be-icon'>/</div></BeButton>
				<BeButton class='demo-button' size="normal" round='circle' type="warning"><div class='be-icon'>=</div></BeButton>
				<BeButton class='demo-button' size="normal" round='circle' type="danger"><div class='be-icon'>@</div></BeButton>
			</div>
		</div>
		<div slot='description'>
			使用type、plain、round和circle属性来定义 Button 的样式。
		</div>
	</DemoBlock>
</div>

<style lang='scss' global>
	.demo-title {font-size: 22px;color: var(--text-color-primary);margin: 15px 0;}
	.demo-list {
		margin: 16px 0;
    .demo-button {margin-right: 10px;}
	}
</style>
