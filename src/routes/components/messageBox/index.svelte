<script lang="ts">
	import { BeButton, showNotice } from '$lib';
	import DemoBlock from '$lib/demo/DemoBlock.svelte';
	import messageBox from '$lib/utils/MessageBox';

	const openMessage = () => {
		messageBox({
			title: 'i am title',
			message: 'i am message content!',
			buttons: [
				{ text: '取消', customClass: 'be-button be-button--default', cb: ctx => ctx.close(), prevIcon: 'loading' },
				{ text: '确定', type: 'submit', customClass: 'be-button be-button--normal be-button--primary', cb: () => console.log('确定') },
			],
			beforeClose() {
				return true
			},
			complete() {
				console.log('complete');
			}
		})
	}
	const openTypeMessage = (type) => {
		messageBox({
			type,
			title: 'i am title',
			message: 'i am message content!'
		})
	}

	function openNotice() {
		showNotice({
			title: '滕王阁序',
			message: '落霞与孤鹜齐飞,秋水共长天一色',
			duration: 0
		});
	}
</script>
<div class='page-container'>
	<h2 on:click={openNotice}>MessageBox 弹框</h2>
	<p class='desc'>模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容。</p>
	<h3>基本用法</h3>

	<DemoBlock
		code={`
<BeButton size="normal" type="warning" on:click={() => openTypeMessage('warning')}>打开 warning MessageBox</BeButton>`}
	js={`
import { messageBox } from '@brewer/beerui'
const openMessage = () => {
		messageBox({
			title: 'i am title',
			message: 'i am message content!',
			buttons: [
				{ text: '取消', customClass: 'be-button be-button--default', cb: ctx => ctx.close(), prevIcon: 'loading' },
				{ text: '确定', type: 'submit', customClass: 'be-button be-button--normal be-button--primary', cb: () => console.log('确定') },
			],
			beforeClose() {
				return true
			},
			complete() {
				console.log('complete');
			}
		})
	}
}
const openTypeMessage = (type) => {
	messageBox({
		type ,
		title: 'i am title',
		message: 'i am message content!'
	})
}
	`}>
		<div slot='source'>
			<div class='demo-list'>
				<BeButton size="normal" type="primary" on:click={openMessage}>打开 messageBox</BeButton>
				<hr>
				<BeButton size="normal" type="success" on:click={() => openTypeMessage('success')}>打开 success MessageBox</BeButton>
				<hr>
				<BeButton size="normal" type="warning" on:click={() => openTypeMessage('warning')}>打开 warning MessageBox</BeButton>
			</div>
		</div>
	</DemoBlock>
	<hr>
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
				<td>type</td>
				<td>消息类型，用于显示图标</td>
				<td>string</td>
				<td>success / info / warning / error</td>
				<td>''</td>
			</tr>
			<tr>
				<td>title</td>
				<td>标题</td>
				<td>string</td>
				<td>-</td>
				<td>提示</td>
			</tr>
			<tr>
				<td>message</td>
				<td>消息正文内容</td>
				<td>string</td>
				<td>-</td>
				<td>''</td>
			</tr>
			<tr>
				<td>buttons</td>
				<td>底部按钮组</td>
				<td>[RenderBtn]</td>
				<td>-</td>
				<td>[]</td>
			</tr>
			<tr>
				<td>customClass</td>
				<td>自定义类名</td>
				<td>string</td>
				<td>-</td>
				<td>''</td>
			</tr>
			<tr>
				<td>showClose</td>
				<td>展示右上角的关闭按钮</td>
				<td>boolean</td>
				<td>true/false</td>
				<td>true</td>
			</tr>
			<tr>
				<td>closeOnClickModal</td>
				<td>是否可通过点击遮罩关闭</td>
				<td>boolean</td>
				<td>true/false</td>
				<td>true</td>
			</tr>
			<tr>
				<td>lockScroll</td>
				<td>是否在 MessageBox 出现时将 body 滚动锁定</td>
				<td>boolean</td>
				<td>true/false</td>
				<td>true</td>
			</tr>
		</tbody>
	</table>
	<h3 class='demo-table-title'>Events</h3>
	<table class='demo-table'>
		<thead>
		<tr>
			<th>事件名称</th>
			<th>说明</th>
			<th>回调参数</th>
		</tr>
		</thead>
		<tbody>
			<tr>
				<td>complete</td>
				<td>渲染完成的回调函数</td>
				<td>''</td>
			</tr>
			<tr>
				<td>beforeClose</td>
				<td>MessageBox 关闭前的回调，会暂停实例的关闭</td>
				<td>(event) => return true</td>
			</tr>
			<tr>
				<td>closed</td>
				<td>关闭后的回调</td>
				<td>(event)</td>
			</tr>
		</tbody>
	</table>

	<pre class='demo-pre'>
			{`
type RenderBtn = {
    cb?: Function // click handle callback
    customClass?: string
    style?: string
    type?: string // button/submit
    text?: string // button text
    prevIcon?: string // button prev icon name
    nextIcon?: string // button next icon name
}`}
	</pre>
</div>

<style lang='scss' global>
  .demo-title {font-size: 22px;color: var(--text-color-primary);margin: 15px 0;}
  .demo-list {
    margin: 16px 0;
  }
</style>
