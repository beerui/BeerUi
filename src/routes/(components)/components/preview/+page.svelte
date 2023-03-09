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
	<h3 class='demo-table-title'>Attributes</h3>
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
				<td>src</td>
				<td>当前需要展示图片的src</td>
				<td>string</td>
				<td>-</td>
				<td>''</td>
			</tr>
			<tr>
				<td>list</td>
				<td>需要展示图片的src数组</td>
				<td>Array</td>
				<td>-</td>
				<td>[]</td>
			</tr>
		</tbody>
	</table>
	<h3 class='demo-table-title'>Events</h3>
	<table class='demo-table'>
		<thead>
		<tr>
			<th>事件名称</th>
			<th>说明</th>
			<th>回调参数</th>
		</tr>
		</thead>
		<tbody>
		<tr>
			<td>cb</td>
			<td>图片切换后 监听的回调</td>
			<td>''</td>
		</tr>
		</tbody>
	</table>
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
