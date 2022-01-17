<script lang="ts">
	import { filterClass } from '$lib/utils/beerui';

  const preClass = ['direction']
  const _class = ['be-carousel', ...filterClass($$props, 'be-carousel--', preClass)].join(' ')
	export {_class as class};

  export let direction:string = 'horizontal' // 走马灯展示的方向 vertical
  export let loop:boolean = true // 是否循环显示
  export let arrow:string = 'hover' // 切换箭头的显示时机 always/hover/never
  export let indicatorPosition:string = 'none' // 指示器的位置 outside/none
  export let interval:number = 3000 // 自动切换的时间间隔，单位为毫秒
  export let autoplay:boolean = true // 是否自动切换 true/false
  export let trigger:string = 'click' // 指示器的触发方式 click/hover
  export let initialIndex:number = 0 // 初始状态激活的幻灯片的索引，从 0 开始
	export let height:string = '' // 走马灯的高度 300px

	let display = 'none'

	$:if (arrow === 'always') {
		display = 'block'
	}
	console.log($$props);
</script>
<div class={_class}>
	<div class='be-carousel__container'>
		<button type="button" class="be-carousel__arrow be-carousel__arrow--left" style:display><i class="be-icon-arrow-left"></i></button>
		<button type="button" class="be-carousel__arrow be-carousel__arrow--right" style:display><i class="be-icon-arrow-right"></i></button>
		<slot></slot>
	</div>
	<ul class="be-carousel__indicators be-carousel__indicators--horizontal">
		<li class="be-carousel__indicator be-carousel__indicator--horizontal">
			<button class="be-carousel__button"></button>
		</li>
		<li class="be-carousel__indicator be-carousel__indicator--horizontal">
			<button class="be-carousel__button"></button>
		</li>
		<li class="be-carousel__indicator be-carousel__indicator--horizontal is-active">
			<button class="be-carousel__button"></button>
		</li>
		<li class="be-carousel__indicator be-carousel__indicator--horizontal">
			<button class="be-carousel__button"></button>
		</li>
	</ul>
</div>
<style lang='scss'>

</style>
