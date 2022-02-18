<script>
	import { createEventDispatcher, onMount } from 'svelte';
  import { getRangeHours, getRangeMinutes, modifyTime } from '../date-util.js'
  export let date
  const dispatch = createEventDispatcher()
  const hoursList = getRangeHours()
  const minutesList = getRangeMinutes()
  const secondsList = new Array(60)
  let timeDom = {
    hours: null,
    minutes: null,
    seconds: null,
  }
  let timeSelect = {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  }
  onMount(() => {
    bindScrollEvent('hours')
    bindScrollEvent('minutes')
    bindScrollEvent('seconds')
  })

  const selectTime = (type, index) => {
    timeSelect[type] = index
    timeDom[type].scrollTop = index * itemHeight
    dispatch('pick', modifyTime(date, timeSelect.hours, timeSelect.minutes, timeSelect.seconds))
  }
  const bindScrollEvent = (type) => {
    selectTime(type, timeSelect[type])
  }

  const itemHeight = 32
  const handleScroll = (type) => {
    timeSelect[type] = Math.round(timeDom[type].scrollTop / itemHeight)
    const value = timeSelect[type] * itemHeight
    timeDom[type].scrollTop = value
    dispatch('pick', modifyTime(date, timeSelect.hours, timeSelect.minutes, timeSelect.seconds))
  }
  
</script>

<div class="be-time-spinner">
  <div class="be-time-spinner__wrapper" bind:this={timeDom['hours']} on:scroll={() => handleScroll('hours')}>
    <ul class="be-time-spinner__list">
      {#each hoursList as item,index}
        <li class="be-time-spinner__item" class:active={timeSelect['hours'] == index} on:click={() => selectTime('hours', index)}>{index < 10 ? ('0' + index) : index}</li>
      {/each}
    </ul>
  </div>
  <div class="be-time-spinner__wrapper" bind:this={timeDom['minutes']} on:scroll={() => handleScroll('minutes')}>
    <ul class="be-time-spinner__list">
      {#each minutesList as item,index}
        <li class="be-time-spinner__item" class:active={timeSelect['minutes'] == index} on:click={() => selectTime('minutes', index)}>{index < 10 ? ('0' + index) : index}</li>
      {/each}
    </ul>
  </div>
  <div class="be-time-spinner__wrapper" bind:this={timeDom['seconds']} on:scroll={() => handleScroll('seconds')}>
    <ul class="be-time-spinner__list">
      {#each secondsList as item,index}
        <li class="be-time-spinner__item" class:active={timeSelect['seconds'] == index} on:click={() => selectTime('seconds', index)}>{index < 10 ? ('0' + index) : index}</li>
      {/each}
    </ul>
  </div>
</div>