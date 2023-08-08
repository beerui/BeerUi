<script lang="ts">
  import {onMount } from 'svelte'
  let beScroll
  let scrollContent;
  let thumb = 0
  let maxToTop = 0
  let top = 0
  let drag = false
  let moveTop = null
  let rate = 0
  let boxToTop = 0
  $:thumbH = thumb + "px";
  $:thumbTop = top + "px";
  onMount(()=>{
    boxToTop = beScroll.offsetTop
    initScrollbar()
  })

  function initScrollbar():void {
    let contentClientHeight = scrollContent.clientHeight; // dom 边框高度
    let contentScrollHeight = scrollContent.scrollHeight; // 实际内容高度

    rate = contentClientHeight / contentScrollHeight;

    if(rate < 1) {
      thumb = rate * contentClientHeight;
      maxToTop = contentClientHeight - thumb;
      scrollContent.addEventListener('scroll', onScroll)
      window.addEventListener("mouseup", mouseup);
      window.addEventListener("mousemove",mousemove);
    }

  }

  // 监听滚动
  function onScroll(){
    top = scrollContent.scrollTop * rate // 计算滚动条所在高度
  }

  //  检测鼠标是否在dom上
  function mousemove(e):void {
    if(drag) {
      if(moveTop) {
        let speed = e.clientY - boxToTop - moveTop
        let topHeight = top + speed
        scrollThumb(topHeight)
      }
      moveTop= e.clientY - boxToTop;
      e.preventDefault()
    }
  }
  function scrollThumb(topHeight){
      // console.log('top:',topHeight,'maxToTop:',maxToTop);
      if(topHeight < 0) {
        topHeight=0;
      }else if(topHeight > maxToTop) {
        topHeight = maxToTop;
      }
      top = topHeight;
      scrollContent.scrollTop = top / rate;
  }

  function mouseleave():void{

  }

  function mousedown():void{
    drag = true;
    moveTop = null
  }

  function mouseup():void{
    drag = false
  }
</script>

<div class="be-scroll" bind:this={beScroll}>
  <div class="be-scroll-box" bind:this={scrollContent}>
    <slot></slot>
  </div>
  {#if rate < 1}
  <div class="be-scroll-thumb">
    <div role='button' tabindex='-1' class="be-scroll-bar" style={`height:${thumbH};top:${thumbTop};`} on:mousedown={mousedown} on:mouseup={mouseup}></div>
  </div>
  {/if}
</div>
