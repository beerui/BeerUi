<script lang="ts">
  import {BeScrollbar} from '$lib'
  let item = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
</script>
<svelte:head>
  <title>Scrollbar 滚动条 组件文档 BeerUi-官方文档</title>
  <meta name="description" content="BeerUi, 基于 svelte 的 PC端 组件库，base on svelte 3.0 web component">
  <meta name="keywords" content="Scrollbar 滚动条, beerui组件文档,beerui,beerui文档,beerui官网, BeerUi,@brewer/beerui,svelte,component,svelteKit">
</svelte:head>
<div class="page-container content">
  <h2>Scrollbar 滚动条</h2>
	<p>这是滚动条</p>
	<h3>基本用法</h3>
  <div  class="demo-block ">
    <BeScrollbar>
      <ul class="scrollbar-container">
        {#each item as item,i }
        <div>这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的这是测试scrollbar的</div>
        {/each}
        </ul>
    </BeScrollbar>
  </div>

</div>

<style lang="scss">
  .scrollbar-container{
    height: 500px;
  }
</style>
