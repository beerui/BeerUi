<script>
	import { onMount } from 'svelte';
	import { BeCountTo, BeInput, BeButton } from '$lib';
  import DemoBlock from '$lib/demo/DemoBlock.svelte';
  let countTo
  let start = 0
  let end = 2022
  let duration = 4000
  let decimal = 0
</script>


<div class='page-container'>
  <DemoBlock code = {`
     <BeCountTo start={start} end={end} duration={duration} />
    `} js={` 
    let countTo
    let start = 0
    let end = 2022
    let duration = 4000
    let decimal = 0`}>
		<div slot='source'>
      <div class="count-to-example-num">
        <BeCountTo start={start} end={end} duration={duration} bind:this={countTo} autoplay={false}/>
      </div>
      
      <div class="count-to-example">
        <div class="count-to-example-input">start： <BeInput bind:value={start}/></div>
        <div class="count-to-example-input">end： <BeInput bind:value={end}/></div>
        <div class="count-to-example-input">duration： <BeInput bind:value={duration}/></div>
        <div class="count-to-example-input">decimal： <BeInput bind:value={decimal}/></div>
      </div>
      <div class="count-to-example">
        <BeButton style="margin-right:10px" on:click={countTo.startHandler()}>开始</BeButton>
        <BeButton style="margin-right:10px" on:click={countTo.pauseHandler()}>暂停</BeButton>
        <BeButton style="margin-right:10px" on:click={countTo.resumeHandler()}>恢复</BeButton>
        <BeButton on:click={countTo.resetHandler()}>重置</BeButton>
      </div>
		</div>
		<div slot='description'>
      
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