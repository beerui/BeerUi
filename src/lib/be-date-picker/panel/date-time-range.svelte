<script lang="ts">
  import { cubicInOut } from 'svelte/easing';
  import { nextMonth, prevMonth, prevYear, nextYear, modifyWithTimeString, isDate } from '../date-util.js'
  import BeButton from '$lib/be-button/BeButton.svelte';
  import BeInput from '$lib/be-input/BeInput.svelte';
  import DateTable from '../basic/date-table.svelte';
  import { createEventDispatcher, onMount, tick } from 'svelte';
  import { FormatTime } from '$lib/utils/beerui';
  import Time from './time.svelte';
  import clickOutside from '$lib/_actions/clickOutside';
  const dispatch = createEventDispatcher()
  export let visible = false
  export let value = []
  export let disabledDate: Function
  export let direction
  export let format
  let rangeState = {
    endDate: null,
    selecting: false,
    row: null,
    column: null
  }
  let timeVisible = false
  let timeValue
  let timeRightVisible = false
  let timeRightValue
  let disabledBtn = false
  $:leftDate = resetDate(value[0])
  $:rightDate = nextDate(leftDate)
  $:leftLabel =  leftDate.getFullYear() + '年' + ' ' + String(leftDate.getMonth() + 1).padStart(2, '0') + '月'
  $:rightLabel =  rightDate.getFullYear() + '年' + ' ' + String(rightDate.getMonth() + 1).padStart(2, '0') + '月'
  let minDate = isDate(value[0]) ? new Date(value[0]) : null;
  let maxDate = isDate(value[1]) ? new Date(value[1]) : null;
  let rangeRect
  let popperArrow
  // 时分秒格式化结构
  const times = new FormatTime(format.substring(format.indexOf('HH'), format.length))
  $:if(visible) {
      // 处理右边边界问题
    const clientWidth = document.body.clientWidth
    const clientRect = rangeRect && rangeRect.getBoundingClientRect()
    if(clientRect && clientRect.right > clientWidth) {
      rangeRect.style.left = clientWidth - clientRect.right - 10 + 'px'
      popperArrow.style.left = clientRect.right - clientWidth + 35 + 'px'
    }
    disabledBtn = false
    rangeState.selecting = false
    rangeState.endDate = null
    const leftDate =  isDate(value[0]) ? new Date(value[0]) : null
    const rightDate = isDate(value[1]) ? new Date(value[1]) : null
    minDate = leftDate
    maxDate = rightDate
    timeValue = leftDate ? getTimeValueFormat(leftDate) : ''
    timeRightValue = rightDate ? getTimeValueFormat(rightDate) : ''
  }
  $:if(timeVisible || timeRightVisible) {
    minDate = minDate || new Date()
    maxDate = maxDate || new Date()
    timeValue = getTimeValueFormat(minDate)
    timeRightValue = getTimeValueFormat(maxDate)
  }
  function resetDate(val) {
    return val ? new Date(val) : new Date()
  }
  function nextDate(val) {
    return val ? nextMonth(new Date(val)) : nextMonth(new Date())
  }
  function zoomIn(node, params) {
    return {
      duration:params.duration,
      easing: cubicInOut,
      css: t => {
        return `
          opacity: ${t};
          transform: scaleY(${t});
          transform-origin: center top;`
      }
    };
  }
