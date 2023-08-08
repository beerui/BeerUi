<script lang="ts">
  import { createEventDispatcher } from 'svelte';
import { getMonthTimestamp, getDateTimestamp } from '../date-util.js'
const dispatch = createEventDispatcher()
let rows = []
const now = getMonthTimestamp(new Date());
export let date
export let value
export let selectMode
export let minDate
export let maxDate
export let disabledDate: Function
export let rangeState = {
  endDate: null,
  selecting: false
}
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
$: markRange(minDate, maxDate)
function ininMonth(date) {
  rows =  [[], [], []]
  for (let i = 0; i < 3; i++) {
    const row = rows[i];
    for (let j = 0; j < 4; j++) {
      const index = i * 4 + j; // 0 - 11
      let cell = row[j];
      if(!cell) {
        cell = { text: null, row: i, column: j, type: 'normal', disabled: false, inRange: false, start: false, end: false }
      }
      cell.type = 'normal'
      const curDate = new Date(date.getFullYear(), index)
      const time = curDate.getTime();
      cell.inRange = time >= getDateTimestamp(minDate) && time <= getDateTimestamp(maxDate);
      cell.start = minDate && time === getDateTimestamp(minDate);
      cell.end = maxDate && time === getDateTimestamp(maxDate);
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
  if(cell.disabled) return
  const year = date.getFullYear()
  const dateTime = new Date(year, cell.text, 1)
  if(selectMode === 'range') {
    if(!rangeState.selecting) {
      rangeState.selecting = true
      dispatch('pick', {minDate: dateTime, maxDate: null, close: false})
    } else {
      rangeState.selecting = false
      if (dateTime >= minDate) {
        dispatch('pick', {minDate: minDate, maxDate: dateTime, close: true});
      } else {
        dispatch('pick', {minDate: dateTime, maxDate: minDate, close: true});
      }
    }
  } else {
    dispatch('pick', dateTime)
  }

}
function cellMatchesDate(cell) {
  const dateValue = new Date(value)
  const year = date.getFullYear()
  const month = date.getMonth()
  return year === dateValue.getFullYear() &&
    month === cell.text
}
const markRange = (minDate, maxDate) => {
  minDate = getDateTimestamp(minDate);
  maxDate = getDateTimestamp(maxDate) || minDate;
  [minDate, maxDate] = [Math.min(minDate, maxDate), Math.max(minDate, maxDate)];
  // const startDate = this.startDate;
  for (let i = 0, k = rows.length; i < k; i++) {
    const row = rows[i];
    for (let j = 0, l = row.length; j < l; j++) {
      const cell = row[j];
      const index = i * 4 + j
      let curDate = new Date(date.getFullYear(), index)
      const time = getDateTimestamp(curDate)
      cell.inRange = minDate && time >= minDate && time <= maxDate;
      cell.start = minDate && time === minDate;
      cell.end = maxDate && time === maxDate;
    }
  }
  rows = rows
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
  if (cell.inRange && (cell.type === 'normal' || cell.type === 'today')) {
    classes.push('in-range');
    if (cell.start) {
      classes.push('start-date');
    }
    if (cell.end) {
      classes.push('end-date');
    }
  }
  if (cell.disabled) {
    classes.push('disabled');
  }
  return classes.join(' ');
}
const handleMouseMove = (event) => {
  if (!rangeState.selecting) return;
  let target = event.target;
  if (target.tagName === 'A') {
    target = target.parentNode.parentNode;
  }
  if (target.tagName === 'DIV') {
    target = target.parentNode;
  }
  if (target.tagName !== 'TD') return;
  const row = target.parentNode.rowIndex;
  const column = target.cellIndex;
  const index = row * 4 + column
  let newDate = new Date(date.getFullYear(), index)
  if (rows[row][column].disabled) return;
  dispatch('changerange', {
    minDate: minDate,
    maxDate: newDate,
    rangeState: {
      selecting: true
    }
  })
}
</script>

<table class="be-month-table" on:mousemove={handleMouseMove}>
  <tbody>
    {#each rows as row}
      <tr>
        {#each row as cell}
          <td class={getCellClasses(cell)} on:click={(e)=> selectMonth(e, cell)} on:keydown>
            <div>
              <span class="cell">{MONTHS[cell.text]}</span>
            </div>
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
