<script lang="ts">
import { createEventDispatcher } from 'svelte';
import DateTable from '../basic/date-table.svelte'
import MonthTable from '../basic/month-table.svelte'
import { cubicInOut } from 'svelte/easing';
import { nextMonth, prevMonth, prevYear, nextYear } from '../date-util.js'
const dispatch = createEventDispatcher()
export let value
export let visible = false

export let selectMode = 'day'
let currentView = 'date'

$:date = new Date(value)

$: if(!visible) {
  date = new Date(value)
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
  date = prevYear(date)
}
function handleNextYear() {
  date = nextYear(date)
}

$:year = date.getFullYear()
$:month = String(date.getMonth() + 1).padStart(2, '0')

function confirmMonthPick(e) {
  if(selectMode=='day') {
    date = new Date(e.detail)
    currentView = 'date'
  } else {
    dispatch('pick',  e.detail)
  }
}
function confirmPick(e) {
  console.log(date)
  value = e.detail
  dispatch('pick',  e.detail)
}

function selectMonth() {
  currentView = 'month'
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
          <span class="be-picker-panel__icon-btn be-date-picker__prev-btn" on:click|stopPropagation={handlePrevYear}>上年</span>
          {#if currentView == 'date'}
            <span class="be-picker-panel__icon-btn be-date-picker__prev-btn" on:click|stopPropagation={handlePrevMonth}>-上月</span>
          {/if}
          <span class="be-date-picker__header-label">{year} 年</span>
          {#if currentView == 'date'}
            <span class="be-date-picker__header-label" on:click={selectMonth}>{month} 月</span>
          {/if}
          <span class="be-picker-panel__icon-btn be-date-picker__next-btn" on:click|stopPropagation={handleNextYear}>下年</span>
          {#if currentView == 'date'}
            <span class="be-picker-panel__icon-btn be-date-picker__next-btn" on:click|stopPropagation={handleNextMonth}>下月-</span>
          {/if}
      </div>
      <div class="be-picker-panel__content">
        {#if currentView == 'date'}
          <DateTable date={date} on:pick={confirmPick} value={value}/>
        {/if}
        {#if currentView == 'month'}
          <MonthTable date={date} on:pick={confirmMonthPick} value={value}/>
        {/if}
      </div>
    </div>
  </div>
  <div class="popper__arrow"></div>
</div>
{/if}

