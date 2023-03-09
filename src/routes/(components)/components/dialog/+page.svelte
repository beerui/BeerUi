<script lang="ts">
	import ReplBlock from '$lib/demo/ReplBlock.svelte';
	// let visible = false;
	// let isDrag = false
	// let isLimit = false
	//
	// function openInnerWindow(type: string) {
	// 	if (type === '1') {
	// 		messageBox({
	// 			title: 'Dialog inner MessageBox'
	// 		})
	// 	} else if (type === '2') {
	// 		showNotice({
	// 			title: 'Dialog inner Notice'
	// 		})
	// 	} else {
	// 		drawerVisible = true
	// 	}
	// }
	//
	// let drawerVisible = false;
</script>
<svelte:head>
	<title>BeDialog 对话框 组件文档 BeerUi-官方文档</title>
	<meta name="description" content="BeerUi, 基于 svelte 的 PC端 组件库，base on svelte 3.0 web component">
	<meta name="keywords" content="BeDialog 对话框, beerui组件文档,beerui,beerui文档,beerui官网, BeerUi,@brewer/beerui,svelte,component,svelteKit">
</svelte:head>
<div class='page-container'>
	<h2>BeDialog 对话框</h2>
	<p class='desc'>在保留当前页面状态的情况下，告知用户并承载相关操作。</p>
	<h3>用法示例</h3>
	<p>使用 <code>beforeClose</code>可以阻止关闭</p>
	<p>设置 <code>closeOnClickModal=false</code>,点击mask遮照也无法关闭！</p>

<!--	<BeButton on:click={() => visible = true}>打开弹框</BeButton>-->
<!--	visible: {visible}-->
<!--	<BeDialog-->
<!--		width='30%'-->
<!--		bind:visible-->
<!--	>-->
<!--		<p>Dialog 示例</p>-->
<!--		<BeButton on:click={() => openInnerWindow('1')}>打开MessageBox弹框</BeButton>-->
<!--		<BeButton on:click={() => openInnerWindow('2')}>打开Notice弹框</BeButton>-->
<!--		<BeButton on:click={() => openInnerWindow('3')}>打开Drawer弹框</BeButton>-->
<!--		<BeDrawer-->
<!--			bind:visible={drawerVisible}-->
<!--		>-->
<!--			<p>Drawer</p>-->
<!--		</BeDrawer>-->
<!--	</BeDialog>-->
	<ReplBlock
		js={`import { BeButton, BeDialog, BeSwitch } from '@brewer/beerui';
	const beforeClose = (type) => type !== 'cancel';
	let visible = false;
	let isDrag = false
  let isLimit = false
  let closeOnClickModal = true`}
		html={`<div style='padding: 20px;'>
	<div>
		<BeSwitch bind:checked={visible}>打开 Dialog</BeSwitch>
		<BeSwitch bind:checked={isDrag}>开启拖拽</BeSwitch>
		<BeSwitch bind:checked={isLimit}>限制拖拽范围</BeSwitch>
		<BeSwitch bind:checked={closeOnClickModal}>关闭遮照的点击</BeSwitch>
	</div>
	<hr>
		<BeDialog
			width='30%'
			bind:visible
			bind:isDrag={isDrag}
			bind:isLimit={isLimit}
			bind:closeOnClickModal={closeOnClickModal}
			beforeClose={beforeClose}
		>
			<p>Dialog 示例</p>
		</BeDialog>
	</div>
		`}
	/>

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
			<td>visible</td>
			<td>是否显示</td>
			<td>boolean</td>
			<td>true/false</td>
			<td>false</td>
		</tr>
		<tr>
			<td>mask</td>
			<td>遮罩层</td>
			<td>boolean</td>
			<td>true/false</td>
			<td>true</td>
		</tr>
		<tr>
			<td>title</td>
			<td>标题</td>
			<td>string</td>
			<td>-</td>
			<td>提示</td>
		</tr>
		<tr>
			<td>width</td>
			<td>对话框宽度</td>
			<td>string</td>
			<td>500px/100vw...</td>
			<td>50%</td>
		</tr>
		<tr>
			<td>isDrag</td>
			<td>是否拖拽</td>
			<td>boolean</td>
			<td>true/false</td>
			<td>false</td>
		</tr>
		<tr>
			<td>isLimit</td>
			<td>是否限制拖拽 限制上/下方</td>
			<td>boolean</td>
			<td>true/false</td>
			<td>false</td>
		</tr>
		<tr>
			<td>isFree</td>
			<td>打开无限制拖拽</td>
			<td>boolean</td>
			<td>true/false</td>
			<td>false</td>
		</tr>
		<tr>
			<td>isHideFooter</td>
			<td>隐藏footer</td>
			<td>boolean</td>
			<td>true/false</td>
			<td>false</td>
		</tr>
		<tr>
			<td>closeOnClickModal</td>
			<td>点击mask关闭Dialog</td>
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
			<td>beforeClose</td>
			<td>关闭 Dialog前触发, 返回值true/false false时不执行关闭操作</td>
			<td>true/false</td>
		</tr>
		</tbody>
	</table>
</div>

<style lang='scss' global>
  .demo-title {font-size: 22px;color: var(--text-color-primary);margin: 15px 0;}
  .demo-list {
    margin: 16px 0;
  }
</style>
