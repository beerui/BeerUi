<script lang="ts">
	import { filterClass } from '$lib/utils/beerui';
  import { onMount } from 'svelte';
  import BeIcon from '$lib/be-icon/BeIcon.svelte';

  const preClass = ['direction', 'type']
  const _class = ['be-carousel', ...filterClass($$props, 'be-carousel--', preClass)].join(' ')
	export {_class as class};

  export let direction:string = 'horizontal' // 走马灯展示的方向 vertical
  export let loop:boolean = true // 是否循环显示
  export let type:string = '' // 走马灯的类型 ''/none/card
  export let arrow:string = 'hover' // 切换箭头的显示时机 always/hover/never
  export let indicatorPosition:string = 'none' // 指示器的位置 outside/none
  export let interval:number = 3000 // 自动切换的时间间隔，单位为毫秒
  export let autoplay:boolean = true // 是否自动切换 true/false
  export let trigger:string = 'click' // 指示器的触发方式 click/hover
  export let initialIndex:number = 0 // 初始状态激活的幻灯片的索引，从 0 开始
	export let height:string = '' // 走马灯的高度 300px

	// 按钮显示和事件触发
	let arrowDisplay = 'none'
	let isHover = false

	if (arrow === 'hover') isHover = true
	if (arrow === 'always') arrowDisplay = 'block'
  const leaveCarousel = () => isHover ? arrowDisplay = 'none' : '';
  const enterCarousel = () => isHover ? arrowDisplay = 'block' : '';

  // 切换动画定义
  const translateType = direction === 'vertical' ? 'translateY' : 'translateX';
  let element = null;
  let timer = null;
  let list = []
  let len = 0
  let inStage = false
	const transX = []
  const CARD_SCALE = 0.83;

  onMount(() => {
	  list = element.querySelectorAll('.be-carousel__item')
		if (list.length === 0) throw new Error('Carousel Must Have Child Elements!')
	  len = list.length
	  changeCarousel()
	})

  const processIndex = (index) => {
	  if (initialIndex === 0 && index === len - 1) {
		  return -1;
	  } else if (initialIndex === len - 1 && index === 0) {
		  return len;
	  } else if (index < initialIndex - 1 && initialIndex - index >= len / 2) {
		  return len + 1;
	  } else if (index > initialIndex + 1 && index - initialIndex >= len / 2) {
		  return -2;
	  }
	  return index;
  }
  const calcTranslate = (index) => {
	  const distance = element[direction === 'vertical' ? 'offsetHeight' : 'offsetWidth'];
	  return distance * (index - initialIndex);
  }
  const calcCardTranslate = (index) => {
	  const parentWidth = element.offsetWidth;
	  if (inStage) {
		  return parentWidth * ((2 - CARD_SCALE) * (index - initialIndex) + 1) / 4;
	  } else if (index < initialIndex) {
		  return -(1 + CARD_SCALE) * parentWidth / 4;
	  } else {
		  return (3 + CARD_SCALE) * parentWidth / 4;
	  }
  }
	// 自动播放
	const autoplayHandle = () => {
	  timer = setTimeout(() => {
			initialIndex++
			if (initialIndex >= list.length) initialIndex = 0
			changeCarousel()
		}, interval)
	}
	// 切换轮播
	const changeCarousel = () => {
	  console.log('initialIndex', initialIndex);
	  if (timer) clearTimeout(timer);
	  if (autoplay) autoplayHandle()
	  list.forEach((el, index) => {
				if (type === 'none') {
					index !== initialIndex ? el.style.display = 'none' : el.style.display = 'block';
				} else if (type === 'card') {
					if (direction === 'vertical') {
						console.warn('[Beerui Warn][Carousel]vertical direction is not supported in card mode');
					}
					inStage = Math.round(Math.abs(index - initialIndex)) <= 1;
					let active = index === initialIndex;
					let transX = calcCardTranslate(index);
					let scale = active ? 1 : CARD_SCALE;
					console.log(transX, scale);
					el.style = `transform: ${translateType}(${transX}px) scale(${scale});z-index: ${inStage ? 2 : 1}`
				} else {
					let _index = index
					if (index !== initialIndex && len > 2 && loop) {
						_index = processIndex(index);
					}
					let transX = calcTranslate(_index)
					el.style.transform = `${translateType}(${transX}px) scale(1)`
				}
		})
	}
	// 执行上一张
	const doPrevHandle = () => {
	  initialIndex--
		if (initialIndex < 0) initialIndex = list.length - 1
	  changeCarousel()
	}
	// 执行下一张
	const doNextHandle = () => {
	  initialIndex++
	  if (initialIndex >= list.length) initialIndex = 0
	  changeCarousel()
	}
	// 点击索引点
	const doIndicatorHandle = (i) => {
	  initialIndex = i
	  changeCarousel()
	}
  // 鼠标移入索引点
	const doIndicatorHoverHandle = (i) => {
	  if (trigger === 'hover') {
			initialIndex = i
			changeCarousel()
		}
	}
</script>
<div class={_class} on:mouseenter={enterCarousel} on:mouseleave={leaveCarousel} bind:this={element}>
	<div class='be-carousel__container' style:height>
		<button type="button" on:click={doPrevHandle} class="be-carousel__arrow be-carousel__arrow--left" style:display={arrowDisplay}><BeIcon width='35' height='22' name='chevron-left' /></button>
		<button type="button" on:click={doNextHandle} class="be-carousel__arrow be-carousel__arrow--right" style:display={arrowDisplay}><BeIcon width='35' height='22' name='chevron-right' /></button>
		<slot></slot>
	</div>
	<ul class="be-carousel__indicators be-carousel__indicators--horizontal">
		{#each list as item, i}
		<li
			class="be-carousel__indicator be-carousel__indicator--horizontal"
			class:active={i === initialIndex}
			on:click={() => { doIndicatorHandle(i) }}
			on:mouseenter={() => { doIndicatorHandle(i)}}
		>
			<button class="be-carousel__button"></button>
		</li>
		{/each}
	</ul>
</div>
