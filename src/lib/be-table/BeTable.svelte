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

  console.log($$props);
  console.log($$slots);
  let element = null;
  let elements = null;

  let tableColumnData = []
  let rowsData = []

  onMount(() => {
	  element && initTable()
	})
	const initTable = () => {
	  tableColumnData = []
	  rowsData = []
	  elements = element.querySelectorAll('.be-table__column')
	  elements.forEach((el, i) => {
			tableColumnData.push(getAttrs(el.dataset))
		})
		data.forEach((el, i) => {
			let className
			// 额外的类名
			if (rowClassName) className = doRowClassName({ row: el, rowIndex: i })
			rowsData.push({ ...el, className })
		})
	  console.log('tableColumnData', tableColumnData);
	  console.log('rowsData', rowsData);
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
	<div style='visibility: hidden;position: absolute;z-index: -1;'><slot></slot></div>
	{#if showHeader}
	<div class='be-table__header-wrapper'>
		<table class="be-table__body" style={$$props.style}>
			<colgroup>
				{#each tableColumnData as col, i}
					<col width={col.width}>
				{/each}
			</colgroup>
			<thead class="has-gutter">
				<tr class="">
					{#each tableColumnData as col, i}
					<th
						class="be-table__cell"
						style='width: {col.width}px;'
					>
						<div class="cell">{col.label}</div>
					</th>
					{/each}
				</tr>
				</thead>
		</table>
	</div>
	{/if}
	<div class='be-table__body-wrapper be-table--scrollable-x be-scroll-format' style:height>
		<table class="be-table__body">
			<colgroup>
				{#each tableColumnData as col, i}
					<col width={col.width}>
				{/each}
			</colgroup>
			<tbody>
			{#each rowsData as row, index}
			<tr
				class="be-table__row {row.className || ''} {stripe && index%2 === 1 ? 'be-table__row--striped' : ''}"
				style={row.styles}
			>
				{#each tableColumnData as col, i}
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
