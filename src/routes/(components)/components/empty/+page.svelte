<script lang='ts'>
    import DemoBlock from '$lib/demo/DemoBlock.svelte';
    import BeEmpty from "$lib/be-empty/index.ts";
    import BeButton from "$lib/be-button/BeButton.svelte";
</script>
<svelte:head>
	<title>Empty 空状态 组件文档 BeerUi-官方文档</title>
	<meta name="description" content="BeerUi, 基于 svelte 的 PC端 组件库，base on svelte 3.0 web component">
	<meta name="keywords" content="Empty 空状态, beerui组件文档,beerui,beerui文档,beerui官网, BeerUi,@brewer/beerui,svelte,component,svelteKit">
</svelte:head>
<div class='page-container'>
    <h2>Empty 空状态</h2>
    <p>空状态时的占位提示。</p>
	<h3>基础用法</h3>
    <DemoBlock
	  code={`
<BeEmpty description="描述文字" />
`}>
        <div slot='source'>
            <div class='demo-list'>
	            <BeEmpty description="描述文字" />
            </div>
        </div>
    </DemoBlock>
	<h3>自定义图片</h3>
    <DemoBlock
	  code={`
<BeEmpty description="描述文字" image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" />
`}>
        <div slot='source'>
            <div class='demo-list'>
	            <BeEmpty description="描述文字" image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" />
            </div>
        </div>
    </DemoBlock>
	<h3>图片尺寸</h3>
    <DemoBlock
	  code={`
<BeEmpty description="描述文字" size="300px" />
`}>
        <div slot='source'>
            <div class='demo-list'>
	            <BeEmpty description="描述文字" size="300px" />
            </div>
        </div>
    </DemoBlock>
	<h3>底部内容</h3>
	<p>使用默认插槽可在底部插入内容。</p>
    <DemoBlock
	  code={`
<BeEmpty description="描述文字">
	<BeButton>默认插槽</BeButton>
</BeEmpty>
`}>
        <div slot='source'>
            <div class='demo-list'>
	            <BeEmpty description="描述文字">
		            <BeButton>默认插槽</BeButton>
	            </BeEmpty>
            </div>
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
				<td>description</td>
				<td>描述</td>
				<td>string</td>
				<td>-</td>
				<td>''</td>
			</tr>
			<tr>
				<td>image</td>
				<td>图片的src</td>
				<td>string</td>
				<td>-</td>
				<td>-</td>
			</tr>
			<tr>
				<td>size</td>
				<td>尺寸</td>
				<td>string</td>
				<td>-</td>
				<td>160px</td>
			</tr>
		</tbody>
	</table>
</div>
