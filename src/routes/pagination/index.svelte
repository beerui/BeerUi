<script>
	import { BePagination } from '$lib';

	const query = { limit: 10, name: "", page: 1 }
	const options = {
		card: true,
		icon: {
			width: 12,
			height: 12,
			color: '#1492FF'
		}
	}
	let list = []
	let total = 0 // 总条数
	const feedBackList = async () => {
		total = 100
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
</script>
<div class='page-container'>
	<div class="overflow-x-auto">
		<table class="table w-full table-zebra">
			<thead>
			<tr>
				<th></th>
				<th>姓名</th>
				<th>公司名称</th>
				<th>内容</th>
				<th>创建时间</th>
			</tr>
			</thead>
			<tbody>
			{#each list as item, index}
				<tr class="hover:bg-yellow-200">
					<th>{index + 1 + (query.page - 1) * query.limit}</th>
					<td>{item.name}</td>
					<td>{item.phone}</td>
					<td>{item.content}</td>
				</tr>
			{/each}
			</tbody>
		</table>
	</div>
	<BePagination currentPage={query.page} pageSize={query.limit} {total} async layouts="prev, pager, next" on:changePage={changePage} {options} />
</div>

<code>
<!--	<BePagination currentPage={query.page} pageSize={query.limit} {total} async layouts="prev, pager, next" on:changePage={changePage} />-->
</code>
