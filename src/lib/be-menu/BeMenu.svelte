<script lang="ts">
import { BeerPS } from "$lib/utils/beerui";
export let active:string = ''

// BeerPS.publish('MenuActiveChange', active)

BeerPS.subscribe('MenuActiveChange', item => active = item)
</script>
<ul role="menubar" class='be-menu be-menu--horizontal'>
	<slot></slot>
</ul>
