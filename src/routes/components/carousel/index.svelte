<script>
	import BeCarousel from '$lib/be-carousel/BeCarousel.svelte';
  import BeCarouselItem from '$lib/be-carousel/BeCarouselItem.svelte';
	const images = ['/images/1.jpg', '/images/2.jpg', '/images/3.jpg', '/images/4.jpg', '/images/5.jpg', '/images/6.jpg']
	const handleImageClicked = e => {
		console.log(e.detail)
	}
</script>
<div class='page-container'>
	<BeCarousel height="150px" direction='horizontal' arrow='always'>
		{#each images as item, i}
		<BeCarouselItem>
			<img src={item} alt={item}>
		</BeCarouselItem>
		{/each}
	</BeCarousel>
</div>
