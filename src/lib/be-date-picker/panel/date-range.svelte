<script lang="ts">
  import { cubicInOut } from 'svelte/easing';
  import { nextMonth, prevMonth, prevYear, nextYear, modifyWithTimeString, isDate } from '../date-util.js'
  import DateTable from '../basic/date-table.svelte';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher()
  export let visible = false
  export let value = []
  export let disabledDate: Function
  let rangeState = {
    endDate: null,
    selecting: false,
    row: null,
    column: null
  }
  
  $:leftDate = resetDate(value[0])
  $:rightDate = nextDate(leftDate)
  $:leftLabel =  leftDate.getFullYear() + '年' + ' ' + String(leftDate.getMonth() + 1).padStart(2, '0') + '月'
  $:rightLabel =  rightDate.getFullYear() + '年' + ' ' + String(rightDate.getMonth() + 1).padStart(2, '0') + '月'
  let minDate = isDate(value[0]) ? new Date(value[0]) : null;
  let maxDate = isDate(value[1]) ? new Date(value[1]) : null;
  $:if(visible) {
    rangeState.selecting = false
    rangeState.endDate = null
    minDate = isDate(value[0]) ? new Date(value[0]) : null
    maxDate = isDate(value[1]) ? new Date(value[1]) : null
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
  // console.log(value);
  const minDate1 = modifyWithTimeString(val.detail.minDate);
  const maxDate1 = modifyWithTimeString(val.detail.maxDate);
  if (maxDate === minDate1 && minDate === maxDate1) {
    return;
  }
  maxDate = maxDate1;
  minDate = minDate1;
  if (!val.detail.close) return;
  handleConfirm();
}
const handleChangeRange = (val) => {
  minDate = val.detail.minDate;
  maxDate = val.detail.maxDate;
  rangeState = val.detail.rangeState;

}
const handleConfirm = () => {
  if (isValidValue([minDate, maxDate])) {
    leftDate = minDate
    rightDate = nextDate(leftDate)
    value = [minDate, maxDate]
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
</script>


{#if visible}
<div class="be-picker-panel be-date-picker be-date-range-picker be-popper" in:zoomIn="{{duration: 250}}" out:zoomIn="{{duration: 250}}">
  <div class="be-picker-panel__content be-date-range-picker__content is-left">
    <div class="be-date-range-picker__header">
      <span class="be-picker-panel__icon-btn be-date-picker__prev-btn" on:click={handlePrevMonth}></span>
      <span class="be-picker-panel__icon-btn be-date-picker__d-prev-btn" on:click={handlePrevYear}></span>
      <span class="be-date-picker__header-label">{leftLabel}</span>
      <!-- {#if currentView === 'date'}
        <span class="be-picker-panel__icon-btn be-date-picker__next-btn" on:click={handleNextMonth}></span>
      {/if}
      <span class="be-picker-panel__icon-btn be-date-picker__d-next-btn" on:click={handleNextYear}></span> -->
    </div>
    <DateTable date = {leftDate} {value} {disabledDate} {rangeState} {minDate} {maxDate} selectMode='range' on:pick={handleRangePick} on:changerange={handleChangeRange}/>
  </div>
  <div class="be-picker-panel__content be-date-range-picker__content is-left">
    <div class="be-date-range-picker__header">
      <span class="be-date-picker__header-label">{rightLabel}</span>
      <span class="be-picker-panel__icon-btn be-date-picker__next-btn" on:click={handleNextMonth}></span>
      <span class="be-picker-panel__icon-btn be-date-picker__d-next-btn" on:click={handleNextYear}></span>
    </div>
    <DateTable date = {rightDate} {value} {disabledDate} {rangeState} {minDate} {maxDate} selectMode='range' on:pick={handleRangePick} on:changerange={handleChangeRange}/>
  </div>
  <div class="popper__arrow"></div>
</div>
{/if}