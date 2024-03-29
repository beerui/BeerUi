<script lang='ts'>
	import { createEventDispatcher, onDestroy, onMount, tick } from 'svelte';
	import { addClass, filterClass, off, on } from "$lib/utils/beerui";
    import BeCheckbox from "$lib/be-checkbox/BeCheckbox.svelte";
	import { deepClone } from '$lib/utils';
	import { debounce } from '$lib/utils/throttle';

	// TODO: 自动生成id/给用户传入id的键值
    export let data: any[] = []; // 用户数据
    export let stripe: boolean = false; // 斑马纹 false/true
    export let placeholder: string = ''; // 无数据的时候展示的字段
    export let align: string = ''; // 对齐方式
    export let emptyText: string = '暂无数据'; // 无数据的时候展示的字段
    export let placeholderRegex: Function = (v) => isUndefined(v); // 无数据的判断
    export let border: boolean = false; // 边框 false/true
    export let fullUpdate: boolean = false; // 全量更新 false/true
    export let showHeader: boolean = true; // 显示表头 true/false
    export let height: string = ''; // 定义了height属性，即可实现固定表头的表格
    export let label: string = 'id'; // 定义了selection默认取值
    export let rowClassName: Function = null; // 为 Table 中的某一行添加 class {row, rowIndex}/string
	export let indexMethod: Function = index => index + 1; // 为 Table 中的type为index的添加序号

    const preClass = ['type'];
    const normalClass = ['be-table'];

    // 条纹
    if (stripe) normalClass.push('be-table--striped');
    // 边框
    if (border) normalClass.push('be-table--border');
    // 定死高度
    if (height) normalClass.push('be-table--scrollable-y');
    const _class = [...normalClass, ...filterClass($$props, 'be-table--', preClass)].join(' ');
    export { _class as class };

    let warpElement = null; // 顶层元素
    let tableHeaderWrapper = null; // 表格头元素
    let tableWrapper = null; // 表格元素
    let tbody = null; // tbody元素
    let gutter = 0; // tbody元素
    let scrollLeft = 0; // scrollLeft
    let tableWidth = '0px'; // table width宽度
    let columnElement = null; //
    let columnDom = null; // slot中的dom

    let emptyNum = 0; // 没有设置宽度的数量
    let userWidth = 0; // 用户设置的宽度总数

    let columnData = []; // 列数据
    let columnPropData = []; // 列的Key
	let _columnPropData = [] // 列的源Key
    let rowsData = []; // 行数据
    let headerData = []; // 表头 可渲染Dom Tree
    let headerOriginData = []; // 表头 原始Tree
    let checkList = [] // 选择列表
	let clientTableWidth = 0; // 没有设置宽度的数量

	let isOnMount = false
	let isInit = false
	$: if (isOnMount && isInit && data) updateTableData()
	$: if (isOnMount && isInit && clientTableWidth) computedColumnWidthHandle();

    onMount(() => {
        warpElement && initTable();

	    isOnMount = true
    });
    onDestroy(() => {
        off(tableWrapper, 'scroll', tableHeaderScroll);
    });
    const tableHeaderScroll = (evt) => tableHeaderWrapper.scrollLeft = evt.target.scrollLeft;
    // 计算滚动条宽度
    const getScrollbarWidth = () => {
        const scrollDiv = document.createElement('div');
        scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
        document.body.appendChild(scrollDiv);
        const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
    };

    // 是否存在滚动条
    function eleCanScroll(ele) {
        if (!ele instanceof HTMLElement) return;
        if (ele.scrollTop > 0) return true;
        ele.scrollTop++;
        // 元素不能滚动的话，scrollTop 设置不会生效，还会置为 0
        const top = ele.scrollTop;
        // 重置滚动位置
        top && (ele.scrollTop = 0);
        return top > 0;
    }

    // 计算每一格的宽度
    const computedColumnWidth = (emptyNum, userWidth) => {
        const domWidth = warpElement.clientWidth - userWidth - (eleCanScroll(tableWrapper) ? getScrollbarWidth() : 0);
        // 取余
        const surplus = domWidth % emptyNum;
        if (surplus === 0) return { surplus, width: domWidth / emptyNum };
        const width = (domWidth - surplus) / emptyNum;
        return { surplus, width };
    };
	// data数据改变调用
	const updateTableData = () => {
		// 是否全量更新 dom重新获取 全部重新计算
		if (fullUpdate) {
			initTable()
			return;
		}
		if (!isInit) return
		// 加工行数据
		computedRowsData();
		// 每次更新数据 更新选中状态
		doCheckHandle()
	}
    const initTable = async () => {
        // 获取表头 DOM
        await initTableHeader();
        // 加工列数据
        computedColumnData();
        // 加工行数据
        computedRowsData();
        // DOM渲染完毕 计算滚动条宽度
        await tick();
        // 绑定横向滚动的头部联动
        bindHeaderScroll();
        // 计算表格宽度
        // computedColumnWidthHandle();
	    isInit = true
	    // 每次更新数据 更新选中状态
	    doCheckHandle()
    };
    // 加工行数据
    const computedColumnData = () => {
        columnData = [];
        columnElement = warpElement.querySelectorAll('.be-table__source__column');
        columnElement.forEach(el => columnData.push(getAttrs(el.dataset)));
        // 整理数据 [{prop: 'name', label: '姓名', width: ''}]
        // 取出用户展示字段 存在prop
	    _columnPropData = columnData.filter(el => el['prop']);
	    // _columnPropData = <Array<any>>deepClone(columnPropData)
        // 是否有section
        const hasSection = columnData.some(el => el['prop'] === 'selection');
        if (hasSection) {
          // 增加必须有ID的提示
          const noId = data.some(el => !el[label]);
          if (!noId) console.warn('[BeerUi] we need a \'id\' for selection')
        }

    };
    // 计算表格宽度
    const computedColumnWidthHandle = debounce(() => {
        emptyNum = 0; // 没有设置宽度的数量
        userWidth = 0; // 用户设置的宽度总数
	    columnPropData = <Array<any>>deepClone(_columnPropData)
	    _columnPropData.forEach((el, i) => {
			const item = columnPropData[i]
		    item.width === '' ? emptyNum++ : userWidth += Number(item.width);
		    item.index = i;
        });
        // 计算没有赋值的宽度
        if (emptyNum > 0) {
            // 列宽
            const { surplus, width } = computedColumnWidth(emptyNum, userWidth);
            // 没有设置宽度的数组
            const emptyWidthArr = columnPropData.filter(el => el.width === '');
            // 设置宽度
            emptyWidthArr.forEach((el, i) => columnPropData[el.index]['width'] = i === emptyWidthArr.length - 1 ? String(width + surplus) : String(width));
        }
        // 计算表格宽度
        const columnPropDataWidth = [];
        columnPropData.filter(el => columnPropDataWidth.push(Number(el['width'])));
        const _tableWidth = columnPropDataWidth.reduce((total, num) => total + num);
	    tableWidth =  _tableWidth + 'px'
		// 是否需要滚动
		if (tableWrapper.offsetWidth < _tableWidth) {
			addClass(warpElement, 'be-table--scrollable-y')
			bindWarpHeaderScroll()
		}
    });

    // 加工行数据 类名 style
    const computedRowsData = () => {
        rowsData = [];
        data.forEach((el, i) => {
            let className;
            // 额外的类名
            if (rowClassName) className = doRowClassName({ row: el, rowIndex: i });
            rowsData.push({ ...el, className, index: indexMethod(i) });
        });
    };
    const updateRowsData = () => data.forEach((el, i) => rowsData[i].checked = el.checked);
    const updateOneRowsData = (id) => data.forEach((el, i) => id === el[label] ? rowsData[i].checked = !rowsData[i].checked :'');
    // 绑定横向滚动的头部联动
    const bindHeaderScroll = () => {
        if (eleCanScroll(tableWrapper)) {
            gutter = getScrollbarWidth();
            on(tableWrapper, 'scroll', tableHeaderScroll, { passive: true });
        }
    };
    const bindWarpHeaderScroll = () => {
        gutter = getScrollbarWidth();
        on(tableWrapper, 'scroll', tableHeaderScroll, { passive: true });
    };
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
        if (!columnDom || columnDom.children.length === 0) throw new Error('[Beerui] cant find element.');
        headerOriginData = computedTableHeader(columnDom);
        headerData = convertToRows(headerOriginData);
    };
    const computedTableHeader = (dom) => {
        let result = [];
        Object.entries(dom.children).forEach(el => {
            const _item = el[1];
            const child = getAttrs(_item.dataset);
            if (_item && _item.children.length > 0) {
                child['children'] = computedTableHeader(_item);
            }
            result.push(child);
        });
        return result;
    };

    const doRowClassName = (options) => rowClassName(options);
    // 整理子组件的数据
    const getAttr = (el: Element, value: string) => el.getAttribute(value);
    const getAttrs = (items: DOMStringMap) => {
        const result = {};
        Object.entries(items).forEach(el => el && (result[el[0]] = el[1]));
        return result;
    };

	const dispatch = createEventDispatcher()
    // 全选事件
    let isAllCheck = false;
    let indeterminate = false; // 是否半选状态
	const allCheckHandle = ({ detail }) => {
		data.forEach(el => el.checked = detail.checked)
		checkList = data
		doCheckHandle()
	}
	const clickRowCheckbox = (rows) => {
		data.forEach(el => el[label] === rows[label] ? el.checked = !el.checked : '')
		doCheckHandle()
	}
	// 全部选框的状态
	const allCheckboxState = () => {
		const hasChecked = rowsData.some(el => el.checked) // 当前列表中是否有选中项
		const hasNoChecked = rowsData.some(el => !el.checked) // 当前列表中是否有未选中项
		if (!hasChecked) {
			indeterminate = isAllCheck = false;
			return
		}
		indeterminate = hasChecked && hasNoChecked
		isAllCheck = !indeterminate
	}
	// 程序更新 推送给用户
	const doCheckHandle = () => {
		updateRowsData() // 更新行数据
		allCheckboxState() // 更新选框状态
		dispatchCheckedHandle() // 分发事件
	}
	// 用户手动更新不分发事件
	const userDoCheckHandle = () => {
		updateRowsData() // 更新行数据
		allCheckboxState() // 更新选框状态
	}
	// 对外事件
	// 设置change事件
	const dispatchCheckedHandle = async () => {
		const checkedList = data.filter(el => el.checked)
		const checkedIds = checkedList.map(el => el[label])
	  	await tick()
		dispatch('handleSelectionChangeGetId', checkedIds)
		dispatch('handleSelectionChangeGetRows', checkedList)
	}
	// 设置选中
	export const toggleRowSelection = (rows: string|number[], selected) => {
		if (!Array.isArray(rows)) {
			console.warn('[Beer Ui] params must be Array string|number[1, 2]')
		    return
		}

		if (rows.length === 0) {
			clearSelection()
		} else if (typeof selected === 'boolean') {
			rows.forEach(el => data.forEach(item => String(el) === String(item[label]) ? item.checked = selected : ''))
		} else {
			rows.forEach(el => data.forEach(item => {
				if (String(el) === String(item[label])) {
					item.checked = !item.checked
				}
			}))
		}
		userDoCheckHandle()
	}
	// 清空所有
	export const clearSelection = () => {
		data.forEach(el => el.checked = false)
		userDoCheckHandle()
	}
	// 用于多选表格，切换所有行的选中状态
	export const toggleAllSelection = () => {
		data.forEach(el => el.checked = !el.checked)
		userDoCheckHandle()
	}
	// 格式化表格中的数据
	const isUndefined = (v) => v === undefined || v === null
	const computedCell = (val) => {
		if (placeholderRegex(val)) return placeholder
		return val
	}
