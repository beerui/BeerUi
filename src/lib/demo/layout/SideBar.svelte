<script lang='ts'>
	import { page } from '$app/stores';
	let menu = '/';
</script>
<section class='nav-container'>
	<div class='nav-container__scroll'>
		<ul>
			<li><a class:active={$page.url.pathname === '/components'} href='/components'>快速开始</a></li>
			<li><span class='base'>基本</span></li>
			<li><a class:active={$page.url.pathname === '/components/icons'} href='/components/icons'>Icons 示例</a></li>
			<li><a class:active={$page.url.pathname === '/components/button'} href='/components/button'>Button 示例</a>
			</li>
			<li><span class='base'>表单</span></li>
			<li><a class:active={$page.url.pathname === '/components/input'} href='/components/input'>Input 示例</a></li>
			<li><a class:active={$page.url.pathname === '/components/textarea'} href='/components/textarea'>Textarea 示例</a></li>
			<li><a class:active={$page.url.pathname === '/components/radio'} href='/components/radio'>Radio 单选框</a></li>
			<li><a class:active={$page.url.pathname === '/components/checkbox'} href='/components/checkbox'>Checkbox
				多选框</a></li>
			<li><a class:active={$page.url.pathname === '/components/switch'} href='/components/switch'>Switch 示例</a>
			</li>
			<li><a class:active={$page.url.pathname === '/components/select'} href='/components/select'>Select 示例</a>
			</li>
			<li><a class:active={$page.url.pathname === '/components/cascader'} href='/components/cascader'>Cascader
				示例</a></li>
			<li><a class:active={$page.url.pathname === '/components/form'} href='/components/form'>Form 示例</a></li>
			<li><a class:active={$page.url.pathname === '/components/upload'} href='/components/upload'>Upload 示例</a>
			</li>
			<li><a class:active={$page.url.pathname === '/components/datePicker'} href='/components/datePicker'>date-picker
				示例</a></li>
			<li><a class:active={$page.url.pathname === '/components/drag'} href='/components/drag'>Drag 拖动排序</a></li>
			<li><span class='base'>data 数据</span></li>
			<li><a class:active={$page.url.pathname === '/components/table'} href='/components/table'>Table 表格</a></li>
			<li><a class:active={$page.url.pathname === '/components/tree'} href='/components/tree'>Tree 树形控件</a></li>
			<li><a class:active={$page.url.pathname === '/components/selectTree'} href='/components/selectTree'>SelectTree
				树形选择控件</a></li>
			<li><a class:active={$page.url.pathname === '/components/pagination'} href='/components/pagination'>Pagination
				分页</a></li>
			<li><a class:active={$page.url.pathname === '/components/progress'} href='/components/progress'>progress
				示例</a></li>
			<li><a class:active={$page.url.pathname === '/components/empty'} href='/components/empty'>Empty 空状态</a></li>
			<li><span class='base'>提示</span></li>
			<li><a class:active={$page.url.pathname === '/components/loading'} href='/components/loading'>Loading 示例</a>
			</li>
			<li><a class:active={$page.url.pathname === '/components/messageBox'} href='/components/messageBox'>MessageBox
				示例</a></li>
			<li><a class:active={$page.url.pathname === '/components/dialog'} href='/components/dialog'>Dialog 示例</a>
			</li>
			<li><a class:active={$page.url.pathname === '/components/alert'} href='/components/alert'>Alert 示例</a></li>
			<li><a class:active={$page.url.pathname === '/components/notice'} href='/components/notice'>Notice 示例</a>
			</li>
			<li><span class='base'>导航 Navigation</span></li>
			<li><a class:active={$page.url.pathname === '/components/tabs'} href='/components/tabs'>Tabs 标签页</a></li>
			<li><a class:active={$page.url.pathname === '/components/menu'} href='/components/menu'>NavMenu 导航菜单</a>
			</li>
			<li><a class:active={$page.url.pathname === '/components/breadcrumb'} href='/components/breadcrumb'>Breadcrumb
				面包屑</a></li>
			<li><span class='base'>其它 Others</span></li>
			<li><a class:active={$page.url.pathname === '/components/clock'} href='/components/clock'>Clock 示例</a></li>
			<li><a class:active={$page.url.pathname === '/components/drawer'} href='/components/drawer'>Drawer 示例</a>
			</li>
			<li><a class:active={$page.url.pathname === '/components/collapse'} href='/components/collapse'>Collapse
				示例</a></li>
			<li><a class:active={$page.url.pathname === '/components/scrollbar'} href='/components/scrollbar'>Scrollbar
				示例</a></li>
			<li><a class:active={$page.url.pathname === '/components/carousel'} href='/components/carousel'>Carousel
				示例</a></li>
			<li><a class:active={$page.url.pathname === '/components/countTo'} href='/components/countTo'>CountTo 示例</a>
			</li>
			<li><a class:active={$page.url.pathname === '/components/preview'} href='/components/preview'>PreviewImage
				示例</a></li>
		</ul>
	</div>
</section>
<style lang='scss'>
	.nav-container {
		height: calc(100vh - 60px);
		overflow: auto;
		position: absolute;
		left: 0;
		top: 0;
		width: 240px;
		background: var(--bg-color-container);
		padding: 20px 0;
		border-right: 1px solid var(--border-level-1-color);
		z-index: 9;
		font-size: 14px;

		.base {
			color: var(--text-secondary);
			padding: 5px 10px;
			font-size: 12px;
		}

		/* 设置滚动条的样式 */
		&::-webkit-scrollbar {
			width: 8px;
		}

		/* 滚动槽 */
		&::-webkit-scrollbar-track {
			-webkit-box-shadow: var(--scrollbar-color);
			border-radius: 6px;
		}

		/* 滚动条滑块 */
		&::-webkit-scrollbar-thumb {
			border-radius: 6px;
			background: rgba(0, 0, 0, 0.1);
			-webkit-box-shadow: var(--scrollbar-color);
		}

		&__scroll {
		}

		li {
			display: block;
			padding: 5px 15px;

			a {
				display: block;
				padding: 10px;
				border-radius: var(--border-radius);
				color: var(--text-secondary);

				&:hover, &.active {
					color: var(--text-primary);
					background: var(--bg-color-container-hover);
				}
			}
		}
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
</style>
