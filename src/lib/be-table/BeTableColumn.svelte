<script lang="ts">
	import { getAllContexts, getContext } from 'svelte';

	export let prop:string = ''
  export let label:string = ''
  export let width:string = ''
  export let name:string = ''
	const contexts = getAllContexts();
	const { data } = getContext('data');
</script>
<div class='be-table__column' data-prop={prop} data-label={label} data-name={name} data-width={width}>
	<slot></slot>
</div>
