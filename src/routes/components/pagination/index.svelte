<!--suppress UnnecessaryLabelJS -->
<script>
	import { BePagination } from '$lib';
	import DemoBlock from '$lib/demo/DemoBlock.svelte';
	import { FormatTime } from '$lib/utils/beerui';

	let js = `
import { BePagination } from '@brewer/beerui'
const query = { limit: 11, name: "", page: 1 }
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
	async
	layouts="prev, pager, next"
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

	const query = { limit: 11, name: "", page: 1 }
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
	let total = 11 // 总条数
	const feedBackList = async () => {
		total = 11
		const defaultItem = {
			name: '',
			age: 11,
			time: new Date()
		}
		let temp = []
		for (let i = 0; i < 10; i++) {
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
		feedBackList()
	}
</script>
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
				<BePagination currentPage=1 pageSize={query.limit} {total} async layouts="prev, pager, next" on:changePage={changePage} {options} />
			</div>
			<div class='demo-list'>
				<BePagination currentPage=1 pageSize={query.limit} total=200 async layouts="prev, pager, next" on:changePage={changePage} {options} />
			</div>
			<div class='demo-list'>
				<BePagination currentPage=1 pageSize={query.limit} total=300 async layouts="prev, pager, next" on:changePage={changePage} options={options1} />
			</div>
			<div class='demo-list'>
				<BePagination currentPage=1 pageSize={query.limit} total=50 async layouts="prev, pager, next" on:changePage={changePage} options={options2} />
			</div>
		</div>
		<div slot='description'>
			使用options配置分页的显示样式，card:是否是卡片 showNumber:显示数目 低于5条时不展示... icon: 大小和颜色
		</div>
	</DemoBlock>
</div>
