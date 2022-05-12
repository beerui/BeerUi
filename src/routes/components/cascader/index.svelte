<script>
	import BeDrawer from './../../../lib/be-drawer/BeDrawer.svelte';
	import { BeRadio } from '$lib';
	import { BeCascader } from '$lib';
	import DemoBlock from '$lib/demo/DemoBlock.svelte';

	let value = ['zhinan','daohang','dingbudaohang'];
	// setTimeout(() => {
	// 	value = 'yizhi';
	// 	console.log('以改变')
	// }, 3000);
	let showAllLevels = false
	let checkStrictly = true
	let config= {
		value: 'id',
		label: 'value'
	}
	let lazy = true
	
	let value1 = ''
	let value2 = ''
	let value3 = ''
	let value4 = ''
	let value5 = ''
	let value6 = ''
	let value7 = '2'
	let expandTrigger = 'hover';

	let options = [{
		value: 'zhinan',
		label: '指南',
		children: [{
			value: 'shejiyuanze',
			// disabled: true,
			label: '设计原则',
			children: [{
				value: 'yizhi',
				label: '一致'
			}, {
				value: 'fankui',
				label: '反馈'
			}, {
				value: 'xiaolv',
				label: '效率'
			}, {
				value: 'kekong',
				label: '可控'
			}]
		}, {
			value: 'daohang',
			label: '导航',
			children: [{
				value: 'cexiangdaohang',
				label: '侧向导航',
				children: [
					{
						value: 'cexiangdaohang22',
						label: '侧向导航22'
					}
				]
			}, {
				value: 'dingbudaohang',
				label: '顶部导航'
			}]
		}]
	}, {
		value: 'zujian',
		label: '组件',
		children: [{
			value: 'basic',
			label: 'Basic',
			children: [{
				value: 'layout',
				label: 'Layout 布局'
			}, {
				value: 'color',
				label: 'Color 色彩'
			}, {
				value: 'typography',
				label: 'Typography 字体'
			}, {
				value: 'icon',
				label: 'Icon 图标'
			}, {
				value: 'button',
				label: 'Button 按钮'
			}]
		}, {
			value: 'form',
			label: 'Form',
			children: [{
				value: 'radio',
				label: 'Radio 单选框'
			}, {
				value: 'checkbox',
				label: 'Checkbox 多选框'
			}, {
				value: 'input',
				label: 'Input 输入框'
			}, {
				value: 'input-number',
				label: 'InputNumber 计数器'
			}, {
				value: 'select',
				label: 'Select 选择器'
			}, {
				value: 'cascader',
				label: 'Cascader 级联选择器'
			}, {
				value: 'switch',
				label: 'Switch 开关'
			}, {
				value: 'slider',
				label: 'Slider 滑块'
			}, {
				value: 'time-picker',
				label: 'TimePicker 时间选择器'
			}, {
				value: 'date-picker',
				label: 'DatePicker 日期选择器'
			}, {
				value: 'datetime-picker',
				label: 'DateTimePicker 日期时间选择器'
			}, {
				value: 'upload',
				label: 'Upload 上传'
			}, {
				value: 'rate',
				label: 'Rate 评分'
			}, {
				value: 'form',
				label: 'Form 表单'
			}]
		}, {
			value: 'data',
			label: 'Data',
			children: [{
				value: 'table',
				label: 'Table 表格'
			}, {
				value: 'tag',
				label: 'Tag 标签'
			}, {
				value: 'progress',
				label: 'Progress 进度条'
			}, {
				value: 'tree',
				label: 'Tree 树形控件'
			}, {
				value: 'pagination',
				label: 'Pagination 分页'
			}, {
				value: 'badge',
				label: 'Badge 标记'
			}]
		}, {
			value: 'notice',
			label: 'Notice',
			children: [{
				value: 'alert',
				label: 'Alert 警告'
			}, {
				value: 'loading',
				label: 'Loading 加载'
			}, {
				value: 'message',
				label: 'Message 消息提示'
			}, {
				value: 'message-box',
				label: 'MessageBox 弹框'
			}, {
				value: 'notification',
				label: 'Notification 通知'
			}]
		}, {
			value: 'navigation',
			label: 'Navigation',
			children: [{
				value: 'menu',
				label: 'NavMenu 导航菜单'
			}, {
				value: 'tabs',
				label: 'Tabs 标签页'
			}, {
				value: 'breadcrumb',
				label: 'Breadcrumb 面包屑'
			}, {
				value: 'dropdown',
				label: 'Dropdown 下拉菜单'
			}, {
				value: 'steps',
				label: 'Steps 步骤条'
			}]
		}, {
			value: 'others',
			label: 'Others',
			children: [{
				value: 'dialog',
				label: 'Dialog 对话框'
			}, {
				value: 'tooltip',
				label: 'Tooltip 文字提示'
			}, {
				value: 'popover',
				label: 'Popover 弹出框'
			}, {
				value: 'card',
				label: 'Card 卡片'
			}, {
				value: 'carousel',
				label: 'Carousel 走马灯'
			}, {
				value: 'collapse',
				label: 'Collapse 折叠面板'
			}]
		}]
	}, {
		value: 'ziyuan',
		label: '资源',
		children: [{
			value: 'axure',
			label: 'Axure Components'
		}, {
			value: 'sketch',
			label: 'Sketch Templates'
		}, {
			value: 'jiaohu',
			label: '组件交互文档'
		}]
	}]
	let options1 = [{
		value: 'zhinan',
		label: '指南',
		children: [{
			value: 'shejiyuanze',
			disabled: true,
			label: '设计原则',
			children: [{
				value: 'yizhi',
				label: '一致'
			}, {
				value: 'fankui',
				label: '反馈'
			}, {
				value: 'xiaolv',
				label: '效率'
			}, {
				value: 'kekong',
				label: '可控'
			}]
		}, {
			value: 'daohang',
			label: '导航',
			children: [{
				value: 'cexiangdaohang',
				label: '侧向导航',
				children: [
					{
						value: 'cexiangdaohang22',
						label: '侧向导航22'
					}
				]
			}, {
				value: 'dingbudaohang',
				label: '顶部导航'
			}]
		}]
	}, {
		value: 'zujian',
		label: '组件',
		children: [{
			value: 'basic',
			label: 'Basic',
			children: [{
				value: 'layout',
				label: 'Layout 布局'
			}, {
				value: 'color',
				label: 'Color 色彩'
			}, {
				value: 'typography',
				label: 'Typography 字体'
			}, {
				value: 'icon',
				label: 'Icon 图标'
			}, {
				value: 'button',
				label: 'Button 按钮'
			}]
		}, {
			value: 'form',
			label: 'Form',
			children: [{
				value: 'radio',
				label: 'Radio 单选框'
			}, {
				value: 'checkbox',
				label: 'Checkbox 多选框'
			}, {
				value: 'input',
				label: 'Input 输入框'
			}, {
				value: 'input-number',
				label: 'InputNumber 计数器'
			}, {
				value: 'select',
				label: 'Select 选择器'
			}, {
				value: 'cascader',
				label: 'Cascader 级联选择器'
			}, {
				value: 'switch',
				label: 'Switch 开关'
			}, {
				value: 'slider',
				label: 'Slider 滑块'
			}, {
				value: 'time-picker',
				label: 'TimePicker 时间选择器'
			}, {
				value: 'date-picker',
				label: 'DatePicker 日期选择器'
			}, {
				value: 'datetime-picker',
				label: 'DateTimePicker 日期时间选择器'
			}, {
				value: 'upload',
				label: 'Upload 上传'
			}, {
				value: 'rate',
				label: 'Rate 评分'
			}, {
				value: 'form',
				label: 'Form 表单'
			}]
		}, {
			value: 'data',
			label: 'Data',
			children: [{
				value: 'table',
				label: 'Table 表格'
			}, {
				value: 'tag',
				label: 'Tag 标签'
			}, {
				value: 'progress',
				label: 'Progress 进度条'
			}, {
				value: 'tree',
				label: 'Tree 树形控件'
			}, {
				value: 'pagination',
				label: 'Pagination 分页'
			}, {
				value: 'badge',
				label: 'Badge 标记'
			}]
		}, {
			value: 'notice',
			label: 'Notice',
			children: [{
				value: 'alert',
				label: 'Alert 警告'
			}, {
				value: 'loading',
				label: 'Loading 加载'
			}, {
				value: 'message',
				label: 'Message 消息提示'
			}, {
				value: 'message-box',
				label: 'MessageBox 弹框'
			}, {
				value: 'notification',
				label: 'Notification 通知'
			}]
		}, {
			value: 'navigation',
			label: 'Navigation',
			children: [{
				value: 'menu',
				label: 'NavMenu 导航菜单'
			}, {
				value: 'tabs',
				label: 'Tabs 标签页'
			}, {
				value: 'breadcrumb',
				label: 'Breadcrumb 面包屑'
			}, {
				value: 'dropdown',
				label: 'Dropdown 下拉菜单'
			}, {
				value: 'steps',
				label: 'Steps 步骤条'
			}]
		}, {
			value: 'others',
			label: 'Others',
			children: [{
				value: 'dialog',
				label: 'Dialog 对话框'
			}, {
				value: 'tooltip',
				label: 'Tooltip 文字提示'
			}, {
				value: 'popover',
				label: 'Popover 弹出框'
			}, {
				value: 'card',
				label: 'Card 卡片'
			}, {
				value: 'carousel',
				label: 'Carousel 走马灯'
			}, {
				value: 'collapse',
				label: 'Collapse 折叠面板'
			}]
		}]
	}, {
		value: 'ziyuan',
		label: '资源',
		children: [{
			value: 'axure',
			label: 'Axure Components'
		}, {
			value: 'sketch',
			label: 'Sketch Templates'
		}, {
			value: 'jiaohu',
			label: '组件交互文档'
		}]
	}]
	let options2 = [{
		id: 'zhinan',
		value: '指南',
		children: [{
			id: 'shejiyuanze',
			// disabled: true,
			value: '设计原则',
			children: [{
				id: 'yizhi',
				value: '一致'
			}, {
				id: 'fankui',
				value: '反馈'
			}, {
				id: 'xiaolv',
				value: '效率'
			}, {
				id: 'kekong',
				value: '可控'
			}]
		}, {
			id: 'daohang',
			value: '导航',
			children: [{
				id: 'cexiangdaohang',
				value: '侧向导航',
				children: [
					{
						id: 'cexiangdaohang22',
						value: '侧向导航22'
					}
				]
			}, {
				id: 'dingbudaohang',
				value: '顶部导航'
			}]
		}]
	}, {
		id: 'zujian',
		value: '组件',
		children: [{
			id: 'basic',
			value: 'Basic',
			children: [{
				id: 'layout',
				value: 'Layout 布局'
			}, {
				id: 'color',
				value: 'Color 色彩'
			}, {
				id: 'typography',
				value: 'Typography 字体'
			}, {
				id: 'icon',
				value: 'Icon 图标'
			}, {
				id: 'button',
				value: 'Button 按钮'
			}]
		}, {
			id: 'form',
			value: 'Form',
			children: [{
				id: 'radio',
				value: 'Radio 单选框'
			}, {
				id: 'checkbox',
				value: 'Checkbox 多选框'
			}, {
				id: 'input',
				value: 'Input 输入框'
			}, {
				id: 'input-number',
				value: 'InputNumber 计数器'
			}, {
				id: 'select',
				value: 'Select 选择器'
			}, {
				id: 'cascader',
				value: 'Cascader 级联选择器'
			}, {
				id: 'switch',
				value: 'Switch 开关'
			}, {
				id: 'slider',
				value: 'Slider 滑块'
			}, {
				id: 'time-picker',
				value: 'TimePicker 时间选择器'
			}, {
				id: 'date-picker',
				value: 'DatePicker 日期选择器'
			}, {
				id: 'datetime-picker',
				value: 'DateTimePicker 日期时间选择器'
			}, {
				id: 'upload',
				value: 'Upload 上传'
			}, {
				id: 'rate',
				value: 'Rate 评分'
			}, {
				id: 'form',
				value: 'Form 表单'
			}]
		}, {
			id: 'data',
			value: 'Data',
			children: [{
				id: 'table',
				value: 'Table 表格'
			}, {
				id: 'tag',
				value: 'Tag 标签'
			}, {
				id: 'progress',
				value: 'Progress 进度条'
			}, {
				id: 'tree',
				value: 'Tree 树形控件'
			}, {
				id: 'pagination',
				value: 'Pagination 分页'
			}, {
				id: 'badge',
				value: 'Badge 标记'
			}]
		}, {
			id: 'notice',
			value: 'Notice',
			children: [{
				id: 'alert',
				value: 'Alert 警告'
			}, {
				id: 'loading',
				value: 'Loading 加载'
			}, {
				id: 'message',
				value: 'Message 消息提示'
			}, {
				id: 'message-box',
				value: 'MessageBox 弹框'
			}, {
				id: 'notification',
				value: 'Notification 通知'
			}]
		}, {
			id: 'navigation',
			value: 'Navigation',
			children: [{
				id: 'menu',
				value: 'NavMenu 导航菜单'
			}, {
				id: 'tabs',
				value: 'Tabs 标签页'
			}, {
				id: 'breadcrumb',
				value: 'Breadcrumb 面包屑'
			}, {
				id: 'dropdown',
				value: 'Dropdown 下拉菜单'
			}, {
				id: 'steps',
				value: 'Steps 步骤条'
			}]
		}, {
			id: 'others',
			value: 'Others',
			children: [{
				id: 'dialog',
				value: 'Dialog 对话框'
			}, {
				id: 'tooltip',
				value: 'Tooltip 文字提示'
			}, {
				id: 'popover',
				value: 'Popover 弹出框'
			}, {
				id: 'card',
				value: 'Card 卡片'
			}, {
				id: 'carousel',
				value: 'Carousel 走马灯'
			}, {
				id: 'collapse',
				value: 'Collapse 折叠面板'
			}]
		}]
	}, {
		id: 'ziyuan',
		value: '资源',
		children: [{
			id: 'axure',
			value: 'Axure Components'
		}, {
			id: 'sketch',
			value: 'Sketch Templates'
		}, {
			id: 'jiaohu',
			value: '组件交互文档'
		}]
	}]
	let lazyOptions = []
	const change = (e) => {
		console.log(e);
	};
	let id = 1;
	setTimeout(() => {
		const res = [{
			value: 'zhinan',
			label: '选项1',
			hasChild: true,
			children: []
		}]
		lazyOptions = res
		// lazyOptions = lazyOptions
	}, 2000);
	const lazyLoad = (node, resolve) => {
		const { level } = node;
		setTimeout(() => {
			const nodes = Array.from({ length: level + 1 })
				.map(item => ({
					value: ++id,
					label: `选项${id}`,
					hasChild: level <= 2
				}));
			// 通过调用resolve将子节点数据返回，通知组件数据加载完成
			resolve(nodes);
		}, 1000);
	}
	let visible = false
