<script lang="ts">
  import { onMount } from 'svelte';
  import { filterClass } from '$lib/utils/beerui';
  export let data: any[] = [] // 用户数据
	export let striped: boolean = false // 斑马纹 false/true

  const preClass = ['type']
  const normalClass = ['be-table']

  if (striped) normalClass.push('el-table--striped')
	const _class = [...normalClass, ...filterClass($$props, 'be-table--', preClass)].join(' ')
  export {_class as class};

  console.log($$props);
  console.log($$slots);
  let element = null;
  let elements = null;

  let tableData = []

  onMount(() => {
	  element && initTable()
	})
	const initTable = () => {
	  tableData = []
	  elements = element.querySelectorAll('.be-table__column')
	  elements.forEach((el, i) => {
			tableData.push({ ...getAttrs(el.dataset), data: data[i] })
		})
	  console.log(tableData);
	}

	// 整理子组件的数据
	const getAttr = (el: Element, value: string) => el.getAttribute(value)
	const getAttrs = (items: DOMStringMap) => {
	  const result = {}
		Object.entries(items).forEach(el => el && (result[el[0]] = el[1]))
	  return result
  }
</script>
<div class={_class} bind:this={element}>
	<div class='be-table__header-wrapper'>
		<table class="be-table__body" style="width: 820px;">
			<colgroup>
				<slot></slot>
			</colgroup>
			<thead class="has-gutter">
				<tr class="">
					{#each tableData as cols, i}
					<th
						class="be-table_1_column_{i} is-leaf be-table__cell"
						style='width: {cols.width}px;'
					>
						<div class="cell">{cols.label}</div>
					</th>
					{/each}
				</tr>
				</thead>
		</table>
	</div>
	<div class='be-table__body-wrapper'>
		<table class="be-table__body" style="width: 820px;">
			<colgroup>
				{#each tableData as cols, i}
					<col name="be-table_1_column_{i}" width={cols.width}>
				{/each}
			</colgroup>
			<tbody>
			{#each data as cols, index}
			<tr class="be-table__row {striped && index%2 === 1 ? 'be-table__row--striped' : ''}">
				{#each tableData as rows, i}
				<td class="be-table_1_column_{i} be-table__cell">
					<div class="cell">{cols[rows.prop]}</div>
				</td>
				{/each}
			</tr>
			{/each}
			</tbody>
		</table>
	</div>
</div>
