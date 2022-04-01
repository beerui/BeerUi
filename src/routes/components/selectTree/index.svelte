<script lang='ts'>
	import DemoBlock from '$lib/demo/DemoBlock.svelte';
	import BeSelectTree from '$lib/be-select-tree/BeSelectTree.svelte';

	let data = [
		{
			id: 1,
			label: '一级 1',
			children: [{
				id: 4,
				label: '二级 1-1',
				children: [{
					id: 9,
					label: '三级 1-1-1'
				}, {
					id: 10,
					label: '三级 1-1-2'
				}]
			}]
		}, {
			id: 2,
			label: '一级 2',
			children: [{
				id: 5,
				label: '二级 2-1'
			}, {
				id: 6,
				label: '二级 2-2'
			}]
		}, {
			id: 3,
			label: '一级 3',
			children: [{
				id: 7,
				label: '二级 3-1'
			}, {
				id: 8,
				label: '二级 3-2'
			}]
		}
	];
	let value = '';

	const handleChange = (val) => {
		console.log(val);
	};
</script>
<div class='page-container'>
	<h2>SelectTree 树形选择框</h2>
	<p class='desc'>通过折叠面板收纳内容区域</p>
	<h3>基本用法</h3>
	<p>可同时展开多个面板，面板之间不影响</p>
	<DemoBlock js={`
import { BeCollapse, BeCollapseItem } from '@brewer/beerui'
`} code={
	`

`}>
		<div slot='source'>
			<div class='demo-list'>
				<BeSelectTree bind:data={data} bind:value={value} on:change={handleChange} />
			</div>
		</div>
		<div slot='description'>
			<ol>
				<li>export let value: string | string[] = [''] // 当前激活的面板(如果是手风琴模式，绑定值类型需要为string，否则为array)</li>
				<li>export let accordion: boolean = false // 是否手风琴模式</li>
			</ol>
		</div>
	</DemoBlock>
</div>

<style lang='scss' global>
	.demo-title {
		font-size: 22px;
		color: var(--text-color-primary);
		margin: 15px 0;
	}

	.demo-list {
		margin: 16px 0;
	}

	.m-list__title {
		flex: 1;
	}

	.m-list__header {
		display: flex;
		justify-content: space-between;
		width: 100%;
		align-items: center;
		background: #c1c1c1;
		padding: 0 24px;
	}

	.m-list__content {
		padding: 24px;
	}
</style>
