<script lang="ts">
  import { onMount } from 'svelte';
  import { addClass, filterClass } from '$lib/utils/beerui';
  export let data: any[] = [] // 用户数据
	export let stripe: boolean = false // 斑马纹 false/true
	export let border: boolean = false // 边框 false/true
	export let showHeader: boolean = true // 显示表头 true/false
	export let height: string = '' // 定义了height属性，即可实现固定表头的表格
	export let rowClassName: Function = null // 为 Table 中的某一行添加 class {row, rowIndex}/string

  const preClass = ['type']
  const normalClass = ['be-table']

  if (stripe) normalClass.push('be-table--striped')
  if (border) normalClass.push('be-table--border')
  if (height) normalClass.push('be-table--scrollable-y')
	const _class = [...normalClass, ...filterClass($$props, 'be-table--', preClass)].join(' ')
  export {_class as class};

  // console.log($$props);
  // console.log($$slots);
  let element = null;
  let elements = null;
  let columnDom = null; // slot中的dom

  let columnData = [] // 列数据
  let rowsData = [] // 行数据
  let headerData = [] // 头部数据
  let headerOriginData = [] // 头部数据

  onMount(() => {
	  element && initTable()
	})
	const initTable = () => {
	  columnData = []
	  rowsData = []
	  // 获取表头 DOM
	  headerOriginData = initTableHeader()
	  console.log(getAllColumns(headerData));
	  headerData = convertToRows(headerOriginData);
	  console.log('headerData', headerData);
	  elements = element.querySelectorAll('.be-table__column')
	  elements.forEach((el, i) => {
			columnData.push(getAttrs(el.dataset))
		})
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
	  console.log('originColumns', originColumns);
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
  const initTableHeader = () => {
		if (!columnDom || columnDom.children.length === 0) throw new Error('[Beerui] cant find element.')
		return computedTableHeader(columnDom);
  }
  const computedTableHeader = (dom) => {
	  let result = []
	  Object.entries(dom.children).forEach(el => {
		  const _item = el[1]
		  const child = { children:[], ...getAttrs(_item.dataset) }
		  if(_item && _item.children.length > 0) {
			  child.children = computedTableHeader(_item)
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
<div class={_class} bind:this={element} style={$$props.style}>
	<div id='aaa' bind:this={columnDom} style='visibility: hidden;position: absolute;z-index: -1;'><slot></slot></div>
	{#if showHeader}
	<div class='be-table__header-wrapper'>
		<table class="be-table__body" style={$$props.style}>
			<colgroup>
				{#each headerData as col, i}
					<col width={col.width}>
				{/each}
			</colgroup>
			<thead class="has-gutter">
				{#each headerData as col, i}
					<tr class="">
						{#each col as rows}
							<th class="be-table__cell" style='width: {rows.width}px;' rowspan={rows.rowSpan} colspan={rows.colSpan}>
								<div class="cell">{rows.label}</div>
							</th>
						{/each}
					</tr>
				{/each}
				</thead>
		</table>
	</div>
	{/if}
	<div class='be-table__body-wrapper be-table--scrollable-x' style:height>
		<table class="be-table__body">
			<colgroup>
				{#each columnData as col, i}
					<col width={col.width}>
				{/each}
			</colgroup>
			<tbody>
			{#each rowsData as row, index}
			<tr
				class="be-table__row {row.className || ''} {stripe && index%2 === 1 ? 'be-table__row--striped' : ''}"
				style={row.styles}
			>
				{#each columnData as col, i}
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
