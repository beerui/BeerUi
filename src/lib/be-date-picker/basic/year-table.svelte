<script lang="ts">
	import { createEventDispatcher } from 'svelte';

  export let date
  export let value
	export let disabledDate: Function

  const dispatch = createEventDispatcher()
  $:startYear = Math.floor(date.getFullYear() / 10) * 10 
  function isDisabled(date) {
    return typeof disabledDate === 'function' && disabledDate(date)
  }
  function selectYear(e) {
    const year = e.target.outerText
    const dateTime = new Date(year)
    if(isDisabled(dateTime)) throw new Error('该日期已禁用！')
    dispatch('pick', dateTime)
  }
  function getCellClasses(year) {
    let classes = [];
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
    return classes.join(' ')
  }
</script>

<table class="be-year-table">
  <tbody on:click={selectYear}>
      <tr>
        <td class={getCellClasses(startYear)}>
          <div>
            <span class="cell">{ startYear }</span>
          </div>
        </td>
        <td class={getCellClasses(startYear + 1)}>
          <div>
            <span class="cell">{ startYear + 1 }</span>
          </div>
        </td>
        <td class={getCellClasses(startYear + 2)}>
          <div>
            <span class="cell">{ startYear + 2 }</span>
          </div>
        </td>
        <td class={getCellClasses(startYear + 3)}>
          <div>
            <span class="cell">{ startYear + 3 }</span>
          </div>
        </td>
      </tr>
      <tr>
        <td class={getCellClasses(startYear + 4)}>
          <div>
            <span class="cell">{ startYear + 4 }</span>
          </div>
        </td>
        <td class={getCellClasses(startYear + 5)}>
          <div>
            <span class="cell">{ startYear + 5 }</span>
          </div>
        </td>
        <td class={getCellClasses(startYear + 6)}>
          <div>
            <span class="cell">{ startYear + 6 }</span>
          </div>
        </td>
        <td class={getCellClasses(startYear + 7)}>
          <div>
            <span class="cell">{ startYear + 7 }</span>
          </div>
        </td>
      </tr>
      <tr>
        <td class={getCellClasses(startYear + 8)}>
          <div>
            <span class="cell">{ startYear + 8 }</span>
          </div>
        </td>
        <td class={getCellClasses(startYear + 9)}>
          <div>
            <span class="cell">{ startYear + 9 }</span>
          </div>
        </td>
      </tr>
  </tbody>
</table>
