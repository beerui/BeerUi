<script lang="ts">
  import { previewImages } from '$lib';
  import DemoBlock from '$lib/demo/DemoBlock.svelte';
  const src = '/images/1.jpg'
	const list = ['/images/1.jpg', '/images/2.jpg', '/images/3.jpg', '/images/4.jpg', '/images/5.jpg', '/images/6.jpg']
  const clickImage = (src: string) => {
	  const p1 = previewImages(src, list)
		console.log(p1);
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
	<h3>基础用法</h3>
	<p>预览多图</p>
	<DemoBlock code={`
{#each list as item}
	<img class='demo-list-image' on:click={() => {clickImage(item)}} src={item} alt=''>
{/each}
`} js={`
import { previewImages } from '@brewer/beerui'
const list = ['/images/1.jpg', '/images/2.jpg', '/images/3.jpg', '/images/4.jpg', '/images/5.jpg', '/images/6.jpg']
const clickImage = (src: string) => {
	const p1 = previewImages(src, list)
	// 调用方法 监听图片的改变
	p1.watchHandle(res => console.log(res))
}`}>
		<div slot="source">
			<div class='demo-list'>
				{#each list as item}
					<img class='demo-list-image' on:click={() => {clickImage(item)}} src={item} alt=''>
				{/each}
			</div>
		</div>
	</DemoBlock>
	<h3>预览一张图</h3>
	<DemoBlock code={`
<img class='demo-list-image' on:click={() => {previewImages('/images/7.jpg')}} src='/images/7.jpg' alt=''>`} js={`
import { previewImages } from '@brewer/beerui'
`}>
		<div slot="source">
			<div class='demo-list'>
				<img class='demo-list-image' on:click={() => {previewImages('/images/7.jpg')}} src='/images/7.jpg' alt=''>
			</div>
		</div>
	</DemoBlock>
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
