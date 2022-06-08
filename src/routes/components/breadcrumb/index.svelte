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
    <DemoBlock
	  code={`
<BeBreadcrumb separator="/">
  <BeBreadcrumbItem path="/" prefetch>首页</BeBreadcrumbItem>
  <BeBreadcrumbItem><a href="/">活动管理</a></BeBreadcrumbItem>
  <BeBreadcrumbItem>活动列表</BeBreadcrumbItem>
  <BeBreadcrumbItem>活动详情</BeBreadcrumbItem>
</BeBreadcrumb>
`}>
        <div slot='source'>
            <div class='demo-list'>
	            <BeBreadcrumb separator="/">
		            <BeBreadcrumbItem path="/" prefetch>首页</BeBreadcrumbItem>
		            <BeBreadcrumbItem><a href="/">活动管理</a></BeBreadcrumbItem>
		            <BeBreadcrumbItem>活动列表</BeBreadcrumbItem>
		            <BeBreadcrumbItem>活动详情</BeBreadcrumbItem>
	            </BeBreadcrumb>
            </div>
        </div>
	    <div slot="description">
		    <ol>
			    <li>提供 separator 分隔符 默认为 /</li>
			    <li>提供 prefetch(svelteKit) 是否需要预加载 默认为 false</li>
		    </ol>
	    </div>
    </DemoBlock>
	<h3>Repl</h3>
	<ReplBlock
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
</div>
