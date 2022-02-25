<script lang="ts">
	// import { createEventDispatcher } from "svelte";
	import { BeerPS } from "$lib/utils/beerui";
	import { getContext } from "svelte";

	let disabled = false;
	let hover = false;
	export let label;
	export let value = '';

	const selectStore = getContext("selectStore");
	const key = getContext("selectChangeKey");

	console.log('key 2', key);
	let isSelect = false
	const changeCurrent = (current) => {
		isSelect = current.value === node.value
		BeerPS.publish(key, current)
	}
	selectStore.creatNode({ ...$$props, key: value, cb: changeCurrent });
	let node = selectStore.getNodeByKey(value)

	const handleClick = () => {
		selectStore.setCurrent(node)
	}
</script>
<li class="be-select-dropdown__item" class:selected={isSelect} class:is-disabled={disabled} class:hover={hover}
    on:click={handleClick}>{label}</li>
