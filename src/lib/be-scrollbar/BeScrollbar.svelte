<script lang="ts">
  /**
   * this is scrollbar component
   * 
  */
  import {onMount } from 'svelte'
//  export let hidden:boolean = false
  let scrollbar
  let scrollbarThumb
  let scrollbarWrap
  let rate
  onMount(()=>{
    // $:console.log('ssss',scrollbarWrap.scrollTop())
    rate  = scrollbarWrap.clientHeight / scrollbarWrap.scrollHeight
    console.log(scrollbarWrap.scrollHeight)
    if(rate<1){
      var barHeight = rate * scrollbarWrap.clientHeight;
    scrollbarThumb.style.height = barHeight + 'px'
    }else{
      scrollbarThumb.style.display = 'none'
    }
  })
//  检测鼠标是否在dom上
 function mousemove():void {
  // scrollbar.style.overflow = "auto"
  // scrollbar = document.getElementById("scrollbar")
   scrollbar.style.opacity = 1
   scrollbar.style.transitionProperty = 'opacity'
   scrollbar.style.transitionDuration = '0.34s'
   scrollbar.style.transitionTimingFunction = 'ease-out'
 }
 function mouseleave(){
  scrollbar.style.opacity = 0
  scrollbar.style.transitionProperty = 'opacity'
  scrollbar.style.transitionDuration = '0.12s'
  scrollbar.style.transitionTimingFunction = 'ease-out'
  // scrollbar.style.overflow = "visible"
 }
//  监听内容的滚动高度


 function onScrollbarWrapScroll(e){
  let translateYHeight = e.target.scrollTop * rate
  // scrollbarThumb.style.transform = `translateY(${ translateYHeight + 'px' })`
  // console.log(scrollbarWrap.childNodes)
  scrollbarThumb.style.top = translateYHeight + 'px'

 }
</script>

<div class="be-scrollbar" on:mouseleave={()=>{mouseleave()}} on:mousemove={()=>{mousemove()}}>
  <div class="page-component__nav be-scrollbar__wrap" style="margin-bottom: -17px; margin-right: -17px;"  on:scroll={(e)=>onScrollbarWrapScroll(e)} bind:this={scrollbarWrap}>
    <div class="be-scrollbar__view" >
      <slot></slot>
    </div>
    <div class="be-scrollbar__bar is-vertical" id="scrollbar" bind:this = {scrollbar}>
      <div class="be-scrollbar__thumb" bind:this = {scrollbarThumb}></div>
    </div>
  </div>
</div>

<style lang="scss">
  @import '../assets/scss/modules/scrollbar';
</style>