<script>
	import BeCarousel from '$lib/be-carousel/BeCarousel.svelte';
	const images = ['/images/1.jpg', '/images/2.jpg', '/images/3.jpg', '/images/4.jpg', '/images/5.jpg', '/images/6.jpg']
	const handleImageClicked = e => {
		console.log(e.detail)
	}
</script>
<BeCarousel
	{images}
	imageWidth={250}
	imageSpacing={15}
	controlColor={'black'}
	controlScale={0.8}
	displayControls={true}
	autoplay={false}
	autoplaySpeed={3000}
	on:imageClicked={handleImageClicked}
/>
