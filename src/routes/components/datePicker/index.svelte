<script lang="ts">
  import { BeDatePicker } from '$lib';
  import { BeTimePicker } from '$lib';

  let value = '2011-12'
  let selectableRange = '18:30:00 - 20:30:00'
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
  <BeDatePicker value={value} selectMode={"date"} format={"yyyy-MM-dd"} valueFormat={"yyyy/MM/dd"} disabledDate={disabledDate} on:change={changeTime}/>
  <p class='desc'>datePicker 日期范围选择</p>
  <BeDatePicker selectMode={"daterange"} value={['2022-03-01','2022-03-03']} format={"yyyy-MM-dd"} valueFormat={"yyyy/MM/dd"} disabledDate={disabledDate}/>
  <p class='desc'>datePicker 日期时间选择</p>
  <BeDatePicker value={''} selectMode={"datetime"} format={"yyyy-MM-dd HH:mm"} on:change={changeTime}/>
  <p class='desc'>datePicker 月份选择</p>
  <BeDatePicker value={'2021-12'} selectMode={"month"} format={"yyyy-MM"}/>
  <p class='desc'>datePicker 月份范围选择</p>
  <BeDatePicker selectMode={"monthrange"} format={"yyyy-MM"} on:change={changeTime}/>
  <p class='desc'>datePicker 年份选择</p>
  <BeDatePicker value={'2021'} selectMode={"year"} format={"yyyy"} />
  <p class='desc'>timePicker 时间选择</p>
  <BeTimePicker value='' format={"HH:mm"} {selectableRange} on:change={changeTime}/>
</div>
