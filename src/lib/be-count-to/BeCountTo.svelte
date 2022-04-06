<script lang="ts">
  import { requestAnimationFrame, cancelAnimationFrame } from './requestAnimationFrame'
  import { onDestroy } from 'svelte';
  export let start:number = 0
  export let end:number = 0
  export let duration:number = 2000
  export let autoplay:boolean = true
  export let useEasing:boolean = true 
  export let decimal:number = 0
  let startTime
  let currentValue = start 
  $:isCountDown = start > end
  let RAF = null

  function count(timestamp) {
    if (!startTime) startTime = timestamp;
    // 当前动画已经执行的时间
    const elapsed = timestamp - startTime;
    if(useEasing) {
      // 开始数字大于结束数字
      if(isCountDown) {
        currentValue = start - easingFn(elapsed, 0, start - end, duration);
      } else {
        currentValue = easingFn(elapsed, start, end - start, duration);
      }
    } else {
      if(isCountDown) {
        currentValue = start - (start - end) * (elapsed / duration)
      } else {
        currentValue = start +  (end - start) * (elapsed / duration)
      }
    }
    currentValue = isCountDown ? (currentValue < end ? end : currentValue) : (currentValue > end ? end : currentValue)
    currentValue = Number(currentValue.toFixed(decimal))
    if (elapsed < duration) {
      RAF = requestAnimationFrame(count);
    }
  }
  export const startHandler = () => {
    startTime = null;
    currentValue = start
    RAF = requestAnimationFrame(count);
  }
  export const pauseHandler = () => {
    cancelAnimationFrame(RAF)
  }
  export const resumeHandler = () => {
    // start = currentValue
    startTime = null
    requestAnimationFrame(count);
  }
  export const resetHandler = () => {
    startTime = null
    currentValue = start
    cancelAnimationFrame(RAF)
  }
  if(autoplay) startHandler()
  // 数字过度动画
  const easingFn = (t, b, c, d) => {
    return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
  }
  onDestroy(() => {
    cancelAnimationFrame(RAF)
	});
</script>


<div>
  {currentValue}
</div>