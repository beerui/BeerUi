<script lang="ts">
	import DemoBlock from "$lib/demo/DemoBlock.svelte";
	import { BeRadio, BeRadioGroup } from "$lib";
	import BeButton from '$lib/be-button/BeButton.svelte';

	let radio = 1;
	let radio2 = '1';
	let radio3 = '1';

	const handleChange = (evt) => console.log('handleChange', evt);
	const changeRadio = () => radio3 = '2'
	let checkedDom = null
	const clearChecked = () => checkedDom.clear()
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
				<BeRadio bind:checked={radio} label='{1}'>备选项1</BeRadio>
				<BeRadio bind:checked={radio} label='{2}' border name='iam'>备选项2</BeRadio>
				<BeRadio bind:checked={radio} label='{3}' border size='medium'>备选项2</BeRadio>
				<BeRadio bind:checked={radio} label='{4}' border size='small'>备选项2</BeRadio>
				<BeRadio bind:checked={radio} label='{5}' border size='mini'>备选项2</BeRadio>
			</div>
		</div>
	</DemoBlock>
	<h3>禁用状态</h3>
	<p>多选框不可用状态。</p>
	<DemoBlock code={`
<BeRadio bind:checked={radio2} label='1' disabled>备选项1</BeRadio>
<BeRadio bind:checked={radio2} label='2'>备选项2</BeRadio>`} js={`
let radio2 = '1';
    `}>
		<div slot="source">
			<div>radio2: {radio2}</div>
			<div class="demo-list">
				<BeRadio bind:checked={radio2} label='1' disabled>备选项1</BeRadio>
				<BeRadio bind:checked={radio2} label='2' >备选项2</BeRadio>
			</div>
		</div>
	</DemoBlock>
	<h3>单选框组</h3>
	<p>适用于在多个互斥的选项中选择的场景。</p>
	<DemoBlock code={`
<BeButton on:click={changeRadio}>setChecked('2')</BeButton>
<BeRadioGroup bind:this={checkedDom} bind:checked={radio3} on:change={handleChange}>
	<BeRadio label='1'>备选项</BeRadio>
	<BeRadio label='2'>备选项</BeRadio>
	<BeRadio label='3'>备选项</BeRadio>
</BeRadioGroup>`} js={`
let radio3 = '1';
let checkedDom = null
const handleChange = (evt) => console.log('handleChange', evt);
const changeRadio = () => radio3 = '2'
const clearChecked = () => checkedDom.clear()
    `}>
		<div slot="source">
			<div>
				<span>radio3: {radio3}</span>
				<BeButton on:click={changeRadio}>setChecked('2')</BeButton>
				<BeButton on:click={clearChecked}>clearChecked()</BeButton>
			</div>
			<div class="demo-list">
				<BeRadioGroup
					bind:this={checkedDom}
					bind:checked={radio3}
					on:change={handleChange}
				>
					<BeRadio label='1' style='margin-right: 15px;'>备选项</BeRadio>
					<BeRadio label='2' style='margin-right: 15px;'>备选项</BeRadio>
					<BeRadio label='3' style='margin-right: 15px;'>备选项</BeRadio>
				</BeRadioGroup>
			</div>
		</div>
	</DemoBlock>
	<h3 class='demo-table-title'>Radio Attributes</h3>
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
				<td>绑定值</td>
				<td>string / number / boolean</td>
				<td>—</td>
				<td>—</td>
			</tr>
			<tr>
				<td>label</td>
				<td>Radio 的 value</td>
				<td>string / number / boolean</td>
				<td>—</td>
				<td>—</td>
			</tr>
			<tr>
				<td>disabled</td>
				<td>是否禁用</td>
				<td>boolean</td>
				<td>—</td>
				<td>false</td>
			</tr>
			<tr>
				<td>border</td>
				<td>是否显示边框</td>
				<td>boolean</td>
				<td>—</td>
				<td>false</td>
			</tr>
			<tr>
				<td>size</td>
				<td>Radio 的尺寸，仅在 border 为真时有效</td>
				<td>string</td>
				<td>medium / small / mini</td>
				<td>—</td>
			</tr>
			<tr>
				<td>name</td>
				<td>原生 name 属性</td>
				<td>string</td>
				<td>—</td>
				<td>—</td>
			</tr>
		</tbody>
	</table>
	<h3 class='demo-table-title'>Radio / Radio Group Events</h3>
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
			<td>绑定值变化时触发的事件</td>
			<td>选中的 Radio label 值</td>
		</tr>
		</tbody>
	</table>
	<h3 class='demo-table-title'>Radio-group Attributes</h3>
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
			<td>绑定值</td>
			<td>string / number / boolean</td>
			<td>—</td>
			<td>—</td>
		</tr>
		<tr>
			<td>size</td>
			<td>单选框组尺寸，仅对按钮形式的 Radio 或带有边框的 Radio 有效</td>
			<td>string</td>
			<td>medium / small / mini</td>
			<td>—</td>
		</tr>
		<tr>
			<td>disabled</td>
			<td>是否禁用</td>
			<td>boolean</td>
			<td>—</td>
			<td>false</td>
		</tr>
		<tr>
			<td>textColor</td>
			<td>按钮形式的 Radio 激活时的文本颜色</td>
			<td>string</td>
			<td>—</td>
			<td>#ffffff</td>
		</tr>
		<tr>
			<td>fill</td>
			<td>按钮形式的 Radio 激活时的填充色和边框色</td>
			<td>string</td>
			<td>—</td>
			<td>#409EFF</td>
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
			<td>default</td>
			<td>替代label</td>
		</tr>
		</tbody>
	</table>
</div>
