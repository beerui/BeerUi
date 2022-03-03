<!-- http://face.cms.talelin.com/#/lin-cms-ui/data/pagination -->
<script lang="ts">
	/**
	 * 分页
	 * @params total 总条数
	 * @params currentPage 当前页
	 * @params pageSize 显示条数
	 * @params pagerCount 显示多少个
	 * @params layouts 最大页码按钮数
	 * @params async 后续是否更新 异步接口需要开启 必须在初始状态就设置
	 *
	 * 格式
	 * I. 1 2 3 4 5 6 7 8 9... 12
	 * II. 1  ...5 6 7 8 9 ... 100
	 * III. 1  ....5 6 7 8 9 10 11 12
	 */
	import { beforeUpdate, createEventDispatcher, onDestroy, onMount } from "svelte";
	import { filterMidArray } from '$lib/utils';
	import BeSelect from "$lib/be-select/BeSelect.svelte";
	import BeOption from "$lib/be-select/BeOption.svelte";
	import BeInput from "$lib/be-input/BeInput.svelte";
	import Notice from '$lib/utils/notice'
	const dispatch = createEventDispatcher()

	export let total = 0 // 总条数
	export let type = 'normal' // 类别 mini/normal
	export let currentPage = 1 // 当前页
	export let pageSize = 10 // 显示条数
	export let layouts = 'prev, pager, next' // 最大页码按钮数
	export let async = false // 后续是否更新
	export let pageSizes = [10, 15, 20] // 后续是否更新

	// 其它设置
	export let options = {
		card: false, // 是否是块状
		showNumber: 8, // 是否是块状
		scroll: true, // 是否需要自动滚动到头部
		icon: {} // 上一页 下一页的大小和颜色
	}

	$: totalpages = Math.ceil(total / pageSize) // 总页数
	$: pageList = []

	const components = layouts.split(',').map((item) => item.trim());

	let icon = {
		width: 12,
		height: 12,
		color: '#323232'
	}
	let isCard = options.card || false
	let pagerCount = options.showNumber || 8
	let jumpPage:string|number = ''

	if (options.icon) {
		icon = Object.assign(icon, options.icon)
	}
	// 在异步更新之后调用
	if (async) {
		beforeUpdate(() => {
			pageList = computePageList() // 计算页码
		})
	}
	let notice = null
	// 初始值调用
	onMount(() => {
		pageList = computePageList() // 计算页码
		notice = new Notice()
	})
	onDestroy(() => {
		notice = null
	})
	function computePageList() {
		let pages:any[]
		// 页码数小于等于 pagerCount 时
		if (totalpages <= pagerCount) {
			pages = normalPageList()
		} else if (pagerCount <= 5) {
			pages = smallPageList()
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
		const len = i + pagerCount
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
	// 数量少于5时
	const smallPageList = () => {
		const pages = []
		let i = 1
		while (i <= totalpages) {
			pages.push(i)
			i++
		}
		const result = []
		const sameResult = filterMidArray(pages, currentPage, pagerCount)
		sameResult.forEach(el => result.push({ n: el, type: 'normal' }))
		return result
	}
	// 取中间值
	const roundNum = (n1, n2) => Math.round((Number(n1) + Number(n2)) / 2)
	function changePage(page) {
		console.log('changePage');
		// 解决点击上一页/下一页 page会为0的问题/age会超出最大值的问题
		if (page <= 0 || page > totalpages) return
		// 设置当前选中的元素
		currentPage = Number(page)
		// 计算页码
		pageList = computePageList()
		// 通知父组件 页码修改
		dispatch('changePage', currentPage)
		if (options.scroll) {
			document.body.scrollIntoView({ behavior: "smooth" });
		}
	}
	$: if (pageSize) dispatch('pageSizeChange', pageSize)
	const keydownHandle = (evt) => {
		if (evt.keyCode === 13) {
			if (jumpPage > pageSize || jumpPage <= 0) {
				openPosInfo('提示', '页码不正确！')
				return
			}
			changePage(jumpPage)
		}
	}

	function openPosInfo(title:string = '提示', message:string = ''):void{
		notice.setNotice({
			title,
			message,
			position: 'top-right',
			duration: 3000,
			titleColor: "#ee933b",
			messageColor: "#f0a373"
		})
	}
</script>
<div class="{isCard ? 'be-pagination be-pagination-card' : 'be-pagination'}" >
	{#if type === 'mini'}
	<div class="be-pagination__container_mini">
		<div on:click={() => changePage(+currentPage - 1)} class="cursor-pointer relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-300 {+currentPage === 1 ? 'bg-gray-300' : ''}">
			上一页
		</div>
		<div on:click={() => changePage(+currentPage + 1)} class="cursor-pointer ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-300 {+currentPage === totalpages ? 'bg-gray-300' : ''}">
			下一页
		</div>
	</div>
	{/if}
	{#if type === 'normal'}
	<div class='be-pagination__container'>
		{#if components.includes('info')}
			<div class='be-pagination__analyze'>
				<p class="text-sm text-gray-700">
					{#if components.includes('all')}
					显示
					<span class="font-medium">{pageSize}条 </span>
					当前在
					<span class="font-medium">第{+currentPage} / {totalpages}页</span>
					{/if}
					共
					<span class="font-medium"> {total}</span>
					条
				</p>
			</div>
		{/if}
		<div class='be-pagination__container'>
			{#if components.includes('prev')}
			<div on:click={() => changePage(+currentPage - 1)} class="list" class:disabled={+currentPage === 1}>
				<div class="sr-only pointer-events-none svg-icon">
					<svg class="icon" viewBox="0 0 1024 1024" width={icon.width} height={icon.height}>
						<path fill={icon.color} d="M356.7 509.83L780.2 931.4c20 19.91 20 52.24 0 72.14-19.99 19.91-52.47 19.91-72.47 0L250.36 548.25c-10.57-10.53-15.67-24.6-14.9-38.42-0.64-13.82 4.33-27.89 14.9-38.42L707.6 16.12c20-19.9 52.48-19.9 72.47 0 20 19.91 20 52.24 0 72.14L356.7 509.83z m0 0"></path>
					</svg>
				</div>
			</div>
			{/if}
			{#each pageList as item, index}
				{#if item.type === 'ellipsis'}
					<div on:click={() => changePage(item.n)} class="list" class:active={+currentPage === item.n}>
						...
					</div>
				{:else}
					<div on:click={() => changePage(item.n)} class="list" class:active={+currentPage === item.n}>
						{item.n}
					</div>
				{/if}
			{/each}
			{#if components.includes('next')}
			<div on:click={() => changePage(+currentPage + 1)} class="list" class:disabled={+currentPage === totalpages}>
				<div class="sr-only pointer-events-none svg-icon">
					<svg class="icon" viewBox="0 0 1024 1024" width={icon.width} height={icon.height}>
						<path fill={icon.color} d="M673.88 509.84L250.38 88.26c-20-19.91-20-52.24 0-72.14 19.99-19.91 52.47-19.91 72.47 0l457.37 455.29c10.57 10.53 15.67 24.6 14.9 38.42 0.64 13.82-4.33 27.89-14.9 38.42l-457.25 455.3c-20 19.9-52.48 19.9-72.47 0-20-19.91-20-52.24 0-72.14l423.38-421.57z m0 0"></path>
					</svg>
				</div>
			</div>
			{/if}
			{#if components.includes('sizes')}
				<BeSelect style="width: 100px" bind:value={pageSize} size="mini" placeholder="">
					{#each pageSizes as size}
					<BeOption label={size+'条/页'} value={size}/>
					{/each}
				</BeSelect>
			{/if}
			{#if components.includes('jumper')}
				<div class="m-jumper">
					<span>跳至</span>
					<BeInput style="width: 50px" on:keydown={keydownHandle} bind:value={jumpPage} size="mini" placeholder="" />
					<span>页</span>
				</div>
			{/if}
		</div>
	</div>
	{/if}
</div>

<style lang="scss">
  .svg-icon {display: flex;justify-content: center;align-items: center;height: 100%;}
</style>
