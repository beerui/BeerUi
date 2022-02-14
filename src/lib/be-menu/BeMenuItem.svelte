<script lang='ts'>
  import { BeerPS } from "$lib/utils/beerui";

  export let index = ''
  let isActive = false
  const activeChange = () => BeerPS.publish('MenuActiveChange', index)
  BeerPS.subscribe('MenuActiveChange', (item) => isActive = index === item)
</script>
<li role="menuitem" tabindex="0" class="be-menu-item" class:is_active={isActive} on:click={activeChange} {index}>
	<slot></slot>
</li>
