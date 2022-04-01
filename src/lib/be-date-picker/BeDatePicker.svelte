<script lang='ts'>
	import BeIcon  from '../be-icon/BeIcon.svelte';
	import Dates from './panel/date.svelte';
	import DateTimeRange from './panel/date-time-range.svelte';
	import DateRange from './panel/date-range.svelte';
	import MonthRange from './panel/month-range.svelte';
	import YearRange from './panel/year-range.svelte';
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
		datetimerange: 'yyyy-MM-dd HH:mm:ss',
		monthrange: 'yyyy-MM',
		year: 'yyyy',
		yearrange: 'yyyy'
	}

	export let value;
	export let selectMode = 'date'
	export let format = DEFAULT_FORMATS[selectMode]
	export let selectableRange = []
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
	let inputRect
	let direction = 'bottom'
	let visible;
 	let input
	let ranged = selectMode.indexOf('range') > -1;
	// 临时用，存储各个类型的日期容器高度
	let temporaryHeight = {
		'date': 343,
		'month': 266,
		'year': 266,
		'datetime': 380,
		'daterange': 331,
		'monthrange': 254,
		'datetimerange': 384
	}
	// 日期格式化
	$: initValue(value)
	function initValue(value) {
		if(value) {
			if(ranged) {
				if(Array.isArray(value)) {
					let start
					let end
					start = new Date(String(value[0]))
					end = new Date(String(value[1]))
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
	$:if(visible) {
		const clientRect = inputRect && inputRect.getBoundingClientRect()
		const clientHeight = document.body.clientHeight
		if(clientRect && clientRect.bottom + temporaryHeight[selectMode] > clientHeight) {
			direction = 'top'
		} else {
			direction = 'bottom'
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
	<div class='be-input__inner be-range-{selectMode}' class:active={active} on:click={handleShowDatePopper} bind:this={inputRect}>
		<BeIcon name="calendar"/>
		<input autocomplete="off" placeholder={startPlaceholder} bind:value={displayValue[0]} disabled={disabled} readonly={readonly} on:input={handleStartInput} on:change={handleStartChange} on:focus={handleFocus} class="be-range-input">
		<span class="be-range-separator">{separator}</span>
		<input autocomplete="off" placeholder={endPlaceholder} bind:value={displayValue[1]} disabled={disabled} readonly={readonly} on:input={handleStartInput} on:change={handleStartChange} on:focus={handleFocus} class="be-range-input">
		<div class="be-range__close-icon" class:clearable={clearable && displayValue && displayValue.length > 0}  on:click|stopPropagation={handlerClear}>
			<BeIcon name='close-circle' width='14' height='14' color="#c0c4cc"/>
		</div>
	</div>
	{#if selectMode == 'datetimerange'}
	<DateTimeRange bind:visible={visible} {direction} {format} value= {displayValue} {disabledDate} on:pick={confirmRangePick}/>
	{:else if selectMode == 'monthrange'}
	<MonthRange bind:visible={visible} {direction} value= {displayValue} {disabledDate} on:pick={confirmRangePick}/>
	{:else if selectMode == 'yearrange'}
	<YearRange bind:visible={visible} {direction} value= {displayValue} {disabledDate} on:pick={confirmRangePick}/>
	{:else}
	<DateRange bind:visible={visible} {direction} value= {displayValue} {disabledDate} on:pick={confirmRangePick}/>
	{/if}
</div>
{:else}
<div class='be-date' use:clickOutside={{ cb: handleCloseDatePopper }} on:outside={handleCloseDatePopper} bind:this={inputRect}>
	<BeInput on:change={handleChange} {value} {placeholder} on:focus={handleShowDatePopper} bind:this={input}/>
	<div class="be-date__prefix">
		<BeIcon name="calendar"/>
	</div>
	<div class="be-date__suffix" class:clearable={clearable && value} on:click|stopPropagation={handlerClear}>
		<BeIcon name='close-circle' width='14' height='14' color="#c0c4cc"/>
	</div>
	<Dates {valueFormat} {direction} {selectableRange} {disabledDate} {value} {selectMode} {format} bind:visible={visible} on:pick={confirmPick} />
</div>
{/if}