<script lang="ts">
	import { BeButton, BeDialog } from '$lib';
	import DemoBlock from '$lib/demo/DemoBlock.svelte';

	let visible1 = false
	let visible2 = false
	let visible3 = false
	let visible4 = false
	let openDialog1 = () => visible1 = true
	let openDialog2 = () => visible2 = true
	let openDialog3 = () => visible3 = true
	let openDialog4 = () => visible4 = true
	const beforeClose1 = (type) => type !== 'cancel'


	let code = `
<BeDialog width='30%' bind:visible={visible1} beforeClose={beforeClose1}>
	<p>基础 Dialog</p>
</BeDialog>`
	const code1 = `
<BeDialog bind:visible={visible2} closeOnClickModal={false} isDrag={true}>
	<p>点击Mask不可以关闭</p>
</BeDialog>
	`
	const code3 = `
<BeDialog bind:visible={visible3} isDrag={true} isLimit={true}>
	<p>限制拖拽范围</p>
</BeDialog>
	`
	const code2 = `
<BeDialog bind:visible={visible4} isDrag={true} isFree={true}>
	<p>拖拽完全自由</p>
</BeDialog>
	`
</script>
<div class='page-container'>
	<h2>BeDialog 对话框</h2>
	<p class='desc'>在保留当前页面状态的情况下，告知用户并承载相关操作。</p>
	<h3>基本用法</h3>
	<ol>
		<li>mask = true // 是否需要遮罩层</li>
		<li>width = '50%' // 对话框宽度</li>
		<li>isDrag = false // 是否需要拖拽</li>
		<li>isLimit = false // 限制拖拽</li>
		<li>isFree = false // 限制拖拽</li>
		<li>visible = true // 是否显示 Dialog</li>
		<li>isHideFooter = false // 是否显示 footer</li>
		<li>title = '提示' // 标题文字</li>
		<li>closeOnClickModal = true // 是否可以通过点击 modal 关闭 Dialog</li>
		<li>beforeClose = null // 关闭 Dialog前触发 接收返回值true/false false时不执行关闭操作</li>
	</ol>
	<DemoBlock {code} js={`
	           import { BeButton, BeDialog } from '@brewer/beerui';
	const beforeClose1 = (type) => type !== 'cancel'
	`}>
		<div slot='source'>
			<div class='demo-list'>
				<BeButton size="normal" type="primary" on:click={openDialog1} nativeType='submit'>打开 Dialog</BeButton>
				<BeDialog width='30%' bind:visible={visible1} beforeClose={beforeClose1}>
					<p>基础 Dialog</p>
				</BeDialog>
			</div>
		</div>
		<div slot='description'>
			width='30%'
		</div>
	</DemoBlock>
	<hr>
	<DemoBlock code={code1}>
		<div slot='source'>
			<div class='demo-list'>
				<BeButton size="normal" type="primary" on:click={openDialog2} autofocus>打开 Dialog</BeButton>
				<BeDialog bind:visible={visible2} closeOnClickModal={false} isDrag={true}>
					<p>点击Mask不可以关闭</p>
				</BeDialog>
			</div>
		</div>
		<div slot='description'>
			基础拖拽 点击Mask不可以关闭
		</div>
	</DemoBlock>
	<hr>
	<DemoBlock code={code2}>
		<div slot='source'>
			<div class='demo-list'>
				<BeButton size="normal" type="primary" on:click={openDialog3}>限制拖拽范围</BeButton>
				<BeDialog bind:visible={visible3} isDrag={true} isLimit={true}>
					<p>限制拖拽范围</p>
				</BeDialog>
			</div>
		</div>
		<div slot='description'>
			限制拖拽范围
		</div>
	</DemoBlock>
	<hr>
	<DemoBlock code={code3}>
		<div slot='source'>
			<div class='demo-list'>
				<BeButton size="normal" type="primary" on:click={openDialog4}>完全自由</BeButton>
				<BeDialog bind:visible={visible4} isDrag={true} isFree={true}>
					<p>拖拽完全自由</p>
				</BeDialog>
			</div>
		</div>
		<div slot='description'>
			拖拽完全自由
		</div>
	</DemoBlock>
</div>

<style lang='scss' global>
  .demo-title {font-size: 22px;color: var(--text-color-primary);margin: 15px 0;}
  .demo-list {
    margin: 16px 0;
  }
</style>
