<script lang="ts">
  import { requestAnimationFrame, cancelAnimationFrame } from './requestAnimationFrame'
  import { onDestroy } from 'svelte';
  export let start:number = 0
  export let end:number = 0
  export let duration:number = 2000
  export let autoplay:boolean = true
  export let useEasing:boolean = true
  export let decimals:number = 0
  export let separator:string = ','
  let startTime
  let currentValue = Number(start)
  let localStart = Number(start)
  let isCountDown = start > end
  let RAF = null
  function count(timestamp) {
    if (!startTime) startTime = timestamp;
    // 当前动画已经执行的时间
    const elapsed = timestamp - startTime;
    if(useEasing) {
      // 开始数字大于结束数字
      if(isCountDown) {
        currentValue = localStart - easingFn(elapsed, 0, localStart - end, duration);
      } else {
        currentValue = easingFn(elapsed, localStart, end - localStart, duration);
      }
    } else {
      if(isCountDown) {
        currentValue = localStart - (localStart - end) * (elapsed / duration)
      } else {
        currentValue = localStart +  (end - localStart) * (elapsed / duration)
      }
    }
    currentValue = isCountDown ? (currentValue < end ? end : currentValue) : (currentValue > end ? end : currentValue)
    if (elapsed < duration) {
      RAF = requestAnimationFrame(count);
    }
  }
  export const startHandler = () => {
    startTime = null;
    localStart = Number(start)
    isCountDown = start > end
    RAF = requestAnimationFrame(count);
  }
  export const pauseHandler = () => {
    cancelAnimationFrame(RAF)
  }
  export const resumeHandler = () => {
    localStart = currentValue
    startTime = null
    RAF = requestAnimationFrame(count);
  }
  export const resetHandler = () => {
    startTime = null
    currentValue = Number(start)
    cancelAnimationFrame(RAF)
  }
  if(autoplay) startHandler()
  // 数字过度动画
  const easingFn = (t, b, c, d) => {
    return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
  }
  const isNumber = (val) => {
    return !isNaN(parseFloat(val))
  }
  const formatNumber = (num) => {
    num = Number(num).toFixed(decimals);
    num += '';
    const x = num.split('.');
    let x1 = x[0];
    const x2 = x.length > 1 ? '.' + x[1] : '';
    const rgx = /(\d+)(\d{3})/;
    if (separator && !isNumber(separator)) {
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + separator + '$2');
      }
    }
    return x1 + x2
  }
  onDestroy(() => {
    cancelAnimationFrame(RAF)
	});
</script>


<span>
  {formatNumber(currentValue)}
</span>
