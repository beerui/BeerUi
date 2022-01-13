<script lang="ts">
import CodeView from '$lib/demo/CodeView.svelte';

export let code
export let js
</script>
<div class='demo-block'>
	<div class='source'>
		<slot name='source'></slot>
	</div>
	<div class='meta'>
		<div class='description'>
			<slot name='description'></slot>
		</div>
		{#if js}
			<div class='demo-code-container pb-0'>
				<CodeView {js} />
			</div>
		{/if}
		{#if code}
			<div class='demo-code-container pt-0'>
				<CodeView {code} />
			</div>
		{/if}
	</div>
</div>
