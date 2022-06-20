<script lang="ts">
	import DemoBlock from "$lib/demo/DemoBlock.svelte";
	import { BeCheckbox, BeCheckboxGroup } from "$lib";
	import BeButton from "$lib/be-button/BeButton.svelte";
	import ReplBlock from '$lib/demo/ReplBlock.svelte';

	type CheckboxGroup = {
		setCheckedList?: Function
	}

	let checked = false;
	let checkedList = ["选中且禁用", "复选框 A"];
	let onChange = (evt) => console.log('onChange', evt.detail);
	let checkedCities = ["上海"];
	const cityOptions = ["上海", "北京", "广州", "深圳"];
	let indeterminate = false;
	let selectItem = () => checkboxGroup.setCheckedList(["上海"]);
	const setCheckedListHandle = () => {
		indeterminate = !indeterminate;
		indeterminate ? checkboxGroup.setCheckedList(["上海", "北京", "广州", "深圳"]) : checkboxGroup.setCheckedList([]);
	};
	let checkboxGroup: CheckboxGroup;
	let clickHandle = (evt) => {
		console.log('clickHandle', evt);
	};
	let changeHandle = (evt) => {
		console.log('changeHandle', evt);
	};
</script>
<div class="page-container">
	<h2>Checkbox 多选框</h2>
	<p>一组备选项中进行多选</p>

	<h3>基础用法</h3>
	<p>单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。</p>
	<DemoBlock code={`
<BeCheckbox {checked} on:change={changeHandle} on:click={clickHandle}>备选项</BeCheckbox>`} js={`
import { BeCheckbox, BeTableColumn} from '@brewer/beerui'
let checked = false;
    `}>
		<div slot="source">
			<div>checked: {checked}</div>
			<div class="demo-list">
				<BeCheckbox bind:checked={checked} on:change={changeHandle} on:click={clickHandle}>备选项</BeCheckbox>
			</div>
		</div>
	</DemoBlock>
	<h3>禁用状态</h3>
	<p>多选框不可用状态。</p>
	<DemoBlock
		code={`
<BeCheckbox checked={checked} disabled>备选项</BeCheckbox>
<BeCheckbox checked disabled>备选项</BeCheckbox>
`} js={`
let checked = false;
`}>
		<div slot="source">
			<div class="demo-list">
				<BeCheckbox {checked} disabled>备选项</BeCheckbox>
				<BeCheckbox checked disabled>备选项</BeCheckbox>
			</div>
		</div>
		<div slot="description">
			设置disabled属性即可。
		</div>
	</DemoBlock>
	<h3>多选框组</h3>
	<p>适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。</p>
	<DemoBlock
		code={`
<BeButton on:click={selectItem}>选中 上海</BeButton>
<BeButton on:click={setCheckedListHandle}>{indeterminate ? '取消全选' : '全选'}</BeButton>
<BeCheckboxGroup bind:this={checkboxGroup} checked={checkedCities} on:change={onChange}>
  <BeCheckbox label="上海" />
  <BeCheckbox label="北京" />
  <BeCheckbox label="广州" />
  <BeCheckbox label="深圳" />
</BeCheckboxGroup>
`} js={`
let checkedCities = []
const cityOptions = ['上海', '北京', '广州', '深圳'];
let indeterminate = false
let selectItem = () => checkboxGroup.setCheckedList(['上海'])
let onChange = (evt) => console.log('onChange', evt.detail);
const setCheckedListHandle = () => {
  indeterminate = !indeterminate
  indeterminate ? checkboxGroup.setCheckedList(['上海', '北京', '广州', '深圳']) : checkboxGroup.setCheckedList([])
}
let checkboxGroup;
`}>
		<div slot="source">
			<div>
				<BeButton on:click={selectItem}>选中 上海</BeButton>
				<BeButton on:click={setCheckedListHandle}>{indeterminate ? '取消全选' : '全选'}</BeButton>
			</div>
			<p>checked: {checkedCities}</p>
			<div class="demo-list">
				<BeCheckboxGroup bind:this={checkboxGroup} bind:checked={checkedCities} on:change={onChange}>
					<BeCheckbox label="上海" />
					<BeCheckbox label="北京" />
					<BeCheckbox label="广州" />
					<BeCheckbox label="深圳" />
				</BeCheckboxGroup>
			</div>
		</div>
		<div slot="description">
			使用 setCheckedList 方法可设置选中数据。
		</div>
	</DemoBlock>

	<h3>Repl</h3>
	<ReplBlock
		js={`import { BeCheckboxGroup, BeCheckbox } from '@brewer/beerui/be-checkbox';
		let checkedCities = [];
		const onChange = evt => console.log(evt)
		`}
		html={`
<div style='padding: 20px;'>
	<BeCheckboxGroup class='m-check' bind:checked={checkedCities} on:change={onChange}>
		<BeCheckbox label="上海" />
		<BeCheckbox label="北京" />
		<BeCheckbox label="广州" />
		<BeCheckbox label="深圳" />
	</BeCheckboxGroup>
	<hr>
	checkedCities: {checkedCities}
</div>
`}
		css={`:global(.m-check .be-checkbox){margin-right: 15px;}`}
	/>
	<h3 class='demo-table-title'>BeCheckbox Attributes</h3>
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
			<td>checked</td>
			<td>绑定的值</td>
			<td>boolean</td>
			<td>true/false</td>
			<td>false</td>
		</tr>
		<tr>
			<td>id</td>
			<td>选框的id</td>
			<td>string</td>
			<td>-</td>
			<td>''</td>
		</tr>
		<tr>
			<td>disabled</td>
			<td>禁用</td>
			<td>boolean</td>
			<td>true/false</td>
			<td>false</td>
		</tr>
		<tr>
			<td>name</td>
			<td>选框的name</td>
			<td>string</td>
			<td>-</td>
			<td>''</td>
		</tr>
		<tr>
			<td>label</td>
			<td>选中状态的值</td>
			<td>string</td>
			<td>-</td>
			<td>''</td>
		</tr>
		</tbody>
	</table>
	<h3 class='demo-table-title'>BeCheckboxGroup Attributes</h3>
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
			<td>checked</td>
			<td>绑定的值</td>
			<td>array</td>
			<td>-</td>
			<td>[]</td>
		</tr>
		<tr>
			<td>validateEvent</td>
			<td>是否验证表单(在BeForm中使用)</td>
			<td>boolean</td>
			<td>true/false</td>
			<td>true</td>
		</tr>
		</tbody>
	</table>
	<h3 class='demo-table-title'>BeCheckbox Events</h3>
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
			<td>值改变的回调</td>
			<td>{ `{ label, checked }` }</td>
		</tr>
		<tr>
			<td>click</td>
			<td>点击的回调</td>
			<td>{ `{ label, checked }` }</td>
		</tr>
		</tbody>
	</table>
	<h3 class='demo-table-title'>BeCheckbox Slot</h3>
	<table class='demo-table'>
		<thead>
		<tr>
			<th>name</th>
			<th>说明</th>
		</tr>
		</thead>
		<tbody>
		<tr>
			<td>default</td>
			<td>自定义样式</td>
		</tr>
		</tbody>
	</table>
</div>
<style lang="scss">
</style>
