<script lang='ts'>
	import Date from './panel/date.svelte';
	import BeInput from '../be-input/BeInput.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher()
	export let value;
	export let selectMode = 'day'
	export let format
	let visible;
 	let input
	function confirmPick(e) {
		value = e.detail;
		visible = false
		dispatch('change', e.detail)
	}

	function handleShowDatePopper(e) {
		visible = true;
	}

	function handleChange() {
		visible = false;
	}

	function handleCloseDatePopper(e) {
		visible = false;
	}
</script>
<svelte:body on:click={handleCloseDatePopper} />
<div class='be-date' on:click|stopPropagation={()=>{}}>
	<!-- <div on:click|stopPropagation={handleShowDatePopper}> -->
		<BeInput on:change={handleChange} bind:value={value} on:focus={handleShowDatePopper} bind:this={input}/>
	<!-- </div> -->
	<Date value={value} bind:visible={visible} on:pick={confirmPick} selectMode={selectMode} format={format}/>
</div>
<style lang="scss" global>
  @import '../assets/scss/modules/datePicker';
</style>
