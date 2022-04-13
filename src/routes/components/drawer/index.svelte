<script lang="ts">
	import { BeButton, BeDrawer, BeRadio, BeRadioGroup } from '$lib';
	import DemoBlock from '$lib/demo/DemoBlock.svelte';

	let visible = false
	let direction = 'rtl'
</script>
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
			<ol>
				<li>mask = true  是否需要遮罩层</li>
				<li>visible = true  是否显示 Drawer</li>
				<li>title = '提示'  标题文字 slot=title</li>
				<li>direction = 'rtl'  方向 ltr/rtl/ttb/btt</li>
				<li>size = '30%'  窗体的大小, 请传入 'x%'/'100px'</li>
				<li>isShowHeader = true  是否显示头部</li>
				<li>isShowClose = true  是否显示关闭按钮</li>
				<li>closeOnClickModal = true  是否可以通过点击 modal 关闭 Dialog</li>
				<li>beforeClose = null  是否可以通过点击 modal 关闭 Dialog 传入函数 接收返回值true/false false时不执行关闭操作 beforeClose={() => false}</li>
				<li>isCloseEscape = true  是否可以通过按下 ESC 关闭 Drawer</li>
			</ol>
		</div>
	</DemoBlock>
</div>

<style lang='scss' global>
  .demo-title {font-size: 22px;color: var(--text-color-primary);margin: 15px 0;}
  .demo-list {
    margin: 16px 0;
  }
</style>
