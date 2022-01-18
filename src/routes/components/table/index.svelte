<script lang="ts">
import BeTable from '$lib/be-table/BeTable.svelte';
import BeTableColumn from '$lib/be-table/BeTableColumn.svelte';

const  tableData = [{
	date: '2016-05-02',
	name: '王小虎',
	address: '上海市普陀区金沙江路 1518 弄'
}, {
	date: '2016-05-04',
	name: '王小虎',
	address: '上海市普陀区金沙江路 1517 弄'
}, {
	date: '2016-05-01',
	name: '王小虎',
	address: '上海市普陀区金沙江路 1519 弄'
}, {
	date: '2016-05-03',
	name: '王小虎',
	address: '上海市普陀区金沙江路 1516 弄'
}]
</script>
<div class='page-container'>
	<h2>BeTable 表格</h2>
	<BeTable data={tableData} striped>
		<BeTableColumn prop="name" label="姓名" />
		<BeTableColumn prop="date" label="日期" />
		<BeTableColumn prop="address" label="地址" />
	</BeTable>
</div>
