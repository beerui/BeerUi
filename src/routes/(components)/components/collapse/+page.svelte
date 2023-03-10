<script lang="ts">
	import DemoBlock from '$lib/demo/DemoBlock.svelte';
	import { BeCollapse, BeCollapseItem } from '$lib';
	import BeIcon from '$lib/be-icon/BeIcon.svelte';

	let active = ['1']
	let active1 = '1'
	let active3 = '1'

	const handleChange = (val) => {
		console.log(val);
	}
</script>
<svelte:head>
	<title>Collapse 折叠面板 组件文档 BeerUi-官方文档</title>
	<meta name="description" content="BeerUi, 基于 svelte 的 PC端 组件库，base on svelte 3.0 web component">
	<meta name="keywords" content="Collapse 折叠面板, beerui组件文档,beerui,beerui文档,beerui官网, BeerUi,@brewer/beerui,svelte,component,svelteKit">
</svelte:head>
<div class='page-container'>
	<h2>Collapse 折叠面板</h2>
	<p class='desc'>通过折叠面板收纳内容区域</p>
	<h3>基本用法</h3>
	<p>可同时展开多个面板，面板之间不影响</p>
	<DemoBlock js={`
import { BeCollapse, BeCollapseItem } from '@brewer/beerui'
let active = ['1']
const handleChange = (val) => {
	console.log(val);
}
`} code={
	`
<BeCollapse bind:value={active} on:change={handleChange}>
	<BeCollapseItem title="一致性 Consistency" name="1">
		<div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
		<div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
	</BeCollapseItem>
	<BeCollapseItem title="反馈 Feedback" name="2">
		<div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
		<div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
	</BeCollapseItem>
	<BeCollapseItem title="效率 Efficiency" name="3">
		<div>简化流程：设计简洁直观的操作流程；</div>
		<div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
		<div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
	</BeCollapseItem>
	<BeCollapseItem title="可控 Controllability" name="4">
		<div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
		<div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
	</BeCollapseItem>
</BeCollapse>
`}>
		<div slot='source'>
			<div class='demo-list'>
				<BeCollapse bind:value={active} on:change={handleChange}>
					<BeCollapseItem title="一致性 Consistency" name="1">
						<div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
						<div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
					</BeCollapseItem>
					<BeCollapseItem title="反馈 Feedback" name="2">
						<div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
						<div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
					</BeCollapseItem>
					<BeCollapseItem title="效率 Efficiency" name="3">
						<div>简化流程：设计简洁直观的操作流程；</div>
						<div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
						<div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
					</BeCollapseItem>
					<BeCollapseItem title="可控 Controllability" name="4">
						<div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
						<div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
					</BeCollapseItem>
				</BeCollapse>
			</div>
		</div>
		<div slot='description'>
			<ol>
				<li>export let value: string | string[]  = [''] // 当前激活的面板(如果是手风琴模式，绑定值类型需要为string，否则为array)</li>
				<li>export let accordion: boolean = false // 是否手风琴模式</li>
			</ol>
		</div>
	</DemoBlock>

	<h3>手风琴效果</h3>
	<p>每次只能展开一个面板</p>
	<DemoBlock js={`
let active1 = '1'
`} code={
	`
<BeCollapse bind:value={active1} accordion>
	<BeCollapseItem title="一致性 Consistency" name="1">
		<div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
		<div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
	</BeCollapseItem>
</BeCollapse>
`}>
		<div slot='source'>
			<div class='demo-list'>
				<BeCollapse bind:value={active1} accordion>
					<BeCollapseItem title="测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试" name="1">
						<div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
						<div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
					</BeCollapseItem>
					<BeCollapseItem title="反馈 Feedback" name="2">
						<div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
						<div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
					</BeCollapseItem>
					<BeCollapseItem disabled title="效率 Efficiency" name="3">
						<div>简化流程：设计简洁直观的操作流程；</div>
						<div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
						<div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
					</BeCollapseItem>
					<BeCollapseItem title="可控 Controllability" name="4">
						<div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
						<div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
					</BeCollapseItem>
				</BeCollapse>
			</div>
		</div>
		<div slot='description'>
			<ol>
				<li>export let value: string | string[]  = [''] // 当前激活的面板(如果是手风琴模式，绑定值类型需要为string，否则为array)</li>
				<li>export let accordion: boolean = false // 是否手风琴模式</li>
			</ol>
		</div>
	</DemoBlock>
	<h3>自定义样式</h3>
	<DemoBlock js={`
let active3 = '1'
`}  code={`
<BeCollapse bind:value={active3} accordion>
	<BeCollapseItem title="自定义样式标题1" name="1">
		<div class='m-list__header' slot='title' let:prop={node}>
			<div class='m-list__title'>{node.title}</div>
			{#if node.active}
				<div class='m-list__icon'>
					<BeIcon name='remove' />
				</div>
			{:else}
				<div class='m-list__icon'>
					<BeIcon name='add' />
				</div>
			{/if}
		</div>
		<div class='m-list__content'>使用Css和自定义布局打造自己喜爱的风格</div>
	</BeCollapseItem>
	<BeCollapseItem title="自定义样式标题2" name="2">
		<div class='m-list__header' slot='title' let:prop={node}>
			<div class='m-list__title'>{node.title}</div>
			{#if node.active}
				<div class='m-list__icon'>
					<BeIcon name='remove' />
				</div>
			{:else}
				<div class='m-list__icon'>
					<BeIcon name='add' />
				</div>
			{/if}
		</div>
		<div class='m-list__content'>使用Css和自定义布局打造自己喜爱的风格</div>
	</BeCollapseItem>
</BeCollapse>
`}>
		<div slot='source'>
			<div class='demo-list'>
				<BeCollapse bind:value={active3} accordion>
					<BeCollapseItem title="自定义样式标题1" name="1">
						<div class='m-list__header' slot='title' let:prop={node}>
							<div class='m-list__title'>{node.title}</div>
							{#if node.active}
								<div class='m-list__icon'>
									<BeIcon name='remove' />
								</div>
							{:else}
								<div class='m-list__icon'>
									<BeIcon name='add' />
								</div>
							{/if}
						</div>
						<div class='m-list__content'>使用Css和自定义布局打造自己喜爱的风格</div>
					</BeCollapseItem>
					<BeCollapseItem title="自定义样式标题2" name="2">
						<div class='m-list__header' slot='title' let:prop={node}>
							<div class='m-list__title'>{node.title}</div>
							{#if node.active}
								<div class='m-list__icon'>
									<BeIcon name='remove' />
								</div>
							{:else}
								<div class='m-list__icon'>
									<BeIcon name='add' />
								</div>
							{/if}
						</div>
						<div class='m-list__content'>使用Css和自定义布局打造自己喜爱的风格</div>
					</BeCollapseItem>
				</BeCollapse>
			</div>
		</div>
	</DemoBlock>
	<h3 class='demo-table-title'>BeCollapse Attributes</h3>
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
				<td>绑定的值</td>
				<td>string | string[]</td>
				<td>-</td>
				<td>''</td>
			</tr>
			<tr>
				<td>accordion</td>
				<td>手风琴模式</td>
				<td>boolean</td>
				<td>true/false</td>
				<td>false</td>
			</tr>
		</tbody>
	</table>
	<h3 class='demo-table-title'>BeCollapseItem Attributes</h3>
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
				<td>name</td>
				<td>唯一标志符</td>
				<td>string | number</td>
				<td>-</td>
				<td>''</td>
			</tr>
			<tr>
				<td>title</td>
				<td>标题</td>
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
		</tbody>
	</table>
</div>

<style lang='scss' global>
  .demo-title {font-size: 22px;color: var(--text-color-primary);margin: 15px 0;}
  .demo-list {
    margin: 16px 0;
  }
  .m-list__title {flex: 1;}
  .m-list__header {display: flex;justify-content: space-between;width: 100%;align-items: center;background: #c1c1c1;padding: 0 24px;}
  .m-list__content {padding: 24px;}
</style>
