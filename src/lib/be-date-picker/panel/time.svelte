<script>
import { cubicInOut } from 'svelte/easing';
import TimeSpinner from '../basic/time-spinner.svelte'
export let visible = false
console.log('visible', visible);
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
</script>

{#if visible}
<div class="be-time-panel be-popper" in:zoomIn="{{duration: 250}}" out:zoomIn="{{duration: 250}}">
  <TimeSpinner />
  <div class="popper__arrow"></div>
</div>
{/if}