<script lang="ts">
	// import { createEventDispatcher } from "svelte";
	import { BeerPS } from "$lib/utils/beerui";
	import { getContext } from "svelte";
	let hover = false;
	export let label:any;
	export let value:any = '';
	export let disabled:boolean = false
	const selectStore = getContext("selectStore");
	const key = getContext("selectChangeKey");
	
	let isSelect = false
	const changeCurrent = (current) => {
		isSelect = current.value === node.value
	}
	const hoverCurrent = (isHover) => {
		hover = isHover
	}
	selectStore.creatNode({ ...$$props, key: value, change: changeCurrent, hover: hoverCurrent });
	let node = selectStore.getCurrent(value)
	isSelect = selectStore.value === node.value
	// hover = selectStore.value === node.value
	const handleClick = () => {
		if(node.disabled) throw new Error('[Select] this option has been disabled')
		selectStore.setCurrent(node)
		BeerPS.publish(key, node)
	}
	const hoverItem = (e)=> {
		selectStore.setHover(e.target.dataset.value)
	}
</script>
<li class="be-select-dropdown__item" data-value={value} on:mouseenter={hoverItem} class:selected={isSelect} class:is-disabled={disabled} class:hover={hover} on:click={handleClick}>{label}</li>
