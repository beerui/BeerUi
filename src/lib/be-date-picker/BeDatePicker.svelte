<script lang='ts'>
	import { clickOutSide } from '$lib/utils/beerui';
	import Date from './panel/date.svelte';
	import BeInput from '../be-input/BeInput.svelte';

	export let value;
	export let selectMode = 'day'
	export let format
	let visible;
 	let input
	function confirmPick(e) {
		value = e.detail;
		visible = false
	}

	function handleShowDatePopper(e) {
		console.log(e, input);
		visible = true;
	}

	function handleChange() {
		visible = false;
	}

	function handleCloseDatePopper(v) {
		// console.log(e.target, input)
		// if (!visible) return;
		visible = v;
	}

</script>
<!--<svelte:body on:click={handleCloseDatePopper} />-->
<div class='be-date' on:click|stopPropagation={()=>{}} use:clickOutSide={handleCloseDatePopper}>
	<!-- <div on:click|stopPropagation={handleShowDatePopper}> -->
		<BeInput on:change={handleChange} bind:value={value} on:focus={handleShowDatePopper} bind:this={input}/>
	<!-- </div> -->
	<Date value={value} bind:visible={visible} on:pick={confirmPick} selectMode={selectMode} format={format}/>
</div>
<style lang="scss" global>
  @import '../assets/scss/modules/datePicker';
</style>
