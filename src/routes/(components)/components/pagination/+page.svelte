<!--suppress UnnecessaryLabelJS -->
<script>
	import { BePagination } from '$lib';
	import DemoBlock from '$lib/demo/DemoBlock.svelte';
	import { FormatTime } from '$lib/utils/beerui';
	import BeTable from '$lib/be-table/BeTable.svelte';
	import BeTableColumn from '$lib/be-table/BeTableColumn.svelte';

	let js = `
import { BePagination } from '@brewer/beerui'
const query = { limit: 10, name: "", page: 1 }
const options = {
	card: true,
	showNumber: 6,
	icon: {
		width: 12,
		height: 12,
		color: '#1492FF'
	}
}
let list = []
let total = 11 // 总条数
const feedBackList = async () => {
	total = 11
	const name = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
	const defaultItem = {
		name: name[0],
		phone: Math.random().toString().substr(0, 11),
		content: '1'
	}
let temp = []
for (let i = 0; i < 10; i++) {
	temp.push(Object.assign(defaultItem, { content: name[i % 8], name: i + 'name' }))
}
list = temp
}
feedBackList()
// 切换页面
function changePage(item) {
	query.page = Number(item.detail)
	feedBackList()
}
	`
	let code = `

<BePagination
	currentPage=1
	pageSize={query.limit}
	{total}
	on:changePage={changePage}
	{options}
/>

<BePagination
	currentPage=1
	pageSize={query.limit}
	total=200
	async
	layouts="prev, pager, next"
	on:changePage={changePage}
	{options}
/>

<BePagination
	currentPage=1
	pageSize={query.limit}
	total=300
	async
	layouts="prev, pager, next"
	on:changePage={changePage}
	options={options1}
/>

<BePagination
	currentPage=1
	pageSize={query.limit}
	total=50
	async
	layouts="prev, pager, next"
	on:changePage={changePage}
	options={options2}
/>
`

	const query = { limit: 10, name: "", page: 1 }
	const options = {
		card: true,
		showNumber: 6,
		icon: {
			width: 12,
			height: 12,
			color: '#1492FF'
		}
	}
	const options1 = {
		card: true,
		showNumber: 5,
		icon: {
			width: 12,
			height: 12,
			color: '#1492FF'
		}
	}
	const options2 = {
		card: false,
		showNumber: 3,
		icon: {
			width: 12,
			height: 12,
			color: '#1492FF'
		}
	}
	let list = []
	let total = 41 // 总条数
	const feedBackList = async () => {
		total = 41
		const defaultItem = {
			name: '',
			age: 11,
			time: new Date()
		}
		let temp = []
		for (let i = 0; i < query.limit; i++) {
			temp.push(Object.assign(defaultItem, { name: 'Mr.' }))
		}
		list = temp
	}

	let formatTime = 'yyyy-MM-dd HH:mm:ss' // 格式化格式
	const times = new FormatTime(formatTime).getTime

	const getRandomInt = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
	}
	feedBackList()
	// 切换页面
	function changePage(item) {
		query.page = Number(item.detail)
		console.log('query.page', query.page);
		feedBackList()
	}
	const pageSizeChange = ({ detail }) => {
		query.limit = detail
		feedBackList()
	}
	const indexMethod = index => index + 1 + (query.page - 1) * query.limit
</script>
<svelte:head>
	<title>BePagination 分页 组件文档 BeerUi-官方文档</title>
	<meta name="description" content="BeerUi, 基于 svelte 的 PC端 组件库，base on svelte 3.0 web component">
	<meta name="keywords" content="BePagination 分页, beerui组件文档,beerui,beerui文档,beerui官网, BeerUi,@brewer/beerui,svelte,component,svelteKit">
