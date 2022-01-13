<script lang='ts'>
	import { createEventDispatcher } from 'svelte'
  import { filterClass } from '$lib/utils/beerui';

  export let style = null
	export let type = '';
	export let size = '';
	export let round = '';
	export let nativeType = 'button';
	export let autofocus = false;
	export let disabled = false;
	export let loading = false;
	export let icon = '';

  const _class = ['be-button', ...filterClass($$props, 'be-button--')].join(' ')

	const dispatch = createEventDispatcher();
	const handleClick = (evt: MouseEvent) => dispatch('click', evt);
</script>
<button
	{autofocus}
	class={_class}
	{style}
	on:click={handleClick}
	type={nativeType}
>
	<span>
			<slot></slot>
	</span>
</button>
<style lang='scss'>
  @import '../assets/scss/modules/button';
</style>
