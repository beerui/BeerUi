<script>
	import { BeCountTo, BeInput, BeButton } from '$lib';
  import DemoBlock from '$lib/demo/DemoBlock.svelte';
  let countTo
  let start = 0
  let end = 2022
  let duration = 4000
  let decimals = 0
</script>


<div class='page-container'>
	<h2>CountTo 累加器</h2>
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
        <BeCountTo class='ww' {start} {end} {duration} {decimals} bind:this={countTo} />
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
	</DemoBlock>
	<h3 class='demo-table-title'>Attributes</h3>
	<table class='demo-table'>
		<thead>
		<tr>
			<th>参数</th>
			<th>说明</th>
			<th>类型</th>
			<th>可选值</th>
			<th>默认值</th>
		</tr>
		</thead>
		<tbody>
		<tr>
			<td>start</td>
			<td>开始数值</td>
			<td>number</td>
			<td>-</td>
			<td>0</td>
		</tr>
		<tr>
			<td>end</td>
			<td>结束数值</td>
			<td>number</td>
			<td>-</td>
			<td>0</td>
		</tr>
		<tr>
			<td>duration</td>
			<td>持续时间</td>
			<td>number</td>
			<td>-</td>
			<td>2000</td>
		</tr>
		<tr>
			<td>decimals</td>
			<td>保留小数点后几位</td>
			<td>number</td>
			<td>-</td>
			<td>0</td>
		</tr>
		<tr>
			<td>autoplay</td>
			<td>自动累加</td>
			<td>boolean</td>
			<td>true/false</td>
			<td>true</td>
		</tr>
		<tr>
			<td>useEasing</td>
			<td>低速结束</td>
			<td>boolean</td>
			<td>true/false</td>
			<td>true</td>
		</tr>
		<tr>
			<td>separator</td>
			<td>分隔符</td>
			<td>string</td>
			<td>-</td>
			<td>,</td>
		</tr>
		</tbody>
	</table>
	<h3 class='demo-table-title'>Events</h3>
	<table class='demo-table'>
		<thead>
		<tr>
			<th>事件名称</th>
			<th>说明</th>
			<th>回调参数</th>
		</tr>
		</thead>
		<tbody>
		<tr>
			<td>startHandler</td>
			<td>开始</td>
			<td>-</td>
		</tr>
		<tr>
			<td>pauseHandler</td>
			<td>暂停</td>
			<td>-</td>
		</tr>
		<tr>
			<td>resumeHandler</td>
			<td>恢复</td>
			<td>-</td>
		</tr>
		<tr>
			<td>resetHandler</td>
			<td>重置</td>
			<td>-</td>
		</tr>
		</tbody>
	</table>
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
