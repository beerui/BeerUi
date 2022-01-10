<script lang="ts">
  import { createEventDispatcher } from 'svelte';
import { getMonthTimestamp } from '../date-util.js'
const dispatch = createEventDispatcher()
let rows = []
const now = getMonthTimestamp(new Date());
export let date
export let value
export let disabledDate: Function
const MONTHS = {
  '0': '一月',
  '1': '二月',
  '2': '三月',
  '3': '四月',
  '4': '五月',
  '5': '六月',
  '6': '七月',
  '7': '八月',
  '8': '九月',
  '9': '十月',
  '10': '十一月',
  '11': '十二月'
}
$:ininMonth(date)

function ininMonth(date) {
  rows =  [[], [], []]
  for (let i = 0; i < 3; i++) {
    const row = rows[i];
    for (let j = 0; j < 4; j++) {
      const index = i * 4 + j; // 0 - 11
      let cell = row[j];
      if(!cell) {
        cell = { row: i, column: j, type: 'normal', inRange: false, start: false, end: false };
      }
      cell.type = 'normal'
      const curDate = new Date(date.getFullYear(), index)
      const time = curDate.getTime();
      const isToday = time === now;
      if (isToday) {
        cell.type = 'today';
      }
      cell.disabled = typeof disabledDate === 'function' && disabledDate(curDate);
      cell.text = index;
      row.push(cell)
    }
  }
}
function selectMonth(e, cell) {
  if(cell.disabled) throw new Error('该日期已禁用！')
  const year = date.getFullYear()
  const dateTime = new Date(year, cell.text, 1)
  dispatch('pick', dateTime)
}
function cellMatchesDate(cell) {
  const dateValue = new Date(value)
  const year = date.getFullYear()
  const month = date.getMonth()
  return year === dateValue.getFullYear() &&
    month === cell.text
}
function getCellClasses(cell) {
  let classes = [];
  if ((cell.type === 'normal' || cell.type === 'today') && !cell.disabled) {
      classes.push('available');
    if (cell.type === 'today') {
      classes.push('today');
    }
  } else {
    classes.push(cell.type);
  }
  if ((cell.type === 'normal' || cell.type === 'today') && cellMatchesDate(cell)) {
    classes.push('current');
  }
  if (cell.disabled) {
    classes.push('disabled');
  }
  return classes.join(' ');
}

</script>

<table class="be-month-table">
  <tbody>
    {#each rows as row}
      <tr>
        {#each row as cell}
          <td class={getCellClasses(cell)} on:click={(e)=> selectMonth(e, cell)}>
            <div>
              <span class="cell">{MONTHS[cell.text]}</span>
            </div>
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
