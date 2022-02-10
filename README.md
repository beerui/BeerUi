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

### Concat Us `beerui2021@gmail.com`

****

## 组件开发状态
- [x] <a href="#Button">Button 按钮</a>
  - [ ] 按钮组 
- [x] <a href="#Dialog">Dialog 弹框</a>
    - [ ] 关闭回调
- [x] <a href="#Pagination">Pagination 分页</a>
- [x] <a href="#Alert">Alert 提示</a>
- [x] <a href="#DatePicker">DatePicker 时间选择框</a>
    - [ ] 范围选择
    - [ ] 时分秒
- [x] <a href="#Select">Select 下拉选择</a>
- [x] <a href="#Switch">Switch 切换</a>
- [x] <a href="#Tabs">Tabs 切换</a>
- [x] <a href="#Input">Input 输入框</a>
- [x] <a href="#Clock">Clock 倒计时</a>
- [x] <a href="#Scrollbar">Scrollbar 滚动条</a>
- [x] <a href="#Progress">Progress 进度条</a>
- [ ] <a href="#Upload">Upload 拖拽上传</a>
- [ ] <a href="#Carousel">Carousel 轮播图</a>
- [x] <a href="#PreviewImage">PreviewImage 图片预览</a>
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


### <a id="#Dialog">Dialog 弹框</a>

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

### <a id="#DatePicker">DatePicker 组件</a>

```html
  <BeDatePicker value='2021-10-11' selectMode="day" format="yyyy-MM-dd"/>
```


| 参数         | 说明   | 类型     | 可选值            | 默认值        |
|------------|------|--------|:---------------|------------|
| value      | 默认值  | string | -              | -          |
| selectMode | 选择类型 | string | day month year | day        |
| format     | 日期格式 | string | 见日期格式          | yyyy-MM-dd |

### <a id="#Pagination">Pagination 分页</a>

```javascript
import { BePagination } from '$lib';
const options = {
	card: true,
	showNumber: 6,
	icon: {
		width: 12,
		height: 12,
		color: '#1492FF'
	}
}
const query = { limit: 11, name: "", page: 1 }
let list = []
let total = 11

function changePage(item) {
	query.page = Number(item.detail)
	feedBackList()
}
```
```sveltehtml
<BePagination currentPage=1 pageSize={query.limit} {total} async layouts="prev, pager, next" on:changePage={changePage} {options} />
```

| 参数                 | 说明            | 类型      | 可选值         | 默认值                                       |
|--------------------|---------------|---------|:------------|-------------------------------------------|
| total              | 总条数           | number  | -           | -                                         |
| type               | 类别            | string  | mini/normal | normal                                    |
| currentPage        | 当前页           | number  | -           | 1                                         |
| pageSize           | 显示条数          | number  | -           | 15                                        |
| layouts            | 最大页码按钮数       | string  | -           | 'prev, pager, next'                       |
| async              | 后续是否更新        | boolean | -           | false                                     |
| options            | 其它参数          | object  | -           | -                                         |
| options.card       | 是否是块状         | boolean | -           | false                                     |
| options.showNumber | 页码显示数量        | number  | -           | false                                     |
| options.scroll     | 是否需要自动滚动到头部   | boolean | -           | true                                      |
| options.icon       | 上一页 下一页的大小和颜色 | object  | -           | `{width: 12,height: 12,color: '#323232'}` |

### <a id="#Switch">Switch 开关</a>

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


### <a id="#PreviewImage">PreviewImage 图片预览</a>

```javascript
import { previewImages } from '$lib/utils/beerui';
const src = '/images/1.jpg'
const list = ['/images/1.jpg', '/images/2.jpg', '/images/3.jpg', '/images/4.jpg', '/images/5.jpg', '/images/6.jpg']
const clickImage = (src: string) => {
    const p1 = previewImages(src, list)
    // console.log(p1.current); // 获取元素状态
    // console.log(p1.index); // 获取当前点击的元素索引
    // 调用方法 监听图片的改变
    p1.watchHandle(res => console.log(res))
    // 初始化时调用监听
    // previewImages(src, list, res => console.log(res))
}
```
```html
<h3>预览多图</h3>
<div class='demo-list'>
	{#each list as item}
	<img class='demo-list-image' on:click={() => {clickImage(item)}} src={item} alt=''>
	{/each}
</div>
<h3>预览一张图</h3>
<div class='demo-list'>
	<img class='demo-list-image' on:click={() => {previewImages('/images/7.jpg')}} src='/images/7.jpg' alt=''>
</div>
```

| 参数   | 说明      | 类型     | 可选值 | 默认值 |
|------|---------|--------|:----|-----|
| src  | 选中的图片   | string | -   | -   |
| list | 预览的图片数组 | string | -   | []  |

#### Events

| 参数          | 说明           | 回调参数   |
|-------------|--------------|--------|
| watchHandle | 状态发生变化时的回调函数 | 	新状态的值 |
