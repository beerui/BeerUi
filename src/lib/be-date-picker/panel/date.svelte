<script lang="ts">
import { createEventDispatcher } from 'svelte';
import BeButton from '$lib/be-button/BeButton.svelte';
import BeInput from '$lib/be-input/BeInput.svelte';
import DateTable from '../basic/date-table.svelte'
import MonthTable from '../basic/month-table.svelte'
import YearTable from '../basic/year-table.svelte'
import { cubicInOut } from 'svelte/easing';
import { FormatTime } from '$lib/utils/beerui';
import { nextMonth, prevMonth, prevYear, nextYear } from '../date-util.js'
const dispatch = createEventDispatcher()

export let value
export let visible = false
export let format
export let selectMode
export let disabledDate: Function

const times = new FormatTime(format)
let yearLabel = ''

$:currentView = selectMode === 'day' ? 'date' : selectMode
$:year = date.getFullYear()
$:month = String(date.getMonth() + 1).padStart(2, '0')
$:date = resetDate(value)
// 打开弹窗初始化日期
$: if(!visible) {
  date = resetDate(value)
  currentView = selectMode === 'day' ? 'date' : selectMode
}
$: if (currentView === 'year') {
  const startYear = Math.floor(year / 10) * 10;
  yearLabel = startYear + ' - ' + (startYear + 9);
}

function resetDate(val) {
  return val ? new Date(val) : new Date()
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
  dispatch('pick', formatDate(e.detail))
}

function confirmMonthPick(e) {
  if(selectMode === 'day') {
    date = e.detail
    currentView = 'date'
  } else {
    dispatch('pick',  formatDate(e.detail))
  }
}
function confirmYearPick(e) {
  if(selectMode === 'month' || selectMode === 'day') {
    date = e.detail
    currentView = 'month'
  } else {
    dispatch('pick', formatDate(e.detail))
  }
}

function formatDate(time) {
  return times.setTime(time)
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
<div class="be-picker-panel be-date-picker be-popper" in:zoomIn="{{duration: 250}}" out:zoomIn="{{duration: 250}}">
  <div class="be-picker-panel__body-wrapper">
    <div class="be-picker-panel__body">
      {#if currentView === 'datetime'}
        <div class="be-date-picker__time-header">
          <BeInput placeholder='选择时间' size="mini"/>
        </div>
      {/if}
      <div class="be-date-picker__header">
          {#if currentView === 'date'}
            <span class="be-picker-panel__icon-btn be-date-picker__prev-btn" on:click={handlePrevMonth}></span>
          {/if}
          <span class="be-picker-panel__icon-btn be-date-picker__d-prev-btn" on:click={handlePrevYear}></span>
          {#if currentView !== 'year'}
            <span class="be-date-picker__header-label" on:click={() => currentView = 'year'}>{year} 年</span>
          {/if}
          {#if currentView === 'year'}
          <span class="be-date-picker__header-label">{yearLabel}</span>
          {/if}
          {#if currentView === 'date'}
            <span class="be-date-picker__header-label" on:click={() => currentView = 'month'}>{month} 月</span>
          {/if}
          {#if currentView === 'date'}
            <span class="be-picker-panel__icon-btn be-date-picker__next-btn" on:click={handleNextMonth}></span>
          {/if}
          <span class="be-picker-panel__icon-btn be-date-picker__d-next-btn" on:click={handleNextYear}></span>
      </div>
      <div class="be-picker-panel__content">
        {#if currentView === 'date'}
          <DateTable disabledDate={disabledDate} date={date} on:pick={confirmDatePick} value={value}/>
        {/if}
        {#if currentView === 'month'}
          <MonthTable disabledDate={disabledDate} date={date} on:pick={confirmMonthPick} value={value}/>
        {/if}
        {#if currentView === 'year'}
          <YearTable disabledDate={disabledDate} date={date} on:pick={confirmYearPick} value={value}/>
        {/if}
      </div>
    </div>
  </div>
  {#if currentView === 'datetime'}
    <div class="be-picker-panel__footer">
      <BeButton type="default" size="mini">确认</BeButton>
    </div>
  {/if}
  <div class="popper__arrow"></div>
</div>
{/if}
