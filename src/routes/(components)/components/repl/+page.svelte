<script lang='ts'>
import ReplBlock from '$lib/demo/ReplBlock.svelte';
</script>
<svelte:head>
	<title>REPL 组件文档 BeerUi-官方文档</title>
	<meta name="description" content="BeerUi, 基于 svelte 的 PC端 组件库，base on svelte 3.0 web component">
	<meta name="keywords" content="REPL, beerui组件文档,beerui,beerui文档,beerui官网, BeerUi,@brewer/beerui,svelte,component,svelteKit">
</svelte:head>
<div class='page-container'>
	<ReplBlock
		height='100vh'
		js={`import BeButton from '@brewer/beerui/be-button'`}
		html={`<BeButton type="default">Hello BeerUi</BeButton>`}
	/>
</div>
