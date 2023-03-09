<script lang='ts'>
	import DemoBlock from '$lib/demo/DemoBlock.svelte';
	import BeSelectTree from '$lib/be-select-tree/BeSelectTree.svelte';

	let data = [
		{
			id: 1,
			label1: '一级 1',
			children: [{
				id: 4,
				label1: '二级 1-1',
				children: [{
					id: 9,
					label1: '三级 1-1-1'
				}, {
					id: 10,
					label1: '三级 1-1-2'
				}]
			}]
		}, {
			id: 2,
			label1: '一级 2',
			children: [{
				id: 5,
				label1: '二级 2-1'
			}, {
				id: 6,
				label1: '二级 2-2'
			}]
		}, {
			id: 3,
			label1: '一级 3',
			children: [{
				id: 7,
				label1: '二级 3-1'
			}, {
				id: 8,
				label1: '二级 3-2'
			}]
		}
	];
	let lazyData = [
		{
			id: 1,
			label: '一级 1'
		}
	];

	let count = 1
	const props = {
		label: 'name',
		children: 'zones'
	}
	const loadNode = (node, resolve) => {
		if (node.level === 0) {
			return resolve([{ name: 'region1' }, { name: 'region2' }]);
		}
		if (node.level > 3) return resolve([]);

		var hasChild;
		if (node.data.name === 'region1') {
			hasChild = true;
		} else if (node.data.name === 'region2') {
			hasChild = false;
		} else {
			hasChild = Math.random() > 0.5;
		}

		setTimeout(() => {
			var data;
			if (hasChild) {
				data = [{
					name: 'zone' + count++
				}, {
					name: 'zone' + count++
				}];
			} else {
				data = [];
			}

			resolve(data);
		}, 500);
	};
	let value = [5];

	const defaultProps = { children: 'children', label: 'label1' }
	const handleChange = (val) => {
		console.log(val);
	};
</script>

<svelte:head>
	<title>SelectTree 树形选择框 组件文档 BeerUi-官方文档</title>
	<meta name="description" content="BeerUi, 基于 svelte 的 PC端 组件库，base on svelte 3.0 web component">
	<meta name="keywords" content="SelectTree 树形选择框, beerui组件文档,beerui,beerui文档,beerui官网, BeerUi,@brewer/beerui,svelte,component,svelteKit">
</svelte:head>
<div class='page-container'>
	<h2>SelectTree 树形选择框</h2>
	<p class='desc'>通过折叠面板收纳内容区域</p>
	<h3>基本用法</h3>
	<p>可同时展开多个面板，面板之间不影响</p>

	<DemoBlock js={`
import { BeSelectTree } from '@brewer/beerui'
let value = [1];

const handleChange = (val) => {
	console.log(val);
};
const defaultProps = { children: 'children', label: 'label1' }
`} code={
	`
<BeSelectTree defaultProps={defaultProps} bind:data={data} bind:value={value} on:change={handleChange} nodeKey='id' />
`}>
		<div slot='source'>
			<div class='demo-list'>
				value: {JSON.stringify(value)}
				<BeSelectTree defaultProps={defaultProps} bind:data={data} bind:value={value} on:change={handleChange} nodeKey='id' />
			</div>
		</div>
		<div slot='description'>
			<ol>
				<li>data: string[] = [] // 树形数据</li>
				<li>value: string[] = ['1'] // 绑定的value</li>
				<li>clearable true // 显示清除按钮</li>
				<li>placeholder=请选择 // 默认提示</li>
				<li>change // value改变的回调</li>
				<li>nodeKey // label的指向</li>
				<li><pre><code>{@html `defaultProps = { children: 'children', label: 'label' }`}</code></pre></li>
			</ol>
		</div>
	</DemoBlock>

	<h3>懒加载自定义叶子节点</h3>
	<p>动态加载节点数据的方法</p>
	<DemoBlock js={`
let count = 1
const props = {
	label: 'name',
	children: 'zones'
}
const loadNode = (node, resolve) => {
	if (node.level === 0) {
		return resolve([{ name: 'region1' }, { name: 'region2' }]);
	}
	if (node.level > 3) return resolve([]);

	var hasChild;
	if (node.data.name === 'region1') {
		hasChild = true;
	} else if (node.data.name === 'region2') {
		hasChild = false;
	} else {
		hasChild = Math.random() > 0.5;
	}

	setTimeout(() => {
		var data;
		if (hasChild) {
			data = [{
				name: 'zone' + count++
			}, {
				name: 'zone' + count++
			}];
		} else {
			data = [];
		}

		resolve(data);
	}, 500);
};
`} code={
	`
<BeSelectTree
	lazy
	load={loadNode}
	bind:value={value}
	defaultProps={props}
/>
`}>
		<div slot='source'>
			<div class='demo-list'>
				value: {JSON.stringify(value)}
				<hr>
				<BeSelectTree
					lazy
					load={loadNode}
					bind:value={value}
					defaultProps={props}
				/>
			</div>
		</div>
		<div slot='description'>
			<ol>
				<li>lazy // 开启懒加载</li>
				<li>load // 懒加载数据的方法</li>
			</ol>
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
			<td>title</td>
			<td>标题</td>
			<td>string</td>
			<td>-</td>
			<td>''</td>
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
			<td>close</td>
			<td>关闭的回调</td>
			<td>''</td>
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
			<td>icon</td>
			<td>标题前的icon</td>
		</tr>
		</tbody>
	</table>
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
