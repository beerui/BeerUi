<script lang="ts">
	import { BeButton } from '$lib';
  import { BeDatePicker } from '$lib';
  import { BeTimePicker } from '$lib';
  import DemoBlock from '$lib/demo/DemoBlock.svelte';
  let value = ''
  let value0 = ''
  let value1 = ''
  let value2 = ''
  let value3 = ''
  let value4 = ''
  let value5 = ''
  let value6 = ''
  let value7 = ''
  let value8 = ''
  let value9 = ''
  let selectableRange = '18:30:00 - 20:30:00'
    
  function changeTime(value) {
    console.log(value)
  }
  const disabledDate = (time) => {
    return time.getTime() > Date.now()
  }
</script>
<div class='page-container'>
  <h3>TODO:</h3>
  <li>增加时间日期范围选择</li>
  <li>增加年份范围选择</li>
  <li>增加多选日期功能</li>
  <li>是否需要周选择器?</li>
  <h2>DatePicker 日期选择器</h2>
  <span>用于选择或输入日期</span>
  <h3>选择日</h3>
  <p class='desc'>以「日」为基本单位，基础的日期选择控件</p>
  <DemoBlock code={`
    <div class="flex column align-center">
      <span class="demonstration">默认</span>
      <BeDatePicker bind:value={value} placeholder='选择日期' selectMode="date" />
    </div>
    <div class="flex column align-center">
      <span class="demonstration">无清除按钮</span>
      <BeDatePicker bind:value={value0} placeholder='选择日期' clearable={false} selectMode="date" />
    </div>
    <div class="flex column align-center">
      <span class="demonstration">禁用日期</span>
      <BeDatePicker bind:value={value1} placeholder='选择日期' {disabledDate} clearable={false} selectMode="date" />
    </div>
    `}
    js={`
    import { BeDatePicker } from '@brewer/beerui'
    let value = ''
    let value0 = ''
    let value1 = ''
    const disabledDate = (time) => {
      return time.getTime() > Date.now()
    }`
    }>
      <div slot='source'>
        <div class="flex justify-around">
          <div class="flex column align-center">
            <span class="demonstration">默认</span>
            <BeDatePicker bind:value={value} placeholder='选择日期' selectMode="date" />            
          </div>
          <div class="flex column align-center">
            <span class="demonstration">无清除按钮</span>
            <BeDatePicker bind:value={value0} placeholder='选择日期' clearable={false} selectMode="date" />
          </div>
          <div class="flex column align-center">
            <span class="demonstration">禁用日期</span>
            <BeDatePicker bind:value={value1} placeholder='选择日期' {disabledDate} selectMode="date" />
          </div>
        </div>
      </div>
      <div slot='description'>
        基本单位由selectMode属性指定，通过clearable指定是否需要清除安按钮，disabledDate设置日期的禁用状态
      </div>
  </DemoBlock>
  <h3>其他日期单位</h3>
  <p class='desc'>通过扩展基础的日期选择，可以选择日期时间、月、年</p>
  <DemoBlock code={`
    <div class="flex column align-center">
      <span class="demonstration">日期时间</span>
      <BeDatePicker bind:value={value2} placeholder='选择日期时间' selectMode="datetime" />
    </div>
    <div class="flex column align-center">
      <span class="demonstration">月</span>
      <BeDatePicker bind:value={value3} placeholder='选择月' selectMode="month" />
    </div>
    <div class="flex column align-center">
      <span class="demonstration">月</span>
      <BeDatePicker bind:value={value4} placeholder='选择年' selectMode="year" />
    </div>
    `}
    js={`
    import { BeDatePicker } from '@brewer/beerui'
    let value2 = ''
    let value3 = ''
    let value4 = ''`
    }>
      <div slot='source'>
        <div class="flex justify-around">
          <div class="flex column align-center">
            <span class="demonstration">日期时间</span>
            <BeDatePicker bind:value={value2} placeholder='选择日期时间' selectMode="datetime" />
          </div>
          <div class="flex column align-center">
            <span class="demonstration">月</span>
            <BeDatePicker bind:value={value3} placeholder='选择月' selectMode="month" />
          </div>
          <div class="flex column align-center">
            <span class="demonstration">年</span>
            <BeDatePicker bind:value={value4} placeholder='选择年' selectMode="year" />
          </div>
        </div>
      </div>
  </DemoBlock>
  <h3>选择日期范围</h3>
  <p class='desc'>可在一个选择器中便捷地选择一个时间范围</p>
  <DemoBlock code={`
    <div class="flex column align-center">
      <span class="demonstration">默认</span>
      <BeDatePicker bind:value={value5} selectMode="daterange"  />
    </div>
    <div class="flex column align-center">
      <span class="demonstration">月份范围</span>
      <BeDatePicker bind:value={value6} selectMode="monthrange"  />
    </div>
    `}
    js={`
    import { BeDatePicker } from '@brewer/beerui'
    let value5 = ''
    let value6 = ''`
    }>
      <div slot='source'>
        <div class="flex justify-around">
          <div class="flex column align-center">
            <span class="demonstration">默认</span>
            <BeDatePicker bind:value={value5} selectMode="daterange"  />
          </div>
          <div class="flex column align-center">
            <span class="demonstration">月份范围</span>
            <BeDatePicker bind:value={value6} selectMode="monthrange"  />
          </div>
        </div>
      </div>
  </DemoBlock>
  <h3>时间选择</h3>
  <p class='desc'>可在一个选择器中便捷地选择一个时间</p>
  <DemoBlock code={`
     <div class="flex column align-center">
      <span class="demonstration">默认</span>
      <BeTimePicker bind:value={value7}/>
    </div>
    <div class="flex column align-center">
      <span class="demonstration">显示时分</span>
      <BeTimePicker bind:value={value8}  format="HH:mm" />
    </div>
    <div class="flex column align-center">
      <span class="demonstration">禁用选项</span>
      <BeTimePicker bind:value={value9} {selectableRange} />
    </div>
    `}
    js={`
    import { BeTimePicker } from '@brewer/beerui'
    let value7 = ''
    let value8 = ''
    let value9 = ''
    const selectableRange = '18:30:00 - 20:30:00'`
    }>
      <div slot='source'>
        <div class="flex justify-around">
          <div class="flex column align-center">
            <span class="demonstration">默认</span>
            <BeTimePicker bind:value={value7}/>
          </div>
          <div class="flex column align-center">
            <span class="demonstration">显示时分</span>
            <BeTimePicker bind:value={value8}  format="HH:mm" />
          </div>
          <div class="flex column align-center">
            <span class="demonstration">禁用选项</span>
            <BeTimePicker bind:value={value9} {selectableRange} />
          </div>
        </div>
      </div>
      <div slot='description'>
        可通过format指定显示时间,通过selectableRange设置禁用范围
      </div>
  </DemoBlock>
</div>

<style lang="scss">
  .flex {
    display: flex;
  }
  .column {
    flex-direction: column;
  }
  .align-center {
    align-items: center;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
   
  }
  .justify-around {
    justify-content: space-around;
  }
</style>