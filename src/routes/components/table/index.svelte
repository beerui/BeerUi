<script lang='ts'>
    import BeTable from '$lib/be-table/BeTable.svelte';
    import BeTableColumn from '$lib/be-table/BeTableColumn.svelte';
    import DemoBlock from '$lib/demo/DemoBlock.svelte';
    import BeButton from '$lib/be-button/BeButton.svelte';

    const tableData = [{
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
    }];
    const tableTempData = [{
        date: '2016-05-02',
        a: '2016-05-02',
        b: '2016-05-02',
        c: '2016-05-02',
        name: '王小虎'
    }, {
        date: '2016-05-04',
        name: '王小虎'
    }];
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
    ];
    let tableRowClassName = ({ row, rowIndex }) => {
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
    let clickBtn1 = (row) => {
        console.log('clickBtn1');
        console.log(row);
    };
    let clickBtn2 = () => {
        console.log('clickBtn2');
    };

    const checkBoxTableData = [{
      id: '1',
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      id: '2',
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      id: '3',
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      id: '4',
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      id: '5',
      date: '2016-05-08',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      id: '6',
      date: '2016-05-06',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      id: '7',
      date: '2016-05-07',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }]
</script>
<div class='page-container'>
    <h2>BeTable 表格</h2>
    <ol>
        <li>TODO：优化自定义表格列</li>
        <li>TODO：新增 index 序号</li>
        <li>TODO：新增 selection 多选框</li>
    </ol>
<!--    <DemoBlock code={`-->
<!--<BeTable data={tableData}>-->
<!--	<BeTableColumn prop="name" label="姓名" />-->
<!--	<BeTableColumn prop="date" label="日期" />-->
<!--	<BeTableColumn prop="address" label="地址" />-->
<!--</BeTable>`}-->
<!--               js={`-->
<!--import { BeTable, BeTableColumn} from '@brewer/beerui'-->
<!--const tableData = [{-->
<!--	date: '2016-05-02',-->
<!--	name: '王小虎',-->
<!--	address: '上海市普陀区金沙江路 1518 弄'-->
<!--}, {-->
<!--	date: '2016-05-04',-->
<!--	 name: '王小虎',-->
<!--	 address: '上海市普陀区金沙江路 1517 弄'-->
<!--}, {-->
<!--	date: '2016-05-03',-->
<!--	 name: '王小虎',-->
<!--	 address: '上海市普陀区金沙江路 1519 弄'-->
<!--}, {-->
<!--	date: '2016-05-01',-->
<!--	 name: '王小虎',-->
<!--	 address: '上海市普陀区金沙江路 1519 弄'-->
<!--}]`-->
<!--}-->
<!--    >-->
<!--        <div slot='source'>-->
<!--            <h1>基础表格</h1>-->
<!--            <div class='demo-list'>-->
<!--                <BeTable data={tableData}>-->
<!--                    <BeTableColumn prop='name' label='姓名' />-->
<!--                    <BeTableColumn prop='date' label='日期' />-->
<!--                    <BeTableColumn prop='address' label='地址' />-->
<!--                </BeTable>-->
<!--            </div>-->
<!--        </div>-->
<!--    </DemoBlock>-->
<!--    <DemoBlock-->
<!--            code={-->
<!--		`-->
<!--<BeTable data={tableData} stripe border rowClassName={tableRowClassName}>-->
<!--	<BeTableColumn prop="name" label="姓名" />-->
<!--	<BeTableColumn prop="date" label="日期" />-->
<!--	<BeTableColumn prop="address" label="地址" />-->
<!--</BeTable>-->
<!--		`-->
<!--		}-->
<!--            js={-->
<!--	`-->
<!--let tableRowClassName = ({row, rowIndex}) => {-->
<!--	if (rowIndex === 1) {-->
<!--	return 'warning-row';-->
<!--	} else if (rowIndex === 3) {-->
<!--	return 'success-row';-->
<!--	}-->
<!--	return '';-->
<!--};-->
<!--	`-->
<!--	}>-->
<!--        <div slot='source'>-->
<!--            <h1>带斑马纹/带边框/带状态表格</h1>-->
<!--            <div class='demo-list'>-->
<!--                <BeTable data={tableData} stripe border>-->
<!--                    <BeTableColumn prop='name' label='姓名' />-->
<!--                    <BeTableColumn prop='date' label='日期' />-->
<!--                    <BeTableColumn prop='address' label='地址' />-->
<!--                </BeTable>-->
<!--            </div>-->
<!--            <h1>带状态表格</h1>-->
<!--            <div class='demo-list'>-->
<!--                <BeTable data={tableData} rowClassName={tableRowClassName}>-->
<!--                    <BeTableColumn prop='name' label='姓名' />-->
<!--                    <BeTableColumn prop='date' label='日期' />-->
<!--                    <BeTableColumn prop='address' label='地址' />-->
<!--                </BeTable>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div slot='description'>-->
<!--            stripe、border、rowClassName Table 的样式。-->
<!--        </div>-->
<!--    </DemoBlock>-->
<!--    <DemoBlock>-->
<!--        <div slot='source'>-->
<!--            <h1>固定表头</h1>-->
<!--            <div class='demo-list'>-->
<!--                <BeTable data={[...tableData, ...tableData]} style='width: 100%' height='200px'>-->
<!--                    <BeTableColumn prop='name' width='120' label='姓名' />-->
<!--                    <BeTableColumn prop='date' label='日期' fixed />-->
<!--                    <BeTableColumn prop='address' label='地址' />-->
<!--                </BeTable>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div slot='description'>-->
<!--            只要在be-table元素中定义了 height 属性，即可实现固定表头的表格，而不需要额外的代码。-->
<!--        </div>-->
<!--    </DemoBlock>-->
<!--    <DemoBlock code={-->
<!--	`-->
<!--<BeTable data={mutilTableData} height="250px" border>-->
<!--	<BeTableColumn prop='date' label='日期' width='150' />-->
<!--	<BeTableColumn label="配送信息">-->
<!--		<BeTableColumn prop='name' label='姓名' width='120' />-->
<!--		<BeTableColumn label="地址">-->
<!--			<BeTableColumn prop='province' label='省份' width='120' />-->
<!--			<BeTableColumn prop='city' label='市区' width='120' />-->
<!--			<BeTableColumn prop='address' label='地址' width='300' />-->
<!--			<BeTableColumn prop='zip' label='邮编' />-->
<!--		</BeTableColumn>-->
<!--	</BeTableColumn>-->
<!--</BeTable>-->
<!--	`-->
<!--	}>-->
<!--        <div slot='source'>-->
<!--            <h1>多级表头</h1>-->
<!--            <div class='demo-list' style='width: 900px'>-->
<!--                <BeTable data={mutilTableData} height='250px' border>-->
<!--                    <BeTableColumn prop='date' label='日期' width='150' />-->
<!--                    <BeTableColumn label='配送信息'>-->
<!--                        <BeTableColumn prop='name' label='姓名' width='120' />-->
<!--                        <BeTableColumn label='地址'>-->
<!--                            <BeTableColumn prop='province' label='省份' width='120' />-->
<!--                            <BeTableColumn prop='city' label='市区' width='120' />-->
<!--                            <BeTableColumn prop='address' label='地址' width='300' />-->
<!--                            <BeTableColumn prop='zip' label='邮编' />-->
<!--                        </BeTableColumn>-->
<!--                    </BeTableColumn>-->
<!--                </BeTable>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div slot='description'>-->
<!--            嵌套 BeTableColumn 。-->
<!--        </div>-->
<!--    </DemoBlock>-->
	<h2>多选</h2>
	<p>选择多行数据时使用 Checkbox。</p>
    <DemoBlock code={`
`}
               js={`
`}
    >
        <div slot='source'>
            <h1>自定义表格</h1>
            <div class='demo-list'>
                <BeTable data={checkBoxTableData}>
                    <BeTableColumn prop='selection' width="55" />
                    <BeTableColumn prop='name' label='姓名' />
                    <BeTableColumn prop='date' label='日期' />
                </BeTable>
            </div>
        </div>
        <div slot='description'>
            <ol>
                <li>传入prop为 tableSlot</li>
            </ol>
        </div>
    </DemoBlock>
<!--    <DemoBlock code={`-->
<!--<BeTable data={tableTempData}>-->
<!--	<BeTableColumn prop="name" label="姓名" />-->
<!--	<BeTableColumn prop="date" label="日期" />-->
<!--	<BeTableColumn prop="tableSlot" name='tableSlot1' label="操作1" />-->
<!--	<BeTableColumn prop="tableSlot" name='tableSlot2' label="操作2" />-->
<!--	<div slot="tableSlot1" let:prop={row}>-->
<!--		<BeButton on:click={() => clickBtn1(row)}>默认1</BeButton>-->
<!--		<BeButton>默认1</BeButton>-->
<!--	</div>-->
<!--	<div slot="tableSlot2">-->
<!--		<BeButton on:click={clickBtn2}>默认2</BeButton>-->
<!--		<BeButton>默认2</BeButton>-->
<!--	</div>-->
<!--</BeTable>`}-->
<!--               js={`-->
<!--let clickBtn1 = (row) => {-->
<!--	console.log('clickBtn1');-->
<!--	console.log(row);-->
<!--};-->
<!--let clickBtn2 = () => {-->
<!--	console.log('clickBtn2');-->
<!--};`}-->
<!--    >-->
<!--        <div slot='source'>-->
<!--            <h1>自定义表格</h1>-->
<!--            <div class='demo-list'>-->
<!--                <BeTable data={tableTempData}>-->
<!--                    <BeTableColumn prop='name' label='姓名' />-->
<!--                    <BeTableColumn prop='date' label='日期' />-->
<!--                    <BeTableColumn prop='tableSlot' name='tableSlot1' label='操作1' />-->
<!--                    <BeTableColumn prop='tableSlot' name='tableSlot2' label='操作2' />-->
<!--                    <div slot='tableSlot1' let:prop={row}>-->
<!--                        <BeButton on:click={() => clickBtn1(row)}>默认1</BeButton>-->
<!--                        <BeButton>默认1</BeButton>-->
<!--                    </div>-->
<!--                    <div slot='tableSlot2'>-->
<!--                        <BeButton on:click={clickBtn2}>默认2</BeButton>-->
<!--                        <BeButton>默认2</BeButton>-->
<!--                    </div>-->
<!--                </BeTable>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div slot='description'>-->
<!--            <ol>-->
<!--                <li>传入prop为 tableSlot</li>-->
<!--                <li>提供了 slot/插槽对应到不同的自定义列中</li>-->
<!--                <li>只提供了 tableSlot1 - tableSlot10(待优化)</li>-->
<!--                <li>let:prop绑定的是 当前表格行的数据</li>-->
<!--            </ol>-->
<!--        </div>-->
<!--    </DemoBlock>-->
</div>
<style lang='scss'>
  :global(.be-table .warning-row, .be-table .warning-row td) {
    background-color: var(--warning-main);
    color: var(--text-color-white);
  }

  :global(.be-table .success-row, .be-table .success-row td) {
    background-color: var(--be-primary);
    color: var(--text-color-white);
  }
</style>
