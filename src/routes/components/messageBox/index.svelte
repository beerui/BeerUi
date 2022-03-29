<script lang="ts">
	import { BeButton } from '$lib';
	import DemoBlock from '$lib/demo/DemoBlock.svelte';
	import messageBox from '$lib/utils/MessageBox';

	const openMessage = () => {
		messageBox({
			title: 'i am title',
			message: 'i am message content!',
			beforeClose() {
				return true
			},
			complete() {
				console.log('complete');
			},
			confirm() {
				console.log('confirm');
			},
			cancel() {
				console.log('cancel');
			}
		})
	}
	const openTypeMessage = () => {
		messageBox({
			type: 'success',
			title: 'i am title',
			message: 'i am message content!'
		})
	}
</script>
<div class='page-container'>
	<h2>MessageBox 弹框</h2>
	<p class='desc'>模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容。</p>
	<h3>基本用法</h3>
	<ol>
		<li>confirm: Function; 点击确定按钮的回调函数</li>
		<li>cancel: Function;点击取消按钮的回调函数</li>
		<li>complete: Function = null; // 渲染完成的回调函数</li>
		<li>type: string = 'normal'; // 消息类型，用于显示图标 success / info / warning / error</li>
		<li>title: string = '提示'; // MessageBox 标题</li>
		<li>message: string = ''; // MessageBox 消息正文内容</li>
		<li>customClass: string = ''; // MessageBox 的自定义类名</li>
		<li>confirmButtonText: string = '确定';</li>
		<li>cancelButtonText: string = '取消';</li>
		<li>showClose: boolean = true; // MessageBox 是否显示右上角关闭按钮</li>
		<li>showCancelButton: boolean = true; // 是否显示取消按钮</li>
		<li>showConfirmButton: boolean = true; // 是否显示确定按钮</li>
		<li>closeOnClickModal: boolean = true; // 是否可通过点击遮罩关闭 MessageBox</li>
		<li>lockScroll: boolean = true; // 是否在 MessageBox 出现时将 body 滚动锁定</li>
		<li>beforeClose: Function = null; // MessageBox 关闭前的回调，会暂停实例的关闭</li>
		<li>closed: Function = null; // 关闭后的回调</li>
	</ol>
	<h3>消息提示</h3>
	<DemoBlock
	js={`
import { messageBox } from '@brewer/beerui'
const openMessage = () => {
	messageBox({
		title: 'i am title',
		message: 'i am message content!',
		beforeClose() {
			return true
		},
		complete() {
			console.log('complete');
		},
		confirm() {
			console.log('confirm');
		},
		cancel() {
			console.log('cancel');
		}
	})
}
const openTypeMessage = () => {
	messageBox({
		type: 'success',
		title: 'i am title',
		message: 'i am message content!'
	})
}
	`}>
		<div slot='source'>
			<div class='demo-list'>
				<BeButton size="normal" type="primary" on:click={openMessage}>打开 messageBox</BeButton>
				<hr>
				<BeButton size="normal" type="success" on:click={openTypeMessage}>打开 messageBox 带有类型</BeButton>
			</div>
		</div>
	</DemoBlock>
	<hr>
</div>

<style lang='scss' global>
  .demo-title {font-size: 22px;color: var(--text-color-primary);margin: 15px 0;}
  .demo-list {
    margin: 16px 0;
  }
</style>
