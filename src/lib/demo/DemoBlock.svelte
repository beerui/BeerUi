<script lang="ts">
  import CodeView from "$lib/demo/CodeView.svelte";

  export let code = '';
  export let js = '';
</script>
<div class="demo-block">
	<div class="source">
		<slot name="source"></slot>
	</div>
	<div class="meta">
		<div class="description">
			<slot name="description"></slot>
		</div>
		<div class="demo-code-container pb-0">
			{#if js || code}
			<CodeView {js} {code} />
			{/if}
		</div>
	</div>
</div>
