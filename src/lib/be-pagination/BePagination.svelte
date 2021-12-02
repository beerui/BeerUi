<!-- http://face.cms.talelin.com/#/lin-cms-ui/data/pagination -->
<!--suppress TypeScriptUnresolvedVariable, JSUndeclaredVariable, JSUnresolvedVariable -->
<script>
	/**
	 * 分页
	 * @params total 总条数
	 * @params currentPage 当前页
	 * @params pageSize 显示条数
	 * @params pagerCount 显示多少个
	 * @params layouts 最大页码按钮数 TODO：上一页 下一页 隐藏
	 * @params async 后续是否更新 异步接口需要开启 必须在初始状态就设置
	 *
	 * 格式
	 * I. 1 2 3 4 5 6 7 8 9... 12
	 * II. 1  ...5 6 7 8 9 ... 100
	 * III. 1  ....5 6 7 8 9 10 11 12
	 */
	import { beforeUpdate, createEventDispatcher, onMount } from 'svelte'
	const dispatch = createEventDispatcher()

	export let total = 0 // 总条数
	export let currentPage = 1 // 当前页
	export let pageSize = 15 // 显示条数
	export let pagerCount = 8 // 显示多少个
	export let layouts = 'prev, pager, next' // 最大页码按钮数
	export let async = false // 后续是否更新

	$: totalpages = Math.ceil(total / pageSize) // 总页数
	$: pageList = []

	// 在异步更新之后调用
	if (async) {
		beforeUpdate(() => {
			pageList = computePageList() // 计算页码
		})
	}
	// 初始值调用
	onMount(() => {
		pageList = computePageList() // 计算页码
	})
	function computePageList() {
		let pages = []
		// 页码数小于等于 pagerCount 时
		if (totalpages <= pagerCount) {
			pages = normalPageList()
		} else {
			// 页码数大于 pagerCount 时 会出现 ...
			pages = outPageList()
		}
		return pages
	}
	// 数量少于 最大显示的页码数 时
	const outPageList = () => {
		const pages = []
		// 第一页 一直存在
		pages.push({ n: 1, type: 'normal' })
		// 取选中当前页的前后两位
		let i = currentPage - 2
		// 头部处理
		if (i === -1 || i === 0 || i === 1) i = 2
		// 尾部处理 倒转i的值 15|14|13|12|11=>11
		let step = 3
		if ((totalpages - currentPage) < 3) {
			i -= step  - (totalpages - currentPage)
		}
		// 前方 超过2位出现 ...
		if (i > 2) pages.push({ n: roundNum(1, i), type: 'ellipsis' })
		// 循环 5 条数据
		const len = i + 5
		for (i; i < len; i++) {
			if (i < totalpages) {
				pages.push({ n: i, type: 'normal' })
			}
		}
		// 是否在最后一个
		const isEnd = (totalpages - pages[pages.length - 1].n) >= 2
		// 添加后面的 ...
		if (isEnd) pages.push({ n: roundNum(totalpages, pages[pages.length - 1].n), type: 'ellipsis' })
		// 最后一页 一直存在
		pages.push({ n: totalpages, type: 'normal' })
		return pages
	}

	// 数量少于 最大显示的页码数 时
	const normalPageList = () => {
		const pages = []
		for (let i = 0; i < totalpages; i ++) {
			pages.push({ n: i +1, type: 'normal' })
		}
		return pages
	}
	// 取中间值
	const roundNum = (n1, n2) => Math.round((Number(n1) + Number(n2)) / 2)
	function changePage(ev) {
		const { page } = ev.target.dataset
		// 设置当前选中的元素
		currentPage = Number(page)
		// 解决点击上一页 page会为0的问题
		if (page <= 0) currentPage = 1
		// 解决点击下一页 page会超出最大值的问题
		if (page >= totalpages) currentPage = totalpages
		// 计算页码
		pageList = computePageList()
		// 通知父组件 页码修改
		dispatch('changePage', currentPage)
		document.body.scrollIntoView({ behavior: "smooth" });
	}

</script>
<div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
	<div class="flex-1 flex justify-between sm:hidden">
		<div on:click={changePage} data-page={currentPage - 1} class="cursor-pointer relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-300 {currentPage === 1 ? 'bg-gray-300' : ''}">
			上一页
		</div>
		<div on:click={changePage} data-page={currentPage + 1} class="cursor-pointer ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-300 {currentPage === totalpages ? 'bg-gray-300' : ''}">
			下一页
		</div>
	</div>
	<div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
		{#if layouts}
			<div>
				<p class="text-sm text-gray-700">
					显示
					<span class="font-medium">{pageSize}条 </span>
					共有
					<span class="font-medium">{total}</span>
					条结果
					<span class="font-medium"> {totalpages}</span>
					页
				</p>
			</div>
		{/if}
		<div>
			<nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px select-none" aria-label="Pagination">
				<div on:click={changePage} data-page={currentPage - 1} class="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-300 {currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : ''}">
					<span class="sr-only pointer-events-none">上一页</span>
					<!-- Heroicon name: solid/chevron-left -->
					<svg class="h-5 w-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
						<path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
					</svg>
				</div>
				<!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
				{#each pageList as item, index}
					{#if item.type === 'ellipsis'}
						<div on:click={changePage} data-page="{item.n}" class="cursor-pointer bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium {currentPage === item.n ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : ''}">
							...
						</div>
					{:else}
						<div on:click={changePage} data-page="{item.n}" class="cursor-pointer bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium {currentPage === item.n ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : ''}">
							{item.n}
						</div>
					{/if}
				{/each}
				<div on:click={changePage} data-page={currentPage + 1} class="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-300 {currentPage === totalpages ? 'bg-gray-300 cursor-not-allowed' : ''}">
					<span class="sr-only pointer-events-none">下一页</span>
					<!-- Heroicon name: solid/chevron-right -->
					<svg class="h-5 w-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
						<path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
					</svg>
				</div>
			</nav>
		</div>
	</div>
</div>
