<script lang="ts">
	import { createEventDispatcher } from 'svelte';
  import { getDateTimestamp } from '../date-util.js'
  let rows = []
  export let date
  export let value
	export let disabledDate: Function
  export let selectMode
  export let minDate
  export let maxDate
  export let rangeState = {
    endDate: null,
    selecting: false
  }
  const dispatch = createEventDispatcher()
  $: startYear =  Math.floor(date.getFullYear() / 10) * 10
  $: ininYear(date)
  $: markRange(minDate, maxDate)
  function ininYear(date) {
  const endYear = startYear + 9  
  rows =  [[], [], []]
  for (let i = 0; i < 3; i++) {
    const row = rows[i];
    for (let j = 0; j < 4; j++) {
      const index = i * 4 + j + startYear;
      if(index <= endYear) {
        let cell = row[j];
        if(!cell) {
          cell = { text: null, row: i, column: j, type: 'normal', disabled: false, inRange: false, start: false, end: false }
        }
        const curDate = new Date(String(index))
        const time = curDate.getTime();
        cell.inRange = time >= getDateTimestamp(minDate) && time <= getDateTimestamp(maxDate);
        cell.start = minDate && time === getDateTimestamp(minDate);
        cell.end = maxDate && time === getDateTimestamp(maxDate);
        cell.text = index;
        row.push(cell)
      }
    }
  } 
}
  function isDisabled(date) {
    return typeof disabledDate === 'function' && disabledDate(date)
  }
  function selectYear(e, cell) {
    const year = cell.text
    const dateTime = new Date(String(year))
    if(isDisabled(dateTime)) return
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
  const markRange = (minDate, maxDate) => {
    minDate = getDateTimestamp(minDate);
    maxDate = getDateTimestamp(maxDate) || minDate;
    [minDate, maxDate] = [Math.min(minDate, maxDate), Math.max(minDate, maxDate)];
    for (let i = 0, k = rows.length; i < k; i++) {
      const row = rows[i];
      for (let j = 0, l = row.length; j < l; j++) {
        const cell = row[j];
        const index = i * 4 + j + startYear
        let curDate = new Date(String(index))
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
    const year = cell.text
    if(year == new Date().getFullYear()) {
      classes.push('today');
    } else if(year == new Date(value).getFullYear()) {
      classes.push('current');
    } else {
      classes.push('available');
    }
    const disabled = isDisabled(new Date(String(year)))
    if(disabled) {
      classes.push('disabled');
    }
    if (cell.inRange) {
      classes.push('in-range');
    if (cell.start) {
      classes.push('start-date');
    }
    if (cell.end) {
      classes.push('end-date');
    }
  }
    return classes.join(' ')
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
  const index = row * 4 + column + startYear
  
  let newDate = new Date(String(index))
  if(isDisabled(newDate)) return
  dispatch('changerange', {
    minDate: minDate,
    maxDate: newDate,
    rangeState: {
      selecting: true
    }
  })
}
</script>

<table class="be-year-table" on:mousemove={handleMouseMove}>
  <tbody>
    {#each rows as row}
    <tr>
      {#each row as cell}
        <td class={getCellClasses(cell)} on:click={(e)=> selectYear(e, cell)}>
          <div>
            <span class="cell">{cell.text}</span>
          </div>
        </td>
      {/each}
    </tr>
  {/each}
  </tbody>
</table>
