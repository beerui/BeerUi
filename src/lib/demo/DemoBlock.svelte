<script lang="ts">
  import CodeView from "$lib/demo/CodeView.svelte";
	import { onMount } from 'svelte';
  export let code = '';
  export let js = '';
	let demoBlcok
	let isExpanden = false
	let clientHeight = 0
	onMount(() => {
		setTimeout(() => {
			clientHeight = demoBlcok.clientHeight
			expandedCode(isExpanden)
		}, 0);
	})
	$:controlText = isExpanden ? '隐藏代码' : '显示代码'
	const expandedCode = (expanden) => {
		isExpanden = expanden
		demoBlcok.style.height = expanden ? (clientHeight + 'px') : '0'
	}
</script>
<div class="demo-block">
	<div class="source">
		<slot name="source"></slot>
	</div>
	<div class="meta" bind:this={demoBlcok} style:display={demoBlcok ? 'block' : 'none'}>
		<div class="description">
			<slot name="description"></slot>
		</div>
		<div class="demo-code-container pb-0">
			{#if js || code}
			<CodeView {js} {code} />
			{/if}
		</div>
	</div>
	<div class="demo-block-control" on:click={() => {expandedCode(!isExpanden)}}>
		<div class="triangle" class:triangle-down = {!isExpanden}></div>
		<span>{ controlText }</span>
	</div>
</div>
