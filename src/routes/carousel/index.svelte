<script>
	import BeCarousel from '$lib/be-carousel/BeCarousel.svelte';
	const images = [
		'https://wapi.zhihuihedao.cn/uploads/banner/picturePic_90.jpg',
		'https://wapi.zhihuihedao.cn/uploads/banner/picturePic_91.jpg',
		'https://wapi.zhihuihedao.cn/uploads/banner/picturePic_92.jpg',
		'https://wapi.zhihuihedao.cn/uploads/banner/picturePic_93.jpg',
		'https://www.zhihuihedao.cn/upload/images/task/2021/03-04/taskIssueImageOne_504362_01614819472970.jpg'
	]
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
