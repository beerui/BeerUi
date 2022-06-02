<script lang='ts'>
	import Time from './panel/time.svelte';
	import BeInput from '../be-input/BeInput.svelte';
	import BeIcon  from '../be-icon/BeIcon.svelte';
	import clickOutside from '$lib/_actions/clickOutside';
	import { FormatTime } from '$lib/utils/beerui';
	import { createEventDispatcher, getContext, tick } from 'svelte';
	import { modifyWithTimeString } from './date-util.js'

	const dispatch = createEventDispatcher()
	const DEFAULT_FORMATS = {
		time: 'HH:mm:ss'
	}
	export let value
	export let selectableRange = []
	export let format = DEFAULT_FORMATS['time']
	export let clearable = true
	export let placeholder = '选择时间'
	export let validateEvent: boolean = true; // 是否发送验证表单

	let direction = 'bottom'
	let visible;
	let date
	const times = new FormatTime(format)
	$:initValue(value)
	function initValue(value) {
		if(value)  {
			if(typeof value == 'string') {
				value = modifyWithTimeString(new Date(), value)
			}
			date = value
			value = times.setTime(value)
		} else {
			value = ''
			date = new Date()
		}
	}
	function handleShowDatePopper(e) {
		visible = true;
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
		dispatch('change',  value)
		if (ctx && prop && isInit && validateEvent) {
			ctx.FormItemEventCallback({ type: 'change', value: [value] })
		}
	}
	const handlerClear = () => {
		value = null
		date = new Date()
		visible = false
		dispatch('change',  value)
		if (ctx && prop && isInit && validateEvent) {
			ctx.FormItemEventCallback({ type: 'change', value: [value] })
		}
	}
	// 表单验证
	const ctx = getContext('BeFormItem')
	let prop = '' // name
	let isInit: boolean = false

	if (ctx) {
		ctx.propWatch.subscribe(value => prop = value)
	}

	const watchValue = (value) => {
		if (ctx && prop && isInit && validateEvent) {
			ctx.FormItemEventCallback({ type: 'change', value: [value] })
		}
	}
	$: watchValue(value)
	tick().then(() => {
		isInit = true;
	})

</script>
<div class='be-date' use:clickOutside={{ cb: handleCloseDatePopper }} on:outside={handleCloseDatePopper}>
	<BeInput validateEvent={false} {placeholder} on:change={handleChange} {value} on:focus={handleShowDatePopper} />
	<div class="be-date__prefix">
		<BeIcon name="time"/>
	</div>
	<div class="be-date__suffix" class:clearable={clearable && value} on:click|stopPropagation={handlerClear}>
		<BeIcon name='close-circle' width='14' height='14' color="#c0c4cc"/>
	</div>
	<Time {date} {format} direction='bottom' {selectableRange} bind:visible={visible} on:pick={confirmPick}/>
 </div>
