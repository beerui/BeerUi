<script lang='ts'>
import LineCode from '$lib/demo/LineCode.svelte';
</script>
<svelte:head>
	<title>组件文档 BeerUi-官方文档</title>
	<meta name="description" content="BeerUi, 基于 svelte 的 PC端 组件库，base on svelte 3.0 web component">
	<meta name="keywords" content="组件文档,beerui,beerui文档,beerui官网, BeerUi,@brewer/beerui,svelte,component,svelteKit">
</svelte:head>
<div class='page-container'>
	<h1>快速开始 Start</h1>
	<h2>安装 Install</h2>
	<LineCode code={`npm i @brewer/beerui -D`} />
	<h2>使用 Use</h2>
	<h4>按需引入 css需要单独导入</h4>
	<LineCode code={`import { BeButton } '@brewer/beerui/be-button'`} />
	<LineCode code={`import '@brewer/beerui/assets/beer.css'`} />

	<h4>注意：</h4>

	<h4>学习资料</h4>
	<ol>
		<li>
			<a href='https://learn.svelte.dev/tutorial/welcome-to-svelte' rel='noreferrer' target='_blank'>welcome-to-svelte 互动式教程</a>
		</li>
		<li>
			<a rel='noreferrer' href='https://component-party.dev/' target='_blank'>Svelte与其它框架语法对比</a>
		</li>
	</ol>
</div>
