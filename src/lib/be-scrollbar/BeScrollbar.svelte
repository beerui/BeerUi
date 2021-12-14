<script lang="ts">
  /**
   * this is scrollbar component
   * 目前仅支持谷歌浏览器
  */
 export let hidden:boolean = false
 let scrollbar
//  检测鼠标是否在dom上
 function mousemove():void {
  // scrollbar.style.overflow = "auto"
   console.log('ssss', scrollbar.style.overflow)
 }
 function mouseleave(){
  // scrollbar.style.overflow = "visible"
 }
</script>

<div class="be-scrollbar">
  <div class="be-scrollbar-content" on:mousemove={()=>{mousemove()}}  bind:this = {scrollbar} on:mouseleave={()=>{mouseleave()}}>
    <slot></slot>
  </div>
</div>

<style lang="scss">
  @import '../assets/scss/modules/scrollbar';
</style>