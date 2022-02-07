<script lang="ts">
	import { onMount, tick } from 'svelte';
  import { addClass, filterClass } from '$lib/utils/beerui';
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
  let tbody = null; // tbody元素
  let gutter = 0; // tbody元素
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
	const initTable = () => {
	  columnData = []
	  rowsData = []
	  // 获取表头 DOM
	  initTableHeader()
	  columnElement = warpElement.querySelectorAll('.be-table__column')
	  columnElement.forEach((el, i) => {
			columnData.push(getAttrs(el.dataset))
		})
	  columnPropData = columnData.filter(el => el['prop'])
	  console.log('columnData', columnData);
	  console.log('columnPropData', columnPropData);
		// 加工数据
		data.forEach((el, i) => {
			let className
			// 额外的类名
			if (rowClassName) className = doRowClassName({ row: el, rowIndex: i })
			rowsData.push({ ...el, className })
		})
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
  const initTableHeader = async () => {
		if (!columnDom || columnDom.children.length === 0) throw new Error('[Beerui] cant find element.')
	  headerOriginData = computedTableHeader(columnDom);
	  headerData = convertToRows(headerOriginData);
	  await tick()
		console.log('warpElement.clientWidth', warpElement.clientWidth, tbody.clientWidth);
		console.log('headerData', headerData);
	  gutter = warpElement.clientWidth - tbody.clientWidth
		console.log('gutter', gutter);
  }
  const computedTableHeader = (dom) => {
	  let result = []
	  Object.entries(dom.children).forEach(el => {
		  const _item = el[1]
		  const child = getAttrs(_item.dataset)
		  if(_item && _item.children.length > 0) {
			  child['children'] = computedTableHeader(_item)
		  }
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
	<div class='be-table__header-wrapper'>
		<table class="be-table__body" style={$$props.style}>
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
						<th class="el-table__cell gutter" style="width: {gutter}px;"></th>
					</tr>
				{/each}
				</thead>
		</table>
	</div>
	{/if}
	<div class='be-table__body-wrapper be-table--scrollable-x' style:height>
		<table class="be-table__body">
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
				<td class="be-table__cell">
					<div class="cell">{row[col.prop] || ''}</div>
				</td>
				{/each}
			</tr>
			{/each}
			</tbody>
		</table>
	</div>
</div>
