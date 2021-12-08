<script lang="ts">
import DateTable from '../basic/date-table.svelte'
import { nextMonth, prevMonth, prevYear, nextYear } from '$utils/date-util.ts'
let date = new Date('2021-12')
function handlePrevMonth() {
  date = prevMonth(date)
}
function handleNextMonth() {
  date = nextMonth(date)
  console.log(date)

}
function handlePrevYear() {
  date = prevYear(date)
}
function handleNextYear() {
  date = nextYear(date)
}
$:year = date.getFullYear()
$:month = String(date.getMonth() + 1).padStart(2, '0')
</script>

<div class="be-picker-panel be-date-picker be-popper">
  <div class="be-picker-panel__body-wrapper">
    <div class="be-picker-panel__body">
      <div class="be-date-picker__header">
          <span class="be-picker-panel__icon-btn be-date-picker__prev-btn" on:click={handlePrevYear}>上年</span>
          <span class="be-picker-panel__icon-btn be-date-picker__prev-btn" on:click={handlePrevMonth}>-上月</span>
          <span class="be-date-picker__header-label">{year} 年</span>
          <span class="be-date-picker__header-label">{month} 月</span>
          <span class="be-picker-panel__icon-btn be-date-picker__next-btn" on:click={handleNextYear}>下年</span>
          <span class="be-picker-panel__icon-btn be-date-picker__next-btn" on:click={handleNextMonth}>下月-</span>
      </div>
      <div class="be-picker-panel__content">
        <DateTable date={date}/>
      </div>
    </div>
  </div>
</div>