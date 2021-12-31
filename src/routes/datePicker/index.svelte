<script lang="ts">
  import { BeDatePicker } from '$lib';

</script>
<div class='page-container'>
  <h2>datePicker组件</h2>
  <h3>基本用法</h3>
  <p class='desc'>datePicker 日期选择</p>
  <BeDatePicker value={'2021-10-11'} selectMode={"day"} format={"yyyy-MM-dd"}/>
  <p class='desc'>datePicker 月份选择</p>
  <BeDatePicker value={'2021-10'} selectMode={"month"} format={"yyyy-MM"}/>
  <p class='desc'>datePicker 年份选择</p>
  <BeDatePicker value={'2021'} selectMode={"year"} format={"yyyy"}/>
</div>
