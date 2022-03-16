<script>
	import { BeRadio } from '$lib';
	import { BeCascader } from '$lib';
	import DemoBlock from '$lib/demo/DemoBlock.svelte';

	let value = 'dingbudaohang';
	let showAllLevels = false
	let checkStrictly = true
	let value1 = ''
	let value2 = ''
	let value3 = ''
	let value4 = ''
	let value5 = ''
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
	const change = (e) => {
		console.log(e);
	};
</script>
<div class='page-container content'>
	<h2>Cascader 级联选择器</h2>
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
				<BeCascader bind:value={value} options={[]} />
				<!-- <BeCascader bind:value={value} {showAllLevels} {options} on:change={change} /> -->
				<!-- <BeCascader bind:value={value2} {checkStrictly} {options} on:change={change} /> -->
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
			<!-- <div slot='description'>
				通过 clearable 设置输入框可清空
			</div> -->
		</DemoBlock>
	<h3>显示最后一级</h3>
	<p>可以仅在输入框中显示选中项最后一级的标签，而不是选中项所在的完整路径。</p>
	<DemoBlock code={`
		<BeCascader bind:value={value} {options} {showAllLevels}/>`}
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
			属性showAllLevels定义了是否显示完整的路径，将其赋值为false则仅显示最后一级
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
</div>
