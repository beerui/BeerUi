# BeerUi 

> 1.0的日志参阅 [v1.0](./logs/v1.0.md)

----
## @brewer/beerui@1.1.17 `2022/12/15`

### Patch Changes

- 更新 Update 可访问性优化
- 更新 Update 官网样式
- 更新 Update 解决REPL的可访问性报错问题

- 新增 Add `BeOption` slot，现在可自定义样式。 [#22](https://github.com/beerui/BeerUi/issues/22)

----
## @brewer/beerui@1.1.8 `2022/12/15`

### Patch Changes

- 更新 Update SvelteKit正式版
- 更新 Update 依赖更新


- 新增 Add `BeCarousel` `change`事件
- 新增 Add `BeIcon` 事件现在传出
----
## @brewer/beerui@1.1.7 `2022/7/21`

### Patch Changes

- 更新 Update update base package version
- 更新 Update logo
- 更新 Update `Doc update`


- 更改 Change `BeDialog` 可以添加自定义`class`


- 修复 Fixed `BeSelect`组件 多选时触发多次`change`事件
- 修复 Fixed `BeDialog`组件 在messageBox按钮点击时会触发`clickOutSide`的问题
- 修复 Fixed `Notice`组件 type不正确的问题
- 修复 Fixed `BeSelectTree`组件 未使用 props
- 修复 Fixed `BeMenu`组件 计算是否有下级时的代码错误 

----
## @brewer/beerui@1.1.1 `2022/6/13`

### 版本升级说明
- 更改 Change 入口文件不再引入`css` 
  - 安装 `npm i @brewer/beerui -D`
  - 使用 `import { BeButton } from @brewer/beerui`
  - 在入口`javascript`中使用 `import @brewer/beerui/assets/beer.css` 或 `svelteKit`在`layout`中
  ```
  <svelte:head>
     <link rel="stylesheet" href="https://unpkg.com/@brewer/beerui/assets/beer.css" />
  </svelte:head>
  ```
