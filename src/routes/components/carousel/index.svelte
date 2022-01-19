<script>
	import BeCarousel from '$lib/be-carousel/BeCarousel.svelte';
  import BeCarouselItem from '$lib/be-carousel/BeCarouselItem.svelte';
  import DemoBlock from '$lib/demo/DemoBlock.svelte';
  import { previewImages } from '$lib/utils/beerui';
	const items = ['/images/1.jpg', '/images/2.jpg', '/images/3.jpg', '/images/4.jpg', '/images/5.jpg', '/images/6.jpg']
	const handleImageClicked = e => {
		console.log(e.detail)
	}

	let js = `import { BeCarousel, BeCarouselItem } from '@beerui/beerui'`
	let js1 = `import { previewImages } from '@beerui/beerui'`
  let code = `
<BeCarousel>
	{#each items as item, i}
	<BeCarouselItem>
		<div class="w-full h-full carousel-item" style="background: url({item}) center center / cover no-repeat;"></div>
	</BeCarouselItem>
	{/each}
</BeCarousel>
`
	let code1 = `
<BeCarousel autoplay={false} direction='vertical' trigger='hover'>
	{#each items as item, i}
	<BeCarouselItem>
		<div class="w-full h-full carousel-item" style="background: url({item}) center center / cover no-repeat;"></div>
	</BeCarouselItem>
	{/each}
</BeCarousel>
`
	const code2 = `
<BeCarousel height="450px" autoplay={false} direction='horizontal' arrow='always' trigger='hover' type='none'>
	{#each items as item, i}
	<BeCarouselItem>
		<div class="w-full h-full carousel-item" style="background: url({item}) center center / cover no-repeat;"></div>
	</BeCarouselItem>
	{/each}
</BeCarousel>
`
	const code3 = `
<BeCarousel height="450px" direction='horizontal' trigger='click' type='card'>
	{#each items as item, i}
	<BeCarouselItem>
		<div class="w-full h-full carousel-item" style="background: url({item}) center center / cover no-repeat;"></div>
	</BeCarouselItem>
	{/each}
</BeCarousel>
`
	const code4 = `
<BeCarousel autoplay={false}>
	{#each items as item, i}
	<BeCarouselItem {item}>
		<div on:click={() => {previewImages(item, items)}} class="w-full h-full carousel-item" data-thing={thing} style="background: url({item}) center center / cover no-repeat;"></div>
	</BeCarouselItem>
	{/each}
</BeCarousel>
`
</script>
<div class='page-container'>
	<h2>BeCarousel 轮播图</h2>
	<DemoBlock {code} {js}>
		<div slot='source'>
			<div class='demo-list'>
				<BeCarousel autoplay={false}>
					{#each items as item, i}
						<BeCarouselItem {item} let:initialIndex={thing}>
							<div class="w-full h-full carousel-item" data-thing={thing} style="background: url({item}) center center / cover no-repeat;"></div>
						</BeCarouselItem>
					{/each}
				</BeCarousel>
			</div>
		</div>
		<div slot='description'>
			基础Carousel
		</div>
	</DemoBlock>
	<hr>
	<DemoBlock code={code4} js={js1}>
		<div slot='source'>
			<div class='demo-list'>
				<BeCarousel autoplay={false}>
					{#each items as item, i}
						<BeCarouselItem {item}>
							<div on:click={() => {previewImages(item, items)}} class="w-full h-full carousel-item" style="background: url({item}) center center / cover no-repeat;"></div>
						</BeCarouselItem>
					{/each}
				</BeCarousel>
			</div>
		</div>
		<div slot='description'>
			基础Carousel，结合图片预览。
		</div>
	</DemoBlock>
	<hr>
	<DemoBlock code={code1}>
		<div slot='source'>
			<div class='demo-list'>
				<BeCarousel autoplay={false} direction='vertical' trigger='hover'>
					{#each items.slice(0, 3) as item, i}
						<BeCarouselItem>
							<div class="w-full h-full carousel-item" style="background: url({item}) center center / cover no-repeat;"></div>
						</BeCarouselItem>
					{/each}
				</BeCarousel>
			</div>
		</div>
		<div slot='description'>
			竖直方向的Carousel direction='vertical'
		</div>
	</DemoBlock>
	<hr>
	<DemoBlock code={code2}>
		<div slot='source'>
			<div class='demo-list'>
				<BeCarousel height="450px" autoplay={false} direction='horizontal' arrow='always' trigger='hover' type='none'>
					{#each items as item, i}
						<BeCarouselItem>
							<div class="w-full h-full carousel-item" style="background: url({item}) center center / cover no-repeat;"></div>
						</BeCarouselItem>
					{/each}
				</BeCarousel>
			</div>
		</div>
		<div slot='description'>
			没有动画的Carousel
		</div>
	</DemoBlock>
	<hr>
	<DemoBlock code={code3}>
		<div slot='source'>
			<div class='demo-list'>
				<BeCarousel height="450px" direction='horizontal' trigger='click' type='card'>
					{#each items as item, i}
						<BeCarouselItem>
							<div class="w-full h-full carousel-item" style="background: url({item}) center center / cover no-repeat;"></div>
						</BeCarouselItem>
					{/each}
				</BeCarousel>
			</div>
		</div>
		<div slot='description'>
			卡片式Carousel
		</div>
	</DemoBlock>
</div>
<style lang='scss'>
  .demo-list {margin: 16px 0;}
</style>
