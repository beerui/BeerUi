<script>
	import Repl from '@brewer/repl';
	import { onMount } from 'svelte';
	import { is_browser } from '$lib/utils/beerui';

	export let js = ''
	export let html = ''
	export let css = ''
	export let height = '500px'
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
<sty` + `le>
${css}
</sty` + `le>
`
				}
			]
		});
	});
</script>

<div
	class='repl-container'
	style:height={height}
>
	{#if is_browser}
		<Repl bind:this={repl} showAst />
	{/if}
</div>
