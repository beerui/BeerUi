<script lang="ts">
	import { BeButton, BeDrawer, BeRadio, BeRadioGroup } from '$lib';
	import DemoBlock from '$lib/demo/DemoBlock.svelte';

	let visible1 = false
	let direction = 'rtl'

	let js = `import { BeDrawer } from '@brewer/beerui'`
</script>
<div class='page-container'>
	<h2>BeDrawer 抽屉</h2>
	<p class='desc'>有些时候, Dialog 组件并不满足我们的需求, 比如你的表单很长, 亦或是你需要临时展示一些文档, Drawer 拥有和 Dialog 几乎相同的 API, 在 UI 上带来不一样的体验.</p>
	<h3>基本用法</h3>
	<p>呼出一个临时的侧边栏, 可以从多个方向呼出</p>
	<DemoBlock {js}>
		<div slot='source'>
			<div class='demo-list'>
				<BeButton on:click={() => visible1 = !visible1}>Click Me</BeButton>
				<hr>
				<BeRadioGroup bind:checked={direction}>
					<BeRadio label='ltr'>left to right</BeRadio>
					<BeRadio label='rtl'>right to left</BeRadio>
					<BeRadio label='ttb'>top to bottom</BeRadio>
					<BeRadio label='btt'>bottom to top</BeRadio>
				</BeRadioGroup>
				<BeDrawer
					bind:visible={visible1}
					bind:direction={direction}
				>
					<p>基础 Dialog</p>
				</BeDrawer>
			</div>
		</div>
		<div slot='description'>
			需要设置 visible 属性，它的类型是 boolean,当为 true 时显示 Drawer。Drawer 分为两个部分：title 和 body，title 需要具名为 title 的 slot, 也可以通过 title 属性来定义，默认值为空。需要注意的是, Drawer 默认是从右往左打开, 当然可以设置对应的 direction, 详细请参考 direction 用法 最后，本例还展示了 before-close 的用法
		</div>
	</DemoBlock>
</div>

<style lang='scss' global>
  .demo-title {font-size: 22px;color: var(--text-color-primary);margin: 15px 0;}
  .demo-list {
    margin: 16px 0;
  }
</style>
