<script lang="ts">
	import { BeButton, BeDialog } from '$lib';

	let visible1 = false
	let visible2 = false
	let visible3 = false
	let openDialog1 = () => visible1 = true
	let openDialog2 = () => visible2 = true
	let openDialog3 = () => visible3 = true
	const beforeClose1 = (evt) => console.log('beforeClose1', evt.detail)
	const beforeClose2 = (evt) => console.log('beforeClose2', evt.detail)
	const beforeClose3 = (evt) => console.log('beforeClose3', evt.detail)
</script>
<div class='page-container'>
	<h2>Dialog 对话框</h2>
	<p class='desc'>在保留当前页面状态的情况下，告知用户并承载相关操作。</p>
	<h3>基本用法</h3>
	<p>Dialog 弹出一个对话框，适合需要定制性更大的场景。</p>
	<div class="demo-block demo-dialog">
		<BeButton size="normal" type="primary" on:click={openDialog1} nativeType='submit'>基础 Dialog</BeButton>
		<BeDialog bind:visible={visible1} closeOnClickModal={false} on:beforeClose={beforeClose1}>
			<p>这里是对话框内容</p>
		</BeDialog>
	</div>
	<div class="demo-block demo-dialog">
		<BeButton size="normal" type="primary" on:click={openDialog2} autofocus>可以拖拽的 Dialog 点击mask可关闭 自动聚焦</BeButton>
		<BeDialog bind:visible={visible2} closeOnClickModal={true} on:beforeClose={beforeClose2} isDrag={true}>
			<p>这里是对话框内容</p>
		</BeDialog>
	</div>
	<div class="demo-block demo-dialog">
		<BeButton size="normal" type="primary" on:click={openDialog3}>限制拖拽范围的 Dialog</BeButton>
		<BeDialog bind:visible={visible3} closeOnClickModal={false} on:beforeClose={beforeClose3} isDrag={true} isLimit={true}>
			<p>这里是对话框内容</p>
		</BeDialog>
	</div>

	<code >
		{@html
			`let visible = false
			let openDialog = () => {
				visible = true
			}
			const beforeClose = (evt) => {
				console.log(evt.detail)
			}`
		}
	</code>
</div>
