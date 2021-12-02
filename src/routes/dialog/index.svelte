<script>
	import { BeButton, BeDialog } from '$lib';
	import { model } from '$lib/stores';

	let showModal = false
	let message = ''
	let openDialog = () => {
		console.log('openDialog')
		showModal = true
		model.set({ delay: 3000, show: true, message: '没有角色，请联系管理员！' })
	}
</script>
<div class='page-container'>
	<h2>Dialog 对话框</h2>
	<p class='desc'>在保留当前页面状态的情况下，告知用户并承载相关操作。</p>
	<h3>基本用法</h3>
	<p>Dialog 弹出一个对话框，适合需要定制性更大的场景。</p>
	<div class="demo-block demo-dialog">
		<BeButton size="normal" type="primary" on:click={openDialog}>点击打开 Dialog</BeButton>
		<BeDialog visible={showModal}>
			<p>{message}</p>
		</BeDialog>
	</div>
</div>
