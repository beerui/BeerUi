<script lang='ts'>
import BeIcon from '$lib/be-icon/BeIcon.svelte';
import { showNotice } from '$lib/utils/notice';
import Clipboard from '$utils/Clipboard';

const ClipboardHandle = icon => {
	showNotice({
		toast: true,
		message: '已复制代码' + icon,
		type: 'success'
	})
	Clipboard(icon)
}
</script>
<h2 class='title'>What's BeerUi?</h2>
<h3 class='desc'>A Svelte UI Components</h3>
<div class='m-content'>
	<div class='start-btn'>
		<a href='/components/icons'>Start Now</a>
	</div>
	<div class='content'>
		<div class='code' title='Copy Code To Clipboard' on:click={() => ClipboardHandle(`npm i @brewer/beerui`)}>
			npm i @brewer/beerui
			<div class='icon'><BeIcon name='file-copy' width='18' height='18' /></div>
		</div>
	</div>
</div>

<style lang='scss'>
	.title {color: #f0f8ff;text-align: center;margin: 100px 0 0;font-size: 100px;text-shadow: 0 4px 4px rgb(0 0 0 / 25%);}
	.desc {color: #f0f8ff;padding: 40px 0;text-align: center;font-size: 36px;text-shadow: 0 4px 4px rgb(0 0 0 / 25%);}
	.content{
		color: #f0f8ff;text-indent:50px;padding-bottom: 20px;width: 50%; margin: 0 auto;line-height: 1.8;
		font-size: 18px;letter-spacing: 1.2px;text-shadow: 0 4px 4px rgb(0 0 0 / 25%);
	}
	.start-btn {
		a {
			display: block;width: 220px;margin: 50px auto;text-align: center;color: #f0f8ff;font-size: 18px;letter-spacing: 1.6px;
			border-top: 1px solid #ffffff;padding: 15px;transition: .6s;box-shadow: inset 0 0 15px 3px rgb(25 65 115 / 19%);
			&:hover {
				text-shadow: 0 4px 4px rgb(0 0 0 / 45%);box-shadow: 0 0 15px 1px rgb(25 65 115 / 19%);transition: .6s;
			}
		}
	}

	.code {
		background-color: #000000;
		margin-top: 80px;
		margin-bottom: 80px;
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
