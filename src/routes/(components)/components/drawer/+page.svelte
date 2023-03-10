<script lang="ts">
	import { BeButton, BeDrawer, BeRadio, BeRadioGroup } from '$lib';
	import DemoBlock from '$lib/demo/DemoBlock.svelte';

	let visible = false
	let direction = 'rtl'
</script>
<svelte:head>
	<title>BeDrawer 抽屉 组件文档 BeerUi-官方文档</title>
	<meta name="description" content="BeerUi, 基于 svelte 的 PC端 组件库，base on svelte 3.0 web component">
	<meta name="keywords" content="BeDrawer 抽屉, beerui组件文档,beerui,beerui文档,beerui官网, BeerUi,@brewer/beerui,svelte,component,svelteKit">
</svelte:head>
<div class='page-container'>
	<h2>BeDrawer 抽屉</h2>
	<p class='desc'>有些时候, Dialog 组件并不满足我们的需求, 比如你的表单很长, 亦或是你需要临时展示一些文档, Drawer 拥有和 Dialog 几乎相同的 API, 在 UI 上带来不一样的体验.</p>
	<h3>基本用法</h3>
	<p>呼出一个临时的侧边栏, 可以从多个方向呼出</p>
	<DemoBlock js={`
import { BeDrawer } from '@brewer/beerui'
let visible = false
let direction = 'rtl'`} code={
	`
<BeDrawer
	bind:visible={visible}
	bind:direction={direction}
>
	<p>Drawer</p>
</BeDrawer>
	`
	}>
		<div slot='source'>
			<div class='demo-list'>
				<BeButton on:click={() => visible = !visible}>Click Me</BeButton>
				<hr>
				<div>visible: {visible}</div>
				<div>direction: {direction}</div>
				<hr>
				<BeRadioGroup bind:checked={direction}>
					<BeRadio label='ltr'>left to right</BeRadio>
					<BeRadio label='rtl'>right to left</BeRadio>
					<BeRadio label='ttb'>top to bottom</BeRadio>
					<BeRadio label='btt'>bottom to top</BeRadio>
				</BeRadioGroup>
				<BeDrawer
					bind:visible={visible}
					bind:direction={direction}
				>
					<p>Drawer</p>
				</BeDrawer>
			</div>
		</div>
		<div slot='description'>
			需要设置 visible 属性，它的类型是 boolean,当为 true 时显示 Drawer。Drawer 分为两个部分：title 和 body，title 需要具名为 title 的 slot, 也可以通过 title 属性来定义，默认值为空。需要注意的是, Drawer 默认是从右往左打开
		</div>
	</DemoBlock>
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
				<td>展示/隐藏</td>
				<td>boolean</td>
				<td>true/false</td>
				<td>false</td>
			</tr>
			<tr>
				<td>title</td>
				<td>标题文字</td>
				<td>string</td>
				<td>-</td>
				<td>提示</td>
			</tr>
			<tr>
				<td>direction</td>
				<td>方向</td>
				<td>string</td>
				<td>ltr/rtl/ttb/btt</td>
				<td>rtl</td>
			</tr>
			<tr>
				<td>size</td>
				<td>窗体的大小</td>
				<td>string</td>
				<td>'x%'/'100px'</td>
				<td>30%</td>
			</tr>
			<tr>
				<td>mask</td>
				<td>是否需要遮罩层</td>
				<td>boolean</td>
				<td>true/false</td>
				<td>true</td>
			</tr>
			<tr>
				<td>isShowHeader</td>
				<td>是否显示头部</td>
				<td>boolean</td>
				<td>true/false</td>
				<td>true</td>
			</tr>
			<tr>
				<td>isShowClose</td>
				<td>是否显示关闭按钮</td>
				<td>boolean</td>
				<td>true/false</td>
				<td>true</td>
			</tr>
			<tr>
				<td>closeOnClickModal</td>
				<td>是否可以通过点击 mask 关闭 Dialog</td>
				<td>boolean</td>
				<td>true/false</td>
				<td>true</td>
			</tr>
			<tr>
				<td>isCloseEscape</td>
				<td>是否可以通过按下 ESC 关闭 Drawer</td>
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
				<td>关闭前的方法(用户传入回调函数)</td>
				<td>接收返回值true/false false时不执行关闭操作</td>
			</tr>
			<tr>
				<td>close</td>
				<td>关闭的回调</td>
				<td>null</td>
			</tr>
		</tbody>
	</table>
	<h3 class='demo-table-title'>Slot</h3>
	<table class='demo-table'>
		<thead>
		<tr>
			<th>name</th>
			<th>说明</th>
		</tr>
		</thead>
		<tbody>
		<tr>
			<td>title</td>
			<td>自定义标题</td>
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
