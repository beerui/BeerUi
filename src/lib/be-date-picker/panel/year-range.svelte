<script lang="ts">
  import { cubicInOut } from 'svelte/easing';
  import { prevYear, nextYear, modifyWithTimeString, isDate } from '../date-util.js'
  import YearTable from '../basic/year-table.svelte';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher()
  export let visible = false
  export let value = []
  export let disabledDate: Function
  export let direction
  let rangeState = {
    endDate: null,
    selecting: false,
    row: null,
    column: null
  }

  $:leftDate = resetDate(value[0])
  $:rightDate = nextYear(leftDate, 10)
  $:leftLabel =  Math.floor(leftDate.getFullYear() / 10) * 10  + ' - ' + (Math.floor(leftDate.getFullYear() / 10) * 10 + 9);
  $:rightLabel = Math.floor(rightDate.getFullYear() / 10) * 10  + ' - ' + (Math.floor(rightDate.getFullYear() / 10) * 10 + 9);
  let minDate = isDate(value[0]) ? new Date(value[0]) : null;
  let maxDate = isDate(value[1]) ? new Date(value[1]) : null;
  let rangeRect
  let popperArrow

  $:if(visible) {
    // 处理右边边界问题
    const clientWidth = document.body.clientWidth
    const clientRect = rangeRect && rangeRect.getBoundingClientRect()
    if(clientRect && clientRect.right > clientWidth) {
      rangeRect.style.left = clientWidth - clientRect.right - 10 + 'px'
      popperArrow.style.left = clientRect.right - clientWidth + 35 + 'px'
    }
    rangeState.selecting = false
    rangeState.endDate = null
    minDate = isDate(value[0]) ? new Date(value[0]) : null
    maxDate = isDate(value[1]) ? new Date(value[1]) : null
  }
  function resetDate(val) {
    return val ? new Date(val) : new Date()
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
function handlePrevYear() {
  leftDate = prevYear(leftDate, 10)
  rightDate = prevYear(rightDate, 10)
}
function handleNextYear() {
  leftDate = nextYear(leftDate, 10);
  rightDate = nextYear(rightDate, 10);
}
const handleRangePick = (val) => {
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
<div class="be-picker-panel be-date-picker be-range-daterange-picker be-popper be-month-range-{direction}" bind:this={rangeRect} in:zoomIn="{{duration: 250}}" out:zoomIn="{{duration: 250}}">
  <div class="be-picker-panel__content be-range-daterange-picker__content is-left">
    <div class="be-range-daterange-picker__header">
      <span role='button' tabindex='-1' class="be-picker-panel__icon-btn be-date-picker__d-prev-btn" on:click={handlePrevYear} on:keydown></span>
      <span class="be-date-picker__header-label">{leftLabel}</span>
    </div>
    <YearTable date = {leftDate} {value} {disabledDate} {rangeState} {minDate} {maxDate} selectMode='range' on:pick={handleRangePick} on:changerange={handleChangeRange}/>
  </div>
  <div class="be-picker-panel__content be-range-daterange-picker__content is-left">
    <div class="be-range-daterange-picker__header">
      <span class="be-date-picker__header-label">{rightLabel}</span>
      <span role='button' tabindex='-1' class="be-picker-panel__icon-btn be-date-picker__d-next-btn" on:click={handleNextYear} on:keydown></span>
    </div>
    <YearTable date = {rightDate} {value} {disabledDate} {rangeState} {minDate} {maxDate} selectMode='range' on:pick={handleRangePick} on:changerange={handleChangeRange}/>
  </div>
  {#if direction=='bottom'}
  <div class="popper__arrow" bind:this={popperArrow}></div>
  {/if}
  {#if direction=='top'}
  <div class="popper__arrow_top" bind:this={popperArrow}></div>
  {/if}
</div>
{/if}
