<script lang="ts">
	import DemoBlock from "$lib/demo/DemoBlock.svelte";
	import { BeRadio, BeRadioGroup } from "$lib";
	import BeButton from "$lib/be-button/BeButton.svelte";

	type CheckboxGroup = {
		setCheckedList?: Function
	}

	let radio = '1';
	let radio2 = '1';
	$: {
		console.log('radio', radio);
	}
</script>
<div class="page-container">
	<h2>Radio 单选框</h2>
	<p>在一组备选项中进行单选</p>
	<h3>基础用法</h3>
	<p>由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。</p>
	<DemoBlock code={`
<BeRadio bind:checked={radio} label='1'>备选项1</BeRadio>
<BeRadio bind:checked={radio} label='2'>备选项2</BeRadio>`} js={`
import { BeRadio, BeRadioGroup} from '@brewer/beerui'
let radio = '1';
    `}>
		<div slot="source">
			<div class="demo-list">
				<BeRadio bind:checked={radio} label='1'>备选项1</BeRadio>
				<BeRadio bind:checked={radio} label='2'>备选项2</BeRadio>
			</div>
		</div>
	</DemoBlock>
	<h3>禁用状态</h3>
	<p>多选框不可用状态。</p>
	<DemoBlock code={`
<BeRadio bind:checked={radio} label='1'>备选项1</BeRadio>
<BeRadio bind:checked={radio} label='2'>备选项2</BeRadio>`} js={`
import { BeRadio, BeRadioGroup} from '@brewer/beerui'
let radio = '1';
    `}>
		<div slot="source">
			<div class="demo-list">
				<BeRadio bind:checked={radio2} label='1' disabled>备选项1</BeRadio>
				<BeRadio bind:checked={radio2} label='2'>备选项2</BeRadio>
			</div>
		</div>
	</DemoBlock>
<!--	<DemoBlock-->
<!--		code={`-->
<!--<BeCheckbox checked={!checked} disabled>备选项</BeCheckbox>-->
<!--<BeCheckbox {checked} disabled>备选项</BeCheckbox>-->
<!--`} js={`-->
<!--let checked = false;-->
<!--`}>-->
<!--		<div slot="source">-->
<!--			<div class="demo-list">-->
<!--				<BeRadio value={radio} label='1'>备选项</BeRadio>-->
<!--				<BeRadio value={radio} label='2'>备选项</BeRadio>-->
<!--			</div>-->
<!--		</div>-->
<!--		<div slot="description">-->
<!--			设置disabled属性即可。-->
<!--		</div>-->
<!--	</DemoBlock>-->
<!--	<h3>多选框组</h3>-->
<!--	<p>适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。</p>-->
<!--	<DemoBlock-->
<!--		code={`-->
<!--<BeButton on:click={selectItem}>选中 上海</BeButton>-->
<!--<BeButton on:click={setCheckedListHandle}>{indeterminate ? '取消全选' : '全选'}</BeButton>-->
<!--<BeCheckboxGroup bind:this={checkboxGroup} checked={checkedCities} on:change={onChange}>-->
<!--  <BeCheckbox label="上海" />-->
<!--  <BeCheckbox label="北京" />-->
<!--  <BeCheckbox label="广州" />-->
<!--  <BeCheckbox label="深圳" />-->
<!--</BeCheckboxGroup>-->
<!--`} js={`-->
<!--let checkedCities = []-->
<!--const cityOptions = ['上海', '北京', '广州', '深圳'];-->
<!--let indeterminate = false-->
<!--let selectItem = () => checkboxGroup.setCheckedList(['上海'])-->
<!--const setCheckedListHandle = () => {-->
<!--  indeterminate = !indeterminate-->
<!--  indeterminate ? checkboxGroup.setCheckedList(['上海', '北京', '广州', '深圳']) : checkboxGroup.setCheckedList([])-->
<!--}-->
<!--let checkboxGroup;-->
<!--`}>-->
<!--		<div slot="source">-->
<!--			<BeButton on:click={selectItem}>选中 上海</BeButton>-->
<!--			<BeButton on:click={setCheckedListHandle}>{indeterminate ? '取消全选' : '全选'}</BeButton>-->
<!--			<div class="demo-list">-->
<!--				<BeRadioGroup bind:this={checkboxGroup} checked={checkedCities} on:change={onChange}>-->
<!--					<BeRadio label="上海" />-->
<!--					<BeRadio label="北京" />-->
<!--					<BeRadio label="广州" />-->
<!--					<BeRadio label="深圳" />-->
<!--				</BeRadioGroup>-->
<!--			</div>-->
<!--		</div>-->
<!--		<div slot="description">-->
<!--			使用 setCheckedList 方法可设置选中数据。-->
<!--		</div>-->
<!--	</DemoBlock>-->
</div>
<style lang="scss">
</style>
