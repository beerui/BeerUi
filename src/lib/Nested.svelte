<script>
  export let node;
</script>

<ol>
	{#each node as child}
	<li>{child.label} {child.checked || 'false'}</li>
	{/each}
</ol>
