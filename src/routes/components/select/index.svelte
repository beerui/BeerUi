<script>
	import { BeSelect, BeOption } from '$lib';
	import DemoBlock from "$lib/demo/DemoBlock.svelte";
	let value = '1'
	let options = [
		{
			value: '1',
			label: '黄金糕',
		},
		{
			value: '2',
			label: '双皮奶',
		},
		{
			value: '3',
			label: '蚵仔煎',
		},
		{
			value: '4',
			label: '龙须面',
		},
		{
			value: '5',
			label: '北京烤鸭',
		}
	];
	let options1 = [
		{
			value: '1',
			label: '黄金糕',
			disabled: true
		},
		{
			value: '2',
			label: '双皮奶',
		},
		{
			value: '3',
			label: '蚵仔煎',
		},
		{
			value: '4',
			label: '龙须面',
		},
		{
			value: '5',
			label: '北京烤鸭',
		}
	];
	let value1
</script>

<!-- <BeSelect {options} /> -->
<div class="page-container content">
	<h2>BeSelect 选择框</h2>
	<p>当选项过多时，使用下拉菜单展示并选择内容。</p>
	<h3>基本用法</h3>

	<DemoBlock code={`
<BeSelect bind:value={value} clearable={true}>
	<BeOption label="测试" value="1"/>
	<BeOption label="测试2" value="2"/>
	<BeOption label="测试3" value="3"/>
</BeSelect>`}
       js={`
let value = '1'`}
	>
		<div slot='source'>
			<BeSelect bind:value={value} clearable={true}>
				<BeOption label="测试" value="1"/>
				<BeOption label="测试2" value="2"/>
				<BeOption label="测试3" value="3"/>
			</BeSelect>
		</div>
	</DemoBlock>
	<h3>有禁用选项</h3>
	<p>在<code>options</code>数组中设定<code>disabled</code>值为 true，即可禁用该选项</p>
	<DemoBlock code={`
<BeSelect bind:value={value} clearable={true}>
	<BeOption label="测试" value="1" disabled={true} />
	<BeOption label="测试2" value="2"/>
	<BeOption label="测试3" value="3"/>
</BeSelect>`}
	>
		<div slot='source'>
			<BeSelect bind:value={value} clearable={true}>
				<BeOption label="测试" value="1" disabled={true}/>
				<BeOption label="测试2" value="2"/>
				<BeOption label="测试3" value="3"/>
			</BeSelect>
		</div>
	</DemoBlock>
	<h3>禁用状态</h3>
	<p>选择器不可用状态</p>
	<DemoBlock code={`
<BeSelect bind:value={value} disabled size="mini">
	<BeOption label="测试" value="1" disabled={true} />
	<BeOption label="测试2" value="2"/>
	<BeOption label="测试3" value="3"/>
</BeSelect>`}
	>
		<div slot='source'>
			<BeSelect bind:value={value} disabled size="mini">
				<BeOption label="测试" value="1"/>
				<BeOption label="测试2" value="2"/>
				<BeOption label="测试3" value="3"/>
			</BeSelect>
		</div>
	</DemoBlock>
</div>
