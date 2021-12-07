<script lang="ts">
import { getDayCountOfMonth, getDateTimestamp, nextDate } from '$utils/date-util.ts'

const weeks = ['日','一','二','三','四','五','六']
let rows = []
export let date
let dateCountOfMonth
let dateCountOfLastMonth
let dateWeekOfMonth

$: initDate(date)

function initDate(date) {
  rows = [[],[],[],[],[],[]]
  // 当月总天数
  dateCountOfMonth = getDayCountOfMonth(date.getFullYear(), date.getMonth());
  // 上月最后一天是几号
  dateCountOfLastMonth = getDayCountOfMonth(date.getFullYear(), (date.getMonth() === 0 ? 11 : date.getMonth()- 1));
  console.log('dateCountOfLastMonth', dateCountOfLastMonth)
  // 每月第一天是星期几
  dateWeekOfMonth = date.getDay()
  // console.log(date.getMonth(), dateCountOfMonth, dateCountOfLastMonth, dateWeekOfMonth)
  // 当前日期时间戳
  const now = getDateTimestamp(new Date());
  getMonthArray()
  // console.log(dateWeekOfMonth)
}
  
  function getMonthArray() {
    let count = 1
    const offset = dateWeekOfMonth == 0 ? 7 : dateWeekOfMonth
    // const offset = dateWeekOfMonth
    for(let i = 0; i < 6; i++) {
      const row = rows[i]
      for(let j = 0; j < 7; j++) {
        const index = i * 7 + j; // 0 1 2 3 4 5 6 7 8
        const cell = { text: null, row: i, column: j, type: 'normal', inRange: false };
        //计算需要补的天数 目的是调整前两行日期的位置 (dateCountOfLastMonth - dateWeekOfMonth + 1 + index)
        const day = dateCountOfLastMonth - offset + 1 + index
        // if(dateWeekOfMonth != 0 && day <= dateCountOfLastMonth) {
        if(day <= dateCountOfLastMonth) {
          cell.text = day
          cell.type = 'prev-month';
        } else {
          if (count <= dateCountOfMonth) {
            cell.text = count++;
          } else {
            cell.text = count++ - dateCountOfMonth;
            cell.type = 'next-month';
          }
        }
        // const isToday = time === now;
        // if (isToday) {
        //   cell.type = 'today';
        // }
        row.push(cell)
      }
    }
  }

</script>

<table class="be-date-table">
  <tbody>
    <tr>
      {#each weeks as week}
      <th>{week}</th>
      {/each}
    </tr>
    {#each rows as row, index}
      <tr>
        {#each row as {text, type}, i}
        <td class={type}>
          <div><span>{text}</span></div>
        </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>