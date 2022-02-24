<script lang="ts">
// import { createEventDispatcher } from "svelte";
import { BeerPS } from "$lib/utils/beerui";

  // const dispath = createEventDispatcher()
  const selectChange = (key) => BeerPS.publish('selectChange', key)
  export let label;
	export let value
  const select = () => {
    console.log(label, value);
    
    selectChange({label, value})
    // dispath('change', value)
  }
</script>
 <li class='be-select-dropdown__item' on:click={select}>{label}</li>
