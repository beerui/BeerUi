<script>
	import { createEventDispatcher, onMount } from 'svelte';
  import { getRangeHours, getRangeMinutes, getRangeSeconds, modifyTime, timeRangeParse } from '../date-util.js'
  import { debounce } from '$lib/utils/throttle';
  export let date
  export let selectableRange
  export let format
  const dispatch = createEventDispatcher()
  const itemHeight = 32
  let showSecond = format.indexOf('ss') !== -1
  let separator = '-'
  let timeSelect = {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  }
  let timeDom = {
    hours: null,
    minutes: null,
    seconds: null,
  }
  selectableRange = Array.isArray(selectableRange) ? selectableRange : [selectableRange]
  const ranges = selectableRange.map(range => timeRangeParse(range, separator))
  const hoursList = getRangeHours(ranges)
  $:minutesList = getRangeMinutes(ranges, timeSelect.hours)
  $:secondsList = getRangeSeconds(ranges, timeSelect.hours, timeSelect.minutes, minutesList[timeSelect.minutes])



  onMount(() => {
    bindScrollEvent('hours')
    bindScrollEvent('minutes')
    if(showSecond) bindScrollEvent('seconds')
  })

  const selectTime = (type, index) => {

    // TODO:需要处理用户赋予禁用的时间为默认值
    // if(selectableRange && selectableRange.length > 0 && type == 'hours' && hoursList[index]) {
    //   index = canSelectTime(hoursList)
    // }
    timeSelect[type] = index
    timeDom[type].scrollTop = index * itemHeight
    sendEmit()
  }
  const bindScrollEvent = (type) => {
    selectTime(type, timeSelect[type])
  }

  const handleScroll = debounce((type) => {
    timeSelect[type] = Math.round(timeDom[type].scrollTop / itemHeight)
    const value = timeSelect[type] * itemHeight
    timeDom[type].scrollTop = value
    sendEmit()
  }, 100)
  const canSelectTime = (list) => {
    return list.findIndex((item)=>{
      return !item
    })
  }
  const sendEmit = () => {
    dispatch('pick', {date: modifyTime(date, timeSelect.hours, timeSelect.minutes, timeSelect.seconds), disabled: secondsList[timeSelect.seconds]})
  }
</script>

<div class="be-time-spinner">
  <div class="be-time-spinner__wrapper" bind:this={timeDom['hours']} on:scroll={() => handleScroll('hours')}>
    <ul class="be-time-spinner__list">
      {#each hoursList as item,index}
        <li class="be-time-spinner__item" class:disabled={item} class:active={timeSelect['hours'] == index} on:click={() => selectTime('hours', index)} on:keydown>{index < 10 ? ('0' + index) : index}</li>
      {/each}
    </ul>
  </div>
  <div class="be-time-spinner__wrapper" bind:this={timeDom['minutes']} on:scroll={() => handleScroll('minutes')}>
    <ul class="be-time-spinner__list">
      {#each minutesList as item,index}
        <li class="be-time-spinner__item" class:disabled={!item} class:active={timeSelect['minutes'] == index} on:click={() => selectTime('minutes', index)} on:keydown>{index < 10 ? ('0' + index) : index}</li>
      {/each}
    </ul>
  </div>
  {#if showSecond}
  <div class="be-time-spinner__wrapper" bind:this={timeDom['seconds']} on:scroll={() => handleScroll('seconds')}>
    <ul class="be-time-spinner__list">
      {#each secondsList as item,index}
        <li class="be-time-spinner__item" class:disabled={item} class:active={timeSelect['seconds'] == index} on:click={() => selectTime('seconds', index)} on:keydown>{index < 10 ? ('0' + index) : index}</li>
      {/each}
    </ul>
  </div>
  {/if}
</div>
