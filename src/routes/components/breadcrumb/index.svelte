<script lang='ts'>
    import DemoBlock from '$lib/demo/DemoBlock.svelte';
    import BeBreadcrumb from "$lib/be-breadcrumb/BeBreadcrumb.svelte";
    import BeBreadcrumbItem from "$lib/be-breadcrumb/BeBreadcrumbItem.svelte";
    import ReplBlock from '$lib/demo/ReplBlock.svelte';
</script>
<div class='page-container'>
    <h2>Breadcrumb 面包屑</h2>
    <p>显示当前页面的路径，快速返回之前的任意页面。</p>
	<h3>基础用法</h3>
	<ReplBlock
		height='300px'
		js={`import { BeBreadcrumb, BeBreadcrumbItem } from '@brewer/beerui/be-breadcrumb'`}
		html={`

<div style='padding: 20px;'>
	<BeBreadcrumb separator='/'>
	  <BeBreadcrumbItem path='/' prefetch>首页</BeBreadcrumbItem>
	  <BeBreadcrumbItem><a href='/'>活动管理</a></BeBreadcrumbItem>
	  <BeBreadcrumbItem>活动列表</BeBreadcrumbItem>
	  <BeBreadcrumbItem>活动详情</BeBreadcrumbItem>
	</BeBreadcrumb>
</div>
`}
	/>
	<h3 class='demo-table-title'>BeBreadcrumb Attributes</h3>
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
			<td>separator</td>
			<td>分隔符</td>
			<td>string</td>
			<td>-</td>
			<td>'/'</td>
		</tr>
		</tbody>
	</table>
	<h3 class='demo-table-title'>BeBreadcrumbItem Attributes</h3>
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
				<td>path</td>
				<td>路由地址</td>
				<td>string</td>
				<td>-</td>
				<td>''</td>
			</tr>
			<tr>
				<td>prefetch(svelteKit)</td>
				<td>开启预加载</td>
				<td>boolean</td>
				<td>true/false</td>
				<td>false</td>
			</tr>
		</tbody>
	</table>
	<h3 class='demo-table-title'>BeBreadcrumbItem Slot</h3>
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
			<td>自定义</td>
		</tr>
		</tbody>
	</table>
</div>
