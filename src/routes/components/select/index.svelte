<script>
	import { BeSelect, BeOption } from '$lib';
	import DemoBlock from "$lib/demo/DemoBlock.svelte";
	import BeButton from '$lib/be-button/BeButton.svelte';
	let value = '选项1'
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
	let value4 = ['1']
	let value5 = []
	const changeSelect = ({ detail }) => console.log(detail);
</script>

<div class="page-container content">
	<h2>BeSelect 选择框</h2>
	<p>当选项过多时，使用下拉菜单展示并选择内容。</p>
	<h3>基本用法</h3>
	<ol>
		<li>value: string; 绑定的值 多选(multiple)时 string[]</li>
		<li>size:string = 'normal';尺寸</li>
		<li>maxHeight:string = '300px';最大出现滚动的高度</li>
		<li>multiple:boolean = false; // 是否多选</li>
		<li>collapseTags:boolean = false; // 多选 收缩</li>
		<li>disabled = false // 是否禁用</li>
		<li>position = 'bottom' // 位置</li>
		<li>clearable = false 显示清除按钮</li>
		<li>placeholder = '请选择'</li>
	</ol>
	<DemoBlock code={`
<BeSelect bind:value clearable on:change={changeSelect} maxHeight='180px'>
	{#each Array(20) as item, index}
		<BeOption label="测试{index+1}" value="选项{index+1}"/>
	{/each}
</BeSelect>`}
       js={`
let value = '选项1'
const changeSelect = ({ detail }) => console.log(detail);`
}
	>
		<div slot='source'>
			<BeButton on:click={() => value = '选项1'}>value = '选项1'</BeButton>
			<BeButton on:click={() => value = ''}>value = ''</BeButton>
			<p>value：{JSON.stringify(value)}</p>
			<BeSelect bind:value clearable on:change={changeSelect} maxHeight='180px'>
				{#each Array(20) as item, index}
					<BeOption label="测试{index}" value="选项{index}"/>
				{/each}
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
	<h3>多选</h3>
	<p>适用性较广的基础多选</p>
	<DemoBlock code={`
let value4 = 2
<BeButton on:click={() => value4 = [2, '3']}>value4 = ['2', '3']</BeButton>
<BeButton on:click={() => value4 = []}>clearValue</BeButton>
<BeSelect bind:value={value4} multiple>
	<BeOption label="测试" value="1"/>
	<BeOption label="测试2" value="2"/>
	<BeOption label="测试3" value="3"/>
</BeSelect>
<BeSelect bind:value={value5} multiple collapseTags>
	<BeOption label="测试" value="1"/>
	<BeOption label="测试2" value="2"/>
	<BeOption label="测试3" value="3"/>
</BeSelect>`}
	>
		<div slot='source'>
			<BeButton on:click={() => value4 = [2, '3']}>value4 = ['2', '3']</BeButton>
			<BeButton on:click={() => value4 = []}>clearValue</BeButton>
			value4：{JSON.stringify(value4)}
			<hr>
			<BeSelect bind:value={value4} multiple>
				<BeOption label="测试" value="1"/>
				<BeOption label="测试2" value={2}/>
				<BeOption label="测试3" value="3"/>
			</BeSelect>
			<hr>
			value5：{JSON.stringify(value5)}
			<BeSelect bind:value={value5} multiple collapseTags>
				<BeOption label="测试" value="1"/>
				<BeOption label="测试2" value={2} />
				<BeOption label="测试3" value="3"/>
			</BeSelect>
		</div>
		<div slot='description'>
			设置multiple属性即可启用多选，此时value的值为当前选中值所组成的数组。默认情况下选中值会以 Tag 的形式展现，你也可以设置collapseTags属性将它们合并为一段文字。
		</div>
	</DemoBlock>
</div>
