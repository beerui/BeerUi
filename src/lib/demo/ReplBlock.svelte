<script>
	import Repl from '@brewer/repl';
	import { onMount } from 'svelte';
	import { is_browser } from '$lib/utils/beerui';

	export let js = ''
	export let html = ''
	let repl;

	onMount(() => {
		repl.set({
			components: [
				{
					name: 'App',
					type: 'svelte',
					source:
						`<scr` + `ipt>
	${js}
</scr` + `ipt>
<svelte:head>
  <link rel="stylesheet" href="https://unpkg.com/@brewer/beerui/assets/scss/dist/beer.css" />
</svelte:head>
${html}
`
				}
			]
		});
	});
</script>

<div class='repl-container'>
	{#if is_browser}
		<Repl bind:this={repl} showAst />
	{/if}
</div>

<style>
	.repl-container {height: 500px;}
</style>
