<script lang="ts">
  // TODO: 优化该组件 减少代码量
import { createEventDispatcher } from 'svelte';
import BeButton from '$lib/be-button/BeButton.svelte';
import BeInput from '$lib/be-input/BeInput.svelte';
import DateTable from '../basic/date-table.svelte'
import MonthTable from '../basic/month-table.svelte'
import YearTable from '../basic/year-table.svelte'
import clickOutside from '$lib/_actions/clickOutside';
import { FormatTime } from '$lib/utils/beerui';
import Time from './time.svelte';
import { cubicInOut } from 'svelte/easing';
import { nextMonth, prevMonth, prevYear, nextYear } from '../date-util.js'
const dispatch = createEventDispatcher()

export let value
export let visible = false
export let format
export let selectMode
export let disabledDate: Function
export let selectableRange = []
export let direction
// 时分秒格式化结构
const times = new FormatTime(format.substring(format.indexOf('HH'), format.length))

let yearLabel = ''
let timeVisible = false
let currentView
let timeValue

$:year = date.getFullYear()
$:month = String(date.getMonth() + 1).padStart(2, '0')
$:date = resetDate(value)


// 打开弹窗初始化日期
$: if(!visible) {
  timeValue = value ? getTimeValueFormat(resetDate(value)) : ''
  date = resetDate(value)
  resetView()
}
$: if (currentView === 'year') {
  const startYear = Math.floor(year / 10) * 10;
  yearLabel = startYear + ' - ' + (startYear + 9);
}

function resetDate(val) {
  if(val instanceof Date) return val
  return val ? new Date(val) : new Date()
}
function resetView() {
  if (selectMode === 'month') {
    currentView = 'month';
  } else if (selectMode === 'year') {
    currentView = 'year';
  } else {
    currentView = 'date';
  }
}
function handlePrevMonth() {
  date = prevMonth(date)
}
function handleNextMonth() {
  date = nextMonth(date)
}
function handlePrevYear() {
  if (currentView === 'year') {
    date = prevYear(date, 10);
  } else {
    date = prevYear(date);
  }
}
function handleNextYear() {
  if (currentView === 'year') {
    date = nextYear(date, 10);
  } else {
    date = nextYear(date);
  }
}

function confirmDatePick(e) {
  value = e.detail

  timeValue = getTimeValueFormat(e.detail)
  if(selectMode != 'datetime') dispatch('pick', e.detail)
}

function confirmMonthPick(e) {
  if(selectMode === 'date' || selectMode === 'datetime') {
    date = e.detail
    currentView = 'date'
  } else {
    dispatch('pick',  e.detail)
  }
}
function confirmYearPick(e) {
  if(selectMode === 'month' || selectMode === 'date' || selectMode === 'datetime') {
    date = e.detail
    currentView = 'month'
  } else {
    dispatch('pick', e.detail)
  }
}

function handleShowTimePopper(e) {
		timeVisible = true;
	}
	function handleTimeChange() {
		timeVisible = false;
	}
	function handleCloseTimePopper(v) {
		timeVisible = false;
	}
	function confirmTimePick(e) {
    value = e.detail
		timeValue = getTimeValueFormat(e.detail)
		timeVisible = false
	}
  function confirmDateTimePick() {
    timeValue =  getTimeValueFormat(date)
    dispatch('pick', date)
  }
  function getTimeValueFormat(value) {
    return times.setTime(value)
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
</script>

{#if visible}
<div class="be-picker-panel be-date-picker be-popper be-{selectMode}-{direction}" in:zoomIn="{{duration: 250}}" out:zoomIn="{{duration: 250}}">
  <div class="be-picker-panel__body-wrapper">
    <div class="be-picker-panel__body">

      <div class="be-date-picker__header">
          {#if currentView === 'date'}
            <span role='button' tabindex='-1' class="be-picker-panel__icon-btn be-date-picker__prev-btn" on:click={handlePrevMonth} on:keydown={handlePrevMonth}></span>
          {/if}
          <span class="be-picker-panel__icon-btn be-date-picker__d-prev-btn" on:click={handlePrevYear} on:keydown={handlePrevYear}></span>
          {#if currentView !== 'year'}
            <span role='button' tabindex='-1' class="be-date-picker__header-label" on:click={() => currentView = 'year'} on:keydown={() => currentView = 'year'}>{year} 年</span>
          {/if}
          {#if currentView === 'year'}
          <span class="be-date-picker__header-label">{yearLabel}</span>
          {/if}
          {#if currentView === 'date'}
            <span role='button' tabindex='-1' class="be-date-picker__header-label" on:click={() => currentView = 'month'} on:keydown={() => currentView = 'month'}>{month} 月</span>
          {/if}
          {#if currentView === 'date'}
            <span role='button' tabindex='-1' class="be-picker-panel__icon-btn be-date-picker__next-btn" on:click={handleNextMonth} on:keydown={handleNextMonth}></span>
          {/if}
          <span role='button' tabindex='-1' class="be-picker-panel__icon-btn be-date-picker__d-next-btn" on:click={handleNextYear} on:keydown={handleNextMonth}></span>
      </div>
      <div class="be-picker-panel__content">
        {#if currentView === 'date'}
          <DateTable {disabledDate} {date} {value} on:pick={confirmDatePick} />
        {/if}
        {#if currentView === 'month'}
          <MonthTable {disabledDate} {date}  {value} on:pick={confirmMonthPick} />
        {/if}
        {#if currentView === 'year'}
          <YearTable {disabledDate} {date} {value} on:pick={confirmYearPick} />
        {/if}
      </div>
    </div>
  </div>
  {#if selectMode === 'datetime'}
    <div class="be-picker-panel__footer be-picker-panel__footer-datetime">
      <div class="be-date-picker__time-header" use:clickOutside={{ cb: handleCloseTimePopper }} on:outside={handleCloseTimePopper}>
        <BeInput validateEvent={false} placeholder="选择时间" on:change={handleTimeChange} value = {timeValue} on:focus={handleShowTimePopper} />
        <Time {date} direction='top' {format} visible={timeVisible} {selectableRange} on:pick={confirmTimePick}/>
      </div>
      <BeButton type="default" size="mini" on:click={confirmDateTimePick} on:keydown={confirmDateTimePick}>确认</BeButton>
    </div>
  {/if}
  {#if direction=='bottom'}
  <div class="popper__arrow"></div>
  {/if}
  {#if direction=='top'}
  <div class="popper__arrow_top"></div>
  {/if}
</div>
{/if}
