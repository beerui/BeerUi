# BeerUi 

> 1.0的日志参阅 [v1.0](./logs/v1.0.md)

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
