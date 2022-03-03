<script lang="ts">
import { createEventDispatcher } from 'svelte';
import { getDayCountOfMonth, getDateTimestamp, getFirstDayOfMonth, modifyDate } from '../date-util.js'
const dispatch = createEventDispatcher()
const weeks = ['日','一','二','三','四','五','六']
let rows = []

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
let dateCountOfMonth
let dateCountOfLastMonth
let dateWeekOfMonth
let year
let month
let offset
const now = getDateTimestamp(new Date());

$: initDate(date)
$: markRange(minDate, maxDate)
// $: markRange(minDate, rangeState.endDate)

function initDate(date) {
  rows = [[],[],[],[],[],[]]
  year = date.getFullYear()
  month = date.getMonth()
  // 当月总天数 total of month
  dateCountOfMonth = getDayCountOfMonth(year, month);
  // 上月最后一天是几号 The end of last month
  dateCountOfLastMonth = getDayCountOfMonth(year, (month === 0 ? 11 : month - 1));
  // 每月第一天是星期几
  dateWeekOfMonth = getFirstDayOfMonth(date)
  // console.log(date.getMonth(), dateCountOfMonth, dateCountOfLastMonth, dateWeekOfMonth)
  // 当前日期时间戳
  getMonthArray()
  // console.log(dateWeekOfMonth)
}

function getMonthArray() {
  let count = 1
  offset = dateWeekOfMonth == 0 ? 7 : dateWeekOfMonth
  for(let i = 0; i < 6; i++) {
    const row = rows[i]
    for(let j = 0; j < 7; j++) {
      const index = i * 7 + j; // 下标 0 1 2 3 4 5 6 7 8
      const cell = { text: null, row: i, column: j, type: 'normal', disabled: false, inRange: false, start: false, end: false };
      //计算需要补的天数 目的是调整前两行日期的位置
      const offsetDay = - offset + 1 + index
      // 计算需要补上月的日期
      const day = dateCountOfLastMonth + offsetDay
      // let curDate =  new Date(year, month, count)
      // 数字代表的实际日期 eg: new Date(2022,0,-1) = new Date(2021,12,30)
      // let curDate = modifyDate(date, year, month, offsetDay) 
      let curDate = new Date(year, month, offsetDay)
      const time = getDateTimestamp(curDate)
      cell.inRange = time >= getDateTimestamp(minDate) && time <= getDateTimestamp(maxDate);
      cell.start = minDate && time === getDateTimestamp(minDate);
      cell.end = maxDate && time === getDateTimestamp(maxDate);
      // if(dateWeekOfMonth != 0 && day <= dateCountOfLastMonth) {
      if(day <= dateCountOfLastMonth) {
        cell.text = day
        cell.type = 'prev-month';
      } else {
        if (count <= dateCountOfMonth) {
          cell.text = count++;
          const isToday = time === now;
          if (isToday) {
            cell.type = 'today';
          }
        } else {
          cell.text = count++ - dateCountOfMonth;
          cell.type = 'next-month';
        }
      }
      //  禁用日期
      cell.disabled = typeof disabledDate === 'function' && disabledDate(curDate);
      row.push(cell)
    }
  }
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
      const index = i * 7 + j 
      const offsetDay = - offset + 1 + index
      let curDate = new Date(year, month, offsetDay)
      const time = getDateTimestamp(curDate)
      cell.inRange = minDate && time >= minDate && time <= maxDate;
      cell.start = minDate && time === minDate;
      cell.end = maxDate && time === maxDate;
    }
  }
  rows = rows
}
function selectDay(e, cell, index) {
  if(cell.disabled) throw new Error('该日期已禁用！')
  let dateMonth = month
  if(cell.type == 'next-month') {
    dateMonth++
  }
  if(cell.type == 'prev-month') {
    dateMonth--
  }
  const newDate = new Date(year, dateMonth, cell.text)
  if(selectMode === 'range') {
    if(!rangeState.selecting) {
      rangeState.selecting = true
      dispatch('pick', {minDate: newDate, maxDate: null, close: false})
    } else {
      rangeState.selecting = false
      if (newDate >= minDate) {
        dispatch('pick', {minDate: minDate, maxDate: newDate, close: true});
      } else {
        dispatch('pick', {minDate: newDate, maxDate: minDate, close: true});
      }
    }
  }
  else {
    // 当前输入框无值时 选中日期 时间为00:00:00, 有值时选中即为当前值(datetime)
    const dateTime = value ? modifyDate(date, year, dateMonth, cell.text) : newDate
    dispatch('pick', dateTime)
  }
}
function cellMatchesDate(cell) {
  const dataValue = new Date(value)
  return year === dataValue.getFullYear() &&
    month === dataValue.getMonth() &&
    Number(cell.text) === dataValue.getDate();
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
  if (target.tagName === 'SPAN') {
    target = target.parentNode.parentNode;
  }
  if (target.tagName === 'DIV') {
    target = target.parentNode;
  }
  if (target.tagName !== 'TD') return;
  const row = target.parentNode.rowIndex - 1;
  const column = target.cellIndex;
  const index = row * 7 + column 
  const offsetDay = - offset + 1 + index
  let newDate = new Date(year, month, offsetDay)
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

<table class="be-date-table" on:mousemove={handleMouseMove}>
  <tbody>
    <tr>
      {#each weeks as week}
      <th>{week}</th>
      {/each}
    </tr>
    {#each rows as row, i}
      <tr>
        {#each row as cell, j}
        <td class={getCellClasses(cell)} on:click={(e)=> selectDay(e, cell, j)}>
          <div><span>{cell.text}</span></div>
        </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
