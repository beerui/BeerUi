### DatePicker 组件

```html
  <BeDatePicker value='2021-10-11' selectMode="day" format="yyyy-MM-dd"/>
```


| 参数    | 说明    | 类型     | 可选值                                          | 默认值   |
|-------|-------|--------|:---------------------------------------------|-------|
| value  | 默认值    | string | - | -     |
| selectMode  | 选择类型    | string | day month year  | day     |
| format | 日期格式    | string | 见日期格式  | yyyy-MM-dd     |


### Switch 开关

```html
  <BeSwitch bind:checked={true} activeColor="#fff000" inactiveColor="#fff000" disabled={false}/>
```

| 参数                | 说明                      | 类型      | 可选值 | 默认值   |
|-------------------|-------------------------|---------|:----|-------|
| checked           | 是否选中            | boolean | -   | - |
| activeColor             | switch 打开时的背景色                      | string  | -   | #1492FF    |
| inactiveColor              | switch 关闭时的背景色                | string | -   | #dcdfe6  |
| disabled              | 是否禁用                | boolean | -   | false  |

#### Events

| 参数          | 说明           | 回调参数 |
|-------------|--------------|------|
| change | Switch 状态发生变化时的回调函数 | 	新状态的值    |
