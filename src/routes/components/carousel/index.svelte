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
		{#each items as item, i}
		<BeCarouselItem>
			<img style='height: 100%;width: 100%;' src={item} alt={item}>
		</BeCarouselItem>
		{/each}
	</BeCarousel>
	<BeCarousel {items} height="450px" autoplay={false} direction='horizontal' arrow='always' trigger='hover' type='none'>
		{#each items as item, i}
		<BeCarouselItem>
			<img style='height: 100%;width: 100%;' src={item} alt={item}>
		</BeCarouselItem>
		{/each}
	</BeCarousel>
	<BeCarousel height="450px" direction='horizontal' autoplay={false} trigger='click' type='card'>
		{#each items as item, i}
		<BeCarouselItem>
			<img style='height: 100%;width: 100%;' src={item} alt={item}>
		</BeCarouselItem>
		{/each}
	</BeCarousel>
</div>
