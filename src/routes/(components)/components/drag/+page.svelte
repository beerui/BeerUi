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
