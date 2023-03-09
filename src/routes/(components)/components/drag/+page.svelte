<script>
import BeDrag from '$lib/be-drag/BeDrag.svelte';
import DemoBlock from '$lib/demo/DemoBlock.svelte';

const list = [
	{ key: 1, label: 'write some docs' },
	{ key: 2, label: 'start writing JSConf talk' },
	{ key: 3, label: 'buy some milk' },
	{ key: 4, label: 'mow the lawn' },
	{ key: 5, label: 'feed the turtle' },
	{ key: 6, label: 'fix some bugs' },
]
let dragList = []

const getDrag = (evt) => {
	console.log(evt.detail);
}

const js = `
import { BeDrag } from '@brewer/beerui'
const list = [
	{ key: 1, label: 'write some docs' },
	{ key: 2, label: 'start writing JSConf talk' },
	{ key: 3, label: 'buy some milk' },
	{ key: 4, label: 'mow the lawn' },
	{ key: 5, label: 'feed the turtle' },
	{ key: 6, label: 'fix some bugs' },
]
let dragList = []

const getDrag = (evt) => {
	console.log(evt.detail);
}
`
const code = `
<BeDrag {list} on:getDrag={getDrag} />
`
</script>

<svelte:head>
	<title>BeDrag 拖拽排序 组件文档 BeerUi-官方文档</title>
	<meta name="description" content="BeerUi, 基于 svelte 的 PC端 组件库，base on svelte 3.0 web component">
	<meta name="keywords" content="BeDrag 拖拽排序, beerui组件文档,beerui,beerui文档,beerui官网, BeerUi,@brewer/beerui,svelte,component,svelteKit">
</svelte:head>
<div class='page-container'>
	<h2>BeDrag 拖拽排序</h2>
	<DemoBlock {code} {js}>
		<div slot='source'>
			<BeDrag {list} on:getDrag={getDrag} />
		</div>
		<div slot='description'>
			使用getDrag监听排序后的列表。
		</div>
	</DemoBlock>
</div>
