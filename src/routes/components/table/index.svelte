<script lang="ts">
import BeTable from '$lib/be-table/BeTable.svelte';
import BeTableColumn from '$lib/be-table/BeTableColumn.svelte';
import DemoBlock from '$lib/demo/DemoBlock.svelte';
import BeButton from '$lib/be-button/BeButton.svelte';

const  tableData = [{
	date: '2016-05-02',
	name: '王小虎',
	address: '上海市普陀区金沙江路 1518 弄'
}, {
	date: '2016-05-04',
	name: '王小虎',
	address: '上海市普陀区金沙江路 1517 弄'
}, {
	date: '2016-05-03',
	name: '王小虎',
	address: '上海市普陀区金沙江路 1519 弄'
}, {
	date: '2016-05-01',
	name: '王小虎',
	address: '上海市普陀区金沙江路 1519 弄'
}]
const fixedTableData = [
	{
		date: '2016-05-02',
		name: '王小虎',
		province: '上海',
		city: '普陀区',
		address: '上海市普陀区金沙江路 1518 弄',
		zip: 200333
	}, {
		date: '2016-05-04',
		name: '王小虎',
		province: '上海',
		city: '普陀区',
		address: '上海市普陀区金沙江路 1517 弄',
		zip: 200333
	}, {
		date: '2016-05-01',
		name: '王小虎',
		province: '上海',
		city: '普陀区',
		address: '上海市普陀区金沙江路 1519 弄',
		zip: 200333
	}, {
		date: '2016-05-03',
		name: '王小虎',
		province: '上海',
		city: '普陀区',
		address: '上海市普陀区金沙江路 1516 弄',
		zip: 200333
	}
]
let tableRowClassName = ({row, rowIndex}) => {
	console.log('tableRowClassName', row, rowIndex);
	if (rowIndex === 1) {
		return 'warning-row';
	} else if (rowIndex === 3) {
		return 'success-row';
	}
	return '';
};
let mutilTableData = [{
	date: '2016-05-03',
	name: '王小虎',
	province: '上海',
	city: '普陀区',
	address: '上海市普陀区金沙江路 1518 弄',
	zip: 200333
}, {
	date: '2016-05-02',
	name: '王小虎',
	province: '上海',
	city: '普陀区',
	address: '上海市普陀区金沙江路 1518 弄',
	zip: 200333
}, {
	date: '2016-05-04',
	name: '王小虎',
	province: '上海',
	city: '普陀区',
	address: '上海市普陀区金沙江路 1518 弄',
	zip: 200333
}, {
	date: '2016-05-01',
	name: '王小虎',
	province: '上海',
	city: '普陀区',
	address: '上海市普陀区金沙江路 1518 弄',
	zip: 200333
}, {
	date: '2016-05-08',
	name: '王小虎',
	province: '上海',
	city: '普陀区',
	address: '上海市普陀区金沙江路 1518 弄',
	zip: 200333
}, {
	date: '2016-05-06',
	name: '王小虎',
	province: '上海',
	city: '普陀区',
	address: '上海市普陀区金沙江路 1518 弄',
	zip: 200333
}, {
	date: '2016-05-07',
	name: '王小虎',
	province: '上海',
	city: '普陀区',
	address: '上海市普陀区金沙江路 1518 弄',
	zip: 200333
}];
</script>
<div class='page-container'>
	<h2>BeTable 表格</h2>
	<DemoBlock>
		<div slot='source'>
<!--			<h1>基础表格</h1>-->
<!--			<div class='demo-list'>-->
<!--				<BeTable data={tableData}>-->
<!--					<BeTableColumn prop="name" label="姓名" />-->
<!--					<BeTableColumn prop="date" label="日期" />-->
<!--					<BeTableColumn prop="address" label="地址" />-->
<!--				</BeTable>-->
<!--			</div>-->
<!--			<h1>带斑马纹表格</h1>-->
<!--			<div class='demo-list'>-->
<!--				<BeTable data={tableData} stripe>-->
<!--					<BeTableColumn prop="name" label="姓名" />-->
<!--					<BeTableColumn prop="date" label="日期" />-->
<!--					<BeTableColumn prop="address" label="地址" />-->
<!--				</BeTable>-->
<!--			</div>-->
<!--			<h1>带边框表格</h1>-->
<!--			<div class='demo-list'>-->
<!--				<BeTable data={tableData} border>-->
<!--					<BeTableColumn prop="name" label="姓名" />-->
<!--					<BeTableColumn prop="date" label="日期" />-->
<!--					<BeTableColumn prop="address" label="地址" />-->
<!--				</BeTable>-->
<!--			</div>-->
<!--			<h1>带状态表格</h1>-->
<!--			<div class='demo-list'>-->
<!--				<BeTable data={tableData} rowClassName={tableRowClassName}>-->
<!--					<BeTableColumn prop="name" label="姓名" />-->
<!--					<BeTableColumn prop="date" label="日期" />-->
<!--					<BeTableColumn prop="address" label="地址" />-->
<!--				</BeTable>-->
<!--			</div>-->
<!--			<h1>固定表头</h1>-->
<!--			<div class='demo-list'>-->
<!--				<BeTable data={[...tableData, ...tableData]} style="width: 100%">-->
<!--					<BeTableColumn prop="name" width='120' label="姓名" />-->
<!--					<BeTableColumn prop="date" label="日期" fixed />-->
<!--					<BeTableColumn prop="address" label="地址" />-->
<!--				</BeTable>-->
<!--				<div class='demo-desc'>-->
<!--					只要在be-table元素中定义了height属性，即可实现固定表头的表格，而不需要额外的代码。-->
<!--				</div>-->
<!--			</div>-->
<!--			<h1>固定列</h1>-->
<!--			<div class='demo-list' style="width: 900px">-->
<!--				<BeTable data={mutilTableData} height="250px" border>-->
<!--					<BeTableColumn prop='date' label='日期' width='150' />-->
<!--					<BeTableColumn label="配送信息">-->
<!--						<BeTableColumn prop='name' label='姓名' width='120' />-->
<!--						<BeTableColumn label="地址">-->
<!--							<BeTableColumn prop='province' label='省份' width='120' />-->
<!--							<BeTableColumn prop='city' label='市区' width='120' />-->
<!--							<BeTableColumn prop='address' label='地址' width='300' />-->
<!--							<BeTableColumn prop='zip' label='邮编' />-->
<!--						</BeTableColumn>-->
<!--					</BeTableColumn>-->
<!--				</BeTable>-->
<!--				<div class='demo-desc'>-->
<!--					固定列需要使用fixed属性，它接受 Boolean 值或者left/right，表示左边固定还是右边固定。-->
<!--				</div>-->
<!--			</div>-->
					<h1>自定义样式</h1>
					<div class='demo-list'>
						<BeTable data={tableData}>
							<BeTableColumn prop="name" label="姓名" />
							<BeTableColumn prop="date" label="日期" />
							<BeTableColumn prop="address" label="操作">
								<temp slot-scope="scope">
									<BeButton>默认</BeButton>
									<BeButton>默认</BeButton>
								</temp>
							</BeTableColumn>
						</BeTable>
					</div>
		</div>
	</DemoBlock>
</div>
<style lang='scss'>
	:global(.be-table .warning-row, .be-table .warning-row td) {background-color: var(--warning-main);color: var(--text-color-white);}
  :global(.be-table .success-row, .be-table .success-row td) {background-color: var(--be-primary);color: var(--text-color-white);}
</style>