</script>
<div class='page-container content'>
	
	<BeDrawer
	bind:visible={visible}
  width="30%"
	direction='rtl'
  title="新增角色"
>	<BeCascader bind:value={value5} options = {options} {checkStrictly}/></BeDrawer>
	<h2 on:click={() => visible = true}>Cascader 级联选择器</h2>
	<p>当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择</p>
	<h3>基本用法</h3>
	<p>有两种触发子菜单的方式</p>
	<DemoBlock code={`
  <BeCascader bind:value={value} {options} />
  <BeCascader bind:value={value1} {options} {expandTrigger}/>`}
	           js={`
       let value = ['zhinan', 'daohang', 'dingbudaohang']
       let value1 = []
       let expandTrigger = 'hover'
       let options = [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航',
              children: [
                {
                  value: 'cexiangdaohang22',
                  label: '侧向导航22',
                }
              ]
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }]
        const change = (e) => {
          console.log(e);
        }
        `}
	>
		<div slot='source'>
			<div class='flex justify-around'>
				<BeCascader bind:value={value} options = {options}/>
				<BeCascader bind:value={value1} {options} {expandTrigger} />
			</div>
		</div>
		<div slot='description'>
			只需为 Cascader 的options属性指定选项数组即可渲染出一个级联选择器。通过expandTrigger可以定义展开子级菜单的触发方式。
		</div>
	</DemoBlock>
	<h3>禁用选项和清除按钮</h3>
	<p>通过在数据源中设置<code>disabled</code>字段来声明该选项是禁用的。通过 <code>clearable</code> 设置输入框可清空</p>
	<DemoBlock code={`
	<BeCascader bind:value={value2} {options} />
	<BeCascader bind:value={value3} {options} clearable/>`}
	js={`
		let value2 = []
		let value3 = []
		let options = [{
			value: 'zhinan',
			label: '指南',
			children: [{
				value: 'shejiyuanze',
				label: '设计原则',
				disabled: true,
				children: [{
					value: 'yizhi',
					label: '一致'
				}, {
					value: 'fankui',
					label: '反馈'
				}, {
					value: 'xiaolv',
					label: '效率'
				}, {
					value: 'kekong',
					label: '可控'
				}]
			}, {
				value: 'daohang',
				label: '导航',
				children: [{
					value: 'cexiangdaohang',
					label: '侧向导航',
					children: [
						{
							value: 'cexiangdaohang22',
							label: '侧向导航22',
						}
					]
				}, {
					value: 'dingbudaohang',
					label: '顶部导航'
				}]
			}]
		}, {
			value: 'zujian',
			label: '组件',
			children: [{
				value: 'basic',
				label: 'Basic',
				children: [{
					value: 'layout',
					label: 'Layout 布局'
				}, {
					value: 'color',
					label: 'Color 色彩'
				}, {
					value: 'typography',
					label: 'Typography 字体'
				}, {
					value: 'icon',
					label: 'Icon 图标'
				}, {
					value: 'button',
					label: 'Button 按钮'
				}]
			}, {
				value: 'form',
				label: 'Form',
				children: [{
					value: 'radio',
					label: 'Radio 单选框'
				}, {
					value: 'checkbox',
					label: 'Checkbox 多选框'
				}, {
					value: 'input',
					label: 'Input 输入框'
				}, {
					value: 'input-number',
					label: 'InputNumber 计数器'
				}, {
					value: 'select',
					label: 'Select 选择器'
				}, {
					value: 'cascader',
					label: 'Cascader 级联选择器'
				}, {
					value: 'switch',
					label: 'Switch 开关'
				}, {
					value: 'slider',
					label: 'Slider 滑块'
				}, {
					value: 'time-picker',
					label: 'TimePicker 时间选择器'
				}, {
					value: 'date-picker',
					label: 'DatePicker 日期选择器'
				}, {
					value: 'datetime-picker',
					label: 'DateTimePicker 日期时间选择器'
				}, {
					value: 'upload',
					label: 'Upload 上传'
				}, {
					value: 'rate',
					label: 'Rate 评分'
				}, {
					value: 'form',
					label: 'Form 表单'
				}]
			}, {
				value: 'data',
				label: 'Data',
				children: [{
					value: 'table',
					label: 'Table 表格'
				}, {
					value: 'tag',
					label: 'Tag 标签'
				}, {
					value: 'progress',
					label: 'Progress 进度条'
				}, {
					value: 'tree',
					label: 'Tree 树形控件'
				}, {
					value: 'pagination',
					label: 'Pagination 分页'
				}, {
					value: 'badge',
					label: 'Badge 标记'
				}]
			}, {
				value: 'notice',
				label: 'Notice',
				children: [{
					value: 'alert',
					label: 'Alert 警告'
				}, {
					value: 'loading',
					label: 'Loading 加载'
				}, {
					value: 'message',
					label: 'Message 消息提示'
				}, {
					value: 'message-box',
					label: 'MessageBox 弹框'
				}, {
					value: 'notification',
					label: 'Notification 通知'
				}]
			}, {
				value: 'navigation',
				label: 'Navigation',
				children: [{
					value: 'menu',
					label: 'NavMenu 导航菜单'
				}, {
					value: 'tabs',
					label: 'Tabs 标签页'
				}, {
					value: 'breadcrumb',
					label: 'Breadcrumb 面包屑'
				}, {
					value: 'dropdown',
					label: 'Dropdown 下拉菜单'
				}, {
					value: 'steps',
					label: 'Steps 步骤条'
				}]
			}, {
				value: 'others',
				label: 'Others',
				children: [{
					value: 'dialog',
					label: 'Dialog 对话框'
				}, {
					value: 'tooltip',
					label: 'Tooltip 文字提示'
				}, {
					value: 'popover',
					label: 'Popover 弹出框'
				}, {
					value: 'card',
					label: 'Card 卡片'
				}, {
					value: 'carousel',
					label: 'Carousel 走马灯'
				}, {
					value: 'collapse',
					label: 'Collapse 折叠面板'
				}]
			}]
		}, {
			value: 'ziyuan',
			label: '资源',
			children: [{
				value: 'axure',
				label: 'Axure Components'
			}, {
				value: 'sketch',
				label: 'Sketch Templates'
			}, {
				value: 'jiaohu',
				label: '组件交互文档'
			}]
		}]
	`}
		>
			<div slot='source'>
				<div class='flex justify-around'>
					<BeCascader bind:value={value2} options = {options1} />
					<BeCascader bind:value={value3} options = {options} clearable/>
				</div>
			</div>
		</DemoBlock>
	<h3>显示最后一级</h3>
	<p>可以仅在输入框中显示选中项最后一级的标签，而不是选中项所在的完整路径。</p>
	<DemoBlock code={`
		<BeCascader bind:value={value} {options} {showAllLevels}/>
		<BeCascader bind:value={value2} {options2} {config}/>`}
		js={`
			let value = []
			let showAllLevels = false
			let options = [{
				value: 'zhinan',
				label: '指南',
				children: [{
					value: 'shejiyuanze',
					label: '设计原则',
					children: [{
						value: 'yizhi',
						label: '一致'
					}, {
						value: 'fankui',
						label: '反馈'
					}, {
						value: 'xiaolv',
						label: '效率'
					}, {
						value: 'kekong',
						label: '可控'
					}]
				}, {
					value: 'daohang',
					label: '导航',
					children: [{
						value: 'cexiangdaohang',
						label: '侧向导航',
						children: [
							{
								value: 'cexiangdaohang22',
								label: '侧向导航22',
							}
						]
					}, {
						value: 'dingbudaohang',
						label: '顶部导航'
					}]
				}]
			}, {
				value: 'zujian',
				label: '组件',
				children: [{
					value: 'basic',
					label: 'Basic',
					children: [{
						value: 'layout',
						label: 'Layout 布局'
					}, {
						value: 'color',
						label: 'Color 色彩'
					}, {
						value: 'typography',
						label: 'Typography 字体'
					}, {
						value: 'icon',
						label: 'Icon 图标'
					}, {
						value: 'button',
						label: 'Button 按钮'
					}]
				}, {
					value: 'form',
					label: 'Form',
					children: [{
						value: 'radio',
						label: 'Radio 单选框'
					}, {
						value: 'checkbox',
						label: 'Checkbox 多选框'
					}, {
						value: 'input',
						label: 'Input 输入框'
					}, {
						value: 'input-number',
						label: 'InputNumber 计数器'
					}, {
						value: 'select',
						label: 'Select 选择器'
					}, {
						value: 'cascader',
						label: 'Cascader 级联选择器'
					}, {
						value: 'switch',
						label: 'Switch 开关'
					}, {
						value: 'slider',
						label: 'Slider 滑块'
					}, {
						value: 'time-picker',
						label: 'TimePicker 时间选择器'
					}, {
						value: 'date-picker',
						label: 'DatePicker 日期选择器'
					}, {
						value: 'datetime-picker',
						label: 'DateTimePicker 日期时间选择器'
					}, {
						value: 'upload',
						label: 'Upload 上传'
					}, {
						value: 'rate',
						label: 'Rate 评分'
					}, {
						value: 'form',
						label: 'Form 表单'
					}]
				}, {
					value: 'data',
					label: 'Data',
					children: [{
						value: 'table',
						label: 'Table 表格'
					}, {
						value: 'tag',
						label: 'Tag 标签'
					}, {
						value: 'progress',
						label: 'Progress 进度条'
					}, {
						value: 'tree',
						label: 'Tree 树形控件'
					}, {
						value: 'pagination',
						label: 'Pagination 分页'
					}, {
						value: 'badge',
						label: 'Badge 标记'
					}]
				}, {
					value: 'notice',
					label: 'Notice',
					children: [{
						value: 'alert',
						label: 'Alert 警告'
					}, {
						value: 'loading',
						label: 'Loading 加载'
					}, {
						value: 'message',
						label: 'Message 消息提示'
					}, {
						value: 'message-box',
						label: 'MessageBox 弹框'
					}, {
						value: 'notification',
						label: 'Notification 通知'
					}]
				}, {
					value: 'navigation',
					label: 'Navigation',
					children: [{
						value: 'menu',
						label: 'NavMenu 导航菜单'
					}, {
						value: 'tabs',
						label: 'Tabs 标签页'
					}, {
						value: 'breadcrumb',
						label: 'Breadcrumb 面包屑'
					}, {
						value: 'dropdown',
						label: 'Dropdown 下拉菜单'
					}, {
						value: 'steps',
						label: 'Steps 步骤条'
					}]
				}, {
					value: 'others',
					label: 'Others',
					children: [{
						value: 'dialog',
						label: 'Dialog 对话框'
					}, {
						value: 'tooltip',
						label: 'Tooltip 文字提示'
					}, {
						value: 'popover',
						label: 'Popover 弹出框'
					}, {
						value: 'card',
						label: 'Card 卡片'
					}, {
						value: 'carousel',
						label: 'Carousel 走马灯'
					}, {
						value: 'collapse',
						label: 'Collapse 折叠面板'
					}]
				}]
			}, {
				value: 'ziyuan',
				label: '资源',
				children: [{
					value: 'axure',
					label: 'Axure Components'
				}, {
					value: 'sketch',
					label: 'Sketch Templates'
				}, {
					value: 'jiaohu',
					label: '组件交互文档'
				}]
			}]
			
		`}
			>
		<div slot='source'>
			<div class='flex justify-around'>
				<BeCascader bind:value={value4} options = {options} {showAllLevels}/>
			</div>
		</div>
		<div slot='description'>
			属性showAllLevels定义了是否显示完整的路径，将其赋值为false则仅显示最后一级,也可通过config配置value和label
		</div>
	</DemoBlock>
	<h3>选择任意一级选项</h3>
	<p>在单选模式下，你只能选择叶子节点；启用该功能后，可让父子节点取消关联，选择任意一级选项(目前只有单选选项)</p>
	<DemoBlock code={`
		<BeCascader bind:value={value} {options} {checkStrictly}/>`}
		js={`
			let value = []
			let checkStrictly = true
			let options = [{
				value: 'zhinan',
				label: '指南',
				children: [{
					value: 'shejiyuanze',
					label: '设计原则',
					children: [{
						value: 'yizhi',
						label: '一致'
					}, {
						value: 'fankui',
						label: '反馈'
					}, {
						value: 'xiaolv',
						label: '效率'
					}, {
						value: 'kekong',
						label: '可控'
					}]
				}, {
					value: 'daohang',
					label: '导航',
					children: [{
						value: 'cexiangdaohang',
						label: '侧向导航',
						children: [
							{
								value: 'cexiangdaohang22',
								label: '侧向导航22',
							}
						]
					}, {
						value: 'dingbudaohang',
						label: '顶部导航'
					}]
				}]
			}, {
				value: 'zujian',
				label: '组件',
				children: [{
					value: 'basic',
					label: 'Basic',
					children: [{
						value: 'layout',
						label: 'Layout 布局'
					}, {
						value: 'color',
						label: 'Color 色彩'
					}, {
						value: 'typography',
						label: 'Typography 字体'
					}, {
						value: 'icon',
						label: 'Icon 图标'
					}, {
						value: 'button',
						label: 'Button 按钮'
					}]
				}, {
					value: 'form',
					label: 'Form',
					children: [{
						value: 'radio',
						label: 'Radio 单选框'
					}, {
						value: 'checkbox',
						label: 'Checkbox 多选框'
					}, {
						value: 'input',
						label: 'Input 输入框'
					}, {
						value: 'input-number',
						label: 'InputNumber 计数器'
					}, {
						value: 'select',
						label: 'Select 选择器'
					}, {
						value: 'cascader',
						label: 'Cascader 级联选择器'
					}, {
						value: 'switch',
						label: 'Switch 开关'
					}, {
						value: 'slider',
						label: 'Slider 滑块'
					}, {
						value: 'time-picker',
						label: 'TimePicker 时间选择器'
					}, {
						value: 'date-picker',
						label: 'DatePicker 日期选择器'
					}, {
						value: 'datetime-picker',
						label: 'DateTimePicker 日期时间选择器'
					}, {
						value: 'upload',
						label: 'Upload 上传'
					}, {
						value: 'rate',
						label: 'Rate 评分'
					}, {
						value: 'form',
						label: 'Form 表单'
					}]
				}, {
					value: 'data',
					label: 'Data',
					children: [{
						value: 'table',
						label: 'Table 表格'
					}, {
						value: 'tag',
						label: 'Tag 标签'
					}, {
						value: 'progress',
						label: 'Progress 进度条'
					}, {
						value: 'tree',
						label: 'Tree 树形控件'
					}, {
						value: 'pagination',
						label: 'Pagination 分页'
					}, {
						value: 'badge',
						label: 'Badge 标记'
					}]
				}, {
					value: 'notice',
					label: 'Notice',
					children: [{
						value: 'alert',
						label: 'Alert 警告'
					}, {
						value: 'loading',
						label: 'Loading 加载'
					}, {
						value: 'message',
						label: 'Message 消息提示'
					}, {
						value: 'message-box',
						label: 'MessageBox 弹框'
					}, {
						value: 'notification',
						label: 'Notification 通知'
					}]
				}, {
					value: 'navigation',
					label: 'Navigation',
					children: [{
						value: 'menu',
						label: 'NavMenu 导航菜单'
					}, {
						value: 'tabs',
						label: 'Tabs 标签页'
					}, {
						value: 'breadcrumb',
						label: 'Breadcrumb 面包屑'
					}, {
						value: 'dropdown',
						label: 'Dropdown 下拉菜单'
					}, {
						value: 'steps',
						label: 'Steps 步骤条'
					}]
				}, {
					value: 'others',
					label: 'Others',
					children: [{
						value: 'dialog',
						label: 'Dialog 对话框'
					}, {
						value: 'tooltip',
						label: 'Tooltip 文字提示'
					}, {
						value: 'popover',
						label: 'Popover 弹出框'
					}, {
						value: 'card',
						label: 'Card 卡片'
					}, {
						value: 'carousel',
						label: 'Carousel 走马灯'
					}, {
						value: 'collapse',
						label: 'Collapse 折叠面板'
					}]
				}]
			}, {
				value: 'ziyuan',
				label: '资源',
				children: [{
					value: 'axure',
					label: 'Axure Components'
				}, {
					value: 'sketch',
					label: 'Sketch Templates'
				}, {
					value: 'jiaohu',
					label: '组件交互文档'
				}]
			}]
		`}
			>
		<div slot='source'>
			<div class='flex justify-around'>
				<BeCascader bind:value={value5} options = {options} {checkStrictly}/>
			</div>
		</div>
		<div slot='description'>
			通过checkStrictly 来设置父子节点取消选中关联，从而达到选择任意一级选项的目的。
		</div>
	</DemoBlock>
	<h3>自定义value和label</h3>
	<p> 指定选项的值和选项标签为选项对象的某个属性值</p>
	<DemoBlock code={`
		<BeCascader bind:value={value} {options} {config}/>`}
		js={`
			let value = []
			let config = {
				value: 'id',
				label: 'value',
				children: 'children'
			}
			let options = [{
				id: 'zhinan',
				value: '指南',
				children: [{
					id: 'shejiyuanze',
					// disabled: true,
					value: '设计原则',
					children: [{
						id: 'yizhi',
						value: '一致'
					}, {
						id: 'fankui',
						value: '反馈'
					}, {
						id: 'xiaolv',
						value: '效率'
					}, {
						id: 'kekong',
						value: '可控'
					}]
				}, {
					id: 'daohang',
					value: '导航',
					children: [{
						id: 'cexiangdaohang',
						value: '侧向导航',
						children: [
							{
								id: 'cexiangdaohang22',
								value: '侧向导航22'
							}
						]
					}, {
						id: 'dingbudaohang',
						value: '顶部导航'
					}]
				}]
			}, {
				id: 'zujian',
				value: '组件',
				children: [{
					id: 'basic',
					value: 'Basic',
					children: [{
						id: 'layout',
						value: 'Layout 布局'
					}, {
						id: 'color',
						value: 'Color 色彩'
					}, {
						id: 'typography',
						value: 'Typography 字体'
					}, {
						id: 'icon',
						value: 'Icon 图标'
					}, {
						id: 'button',
						value: 'Button 按钮'
					}]
				}, {
					id: 'form',
					value: 'Form',
					children: [{
						id: 'radio',
						value: 'Radio 单选框'
					}, {
						id: 'checkbox',
						value: 'Checkbox 多选框'
					}, {
						id: 'input',
						value: 'Input 输入框'
					}, {
						id: 'input-number',
						value: 'InputNumber 计数器'
					}, {
						id: 'select',
						value: 'Select 选择器'
					}, {
						id: 'cascader',
						value: 'Cascader 级联选择器'
					}, {
						id: 'switch',
						value: 'Switch 开关'
					}, {
						id: 'slider',
						value: 'Slider 滑块'
					}, {
						id: 'time-picker',
						value: 'TimePicker 时间选择器'
					}, {
						id: 'date-picker',
						value: 'DatePicker 日期选择器'
					}, {
						id: 'datetime-picker',
						value: 'DateTimePicker 日期时间选择器'
					}, {
						id: 'upload',
						value: 'Upload 上传'
					}, {
						id: 'rate',
						value: 'Rate 评分'
					}, {
						id: 'form',
						value: 'Form 表单'
					}]
				}, {
					id: 'data',
					value: 'Data',
					children: [{
						id: 'table',
						value: 'Table 表格'
					}, {
						id: 'tag',
						value: 'Tag 标签'
					}, {
						id: 'progress',
						value: 'Progress 进度条'
					}, {
						id: 'tree',
						value: 'Tree 树形控件'
					}, {
						id: 'pagination',
						value: 'Pagination 分页'
					}, {
						id: 'badge',
						value: 'Badge 标记'
					}]
				}, {
					id: 'notice',
					value: 'Notice',
					children: [{
						id: 'alert',
						value: 'Alert 警告'
					}, {
						id: 'loading',
						value: 'Loading 加载'
					}, {
						id: 'message',
						value: 'Message 消息提示'
					}, {
						id: 'message-box',
						value: 'MessageBox 弹框'
					}, {
						id: 'notification',
						value: 'Notification 通知'
					}]
				}, {
					id: 'navigation',
					value: 'Navigation',
					children: [{
						id: 'menu',
						value: 'NavMenu 导航菜单'
					}, {
						id: 'tabs',
						value: 'Tabs 标签页'
					}, {
						id: 'breadcrumb',
						value: 'Breadcrumb 面包屑'
					}, {
						id: 'dropdown',
						value: 'Dropdown 下拉菜单'
					}, {
						id: 'steps',
						value: 'Steps 步骤条'
					}]
				}, {
					id: 'others',
					value: 'Others',
					children: [{
						id: 'dialog',
						value: 'Dialog 对话框'
					}, {
						id: 'tooltip',
						value: 'Tooltip 文字提示'
					}, {
						id: 'popover',
						value: 'Popover 弹出框'
					}, {
						id: 'card',
						value: 'Card 卡片'
					}, {
						id: 'carousel',
						value: 'Carousel 走马灯'
					}, {
						id: 'collapse',
						value: 'Collapse 折叠面板'
					}]
				}]
			}, {
				id: 'ziyuan',
				value: '资源',
				children: [{
					id: 'axure',
					value: 'Axure Components'
				}, {
					id: 'sketch',
					value: 'Sketch Templates'
				}, {
					id: 'jiaohu',
					value: '组件交互文档'
				}]
			}]
		`}
			>
		<div slot='source'>
			<div class='flex justify-around'>
				<BeCascader bind:value={value6} options = {options2} {config}/>
			</div>
		</div>
		<div slot='description'>
			通过config 来设置自定义选项的值。默认取对象中的value和label
		</div>
	</DemoBlock>
	<h3>动态加载</h3>
	<p>当选中某一级时，动态加载该级下的选项。</p>
	<DemoBlock code = {
		`<BeCascader bind:value={value} lazy = {true} bind:options = {lazyOptions} lazyLoad = {lazyLoad}/>`}
		js={`
		let value = []
		let id = 1;
		let lazyOptions = [
			{
				value: 'zhinan',
				label: '选项1',
				hasChild: true,
				children: []
			}
		]
		const lazyLoad = (node, resolve) => {
			const { level } = node;
			setTimeout(() => {
				const nodes = Array.from({ length: level + 1 })
					.map(item => ({
						value: ++id,
						label: `+'`'+`选项`+'${id}'+'`'+`,
						hasChild: level <= 2
					}));
				// 通过调用resolve将子节点数据返回，通知组件数据加载完成
				resolve(nodes);
			}, 1000);
		}`}>
		<div slot='source'>
			<div class='flex justify-around'>
				<BeCascader bind:value={value7} lazy = {true} bind:options = {lazyOptions} lazyLoad = {lazyLoad}/>
			</div>
		</div>
		<div slot='description'>
			通过<code>lazy</code>开启动态加载，并通过<code>lazyload</code>来设置加载数据源的方法。<code>lazyload</code>方法有两个参数，第一个参数<code>node</code>为当前点击的节点，第二个<code>resolve</code>为数据加载完成的回调(必须调用)。了更准确的显示节点的状态，还可以对节点数据添加是否为叶子节点的标志位 (默认字段为hasChild)，否则会简单的以有无子节点来判断是否为叶子节点。
		</div>
	</DemoBlock>
</div>
