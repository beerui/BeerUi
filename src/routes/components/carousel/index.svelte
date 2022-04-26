<script>
	import BeCarousel from '$lib/be-carousel/BeCarousel.svelte';
	import BeCarouselItem from '$lib/be-carousel/BeCarouselItem.svelte';
	import DemoBlock from '$lib/demo/DemoBlock.svelte';
	import { previewImages } from '$lib';

	const items = ['/images/1.jpg', '/images/2.jpg', '/images/3.jpg', '/images/4.jpg', '/images/5.jpg', '/images/6.jpg'];
	const handleImageClicked = e => {
		console.log(e.detail);
	};

	let js = `import { BeCarousel, BeCarouselItem } from '@brewer/beerui'`;
	let js1 = `import { previewImages } from '@brewer/beerui'`;
	let code = `
<BeCarousel>
	{#each items as item, i}
	<BeCarouselItem>
		<div class='w-full h-full carousel-item' style='background: url({item}) center center / cover no-repeat;'></div>
	</BeCarouselItem>
	{/each}
</BeCarousel>
`;
	let code1 = `
<BeCarousel autoplay={false} direction='vertical' trigger='hover'>
	{#each items as item, i}
	<BeCarouselItem>
		<div class="w-full h-full carousel-item" style="background: url({item}) center center / cover no-repeat;"></div>
	</BeCarouselItem>
	{/each}
</BeCarousel>
`;
	const code2 = `
<BeCarousel height="450px" autoplay={false} direction='horizontal' arrow='always' trigger='hover' type='none'>
	{#each items as item, i}
	<BeCarouselItem>
		<div class="w-full h-full carousel-item" style="background: url({item}) center center / cover no-repeat;"></div>
	</BeCarouselItem>
	{/each}
</BeCarousel>
`;
	const code3 = `
<BeCarousel height='450px' direction='horizontal' trigger='click' type='card'>
	{#each items as item, i}
	<BeCarouselItem>
		<div class='w-full h-full carousel-item' style='background: url({item}) center center / cover no-repeat;'></div>
	</BeCarouselItem>
	{/each}
</BeCarousel>
`;
	const code4 = `
<BeCarousel autoplay={false}>
	{#each items as item, i}
	<BeCarouselItem {item}>
		<div on:click={() => {previewImages(item, items)}} class="w-full h-full carousel-item" data-thing={thing} style="background: url({item}) center center / cover no-repeat;"></div>
	</BeCarouselItem>
	{/each}
</BeCarousel>
`;
</script>
<div class='page-container'>
	<h2>BeCarousel 轮播图</h2>
	<DemoBlock {code} {js}>
		<div slot='source'>
			<div class='demo-list'>
				<BeCarousel autoplay={false}>
					{#each items as item, i}
						<BeCarouselItem {item} let:initialIndex={thing}>
							<div class='w-full h-full carousel-item' data-thing={thing}
							     style='background: url({item}) center center / cover no-repeat;'></div>
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
							<div on:click={() => {previewImages(item, items)}} class='w-full h-full carousel-item'
							     style='background: url({item}) center center / cover no-repeat;'></div>
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
							<div class='w-full h-full carousel-item'
							     style='background: url({item}) center center / cover no-repeat;'></div>
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
				<BeCarousel height='450px' autoplay={false} direction='horizontal' arrow='always' trigger='hover'
				            type='none'>
					{#each items as item, i}
						<BeCarouselItem>
							<div class='w-full h-full carousel-item'
							     style='background: url({item}) center center / cover no-repeat;'></div>
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
				<BeCarousel height='450px' direction='horizontal' trigger='click' type='card' hideIndicator hideArrow>
					{#each items as item, i}
						<BeCarouselItem>
							<div class='w-full h-full carousel-item'
							     style='background: url({item}) center center / cover no-repeat;'></div>
						</BeCarouselItem>
					{/each}
				</BeCarousel>
			</div>
		</div>
		<div slot='description'>
			卡片式Carousel;
			<pre>
				<code>
direction： "horizontal"; // 走马灯展示的方向 vertical
loop： true; // 是否循环显示
type： ""; // 走马灯的类型 ''/none/card
arrow： "hover"; // 切换箭头的显示时机 always/hover/never
indicatorPosition： "none"; // 指示器的位置 outside/none
hideIndicator： false; // 指示器是否显示 false/true
hideArrow： false; // 箭头是否显示 false/true
interval： 3000; // 自动切换的时间间隔，单位为毫秒
autoplay： true; // 是否自动切换 true/false
trigger： "click"; // 指示器的触发方式 click/hover
initialIndex： 0; // 初始状态激活的幻灯片的索引，从 0 开始
height： ""; // 走马灯的高度 300px
				</code>
			</pre>
		</div>
	</DemoBlock>
</div>
<style lang='scss'>
	.demo-list {
		margin: 16px 0;
	}
</style>
