<script lang="ts">
	import  '$lib/assets/beer.css'
	import LayoutHeader from '$lib/demo/layout/LayoutHeader.svelte';
	import { page } from '$app/stores';
	import LayoutFooter from '$lib/demo/layout/LayoutFooter.svelte';
</script>
<svelte:head>
	<title>BeerUi</title>
	<meta name="description" content="BeerUi, base on svelte 3.0 web component">
	<meta name="keywords" content="BeerUi,@brewer/beerui,svelte,component,svelteKit">
</svelte:head>
<div class='be-warp'>
	<LayoutHeader menu={$page.url.pathname} />
	<div class='be-container'>
		<slot></slot>
		<LayoutFooter />
	</div>
</div>
<style lang='scss'>
  .be-warp {
    background: rgb(107, 132, 173);
  }
</style>
