<script lang="ts">
	import DemoBlock from "$lib/demo/DemoBlock.svelte";
	import { BeRadio, BeRadioGroup } from "$lib";
	import BeButton from '$lib/be-button/BeButton.svelte';

	type CheckboxGroup = {
		setCheckedList?: Function
	}

	let radio = '1';
	let radio2 = '1';
	let radio3 = '1';

	const handleChange = (evt) => {
		console.log('handleChange', evt);
	}
	let changeRadio = () => {
		radio3 = '2'
		console.log('changeRadio', radio3);
	};
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
			<div>radio: {radio}</div>
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
			<div>radio2: {radio2}</div>
			<div class="demo-list">
				<BeRadio bind:checked={radio2} label='1' disabled>备选项1</BeRadio>
				<BeRadio bind:checked={radio2} label='2'>备选项2</BeRadio>
			</div>
		</div>
	</DemoBlock>
	<h3>单选框组</h3>
	<p>适用于在多个互斥的选项中选择的场景。</p>
	<DemoBlock code={`
<BeRadio bind:checked={radio} label='1'>备选项1</BeRadio>
<BeRadio bind:checked={radio} label='2'>备选项2</BeRadio>`} js={`
import { BeRadio, BeRadioGroup} from '@brewer/beerui'
let radio = '1';
    `}>
		<div slot="source">
			<div>
				<BeButton on:click={changeRadio}>setChecked('2')</BeButton>
				{radio3}
			</div>
			<div class="demo-list">
				<BeRadioGroup bind:checked={radio3} on:change={handleChange}>
					<BeRadio label='1'>备选项</BeRadio>
					<BeRadio label='2'>备选项</BeRadio>
					<BeRadio label='3'>备选项</BeRadio>
				</BeRadioGroup>
			</div>
		</div>
	</DemoBlock>
</div>
