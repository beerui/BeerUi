<script lang="ts">
  import { createEventDispatcher } from 'svelte';
import { getMonthTimestamp ,clearDate } from '../date-util.js'
const dispatch = createEventDispatcher()
let rows = []
const now = getMonthTimestamp(new Date());
export let date
export let value
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
      const time = new Date(date.getFullYear(), index).getTime();
      const isToday = time === now;
      if (isToday) {
        cell.type = 'today';
      }
      cell.text = index;
      row.push(cell)
    }
  }
}
function selectMonth(e, cell) {
  const year = date.getFullYear()
  console.log(`${year}-${cell.text + 1}`)
  dispatch('pick', `${year}-${cell.text + 1}`)
}
function cellMatchesDate(cell) {
  const dateValue = new Date(value)
  const year = date.getFullYear()
  const month = date.getMonth()
  return year === dateValue.getFullYear() &&
    month === cell.text
}
function getCellClasses(cell, index) {
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
  return classes.join(' ');
}

</script>

<table class="el-month-table">
  <tbody>
    {#each rows as row}
      <tr>
        {#each row as cell}
          <td class={getCellClasses(cell)} on:click={(e)=> selectMonth(e, cell)}>
            <div>
              <a class="cell">{MONTHS[cell.text]}</a>
            </div>
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
