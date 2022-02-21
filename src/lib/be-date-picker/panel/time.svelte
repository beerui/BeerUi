<script>
  // TODO: 禁用/优化
import { cubicInOut } from 'svelte/easing';
import TimeSpinner from '../basic/time-spinner.svelte'
import BeButton from '$lib/be-button/BeButton.svelte';
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher()

export let visible = false
export let date
export let selectableRange
export let format
let dateData
function zoomIn(node, params) {
  return {
    duration:params.duration,
    easing: cubicInOut,
    css: t => {
      return `
        opacity: ${t};
        transform: scaleY(${t});
        transform-origin: center top;`
    }
  };
}
function PickTime(e) {
  dateData = e.detail 
  date = e.detail.date
}
function confirm() {
  if(dateData.disabled) throw new Error('该时间已禁用！')
  dispatch('pick', date)
}
</script>

{#if visible}
<div class="be-time-panel be-popper" in:zoomIn="{{duration: 250}}" out:zoomIn="{{duration: 250}}">
  <div class="el-time-panel__content">
    <TimeSpinner {selectableRange} {format} {date} on:pick={PickTime}/>
  </div>
  <div class="be-picker-panel__footer">
    <BeButton type="default" size="mini" on:click={confirm}>确认</BeButton>
  </div>
  <div class="popper__arrow"></div>
</div>
{/if}