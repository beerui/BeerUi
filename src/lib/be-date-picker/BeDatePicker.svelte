<script lang='ts'>
	import Dates from './panel/date.svelte';
	import BeInput from '../be-input/BeInput.svelte';
	import clickOutside from '$lib/_actions/clickOutside';
	import { FormatTime } from '$lib/utils/beerui';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher()

	const DEFAULT_FORMATS = {
		date: 'yyyy-MM-dd',
		month: 'yyyy-MM',
		datetime: 'yyyy-MM-dd HH:mm:ss',
		year: 'yyyy'
	}

	export let value;
	export let selectMode = 'date'
	export let format
	export let valueFormat = DEFAULT_FORMATS[selectMode]
	const times = new FormatTime(valueFormat)
	const dates = new FormatTime(format)
	export let disabledDate: Function
	let visible;
 	let input

	// 日期格式化
	if(value) {
		value = new Date(value)
		if(value == 'Invalid Date') throw new Error('请输入正确的时间格式！')
		value = formatDate(value)
	} 

	function confirmPick(e) {
		value = formatDate(e.detail);
		visible = false
		dispatch('change', dates.setTime(e.detail))
	}

	function handleShowDatePopper(e) {
		visible = true;
	}

	function handleChange() {
		visible = false;
	}
	function formatDate(time) {
		return times.setTime(time)
	}
	function handleCloseDatePopper(v) {
		// console.log(e.target, input)
		// if (!visible) return;
		visible = false;
	}
</script>
<div class='be-date' use:clickOutside={{ cb: handleCloseDatePopper }} on:outside={handleCloseDatePopper}>
	<BeInput on:change={handleChange} {value} on:focus={handleShowDatePopper} bind:this={input}/>
	<Dates {valueFormat} {disabledDate} {value} {selectMode} {format} bind:visible={visible} on:pick={confirmPick} />
</div>
