<script lang="ts">
import { createEventDispatcher } from 'svelte';
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
$:currentView = selectMode === 'day' ? 'date' : selectMode

let yearLabel = ''

$:date = value ? new Date(value) : new Date()

$: if(!visible) {
  date =  value ? new Date(value) : new Date()
  if(selectMode == 'day') {
    currentView = 'date'
  }
  if(selectMode == 'month') {
    currentView = 'month'
  }
  if(selectMode == 'year') {
    currentView = 'year'
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

$:year = date.getFullYear()

$:month = String(date.getMonth() + 1).padStart(2, '0')

$: if (currentView === 'year') {
  const startYear = Math.floor(year / 10) * 10;
  yearLabel = startYear + ' - ' + (startYear + 9);
}

function confirmPick(e) {
  value = e.detail
  dispatch('pick', formatDate(e.detail))
}

function confirmMonthPick(e) {
  if(selectMode=='day') {
    date = e.detail
    currentView = 'date'
  } else {
    dispatch('pick',  formatDate(e.detail))
  }
}
function confirmYearPick(e) {
  if(selectMode=='month' || selectMode=='day') {
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
      <div class="be-date-picker__header">
          <span class="be-picker-panel__icon-btn be-date-picker__d-prev-btn" on:click|stopPropagation={handlePrevYear}></span>
          {#if currentView === 'date'}
            <span class="be-picker-panel__icon-btn be-date-picker__prev-btn" on:click|stopPropagation={handlePrevMonth}></span>
          {/if}
          {#if currentView !== 'year'}
            <span class="be-date-picker__header-label" on:click={() => currentView = 'year'}>{year} 年</span>
          {/if}
          {#if currentView === 'year'}
          <span class="be-date-picker__header-label">{yearLabel}</span>
          {/if}
          {#if currentView === 'date'}
            <span class="be-date-picker__header-label" on:click={() => currentView = 'month'}>{month} 月</span>
          {/if}
          <span class="be-picker-panel__icon-btn be-date-picker__d-next-btn" on:click|stopPropagation={handleNextYear}></span>
          {#if currentView === 'date'}
            <span class="be-picker-panel__icon-btn be-date-picker__next-btn" on:click|stopPropagation={handleNextMonth}></span>
          {/if}
      </div>
      <div class="be-picker-panel__content">
        {#if currentView === 'date'}
          <DateTable disabledDate={disabledDate} date={date} on:pick={confirmPick} value={value}/>
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
  <div class="popper__arrow"></div>
</div>
{/if}

