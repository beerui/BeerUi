<script lang="ts">
  import {BeScrollbar} from '$lib'
  let item = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
</script>
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
