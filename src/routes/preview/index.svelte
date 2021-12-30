<script lang="ts">
  import { previewImages } from '$lib/utils/beerui';
  const src = '/images/1.jpg'
	const list = ['/images/1.jpg', '/images/2.jpg', '/images/3.jpg', '/images/4.jpg', '/images/5.jpg', '/images/6.jpg']
  const clickImage = (src: string) => {
	  const p1 = previewImages(src, list)
	  // console.log(p1.current); // 获取元素状态
	  // console.log(p1.index); // 获取当前点击的元素索引
	  // 调用方法 监听图片的改变
		p1.watchHandle(res => console.log(res))
		// 初始化时调用监听
		// previewImages(src, list, res => console.log(res))
  }
</script>
<div class='page-container'>
	<h2>previewImages 预览图片</h2>
	<p>
		未来会添加的功能
		1、放大
		2、缩小
		3、旋转
		4、全屏
	</p>
	<h3>预览多图</h3>
	<div class='demo-list'>
		{#each list as item}
		<img class='demo-list-image' on:click={() => {clickImage(item)}} src={item} alt=''>
		{/each}
	</div>
	<h3>预览一张图</h3>
	<div class='demo-list'>
		<img class='demo-list-image' on:click={() => {previewImages('/images/7.jpg')}} src='/images/7.jpg' alt=''>
	</div>
</div>
<style lang='scss'>
	.demo-list {
		width: 100%;display: flex;justify-content: space-between;flex-wrap: wrap;
		&-image {
			width: 30%;height: 240px; margin: 30px 1%;object-fit: cover;border-radius: 3px;
			box-shadow: 0 0 10px 5px #c1c1c1;
		}
	}
</style>
