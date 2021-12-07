<script>
	export let items = [];
	console.log('items', items);
</script>

<ul>
	{#each items as item}
		<li class="fancy">
			<slot prop={item}></slot>
		</li>
	{/each}
</ul>
