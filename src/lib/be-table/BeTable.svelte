<script lang="ts">
	import { onDestroy, onMount, tick } from 'svelte';
	import { addClass, filterClass, off, on } from '$lib/utils/beerui';
  export let data: any[] = [] // 用户数据
	export let stripe: boolean = false // 斑马纹 false/true
	export let border: boolean = false // 边框 false/true
	export let showHeader: boolean = true // 显示表头 true/false
	export let height: string = '' // 定义了height属性，即可实现固定表头的表格
	export let rowClassName: Function = null // 为 Table 中的某一行添加 class {row, rowIndex}/string

  const preClass = ['type']
  const normalClass = ['be-table']

	// 条纹
  if (stripe) normalClass.push('be-table--striped')
	// 边框
  if (border) normalClass.push('be-table--border')
	// 定死高度
  if (height) normalClass.push('be-table--scrollable-y')
	const _class = [...normalClass, ...filterClass($$props, 'be-table--', preClass)].join(' ')
  export {_class as class};

  // console.log($$props);
  // console.log($$slots);
  let warpElement = null; // 顶层元素
  let tableHeaderWrapper = null; // 表格头元素
  let tableWrapper = null; // 表格元素
  let tbody = null; // tbody元素
  let gutter = 0; // tbody元素
  let scrollLeft = 0; // scrollLeft
  let tableWidth = '0px'; // table width宽度
  let columnElement = null; //
  let columnDom = null; // slot中的dom

  let columnData = [] // 列数据
  let columnPropData = [] // 列的Key
  let rowsData = [] // 行数据
  let headerData = [] // 表头 可渲染Dom Tree
  let headerOriginData = [] // 表头 原始Tree

  onMount(() => {
	  warpElement && initTable()
	})
	onDestroy(() => {
		off(tableWrapper, 'scroll', tableHeaderScroll)
	})
	const tableHeaderScroll = (evt) => {
		tableHeaderWrapper.scrollLeft = evt.target.scrollLeft
	}
	// 计算滚动条宽度
	const getScrollbarWidth = () => {
		const scrollDiv = document.createElement("div");
		scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
		document.body.appendChild(scrollDiv);
		const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
		document.body.removeChild(scrollDiv);
		return scrollbarWidth;
	}
	// 是否存在滚动条
	function eleCanScroll(ele) {
		if (!ele instanceof HTMLElement) return;
		if (ele.scrollTop > 0) return true
		ele.scrollTop++;
		// 元素不能滚动的话，scrollTop 设置不会生效，还会置为 0
		const top = ele.scrollTop;
		// 重置滚动位置
		top && (ele.scrollTop = 0);
		return top > 0;
	}

	// 计算每一格的宽度
	const computedColumnWidth = (emptyNum, userWidth) => {
		const domWidth = warpElement.clientWidth - userWidth
		// 取余
		const surplus = domWidth % emptyNum
		if (surplus === 0) return { surplus, width: domWidth / emptyNum }
		const width = (domWidth - surplus) / emptyNum
		return { surplus, width }
	}
	const initTable = async () => {
	  // 获取表头 DOM
		await initTableHeader()
	  // 加工行数据
		computedColumnData()
		// 加工列数据
		computedRowsData()
		// DOM渲染完毕 计算滚动条宽度
		await tick()
		// 绑定横向滚动的头部联动
		bindHeaderScroll()
	}
	// 加工行数据
	const computedColumnData = () => {
		columnData = []
		columnElement = warpElement.querySelectorAll('.be-table__column')
		columnElement.forEach(el => columnData.push(getAttrs(el.dataset)))
		// 整理数据 [{prop: 'name', label: '姓名', width: ''}]
		// 取出用户展示字段 存在prop
		columnPropData = columnData.filter(el => el['prop'])
		let emptyNum = 0 // 没有设置宽度的数量
		let userWidth = 0 // 用户设置的宽度总数
		columnPropData.forEach((el, i) => {
			el.width === '' ? emptyNum++ : userWidth += Number(el.width);
			el.index = i
		})
		// 计算没有赋值的宽度
		if (emptyNum > 0) {
			// 列宽
			const { surplus, width } = computedColumnWidth(emptyNum, userWidth)
			// 没有设置宽度的数组
			const emptyWidthArr = columnPropData.filter(el => el.width === '')
			// 设置宽度
			emptyWidthArr.forEach((el, i) => columnPropData[el.index]['width'] = i === emptyWidthArr.length-1 ? String(width + surplus) : String(width))
		}
		// 计算表格宽度
		const columnPropDataWidth = []
		columnPropData.filter(el => columnPropDataWidth.push(Number(el['width'])))
		tableWidth = columnPropDataWidth.reduce((total, num) => total + num) + 'px'
	}
	// 加工列数据 类名 style
	const computedRowsData = () => {
		rowsData = []
		data.forEach((el, i) => {
			let className
			// 额外的类名
			if (rowClassName) className = doRowClassName({ row: el, rowIndex: i })
			rowsData.push({ ...el, className })
		})
	}
	// 绑定横向滚动的头部联动
	const bindHeaderScroll = () => {
		if (eleCanScroll(tableWrapper)) {
			gutter = getScrollbarWidth();
			on(tableWrapper, 'scroll', tableHeaderScroll, { passive: true });
		}
	}
  const getAllColumns = (columns) => {
	  const result = [];
	  columns.forEach((column) => {
		  if (column.children) {
			  result.push(column);
			  result.push.apply(result, getAllColumns(column.children));
		  } else {
			  result.push(column);
		  }
	  });
	  return result;
  };
  const convertToRows = (originColumns) => {
	  let maxLevel = 1;
	  const traverse = (column, parent?) => {
		  if (parent) {
			  column.level = parent.level + 1;
			  if (maxLevel < column.level) {
				  maxLevel = column.level;
			  }
		  }
		  if (column.children) {
			  let colSpan = 0;
			  column.children.forEach((subColumn) => {
				  traverse(subColumn, column);
				  colSpan += subColumn.colSpan;
			  });
			  column.colSpan = colSpan;
		  } else {
			  column.colSpan = 1;
		  }
	  };

	  originColumns.forEach((column) => {
		  column.level = 1;
			traverse(column);
	  });

	  const rows = [];
	  for (let i = 0; i < maxLevel; i++) {
		  rows.push([]);
	  }

	  const allColumns = getAllColumns(originColumns);

	  allColumns.forEach((column) => {
		  if (!column.children) {
			  column.rowSpan = maxLevel - column.level + 1;
		  } else {
			  column.rowSpan = 1;
		  }
		  rows[column.level - 1].push(column);
	  });

	  return rows;
  };
  // 把Dom 清洗成Tree
  const initTableHeader = () => {
		if (!columnDom || columnDom.children.length === 0) throw new Error('[Beerui] cant find element.')
	  headerOriginData = computedTableHeader(columnDom);
	  headerData = convertToRows(headerOriginData);
		console.log('headerData', headerData);
  }
  const computedTableHeader = (dom) => {
	  let result = []
	  Object.entries(dom.children).forEach(el => {
		  const _item = el[1]
		  const child = getAttrs(_item.dataset)
			if(_item && _item.children.length > 0) {
				console.log(_item.children[0].children[0]);
				if (_item.children[0].tagName === 'TEMP') {
					child['temp'] = _item.children[0].innerHTML
				} else {
					child['children'] = computedTableHeader(_item)
				}
		  }
			console.log('child', child);
		  result.push(child)
	  })
	  return result
  }

	const doRowClassName = (options) => rowClassName(options)
	// 整理子组件的数据
	const getAttr = (el: Element, value: string) => el.getAttribute(value)
	const getAttrs = (items: DOMStringMap) => {
	  const result = {}
		Object.entries(items).forEach(el => el && (result[el[0]] = el[1]))
	  return result
  }
