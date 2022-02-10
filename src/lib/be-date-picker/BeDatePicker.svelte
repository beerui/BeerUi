<script lang='ts'>
	import Date from './panel/date.svelte';
	import BeInput from '../be-input/BeInput.svelte';
	import clickOutside from '$lib/_actions/clickOutside';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher()

	export let value;
	export let selectMode = 'day'
	export let format
	export let disabledDate: Function
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

	function handleCloseDatePopper(v) {
		// console.log(e.target, input)
		// if (!visible) return;
		visible = false;
	}
</script>
<div class='be-date' use:clickOutside={{ cb: handleCloseDatePopper }} on:outside={handleCloseDatePopper}>
	<BeInput on:change={handleChange} {value} on:focus={handleShowDatePopper} bind:this={input}/>
	<Date {disabledDate} {value} {selectMode} {format} bind:visible={visible} on:pick={confirmPick} />
</div>
