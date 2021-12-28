<script lang='ts'>
	import Date from './panel/date.svelte';
	import BeInput from '../be-input/BeInput.svelte';

	export let value;
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

	function handleCloseDatePopper(e) {
		console.log(e.target, input)
		// if (!visible) return;
		visible = false;
	}
</script>
<svelte:body on:click={handleCloseDatePopper} />
<div class='be-date' on:click|stopPropagation={()=>{}}>
	<!-- <div on:click|stopPropagation={handleShowDatePopper}> -->
		<BeInput on:change={handleChange} bind:value={value} on:focus={handleShowDatePopper} bind:this={input}/>
	<!-- </div> -->
	<Date value={value} bind:visible={visible} on:pick={confirmPick} />
</div>
<style lang="scss" global>
  @import '../assets/scss/modules/datePicker';
</style>
