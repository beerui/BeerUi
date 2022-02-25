<script lang="ts">
// import { createEventDispatcher } from "svelte";
import { BeerPS } from "$lib/utils/beerui";
import { getContext, setContext } from "svelte";
let disabled = false
let hover = false
export let label;
export let value
// const selectStore = getContext('selectStore')
const key = getContext("selectChangeKey");
const selectValue = getContext("selectValue");
let itemSelect = false
if(value == selectValue) {
  itemSelect = true
  BeerPS.publish(key, { label, value });
} 
// selectStore.setOptionList({ label,value })


// $: console.log( selectStore, selectStore.option.value);

const select = () => {
  // selectStore.setOption({ label, value })
  BeerPS.publish(key, { label, value });
}
</script>
 <li class='be-select-dropdown__item'  class:selected = {itemSelect} class:is-disabled = {disabled} class:hover = {hover} on:click={select}>{label}</li>
