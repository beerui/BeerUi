<script lang="ts">
  import CodeView from "$lib/demo/CodeView.svelte";
	import { onMount, tick } from 'svelte';
  export let code = '';
  export let js = '';
	let demoBlcok
	let isExpanden = false
	let clientHeight = 0
	let fixedControl = false
	onMount(async () => {
		await tick()
		clientHeight = demoBlcok.clientHeight
		expandedCode(isExpanden)
	})
	
	$:controlText = isExpanden ? '隐藏代码' : '显示代码'
	const expandedCode = (expanden) => {
		isExpanden = expanden
		demoBlcok.style.height = expanden ? (clientHeight + 'px') : '0'
		setTimeout(() => {
			const scorllParent = document.querySelector('.be-main')
			scorllParent && scorllParent.addEventListener('scroll', scrollHandler);
			scrollHandler()
		}, 200);
	}
	const scrollHandler = () => {
		const { top, bottom } = demoBlcok.getBoundingClientRect();
		fixedControl = bottom > document.documentElement.clientHeight &&
			top + 44 <= document.documentElement.clientHeight;
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
	<div class="demo-block-control" class:is-fixed={fixedControl} on:click={() => {expandedCode(!isExpanden)}}>
		<div class="triangle" class:triangle-down = {!isExpanden}></div>
		<span>{ controlText }</span>
	</div>
</div>