</script>
<div class={_class} bind:this={warpElement} style={$$props.style} id={$$props.id}>
	<div id='aaa' bind:this={columnDom} style='visibility: hidden;position: absolute;z-index: -1;'><slot></slot></div>
	{#if showHeader}
	<div class='be-table__header-wrapper' bind:this={tableHeaderWrapper}>
		<table class="be-table__body" style:width={tableWidth}>
			<colgroup>
				{#each columnPropData as col, i}
					<col width={col.width}>
				{/each}
				<col width={gutter}>
			</colgroup>
			<thead class="has-gutter">
				{#each headerData as col, i}
					<tr class="">
						{#each col as rows}
							<th class="be-table__cell" rowspan={rows.rowSpan} colspan={rows.colSpan}>
								<div class="cell">{rows.label}</div>
							</th>
						{/each}
						<th class="be-table__cell gutter" style="width: {gutter}px;"></th>
					</tr>
				{/each}
				</thead>
		</table>
	</div>
	{/if}
	<div class='be-table__body-wrapper' bind:this={tableWrapper} style:height>
		<table class="be-table__body" style:width={tableWidth}>
			<colgroup>
				{#each columnPropData as col, i}
					<col width={col.width}>
				{/each}
			</colgroup>
			<tbody bind:this={tbody}>
			{#each rowsData as row, index}
			<tr
				class="be-table__row {row.className || ''} {stripe && index%2 === 1 ? 'be-table__row--striped' : ''}"
				style={row.styles}
			>
				{#each columnPropData as col, i}
					{#if row[col.temp]}
						<td class="be-table__cell">
							<div class="cell">{row[col.temp] || ''}</div>
						</td>
					{:else}
						<td class="be-table__cell">
							<div class="cell">{row[col.prop] || ''}</div>
						</td>
					{/if}
				{/each}
			</tr>
			{/each}
			</tbody>
		</table>
	</div>
</div>
