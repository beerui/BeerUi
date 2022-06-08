<script lang="ts">
	import { showNotice, BeIcon } from '$lib';
	import Clipboard from '$utils/Clipboard';
	export let code = 'npm i @brewer/beerui'
	const ClipboardHandle = icon => {
		showNotice({
			toast: true,
			message: '已复制' + icon,
			type: 'success'
		})
		Clipboard(icon)
	}
</script>
<div class='content'>
	<div class='code' title='Copy Code To Clipboard' on:click={() => ClipboardHandle(code)}>
		{code}
		<div class='icon'><BeIcon name='file-copy' width='18' height='18' /></div>
	</div>
</div>

<style lang='scss'>
	.content{
		color: #f0f8ff;text-indent:10px;line-height: 1.8;margin-bottom: 10px;
		font-size: 16px;letter-spacing: 1.2px;text-shadow: 0 4px 4px rgb(0 0 0 / 25%);
	}
	.code {
		background-color: #000000;
		padding: 5px 15px;
		border: 0;
		display: flex;
		align-items: center;
		border-radius: 4px;
		cursor: pointer;
		justify-content: space-between;
		box-shadow: 9px 7px 15px 1px rgb(25 65 115 / 19%);
	}
	.icon {
		margin-left: 15px;
		margin-top: -2px;
		color: #f2f2f2;
		text-shadow: 0 4px 4px rgb(0 0 0 / 25%);
		&:hover {
			color: #f0f8ff;
		}
	}
</style>
