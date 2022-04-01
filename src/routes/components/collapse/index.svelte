<script lang="ts">
	import DemoBlock from '$lib/demo/DemoBlock.svelte';
	import { BeCollapse, BeCollapseItem } from '$lib';

	let active = ['1']
	let active1 = '1'

	const handleChange = (val) => {
		console.log(val);
	}
</script>
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
					<BeCollapseItem title="一致性 Consistency" name="1">
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
</div>

<style lang='scss' global>
  .demo-title {font-size: 22px;color: var(--text-color-primary);margin: 15px 0;}
  .demo-list {
    margin: 16px 0;
  }
</style>
