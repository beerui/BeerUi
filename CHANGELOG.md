# BeerUi 

## @brewer/beerui@1.0.31 `2022/6/13`

### Patch Changes

- 新增 Add `Repl` 增加在线运行示例

- 更改 Change `BeIcon` 改用字体文件引入图标

- 修复 Fixed `BeForm`组件 样式问题

> 此版本应是`1.0`最后一个版本,下一个版本会开启`1.1`版本。版本日志将改为`/logs/1.0`

#### 版本升级展望
1. 在`1.1`中将会把`css`和`js`分开，用户需要分别引入
2. 按需引入`js`和`css`
3. 完善主题色
4. 重写`BeTable`
5. 完善表单验证
6. 增加业务组件

## @brewer/beerui@1.0.30-next.56 `2022/6/3`

### Patch Changes

- 新增 Add `BeForm` 增加表单验证
- 新增 Add `SelectTree` 增加懒加载示例
- 新增 Add `BeSelect` 增加多选
- 新增 Add `CountTo` 接入用户传入属性

- 修复 Fixed `BeCascader`组件 接收默认值错误修改 统一loading图标 清空的时候 未触发change cascader取值、赋值问题
- 修复 Fixed `BeSelect`组件 用户传入value=0 不能回显
- 修复 Fixed `BeTabs` remove overflow
- 修复 Fixed `BeRadio` remove margin-right
 
## @brewer/beerui@1.0.30-next.49 `2022/5/12`

### Patch Changes

- 新增 Add `SelectTree` 增加懒加载示例
- 新增 Add `BeTextarea` 增加多行文本框
- 新增 Add `BeSwitch` 增加切换前的回调
- 新增 Add `BeCascader` 增加懒加载


- 修复 Fixed `BeCascader`组件 动态加载第一次数据不出现的问题
- 修复 Fixed `BeSelectTree`组件 增加懒加载和`BeTree`的组件传值
- 修复 Fixed `BeSelect`组件 数据过多时 没有滚动条的问题 现在可以设置滚动高度
- 修复 Fixed `BePagination` 输入页码 跳转判断错误的问题
- 修复 Fixed `BeTabs` 初始化选中效果位置不正确


## @brewer/beerui@1.0.30-next.46 `2022/5/9`

### Patch Changes

- 新增 Add `BeCarousel` 增加滑动切换
- 新增 Add `BeIcon` 增加点击复制名称


- 修改 Change `BeButton` 样式统一


- 修复 Fixed `BeInput`组件 自定义class会覆盖原有class
- 修复 Fixed `BeSelectTree`组件 初始化不赋值
- 修复 Fixed `BeSelect`组件 在异步加载值和option的时候 未设置值
- 修复 Fixed `BeUpload` 异步设置limit时 设置hideUpload=true的情况下 新增按钮不隐藏
- 修复 Fixed `BeCascader` 定位滚动的问题
- 修复 Fixed `BeDrawer` 删除不必要的dispatch


## @brewer/beerui@1.0.30-next.32 `2022/4/1`

### Patch Changes

- 新增 Add `messageBox` 方法 用于轻提示
- 新增 Add `BeTree` filter方法 用于过滤数据
- 新增 Add `BeCollapse` 用于展示数据
- 新增 Add `PreviewImage` 预览 放大 缩小 拖拽


- 修改 Change `Notice` 暴露除`showNotice, closeALlNotice, closeNotice`方法现在更容易使用


- 修复 Fixed `BeButton`组件 增加disabled样式
- 修复 Fixed `BeInput`组件 type传入不生效的问题
- 修复 Fixed `BePagination`组件 已知问题
- 修复 Fixed `BeUpload` showFileList
- 修复 Fixed `BeDatePicker` 上下方向的自适应
- 修复 Fixed `BeTree` 下级选框展开未选中的问题


## @brewer/beerui@1.0.30-next.21 `2022/3/28`

### Patch Changes

- 新增 `Drawer` 组件


- 修复 `menu`组件 已知问题
- 修复 `pagination`组件 已知问题

## @brewer/beerui@1.0.30-next.19 `2022/3/25`

### Patch Changes

- 新增 `table` 组件 align/headeralign center/left/right
- 新增 `upload` 组件 hideUpload 超出限制后，隐藏上传框


- 修复 `table`组件 indexMethod 不刷新问题
- 修复 `select`组件 已知问题
- 修复 `menu`组件 已知问题
- 修复 `upload`组件 已知问题

## @brewer/beerui@1.0.30-next.11 `2022/3/18`

### Patch Changes

- 新增 `Cascader` 组件
- 新增 `Notice` 组件 `Type` 可以根据状态进行弹框提示
- 新增 `Notice` 组件 `toast` 可以居中轻提示


- 修复 `select`组件 已知问题
- 修复 `menu`组件 已知问题
- 修复 `upload`组件 已知问题
- 修复 `table`组件 `selection` 的传入用户自定 `id`的问题


## 1.0.0-next.28 `2022/3/9`

### Patch Changes

- 优化 `menu`组件


- 修复 `uploader`组件 样式打包问题
- 其它 因为现阶段改动频繁 修改发布包的版本号

## 1.0.19 `2022/3/5`

### Patch Changes

- 新增 `radio`组件
- 新增 `table`组件 `prop=index` 序号
- 新增 `button`组件 `focus` 的状态样式
- 新增 `table`组件 浏览器宽度改变后的监听 `onresize`
- 重写 `menu`组件 使用类来维护一个`menu` `key`待优化
- 重写 `select`组件 使用类来维护一个`select` 级联多选待增加


- 修复 `datePicker`组件 已知问题
- 修复 `menu`组件 已知问题
- 修复 `select`组件 已知问题

## 1.0.14 `2022/2/28`


### Patch Changes

- 新增 `upload`组件


- 修复 `datePicker`组件 已知问题
- 修改 `button`组件 已知问题
- 修改 `menu`组件 已知问题
- 修改 `select`组件 已知问题

## 1.0.8

### Patch Changes

- 新增 `table`组件 selection
- 新增 `datePicker`组件 `timePicker` 时间选择
- 新增 `datePicker`组件 时间禁用 文档待完善
- 新增 `menu`组件 竖向/图标


- 修改 `tree`组件 已知问题
- 修改 `menu`组件 已知问题

## 1.0.3

- 更新`svelte`版本
- 更新`@sveltejs/kit`版本

### Patch Changes

- 更新`svelte`版本 `- svelte 3.46.2` `+ svelte 3.46.4`
- 更新`@sveltejs/kit`版本`- @sveltejs/kit 1.0.0-next.216` `+ @sveltejs/kit 1.0.0-next.260`


- 新增 `table`组件
- 新增 `tree`组件
- 新增 `loading`组件
- 新增 `empty`组件
- 新增 `breadcrumb`组件
- 新增 `menu`组件
- 新增 `checkbox`组件