function handlePrevMonth() {
  leftDate = prevMonth(leftDate)
  rightDate = prevMonth(rightDate)
}
function handlePrevYear() {
  leftDate = prevYear(leftDate)
  rightDate = prevYear(rightDate)
}
function handleNextMonth() {
  leftDate = nextMonth(leftDate)
  rightDate = nextMonth(rightDate)
}
function handleNextYear() {
  leftDate = nextYear(leftDate);
  rightDate = nextYear(rightDate);
}
const handleRangePick = (val) => {
  // const defaultTime = value || [];
  const minDate1 = modifyWithTimeString(val.detail.minDate);
  const maxDate1 = modifyWithTimeString(val.detail.maxDate);
  if (maxDate === minDate1 && minDate === maxDate1) {
    return;
  }
  maxDate = maxDate1;
  minDate = minDate1;
  timeValue = getTimeValueFormat(minDate)
  timeRightValue = getTimeValueFormat(minDate)
  disabledBtn = !val.detail.close
}
const handleChangeRange = (val) => {
  minDate = val.detail.minDate;
  maxDate = val.detail.maxDate;
  rangeState = val.detail.rangeState;

}
const handleConfirm = () => {
  if (isValidValue([minDate, maxDate])) {
    dispatch('pick', [minDate, maxDate]);
  }
}
const isValidValue = (value) => {
  return Array.isArray(value) &&
    value && value[0] && value[1] &&
    isDate(value[0]) && isDate(value[1]) &&
    value[0].getTime() <= value[1].getTime() && (
    typeof disabledDate === 'function'
      ? !disabledDate(value[0]) && !disabledDate(value[1])
      : true
  );
}
function handleShowTimePopper(e) {
		timeVisible = true;
	}
	// function handleTimeChange() {
	// 	timeVisible = false;
	// }
	function handleCloseTimePopper(v) {
		timeVisible = false;
	}
	function confirmRightTimePick(e) {
    maxDate = e.detail
    if(maxDate.getTime() < minDate.getTime()) {
      minDate = maxDate
      timeValue = getTimeValueFormat(minDate)
    }
		timeRightValue = getTimeValueFormat(maxDate)
		timeRightVisible = false
	}
  function handleShowRightTimePopper(e) {
		timeRightVisible = true;
	}
	// function handleRightTimeChange() {
	// 	timeRightVisible = false;
	// }
	function handleCloseRightTimePopper(v) {
		timeRightVisible = false;
	}
	function confirmTimePick(e) {
    minDate = e.detail
    if(maxDate.getTime() < minDate.getTime()) {
      maxDate = minDate
      timeRightValue = getTimeValueFormat(maxDate)
    }
		timeValue = getTimeValueFormat(minDate)
		timeVisible = false
	}
  function getTimeValueFormat(value) {
    return times.setTime(value)
  }
</script>

{#if visible}
<div class="be-picker-panel be-date-picker be-range-daterange-picker be-datetime-range-{direction} be-popper" bind:this={rangeRect} in:zoomIn="{{duration: 250}}" out:zoomIn="{{duration: 250}}">
  <div class="be-picker-panel__content be-range-daterange-picker__content is-left">
    <div class="be-range-daterange-picker__header">
      <span class="be-picker-panel__icon-btn be-date-picker__prev-btn" on:click={handlePrevMonth}></span>
      <span class="be-picker-panel__icon-btn be-date-picker__d-prev-btn" on:click={handlePrevYear}></span>
      <span class="be-date-picker__header-label">{leftLabel}</span>
    </div>
    <DateTable date = {leftDate} {value} {disabledDate} {rangeState} {minDate} {maxDate} selectMode='range' on:pick={handleRangePick} on:changerange={handleChangeRange}/>
  </div>
  <div class="be-picker-panel__content be-range-daterange-picker__content is-left">
    <div class="be-range-daterange-picker__header">
      <span class="be-date-picker__header-label">{rightLabel}</span>
      <span class="be-picker-panel__icon-btn be-date-picker__next-btn" on:click={handleNextMonth}></span>
      <span class="be-picker-panel__icon-btn be-date-picker__d-next-btn" on:click={handleNextYear}></span>
    </div>
    <DateTable date = {rightDate} {value} {disabledDate} {rangeState} {minDate} {maxDate} selectMode='range' on:pick={handleRangePick} on:changerange={handleChangeRange}/>
  </div>
  <div class="be-picker-panel__footer be-picker-panel__footer-datetime">
    <div class="be-date-picker__range-time-header">
      <div class="be-date-picker__time-header" use:clickOutside={{ cb: handleCloseTimePopper }} on:outside={handleCloseTimePopper}>
        <BeInput validateEvent={false} placeholder="选择时间" readonly value = {timeValue} on:focus={handleShowTimePopper} />
        <Time date = {minDate} direction='top' {format} visible={timeVisible} on:pick={confirmTimePick}/>
      </div>
    </div>
    <div class="be-date-picker__range-time-header be-picker-panel__footer-datetime">
      <div class="be-date-picker__time-header" use:clickOutside={{ cb: handleCloseRightTimePopper }} on:outside={handleCloseRightTimePopper}>
        <BeInput validateEvent={false} placeholder="选择时间" readonly value = {timeRightValue} on:focus={handleShowRightTimePopper} />
        <Time date = {maxDate} direction='top' {format} visible={timeRightVisible} on:pick={confirmRightTimePick}/>
      </div>
      <BeButton type="default" size="mini" disabled = {disabledBtn} on:click = {handleConfirm}>确认</BeButton>
    </div>
  </div>
  {#if direction=='bottom'}
  <div class="popper__arrow" bind:this={popperArrow}></div>
  {/if}
  {#if direction=='top'}
  <div class="popper__arrow_top" bind:this={popperArrow}></div>
  {/if}
</div>
{/if}
