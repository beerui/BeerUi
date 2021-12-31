<script>
	import { createEventDispatcher } from 'svelte';

  export let date
  export let value
  
  const dispatch = createEventDispatcher()
  $:startYear = Math.floor(date.getFullYear() / 10) * 10 

  function selectYear(e) {
    const year = e.target.outerText
    const dateTime = new Date(year)
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
    return classes.join(' ')
  }
</script>

<table class="be-year-table">
  <tbody on:click={selectYear}>
      <tr>
        <td class={getCellClasses(startYear)}>
          <div>
            <a class="cell">{ startYear }</a>
          </div>
        </td>
        <td class={getCellClasses(startYear + 1)}>
          <div>
            <a class="cell">{ startYear + 1 }</a>
          </div>
        </td>
        <td class={getCellClasses(startYear + 2)}>
          <div>
            <a class="cell">{ startYear + 2 }</a>
          </div>
        </td>
        <td class={getCellClasses(startYear + 3)}>
          <div>
            <a class="cell">{ startYear + 3 }</a>
          </div>
        </td>
      </tr>
      <tr>
        <td class={getCellClasses(startYear + 4)}>
          <div>
            <a class="cell">{ startYear + 4 }</a>
          </div>
        </td>
        <td class={getCellClasses(startYear + 15)}>
          <div>
            <a class="cell">{ startYear + 5 }</a>
          </div>
        </td>
        <td class={getCellClasses(startYear + 6)}>
          <div>
            <a class="cell">{ startYear + 6 }</a>
          </div>
        </td>
        <td class={getCellClasses(startYear + 7)}>
          <div>
            <a class="cell">{ startYear + 7 }</a>
          </div>
        </td>
      </tr>
      <tr>
        <td class={getCellClasses(startYear + 8)}>
          <div>
            <a class="cell">{ startYear + 8 }</a>
          </div>
        </td>
        <td class={getCellClasses(startYear + 9)}>
          <div>
            <a class="cell">{ startYear + 9 }</a>
          </div>
        </td>
      </tr>
  </tbody>
</table>
