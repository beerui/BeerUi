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
	<h3>基础Carousel</h3>
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
	</DemoBlock>
	<h3>基础Carousel，结合图片预览。</h3>
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
	</DemoBlock>
	<h3>竖直方向的Carousel</h3>
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
	</DemoBlock>
	<h3>没有动画的Carousel</h3>
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
	</DemoBlock>
	<h3>卡片式Carousel</h3>
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
	</DemoBlock>
	<h3 class='demo-table-title'>BeCarousel Attributes</h3>
	<table class='demo-table'>
		<thead>
		<tr>
			<th>参数</th>
			<th>说明</th>
			<th>类型</th>
			<th>可选值</th>
			<th>默认值</th>
		</tr>
		</thead>
		<tbody>
		<tr>
			<td>direction</td>
			<td>展示的方向</td>
			<td>string</td>
			<td>vertical/horizontal</td>
			<td>horizontal</td>
		</tr>
		<tr>
			<td>loop</td>
			<td>是否循环显示</td>
			<td>boolean</td>
			<td>true/false</td>
			<td>true</td>
		</tr>
		<tr>
			<td>type</td>
			<td>类型</td>
			<td>string</td>
			<td>''/none/card</td>
			<td>''</td>
		</tr>
		<tr>
			<td>arrow</td>
			<td>箭头的显示时机</td>
			<td>string</td>
			<td>always/hover/never</td>
			<td>hover</td>
		</tr>
		<tr>
			<td>indicatorPosition</td>
			<td>指示器的位置</td>
			<td>string</td>
			<td>outside/none</td>
			<td>none</td>
		</tr>
		<tr>
			<td>hideIndicator</td>
			<td>隐藏指示器</td>
			<td>boolean</td>
			<td>true/false</td>
			<td>false</td>
		</tr>
		<tr>
			<td>hideArrow</td>
			<td>隐藏箭头</td>
			<td>boolean</td>
			<td>true/false</td>
			<td>false</td>
		</tr>
		<tr>
			<td>interval</td>
			<td>自动切换的时间间隔(ms)</td>
			<td>number</td>
			<td>-</td>
			<td>3000</td>
		</tr>
		<tr>
			<td>autoplay</td>
			<td>自动切换</td>
			<td>boolean</td>
			<td>true/false</td>
			<td>true</td>
		</tr>
		<tr>
			<td>trigger</td>
			<td>指示器的触发方式</td>
			<td>string</td>
			<td>'click'/'hover'</td>
			<td>click</td>
		</tr>
		<tr>
			<td>initialIndex</td>
			<td>初始状态激活的幻灯片的索引</td>
			<td>number</td>
			<td>-</td>
			<td>0</td>
		</tr>
		<tr>
			<td>height</td>
			<td>高度</td>
			<td>string</td>
			<td>-</td>
			<td>300px</td>
		</tr>
		</tbody>
	</table>
	<h3 class='demo-table-title'>BeCarouselItem Slot</h3>
	<table class='demo-table'>
		<thead>
		<tr>
			<th>name</th>
			<th>说明</th>
		</tr>
		</thead>
		<tbody>
		<tr>
			<td>default</td>
			<td>默认slot</td>
		</tr>
		</tbody>
	</table>
</div>
<style lang='scss'>
	.demo-list {
		margin: 16px 0;
	}
</style>
