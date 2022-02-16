<script lang="ts">
  import { BeDatePicker } from '$lib';

  let value = ''
  $:{
    console.log(value)
  }
  function changeTime(value) {
    console.log(value)
  }
  const disabledDate = (time) => {
    return time.getTime() > Date.now()
  }
</script>
<div class='page-container'>
  <h2>datePicker组件</h2>
  <h3>基本用法</h3>
  <p class='desc'>datePicker 日期选择</p>
  <BeDatePicker bind:value={value} selectMode={"day"} format={"yyyy-MM-dd"} disabledDate={disabledDate} on:changesss={changeTime}/>
  <p class='desc'>datePicker 月份选择</p>
  <BeDatePicker value={'2021-10'} selectMode={"month"} format={"yyyy-MM"}/>
  <p class='desc'>datePicker 年份选择</p>
  <BeDatePicker value={'2021'} selectMode={"year"} format={"yyyy"} />
  <p class='desc'>timePicker 时间选择</p>
</div>
