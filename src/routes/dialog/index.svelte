<script>
	import { BeButton, BeDialog } from '$lib';

	let visible = false
	let message = ''
	$: {
		console.log('visible1', visible)
	}
	let openDialog = () => {
		visible = true
	}
</script>
<div class='page-container'>
	<h2>Dialog 对话框</h2>
	<p class='desc'>在保留当前页面状态的情况下，告知用户并承载相关操作。</p>
	<h3>基本用法</h3>
	<p>Dialog 弹出一个对话框，适合需要定制性更大的场景。</p>
	<div class="demo-block demo-dialog">
		<BeButton size="normal" type="primary" on:click={openDialog}>点击打开 Dialog</BeButton>
		<BeDialog bind:visible={visible} closeOnClickModal='false'>
			<p>{message}</p>
		</BeDialog>
	</div>
</div>