</svelte:head>
<div class='page-container'>
	<h2>BePagination 分页</h2>
	<DemoBlock {code} {js}>
		<div slot='source'>
			<div class='demo-list'>
				<div class="overflow-x-auto">
					<table class="table w-full table-zebra">
						<thead>
						<tr>
							<td>序号</td>
							<td>姓名</td>
							<td>年龄</td>
							<td>创建时间</td>
						</tr>
						</thead>
						<tbody>
						{#each list as item, index}
							<tr>
								<td>{index + 1 + (query.page - 1) * query.limit}</td>
								<td>{item.name + getRandomInt(1, 99)}</td>
								<td>{getRandomInt(10, 60)}</td>
								<td>{times}</td>
							</tr>
						{/each}
						</tbody>
					</table>
				</div>
				<BePagination currentPage=1 pageSize={query.limit} {total} on:changePage={changePage} {options} />
			</div>
			<div class='demo-list'>
				<BePagination currentPage=1 pageSize={query.limit} total=200 async layouts="prev, pager, next" on:changePage={changePage} {options} />
			</div>
			<div class='demo-list'>
				<BePagination currentPage=1 pageSize={query.limit} total=300 async layouts="prev, pager, next" on:changePage={changePage} options={options1} />
			</div>
			<div class='demo-list'>
				<BeTable align='center' data={list} indexMethod={indexMethod}>
					<BeTableColumn width="60" prop='index' label='' />
					<BeTableColumn prop='name' label='姓名' />
					<BeTableColumn prop='age' label='age' />
					<BeTableColumn prop='time' label='日期' />
				</BeTable>
				<BePagination currentPage=1 pageSize={query.limit} total=50 async layouts="prev, pager, next" on:changePage={changePage} options={options2} />
			</div>
		</div>
		<div slot='description'>
			使用options配置分页的显示样式，card:是否是卡片 showNumber:显示数目 低于5条时不展示... icon: 大小和颜色
		</div>
	</DemoBlock>

	<h2>附加功能</h2>

	<DemoBlock code={`
<BePagination
	currentPage=1
    pageSize={query.limit}
    {total}
    async
    layouts="prev, pager, next, sizes, jumper, info, all"
    on:changePage={changePage}
    on:pageSizeChange={pageSizeChange}
    {options}
/>
`}
js={`
const pageSizeChange = ({ detail }) => {
	query.limit = detail
	feedBackList()
}`}
	>
		<div slot='source'>
			<div class='demo-list'>
				<div class="overflow-x-auto">
					<table class="table w-full table-zebra">
						<thead>
						<tr>
							<td>序号</td>
							<td>姓名</td>
							<td>年龄</td>
							<td>创建时间</td>
						</tr>
						</thead>
						<tbody>
						{#each list as item, index}
							<tr>
								<td>{index + 1 + (query.page - 1) * query.limit}</td>
								<td>{item.name + getRandomInt(1, 99)}</td>
								<td>{getRandomInt(10, 60)}</td>
								<td>{times}</td>
							</tr>
						{/each}
						</tbody>
					</table>
				</div>
				<BePagination
					currentPage=1
	                pageSize={query.limit}
	                {total}
	                async
	                layouts="prev, pager, next, sizes, jumper, info, all"
	                on:changePage={changePage}
	                on:pageSizeChange={pageSizeChange}
	                {options}
				/>
			</div>
		</div>
		<div slot='description'>
			<ol>
				<li>layouts prev, pager, next, sizes, jumper, info, all 展示不同的区块</li>
				<li>changePage 监听页码改变</li>
				<li>pageSizeChange 监听页数改变</li>
			</ol>
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
				<td>total</td>
				<td>总条数</td>
				<td>number</td>
				<td>-</td>
				<td>0</td>
			</tr>
			<tr>
				<td>type</td>
				<td>类别</td>
				<td>string</td>
				<td>mini/normal</td>
				<td>normal</td>
			</tr>
			<tr>
				<td>currentPage</td>
				<td>当前页</td>
				<td>number</td>
				<td>-</td>
				<td>1</td>
			</tr>
			<tr>
				<td>pageSize</td>
				<td>显示条数</td>
				<td>number</td>
				<td>-</td>
				<td>10</td>
			</tr>
			<tr>
				<td>layouts</td>
				<td>功能按钮</td>
				<td>string</td>
				<td>prev, pager, next, sizes, jumper, info, all</td>
				<td>prev, pager, next</td>
			</tr>
			<tr>
				<td>async</td>
				<td>异步接口需要开启</td>
				<td>boolean</td>
				<td>true/false</td>
				<td>false</td>
			</tr>
			<tr>
				<td>pageSizes</td>
				<td>可选页码</td>
				<td>number[]</td>
				<td>-</td>
				<td>[10, 15, 20]</td>
			</tr>
			<tr>
				<td>options</td>
				<td>其它设置</td>
				<td>optionsType</td>
				<td>-</td>
				<td>见下方类型</td>
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
			<td>changePage</td>
			<td>页码数改变</td>
			<td>当前页数</td>
		</tr>
		<tr>
			<td>pageSizeChange</td>
			<td>条数改变</td>
			<td>当前条数</td>
		</tr>
		</tbody>
	</table>

	<pre class='demo-pre'>
			{`
type optionsType = {
	card: boolean // 是否是块状
	showNumber: number // 分页按钮展示数量
	scroll: boolean // 是否需要自动滚动到头部
	icon: any // 上一页 下一页的大小和颜色
}
const defaultOptions: optionsType = {
  card: false,
  showNumber: 8,
  scroll: true,
  icon: {}
}
	`}
	</pre>
</div>
