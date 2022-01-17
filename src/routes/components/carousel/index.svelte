<script>
	import BeCarousel from '$lib/be-carousel/BeCarousel.svelte';
  import BeCarouselItem from '$lib/be-carousel/BeCarouselItem.svelte';
	const items = ['/images/1.jpg', '/images/2.jpg', '/images/3.jpg', '/images/4.jpg', '/images/5.jpg', '/images/6.jpg']
	const handleImageClicked = e => {
		console.log(e.detail)
	}
</script>
<div class='page-container'>
	<BeCarousel items={items.slice(0, 2)} height="450px" autoplay={false} direction='horizontal' arrow='always' trigger='hover'>
		{#each items.slice(0, 2) as item, i}
		<BeCarouselItem>
			<img style='height: 100%;' src={item} alt={item}>
		</BeCarouselItem>
		{/each}
		<h1>213213</h1>
	</BeCarousel>
	<BeCarousel {items} height="450px" direction='horizontal' arrow='always' trigger='hover' type='none'>
		{#each items as item, i}
		<BeCarouselItem>
			<img style='height: 100%;' src={item} alt={item}>
		</BeCarouselItem>
		{/each}
		<h1>213213</h1>
	</BeCarousel>
	<BeCarousel height="450px" direction='horizontal' autoplay={false} trigger='click' type='card'>
		{#each items as item, i}
		<BeCarouselItem>
			<img style='height: 100%;' src={item} alt={item}>
		</BeCarouselItem>
		{/each}
		<h1>213213</h1>
	</BeCarousel>
</div>
