<script>
	import { BeSelect, BeOption } from '$lib';
	import DemoBlock from "$lib/demo/DemoBlock.svelte";
	import BeButton from '$lib/be-button/BeButton.svelte';
	let value = ''
	let options = [
		{
			value: 0,
			label: '黄金糕',
		},
		{
			value: 2,
			label: '双皮奶',
		},
		{
			value: 3,
			label: '蚵仔煎',
		},
		{
			value: 4,
			label: '龙须面',
		},
		{
			value: 5,
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
	let value2
	let value3
	let value4 = ['1']
	let value5 = []
	const changeSelect = ({ detail }) => console.log(detail);
</script>

<svelte:head>
	<title>BeSelect 选择框 组件文档 BeerUi-官方文档</title>
	<meta name="description" content="BeerUi, 基于 svelte 的 PC端 组件库，base on svelte 3.0 web component">
	<meta name="keywords" content="BeSelect 选择框, beerui组件文档,beerui,beerui文档,beerui官网, BeerUi,@brewer/beerui,svelte,component,svelteKit">
</svelte:head>
<div class="page-container content">
	<h2>BeSelect 选择框</h2>
	<p>当选项过多时，使用下拉菜单展示并选择内容。</p>
	<h3>基本用法</h3>
<!--	<BeSelect bind:value clearable on:change={changeSelect}>-->
<!--		{#each options as item, index}-->
<!--			<BeOption label={item.label} value={item.value}/>-->
<!--		{/each}-->
<!--	</BeSelect>-->
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
			<BeSelect bind:value={value4} multiple multipleLimit={2} on:change={() => console.log('1')}>
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
			<td>value</td>
			<td>绑定值</td>
			<td>boolean / string / number / [string | number]</td>
			<td>—</td>
			<td>—</td>
		</tr>
		<tr>
			<td>multiple</td>
			<td>是否多选</td>
			<td>boolean</td>
			<td>—</td>
			<td>false</td>
		</tr>
		<tr>
			<td>disabled</td>
			<td>是否禁用</td>
			<td>boolean</td>
			<td>—</td>
			<td>false</td>
		</tr>
		<tr>
			<td>value-key(TODO)</td>
			<td>作为 value 唯一标识的键名，绑定值为对象类型时必填</td>
			<td>string</td>
			<td>—</td>
			<td>value</td>
		</tr>
		<tr>
			<td>size</td>
			<td>输入框尺寸</td>
			<td>string</td>
			<td>medium/small/mini</td>
			<td>—</td>
		</tr>
		<tr>
			<td>clearable</td>
			<td>是否可以清空选项</td>
			<td>boolean</td>
			<td>—</td>
			<td>false</td>
		</tr>
		<tr>
			<td>collapseTags</td>
			<td>多选时是否将选中值按文字的形式展示</td>
			<td>boolean</td>
			<td>—</td>
			<td>false</td>
		</tr>
		<tr>
			<td>multipleLimit</td>
			<td>多选时用户最多可以选择的项目数，为 0 则不限制</td>
			<td>number</td>
			<td>—</td>
			<td>0</td>
		</tr>
		<tr>
			<td>name</td>
			<td>select input 的 name 属性</td>
			<td>string</td>
			<td>—</td>
			<td>—</td>
		</tr>
		<tr>
			<td>autocomplete</td>
			<td>select input 的 autocomplete 属性</td>
			<td>string</td>
			<td>—</td>
			<td>off</td>
		</tr>
		<tr>
			<td>placeholder</td>
			<td>占位符</td>
			<td>string</td>
			<td>—</td>
			<td>请选择</td>
		</tr>
		<tr>
			<td>filterable(TODO)</td>
			<td>是否可搜索</td>
			<td>boolean</td>
			<td>—</td>
			<td>false</td>
		</tr>
		<tr>
			<td>allow-create(TODO)</td>
			<td>是否允许用户创建新条目，需配合 <code>filterable</code> 使用</td>
			<td>boolean</td>
			<td>—</td>
			<td>false</td>
		</tr>
		<tr>
			<td>filter-method(TODO)</td>
			<td>自定义搜索方法</td>
			<td>function</td>
			<td>—</td>
			<td>—</td>
		</tr>
		<tr>
			<td>remote(TODO)</td>
			<td>是否为远程搜索</td>
			<td>boolean</td>
			<td>—</td>
			<td>false</td>
		</tr>
		<tr>
			<td>remote-method(TODO)</td>
			<td>远程搜索方法</td>
			<td>function</td>
			<td>—</td>
			<td>—</td>
		</tr>
		<tr>
			<td>loading(TODO)</td>
			<td>是否正在从远程获取数据</td>
			<td>boolean</td>
			<td>—</td>
			<td>false</td>
		</tr>
		<tr>
			<td>loading-text(TODO)</td>
			<td>远程加载时显示的文字</td>
			<td>string</td>
			<td>—</td>
			<td>加载中</td>
		</tr>
		<tr>
			<td>no-match-text(TODO)</td>
			<td>搜索条件无匹配时显示的文字，也可以使用<code>slot="empty"</code>设置</td>
			<td>string</td>
			<td>—</td>
			<td>无匹配数据</td>
		</tr>
		<tr>
			<td>no-data-text(TODO)</td>
			<td>选项为空时显示的文字，也可以使用<code>slot="empty"</code>设置</td>
			<td>string</td>
			<td>—</td>
			<td>无数据</td>
		</tr>
		<tr>
			<td>reserve-keyword(TODO)</td>
			<td>多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词</td>
			<td>boolean</td>
			<td>—</td>
			<td>false</td>
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
			<td>change</td>
			<td>选中值发生变化时触发</td>
			<td>目前的选中值</td>
		</tr>
		<tr>
			<td>visibleChange</td>
			<td>下拉框出现/隐藏时触发</td>
			<td>出现则为 true，隐藏则为 false</td>
		</tr>
		<tr>
			<td>removeTag</td>
			<td>多选模式下移除tag时触发</td>
			<td>移除的tag值</td>
		</tr>
		<tr>
			<td>clear</td>
			<td>可清空的单选模式下用户点击清空按钮时触发</td>
			<td>—</td>
		</tr>
		<tr>
			<td>blur</td>
			<td>当 input 失去焦点时触发</td>
			<td>(event: Event)</td>
		</tr>
		<tr>
			<td>focus</td>
			<td>当 input 获得焦点时触发</td>
			<td>(event: Event)</td>
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
			<td>suffix</td>
			<td>Select 组件尾部内容</td>
		</tr>
		</tbody>
	</table>
	<h3 class='demo-table-title'>BeOption</h3>
	<table class='demo-table'>
		<thead>
		<tr>
			<th>name</th>
			<th>说明</th>
		</tr>
		</thead>
		<tbody>
		<tr>
			<td>label</td>
			<td>展示内容</td>
		</tr>
		<tr>
			<td>value</td>
			<td>选项卡的值</td>
		</tr>
		<tr>
			<td>disabled</td>
			<td>禁用 默认false</td>
		</tr>
		<tr>
			<td>slot</td>
			<td>新增插槽（v1.1.16）</td>
		</tr>
		</tbody>
	</table>
</div>
