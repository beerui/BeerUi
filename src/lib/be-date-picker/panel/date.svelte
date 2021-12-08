<script lang="ts">
import { createEventDispatcher } from 'svelte';
import DateTable from '../basic/date-table.svelte'
import { cubicInOut } from 'svelte/easing';
import { nextMonth, prevMonth, prevYear, nextYear } from '$utils/../../utils/date-util'
const dispatch = createEventDispatcher()
export let value
export let visible = false
$:date = new Date(value)
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

function confirmPick(e) {
  console.log(date)
  dispatch('pick',  e.detail)
  // value = e.detail
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
<div class="be-picker-panel be-date-picker be-popper" in:zoomIn="{{duration: 300}}" out:zoomIn="{{duration: 300}}">
  <div class="be-picker-panel__body-wrapper">
    <div class="be-picker-panel__body">
      <div class="be-date-picker__header">
          <span class="be-picker-panel__icon-btn be-date-picker__prev-btn" on:click|stopPropagation={handlePrevYear}>上年</span>
          <span class="be-picker-panel__icon-btn be-date-picker__prev-btn" on:click|stopPropagation={handlePrevMonth}>-上月</span>
          <span class="be-date-picker__header-label">{year} 年</span>
          <span class="be-date-picker__header-label">{month} 月</span>
          <span class="be-picker-panel__icon-btn be-date-picker__next-btn" on:click|stopPropagation={handleNextYear}>下年</span>
          <span class="be-picker-panel__icon-btn be-date-picker__next-btn" on:click|stopPropagation={handleNextMonth}>下月-</span>
      </div>
      <div class="be-picker-panel__content">
        <DateTable value={value} date={date} on:pick={confirmPick}/>
      </div>
    </div>
  </div>
  <div class="popper__arrow"></div>
</div>
{/if}

