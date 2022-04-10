<script>
	import { onMount } from 'svelte';
	import { BeCountTo, BeInput, BeButton } from '$lib';
  import DemoBlock from '$lib/demo/DemoBlock.svelte';
  let countTo
  let start = 0
  let end = 2022
  let duration = 4000
  let decimals = 0
</script>


<div class='page-container'>
  <DemoBlock code = {`
     <BeCountTo {start} {end} {duration} bind:this={countTo}/>
     <BeButton on:click={countTo.startHandler()}>开始</BeButton>
    <BeButton on:click={countTo.pauseHandler()}>暂停</BeButton>
    <BeButton on:click={countTo.resumeHandler()}>恢复</BeButton>
    <BeButton on:click={countTo.resetHandler()}>重置</BeButton>
    `} js={` 
    let countTo
    let start = 0
    let end = 2022
    let duration = 4000
    let decimal = 0`}>
		<div slot='source'>
      <div class="count-to-example-num">
        <BeCountTo {start} {end} {duration} {decimals} bind:this={countTo} />
      </div>
      
      <div class="count-to-example">
        <div class="count-to-example-input">start： <BeInput type="number" bind:value={start}/></div>
        <div class="count-to-example-input">end： <BeInput type="number" bind:value={end}/></div>
        <div class="count-to-example-input">duration： <BeInput type="number" bind:value={duration}/></div>
        <div class="count-to-example-input">decimals： <BeInput type="number" bind:value={decimals}/></div>
      </div>
      <div class="count-to-example">
        <BeButton style="margin-right:10px" on:click={countTo.startHandler()}>开始</BeButton>
        <BeButton style="margin-right:10px" on:click={countTo.pauseHandler()}>暂停</BeButton>
        <BeButton style="margin-right:10px" on:click={countTo.resumeHandler()}>恢复</BeButton>
        <BeButton on:click={countTo.resetHandler()}>重置</BeButton>
      </div>
		</div>
		<div slot='description'>
      <p>start: 开始数值</p>
      <p>end: 结束数值</p>
      <p>durtaion: 持续时间</p>
      <p>decimals: 保留小数点后几位</p>
      <p>autoplay: 是否自动累加</p>
      <p>useEasing: 动画是否以低速结束</p>
      <p>separator: 分隔符</p>
		</div>
	</DemoBlock>
</div>

<style lang="scss">
  .count-to-example-num {
    width: 100%;
    text-align: center;
    font-size: 36px;
  }
  .count-to-example {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    &-input {
      width: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
    }
  }
</style>