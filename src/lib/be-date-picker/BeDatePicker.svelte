<script lang='ts'>
	import BeIcon  from '../be-icon/BeIcon.svelte';
	import Dates from './panel/date.svelte';
	import DateRange from './panel/date-range.svelte';
	import MonthRange from './panel/month-range.svelte';
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
		monthrange: 'yyyy-MM',
		year: 'yyyy'
	}

	export let value;
	export let selectMode = 'date'
	export let format = DEFAULT_FORMATS[selectMode]
	export let valueFormat
	export let placeholder = '选择日期'
	export let startPlaceholder = '开始时间'
	export let endPlaceholder = '结束时间'
	export let separator = '至'
	export let clearable = true
	export let disabled = false
	export let readonly = true
	let active = false
	let displayValue = []
	if(format && !valueFormat) valueFormat = format
	const valueFormats = new FormatTime(valueFormat)
	const formats = new FormatTime(format)
	export let disabledDate: Function
	let visible;
 	let input
	let ranged = selectMode.indexOf('range') > -1;
	// 日期格式化
	$: initValue(value)
	function initValue(value) {
		if(value) {
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
		} else {
			value = ''
			displayValue = []
		}
	}
	function confirmPick(e) {
		value = formatDate(e.detail);
		visible = false
		dispatch('change', formats.setTime(e.detail))
	}

	function handleShowDatePopper(e) {
		active = true
		visible = true;
	}

	function handleChange() {
		visible = false;
	}
	function formatDate(time) {
		return valueFormats.setTime(time)
	}
	function handleCloseDatePopper() {
		// if (!visible) return;
		active = false
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
		value = dates
		handleCloseDatePopper()
		dispatch('change', dates)
	}
	const handlerClear = () => {
		displayValue = []
		value = null
		handleCloseDatePopper()
		dispatch('change',  value)
	}
</script>
{#if ranged}
<div class='be-date be-range' use:clickOutside={{ cb: handleCloseDatePopper }} on:outside={handleCloseDatePopper}>
	<div class='be-input__inner be-range-{selectMode}' class:active={active} on:click={handleShowDatePopper}>
		<BeIcon name="calendar"/>
		<input autocomplete="off" placeholder={startPlaceholder} bind:value={displayValue[0]} disabled={disabled} readonly={readonly} on:input={handleStartInput} on:change={handleStartChange} on:focus={handleFocus} class="be-range-input">
		<span class="be-range-separator">{separator}</span>
		<input autocomplete="off" placeholder={endPlaceholder} bind:value={displayValue[1]} disabled={disabled} readonly={readonly} on:input={handleStartInput} on:change={handleStartChange} on:focus={handleFocus} class="be-range-input">
		<div class="be-range__close-icon" class:clearable={clearable && displayValue && displayValue.length > 0}  on:click|stopPropagation={handlerClear}>
			<BeIcon name='close-circle' width='14' height='14' color="#c0c4cc"/>
		</div>
	</div>
	{#if selectMode == 'daterange'}
	<DateRange bind:visible={visible} value= {displayValue} {disabledDate} on:pick={confirmRangePick}/>
	{:else}
	<MonthRange bind:visible={visible} value= {displayValue} {disabledDate} on:pick={confirmRangePick}/>
	{/if}
</div>
{:else}
<div class='be-date' use:clickOutside={{ cb: handleCloseDatePopper }} on:outside={handleCloseDatePopper}>
	<BeInput on:change={handleChange} {value} {placeholder} on:focus={handleShowDatePopper} bind:this={input}/>
	<div class="be-date__prefix">
		<BeIcon name="calendar"/>
	</div>
	<div class="be-date__suffix" class:clearable={clearable && value} on:click|stopPropagation={handlerClear}>
		<BeIcon name='close-circle' width='14' height='14' color="#c0c4cc"/>
	</div>
	<Dates {valueFormat} {disabledDate} {value} {selectMode} {format} bind:visible={visible} on:pick={confirmPick} />
</div>
{/if}