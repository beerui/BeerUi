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
console.log(BeerPS);
  
  BeerPS.subscribe('test', items => {
    console.log(items)
  })
if(value == selectValue) setContext('lable', label)
// selectStore.setOptionList({ label,value })

$: itemSelect = selectValue == value

// $: console.log( selectStore, selectStore.option.value);

const select = () => {
  // selectStore.setOption({ label, value })
  BeerPS.publish(key, { label, value });
}
</script>
 <li class='be-select-dropdown__item'  class:selected = {itemSelect} class:is-disabled = {disabled} class:hover = {hover} on:click={select}>{label}</li>
