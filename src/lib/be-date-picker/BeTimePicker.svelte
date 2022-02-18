<script lang='ts'>
	import Time from './panel/time.svelte';
	import BeInput from '../be-input/BeInput.svelte';
	import clickOutside from '$lib/_actions/clickOutside';
	import { FormatTime } from '$lib/utils/beerui';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher()
	const DEFAULT_FORMATS = {
		time: 'HH:mm:ss'
	}
	export let value: Date
	let date = value || new Date()
	let visible;
	let format = DEFAULT_FORMATS['time']
	const times = new FormatTime(format)
	
	if(value) value = times.setTime(value)
	function handleShowDatePopper(e) {
		visible = true;
		console.log('handleShowDatePopper');
	}
	function handleChange() {
		visible = false;
	}
	function handleCloseDatePopper(v) {
		visible = false;
	}
	function confirmPick(e) {
		value = times.setTime(e.detail);
		visible = false
		dispatch('change',  value, e.detail)
	}
</script>
<div class='be-date' use:clickOutside={{ cb: handleCloseDatePopper }} on:outside={handleCloseDatePopper}>
	<BeInput on:change={handleChange} {value} on:focus={handleShowDatePopper} />
	<Time {date} bind:visible={visible} on:pick={confirmPick}/>
 </div>
