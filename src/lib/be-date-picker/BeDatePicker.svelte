<script lang='ts'>
	import BeIcon  from '../be-icon/BeIcon.svelte';
	import Dates from './panel/date.svelte';
	import DateRange from './panel/date-range.svelte';
	import BeInput from '../be-input/BeInput.svelte';
	import clickOutside from '$lib/_actions/clickOutside';
	import { FormatTime } from '$lib/utils/beerui';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher()

	const DEFAULT_FORMATS = {
		date: 'yyyy-MM-dd',
		month: 'yyyy-MM',
		daterange: 'yyyy-MM-dd',
		datetime: 'yyyy-MM-dd HH:mm:ss',
		year: 'yyyy'
	}

	export let value;
	export let selectMode = 'date'
	export let format = DEFAULT_FORMATS[selectMode]
	export let valueFormat
	export let startPlaceholder = '开始时间'
	export let endPlaceholder = '结束时间'
	export let disabled = false
	export let readonly = true
	let displayValue = []
	if(format && !valueFormat) valueFormat = format
	const valueFormats = new FormatTime(valueFormat)
	const formats = new FormatTime(format)
	export let disabledDate: Function
	let visible;
 	let input
	let ranged = selectMode.indexOf('range') > -1;
	// 日期格式化
	
	if(value) {
		console.log(value, ranged);
		if(ranged) {
			if(Array.isArray(value)) {
				let start
				let end
				start = new Date(value[0])
				end = new Date(value[1])
				if(start == 'Invalid Date') start = ''
				if(end == 'Invalid Date') end = ''
				displayValue = [formatDate(start), formatDate(end)]
			} else {
				throw new Error('需为数组格式的时间！')
			}
		} else {
			value = new Date(value)
			if(value == 'Invalid Date') value = ''
			value = formatDate(value)
		}
	}

	function confirmPick(e) {
		value = formatDate(e.detail);
		visible = false
		dispatch('change', formats.setTime(e.detail))
	}

	function handleShowDatePopper(e) {
		visible = true;
	}

	function handleChange() {
		visible = false;
	}
	function formatDate(time) {
		return valueFormats.setTime(time)
	}
	function handleCloseDatePopper(v) {
		// console.log(e.target, input)
		// if (!visible) return;
		visible = false;
	}
	const handleStartInput = () => {

	}
	const handleStartChange = () => {

	}
	const handleFocus = () => {

	}
	const confirmRangePick = (val) => {
		const dates = [formatDate(val.detail[0]), formatDate(val.detail[1])]
		displayValue = dates
		visible = false
		// dispatch('change')
	}
	const handlerClear = () => {
		displayValue = []
		value = null
		visible = false
	}
</script>
{#if ranged}
<div class='be-date' use:clickOutside={{ cb: handleCloseDatePopper }} on:outside={handleCloseDatePopper}>
	<div class='be-input__inner be-date-range' on:click={handleShowDatePopper}>
		<BeIcon name="calendar"/>
		<input autocomplete="off" placeholder={startPlaceholder} bind:value={displayValue[0]} disabled={disabled} readonly={readonly} on:input={handleStartInput} on:change={handleStartChange} on:focus={handleFocus} class="be-range-input">
		<span class="be-range-separator">至</span>
		<input autocomplete="off" placeholder={endPlaceholder} bind:value={displayValue[1]} disabled={disabled} readonly={readonly} on:input={handleStartInput} on:change={handleStartChange} on:focus={handleFocus} class="be-range-input">
		<div class="be-range__close-icon"  on:click|stopPropagation={handlerClear}>
			<BeIcon name='close-circle' width='14' height='14' color="#c0c4cc"/>
		</div>
	</div>
	<DateRange bind:visible={visible} value= {displayValue} {disabledDate} on:pick={confirmRangePick}/>
</div>
{:else}
<div class='be-date' use:clickOutside={{ cb: handleCloseDatePopper }} on:outside={handleCloseDatePopper}>
	<BeInput on:change={handleChange} {value} on:focus={handleShowDatePopper} bind:this={input}/>
	<Dates {valueFormat} {disabledDate} {value} {selectMode} {format} bind:visible={visible} on:pick={confirmPick} />
</div>
{/if}