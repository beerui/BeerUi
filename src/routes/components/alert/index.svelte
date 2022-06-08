<script lang='ts'>
	import { BeAlert } from '$lib';
	import DemoBlock from '$lib/demo/DemoBlock.svelte';
	import ReplBlock from '$lib/demo/ReplBlock.svelte';
</script>
<div class='page-container content'>
	<h2>Alert 警告</h2>
	<p>用于页面中展示重要的提示信息</p>
	<h3>基本用法</h3>
	<DemoBlock code={`
<BeAlert title='这是消息提示' type='info' />
<BeAlert title='成功提示的文案' type='success' />
<BeAlert title='警告提示的文案' type='warning' />
<BeAlert title='错误提示的文案' type='danger' />
`} js={`
import { BeAlert } from '@brewer/beerui';
`}>
		<div slot='source'>
			<div class='demo-list'>
				<BeAlert title='这是消息提示' type='info' />
				<hr>
				<BeAlert title='成功提示的文案' type='success' />
				<hr>
				<BeAlert title='警告提示的文案' type='warning' />
				<hr>
				<BeAlert title='错误提示的文案' type='danger' />
			</div>
		</div>
	</DemoBlock>
	<h3>Repl</h3>
	<ReplBlock
		js={`import BeAlert from '@brewer/beerui/be-alert'`}
		html={`<BeAlert title='这是消息提示' type='info' />`}
	/>
</div>