</script>
<div class={_class}
     bind:this={warpElement}
     style={$$props.style}
     id={$$props.id}
     bind:clientWidth={clientTableWidth}
     class:is-center={align === 'center'}
     class:is-left={align === 'left'}
     class:is-right={align === 'right'}
>
    <div bind:this={columnDom} style='visibility: hidden;position: absolute;z-index: -1;display: none;'>
        <slot></slot>
    </div>
    {#if showHeader}
        <div class='be-table__header-wrapper' bind:this={tableHeaderWrapper}>
            <table class='be-table__body' style:width={tableWidth}>
                <colgroup>
                    {#each columnPropData as col, i}
                        <col width={col.width}>
                    {/each}
                    <col width={gutter}>
                </colgroup>
                <thead class='has-gutter'>
	                {#each headerData as col, i}
	                    <tr>
	                        {#each col as rows}
	                            <th class='be-table__cell'
	                                class:is-center={rows.align === 'center'}
	                                class:is-left={rows.align === 'left'}
	                                class:is-right={rows.align === 'right'}
	                                class:is-header-center={rows['headeralign'] === 'center'}
	                                class:is-header-left={rows['headeralign'] === 'left'}
	                                class:is-header-right={rows['headeralign'] === 'right'}
	                                rowspan={rows.rowSpan}
	                                colspan={rows.colSpan}
	                            >
		                            {#if rows.prop === 'selection'}
			                            <div class="cell">
				                            <BeCheckbox {indeterminate} bind:checked={isAllCheck} on:change={allCheckHandle} />
			                            </div>
		                            {:else}
			                            <div class="cell header-cell">{rows.label}</div>
		                            {/if}
	                            </th>
	                        {/each}
	                        <th class='be-table__cell gutter' style='width: {gutter}px;'></th>
	                    </tr>
	                {/each}
                </thead>
            </table>
        </div>
    {/if}
    <div class='be-table__body-wrapper' bind:this={tableWrapper} style:height>
        <table class='be-table__body' style:width={tableWidth}>
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
                        {#if col.prop === 'tableSlot'}
                            <td class='be-table__cell'
                                class:is-center={col.align === 'center'}
                                class:is-right={col.align === 'right'}
                                class:is-left={col.align === 'left'}
                            >
                                <div class='cell be-table-cell__{i}'>
                                    {#if col.name === 'tableSlot1'}
                                        <slot name='tableSlot1' prop={row}></slot>
                                    {:else if col.name === 'tableSlot2'}
                                        <slot name='tableSlot2' prop={row}></slot>
                                    {:else if col.name === 'tableSlot3'}
                                        <slot name='tableSlot3' prop={row}></slot>
                                    {:else if col.name === 'tableSlot4'}
                                        <slot name='tableSlot4' prop={row}></slot>
                                    {:else if col.name === 'tableSlot5'}
                                        <slot name='tableSlot5' prop={row}></slot>
                                    {:else if col.name === 'tableSlot6'}
                                        <slot name='tableSlot6' prop={row}></slot>
                                    {:else if col.name === 'tableSlot7'}
                                        <slot name='tableSlot7' prop={row}></slot>
                                    {:else if col.name === 'tableSlot8'}
                                        <slot name='tableSlot8' prop={row}></slot>
                                    {:else if col.name === 'tableSlot9'}
                                        <slot name='tableSlot9' prop={row}></slot>
                                    {:else if col.name === 'tableSlot10'}
                                        <slot name='tableSlot10' prop={row}></slot>
                                    {/if}
                                </div>
                            </td>
                        {:else if col.prop === 'selection'}
	                        <td class='be-table__cell'
	                            class:is-center={col.align === 'center'}
	                            class:is-right={col.align === 'right'}
	                            class:is-left={col.align === 'left'}
	                        >
		                        <div class='cell'>
			                        <BeCheckbox on:click={() => clickRowCheckbox(row)} bind:checked={row.checked} />
		                        </div>
	                        </td>
                        {:else if col.prop === 'index'}
	                        <td class='be-table__cell'
	                            class:is-center={col.align === 'center'}
	                            class:is-right={col.align === 'right'}
	                            class:is-left={col.align === 'left'}
	                        >
		                        <div class='cell'>{row.index}</div>
	                        </td>
                        {:else}
                            <td class='be-table__cell'
                                class:is-center={col.align === 'center'}
                                class:is-right={col.align === 'right'}
                                class:is-left={col.align === 'left'}
                            >
                                <div class='cell'>{computedCell(row[col.prop])}</div>
                            </td>
                        {/if}
                    {/each}
                </tr>
            {/each}
            </tbody>
        </table>
	    {#if rowsData.length === 0}
		    <div class="be-table__empty-block" style="height: 100%; width: 100%;">
			    <span class="be-table__empty-text">
				    <slot name='empty'>{emptyText}</slot>
			    </span>
		    </div>
	    {/if}
    </div>
</div>

