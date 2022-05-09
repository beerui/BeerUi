<script>
	import { BeSelect, BeOption } from '$lib';
	import DemoBlock from "$lib/demo/DemoBlock.svelte";
	import BeButton from '$lib/be-button/BeButton.svelte';
	let value = ''
	let options = [
		{
			value1: '0',
			label2: '黄金糕',
		},
		{
			value1: '2',
			label2: '双皮奶',
		},
		{
			value1: '3',
			label2: '蚵仔煎',
		},
		{
			value1: '4',
			label2: '龙须面',
		},
		{
			value1: '5',
			label2: '北京烤鸭',
		}
	];
	const setValue = () => {
		value = '1'
	}
	const clearValue = () => {
		value = ''
	}
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
	let value2
	let value3
	const changeSelect = (e) => {
		console.log(e);
	}
</script>

<div class="page-container content">
	<h2>BeSelect 选择框</h2>
	<p>当选项过多时，使用下拉菜单展示并选择内容。</p>
	<h3>基本用法</h3>
	<DemoBlock code={`
<BeSelect bind:value={value} clearable={true} on:change={changeSelect}>
	<BeOption label="测试" value="0"/>
	<BeOption label="测试2" value="1"/>
	<BeOption label="测试3" value="2"/>
</BeSelect>`}
       js={`
let value = '1'
const changeSelect = (e) => {
		console.log(e);
}`
}
	>
		<div slot='source'>
			<BeButton on:click={setValue}>setValue('1')</BeButton>
			<BeButton on:click={clearValue}>clearValue</BeButton>
			<p>value：{value}</p>
			<BeSelect bind:value={value} clearable={true} on:change={changeSelect}>
				<BeOption label="测试" value="0"/>
				<BeOption label="测试2" value="1"/>
				<BeOption label="测试3" value="2"/>
			</BeSelect>
		</div>
	</DemoBlock>
	<h3>有禁用选项</h3>
	<p>在<code>options</code>数组中设定<code>disabled</code>值为 true，即可禁用该选项</p>
	<DemoBlock code={`
<BeSelect bind:value={value2} clearable={true}>
	<BeOption label="测试" value="1" disabled={true} />
	<BeOption label="测试2" value="2"/>
	<BeOption label="测试3" value="3"/>
</BeSelect>`}
	>
		<div slot='source'>
			<p>value2:{value2}</p>
			<BeSelect bind:value={value2} clearable={true}>
				<BeOption label="测试" value="1" disabled={true}/>
				<BeOption label="测试2" value="2"/>
				<BeOption label="测试3" value="3"/>
			</BeSelect>
		</div>
	</DemoBlock>
	<h3>禁用状态</h3>
	<p>选择器不可用状态</p>
	<DemoBlock code={`
<BeSelect bind:value={value3} disabled size="mini">
	<BeOption label="测试" value="1" disabled={true} />
	<BeOption label="测试2" value="2"/>
	<BeOption label="测试3" value="3"/>
</BeSelect>`}
	>
		<div slot='source'>
			<BeSelect bind:value={value3} disabled size="mini">
				<BeOption label="测试" value="1"/>
				<BeOption label="测试2" value="2"/>
				<BeOption label="测试3" value="3"/>
			</BeSelect>
		</div>
	</DemoBlock>
</div>
