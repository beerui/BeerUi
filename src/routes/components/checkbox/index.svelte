<script lang="ts">
	import DemoBlock from "$lib/demo/DemoBlock.svelte";
	import { BeCheckbox, BeCheckboxGroup } from "$lib";
	import BeButton from "$lib/be-button/BeButton.svelte";

	type CheckboxGroup = {
		setCheckedList?: Function
	}

	let checked = false;
	let checkedList = ["选中且禁用", "复选框 A"];
	let onChange = (evt) => {
		console.log(evt.detail);
	};
	let checkedCities = [];
	const cityOptions = ["上海", "北京", "广州", "深圳"];
	let indeterminate = false;
	let selectItem = () => checkboxGroup.setCheckedList(["上海"]);
	const setCheckedListHandle = () => {
		indeterminate = !indeterminate;
		indeterminate ? checkboxGroup.setCheckedList(["上海", "北京", "广州", "深圳"]) : checkboxGroup.setCheckedList([]);
	};
	let checkboxGroup: CheckboxGroup;
</script>
<div class="page-container">
	<h2>Checkbox 多选框</h2>
	<p>一组备选项中进行多选</p>
	<ol>
		<li></li>
	</ol>
	<h3>基础用法</h3>
	<p>单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。</p>
	<DemoBlock code={`
<BeCheckbox {checked}>备选项</BeCheckbox>`} js={`
import { BeCheckbox, BeTableColumn} from '@brewer/beerui'
let checked = false;
    `}>
		<div slot="source">
			<div class="demo-list">
				<BeCheckbox {checked}>备选项</BeCheckbox>
			</div>
		</div>
	</DemoBlock>
	<h3>禁用状态</h3>
	<p>多选框不可用状态。</p>
	<DemoBlock
		code={`
<BeCheckbox checked={!checked} disabled>备选项</BeCheckbox>
<BeCheckbox {checked} disabled>备选项</BeCheckbox>
`} js={`
let checked = false;
`}>
		<div slot="source">
			<div class="demo-list">
				<BeCheckbox checked={!checked} disabled>备选项</BeCheckbox>
				<BeCheckbox {checked}>备选项</BeCheckbox>
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
const setCheckedListHandle = () => {
  indeterminate = !indeterminate
  indeterminate ? checkboxGroup.setCheckedList(['上海', '北京', '广州', '深圳']) : checkboxGroup.setCheckedList([])
}
let checkboxGroup;
`}>
		<div slot="source">
			<BeButton on:click={selectItem}>选中 上海</BeButton>
			<BeButton on:click={setCheckedListHandle}>{indeterminate ? '取消全选' : '全选'}</BeButton>
			<div class="demo-list">
				<BeCheckboxGroup bind:this={checkboxGroup} checked={checkedCities} on:change={onChange}>
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
</div>
<style lang="scss">
</style>
