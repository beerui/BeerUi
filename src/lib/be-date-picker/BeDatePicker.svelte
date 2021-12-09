<script lang='ts'>
	import Date from './panel/date.svelte';
	import BeInput from '../be-input/BeInput.svelte';

	export let value;
	let visible;
	let input;

	function confirmPick(e) {
		value = e.detail;
	}

	function handleShowDatePopper(e) {
		console.log(e);
		visible = true;
	}

	function handleChange() {
		visible = false;
	}

	function handleCloseDatePopper(e) {
		if (!visible) return;
		visible = false;
	}
</script>
<svelte:body on:click={handleCloseDatePopper} />
<div class='be-date'>
	<div on:click|stopPropagation={handleShowDatePopper}>
		<BeInput readonly on:change={handleChange} bind:value={value} />
	</div>
	<Date value={value} bind:visible={visible} on:pick={confirmPick} />
</div>

<style lang="scss" global>
  @import '../assets/scss/modules/datePicker';
</style>
