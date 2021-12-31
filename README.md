## BeerUi
> This is a Svelte Ui Components

## Important 必看
> 本项目的状态为开发中，不保证结构不变动，谨慎使用！

## 你需要知道的
- 使用 `pnpm`
- 使用 `Tailwind CSS`
- 使用 `Node 16+`
- 使用 `SCSS`
- 使用 `be-icon` `be-button` 命名方式

## 怎样使用
svelte & svelte-kit

- `npm i @beerui/beerui -D`
- `npm i sass -D`

[toc]

****

## 组件开发状态
- [x] <a href="Button">Button 按钮</a>
  - [ ] 按钮组 
- [x] Dialog 弹框
    - [ ] 关闭回调
- [x] Pagination 分页
- [x] Alert 提示
- [x] DatePicker 时间选择框
    - [ ] 时分秒
- [x] Select 下拉选择
- [x] Tabs 切换
- [x] Input 输入框
- [x] Clock 倒计时
- [x] Scrollbar 滚动条
- [ ] Upload 拖拽上传
- [ ] Carousel 轮播图
- [x] PreviewImage 图片预览
- [ ] 拖拽上传

### <a id="Button">Button 按钮</a>

```html
<BeButton size="normal" round='circle' type="primary"></BeButton>
```


| 参数    | 说明    | 类型     | 可选值                                          | 默认值   |
|-------|-------|--------|:---------------------------------------------|-------|
| size  | 尺寸    | string | large medium normal small mini               | -     |
| type  | 类型    | string | default primary success info warning danger  | -     |
| round | 圆角    | string | circle lg md mini                            | -     |


### Dialog 弹框

```javascript
import { BeButton, BeDialog } from '$lib';
let visible = false
let openDialog = () => {
	visible = true
}
const beforeClose = (evt) => {
	console.log(evt.detail)
}
```
```sveltehtml
<BeDialog bind:visible={visible} closeOnClickModal='false' on:beforeClose={beforeClose}>
	<p>这里是对话框内容</p>
</BeDialog>
```

| 参数                | 说明                      | 类型      | 可选值 | 默认值   |
|-------------------|-------------------------|---------|:----|-------|
| visible           | 是否显示 Dialog             | boolean | -   | false |
| title             | 标题                      | string  | -   | 提示    |
| mask              | 是否展示mask                | boolean | -   | true  |
| closeOnClickModal | 是否可以通过点击 mask 关闭 Dialog | boolean | -   | false |

#### Events

| 参数          | 说明           | 回调参数 |
|-------------|--------------|------|
| beforeClose | Dialog 关闭的回调 | -    |

### DatePicker 组件

```html
  <BeDatePicker value='2021-10-11' selectMode="day" format="yyyy-MM-dd"/>
```


| 参数         | 说明   | 类型     | 可选值            | 默认值        |
|------------|------|--------|:---------------|------------|
| value      | 默认值  | string | -              | -          |
| selectMode | 选择类型 | string | day month year | day        |
| format     | 日期格式 | string | 见日期格式          | yyyy-MM-dd |


### Switch 开关

```html
  <BeSwitch bind:checked={true} activeColor="#fff000" inactiveColor="#fff000" disabled={false}/>
```

| 参数            | 说明             | 类型      | 可选值 | 默认值     |
|---------------|----------------|---------|:----|---------|
| checked       | 是否选中           | boolean | -   | -       |
| activeColor   | switch 打开时的背景色 | string  | -   | #1492FF |
| inactiveColor | switch 关闭时的背景色 | string  | -   | #dcdfe6 |
| disabled      | 是否禁用           | boolean | -   | false   |

#### Events

| 参数     | 说明                  | 回调参数   |
|--------|---------------------|--------|
| change | Switch 状态发生变化时的回调函数 | 	新状态的值 |
