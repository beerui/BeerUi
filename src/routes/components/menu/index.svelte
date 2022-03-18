<script lang="ts">
	import DemoBlock from "$lib/demo/DemoBlock.svelte";
	import BeMenu from "$lib/be-menu/BeMenu.svelte";
	import BeMenuItem from "$lib/be-menu/BeMenuItem.svelte";
	import BeSubMenu from "$lib/be-menu/BeSubMenu.svelte";
	import BeButton from "$lib/be-button/BeButton.svelte";
	import BeIcon from "$lib/be-icon/BeIcon.svelte";
	// import { goto } from '$app/navigation';
	// import { menu, routers } from "$lib/stores";

	let MenuDom;
	let setMenuActive = (key) => MenuDom.setMenuActive(key);
	const changeMenu = evt => console.log(evt)
	let collapse = true;
	const toggleCollapse = () => collapse = !collapse;

	// const routers = [
	// 	{
	// 		path: '/admin',
	// 		id: '1',
	// 		title: '首页',
	// 		icon: 'home',
	// 		children: []
	// 	},
	// 	{
	// 		path: '/admin/water/river',
	// 		title: '水域管理',
	// 		id: '2',
	// 		icon: 'water',
	// 		redirect: true,
	// 		children: [
	// 			{
	// 				path: '/admin/water/river',
	// 				title: '河道管理',
	// 				id: '2-1',
	// 				icon: '',
	// 				meta: {},
	// 				children: [{
	// 					path: '/admin/water/river/detail',
	// 					title: '河道详情',
	// 					id: '2-1-1',
	// 					icon: '',
	// 					hidden: true,
	// 					meta: {},
	// 					children: []
	// 				}]
	// 			},
	// 			{
	// 				path: '/admin/water/lakeChief',
	// 				title: '河湖长管理',
	// 				id: '2-2',
	// 				icon: '',
	// 				meta: {},
	// 				children: []
	// 			},
	// 			{
	// 				path: '/admin/water/riverTour',
	// 				title: '巡河管理',
	// 				id: '2-3',
	// 				icon: '',
	// 				meta: {},
	// 				children: []
	// 			},
	// 			{
	// 				path: '/admin/water/waterLevel',
	// 				title: '水位管理',
	// 				id: '2-4',
	// 				icon: '',
	// 				meta: {},
	// 				children: []
	// 			},
	// 			{
	// 				path: '/admin/water/waterQuality',
	// 				title: '水质管理',
	// 				id: '2-5',
	// 				icon: '',
	// 				meta: {},
	// 				children: []
	// 			}
	// 		]
	// 	},
	// 	{
	// 		path: '/admin/problem',
	// 		id: '3',
	// 		title: '问题管理',
	// 		icon: 'problem',
	// 		children: [
	// 			{
	// 				path: '/admin/problem/management',
	// 				title: '问题管理',
	// 				id: '3-1',
	// 				icon: '',
	// 				meta: {},
	// 				children: []
	// 			}
	// 		]
	// 	},
	// 	{
	// 		path: '/admin/pollution',
	// 		id: '4',
	// 		title: '污水零直排区',
	// 		icon: 'pollution',
	// 		children: [
	// 			{
	// 				path: '/admin/pollution/engineering',
	// 				title: '工程信息管理',
	// 				id: '4-1',
	// 				icon: '',
	// 				meta: {},
	// 				children: []
	// 			}
	// 		]
	// 	},
	// 	{
	// 		path: '/admin/pump',
	// 		id: '5',
	// 		title: '泵闸站',
	// 		icon: 'pump',
	// 		children: [
	// 			{
	// 				path: '/admin/pump/pumpStation',
	// 				title: '泵站管理',
	// 				id: '5-1',
	// 				icon: '',
	// 				meta: {},
	// 				children: []
	// 			},
	// 			{
	// 				path: '/admin/pump/sluiceGateStation',
	// 				title: '闸站管理',
	// 				id: '5-2',
	// 				icon: '',
	// 				meta: {},
	// 				children: []
	// 			},
	// 			{
	// 				path: '/admin/pump/waterWorks',
	// 				title: '水厂管理',
	// 				id: '5-3',
	// 				icon: '',
	// 				meta: {},
	// 				children: []
	// 			},
	// 			{
	// 				path: '/admin/pump/operation',
	// 				title: '运维管理',
	// 				id: '5-4',
	// 				icon: '',
	// 				meta: {},
	// 				children: []
	// 			}
	// 		]
	// 	},
	// 	{
	// 		path: '/admin/send',
	// 		id: '6',
	// 		title: '传感设备',
	// 		icon: 'send',
	// 		children: [
	// 			{
	// 				path: '/admin/send/monitoring',
	// 				title: '视频监控',
	// 				id: '6-1',
	// 				icon: '',
	// 				meta: {},
	// 				children: []
	// 			},
	// 			{
	// 				path: '/admin/send/airport',
	// 				title: '无人机机场管理',
	// 				id: '6-2',
	// 				icon: '',
	// 				meta: {},
	// 				children: [
	// 					{
	// 						path: '/admin/send/airport/airport',
	// 						title: '机场管理',
	// 						id: '6-2-1',
	// 						icon: '',
	// 						meta: {},
	// 						children: []
	// 					},
	// 					{
	// 						path: '/admin/send/airport/airline',
	// 						title: '航线查看',
	// 						id: '6-2-2',
	// 						icon: '',
	// 						meta: {},
	// 						children: []
	// 					}
	// 				]
	// 			},
	// 			{
	// 				path: '/admin/send/waterLevel',
	// 				title: '水位传感设备',
	// 				id: '6-3',
	// 				icon: '',
	// 				meta: {},
	// 				children: []
	// 			},
	// 		]
	// 	},
	// 	{
	// 		path: '/admin/adjust',
	// 		id: '7',
	// 		title: '调度管理',
	// 		icon: 'adjust',
	// 		hidden: true,
	// 		children: []
	// 	},
	// 	{
	// 		path: '/admin/system',
	// 		title: '系统管理',
	// 		id: '8',
	// 		icon: 'system',
	// 		hidden: true,
	// 		children: [
	// 			{
	// 				path: '/admin/system/menu',
	// 				title: '菜单管理',
	// 				id: '8-1',
	// 				icon: '',
	// 				children: []
	// 			},
	// 			{
	// 				path: '/admin/system/interface',
	// 				title: '接口管理',
	// 				id: '8-2',
	// 				icon: '',
	// 				children: []
	// 			},
	// 			{
	// 				path: '/admin/system/user',
	// 				title: '用户管理',
	// 				id: '8-3',
	// 				icon: '',
	// 				children: []
	// 			},
	// 			{
	// 				path: '/admin/system/role',
	// 				title: '角色管理',
	// 				id: '8-4',
	// 				icon: '',
	// 				children: []
	// 			},
	// 			{
	// 				path: '/admin/system/project',
	// 				title: '项目管理',
	// 				id: '8-5',
	// 				icon: '',
	// 				children: []
	// 			}
	// 		]
	// 	}
	// ]
	const data1 = [
		{
			id: '1',
			title: '处理中心',
			children: []
		},
		{
			id: '2',
			title: '我的工作台',
			children: [
				{
					id: '2-1',
					title: '选项1',
					children: []
				},
				{
					id: '2-2',
					title: '选项2',
					children: []
				},
				{
					id: '2-3',
					title: '选项3',
					children: []
				},
				{
					id: '2-4',
					title: '选项4',
					children: [
						{
							id: '2-4-1',
							title: '选项1',
							children: []
						},
						{
							id: '2-4-2',
							title: '选项2',
							children: []
						},
						{
							id: '2-4-3',
							title: '选项3',
							children: []
						},
					]
				},
			]
		},
		{
			id: '3',
			title: '消息中心',
			children: []
		},
		{
			id: '4',
			title: '订单管理',
			children: []
		},
	]
	let active = '2-1'
	const changeActive = () => {
		active = '2-2'
		BeMenuDom.setMenuActive(active)
	}
	let menus = []
	let BeMenuDom = null
	// routers.subscribe(items => menus = items)
	// menu.subscribe(item => {
	// 	if (BeMenuDom && item.type === 'update') BeMenuDom.setMenuActive(item.active)
	// })
	//
	// // 展示隐藏
	// const toggleCollapse1 = () => menu.set({ collapse: !$menu.collapse })
	// let menuChange = ({ detail }) => {
	// 	if (detail.type !== 'submenu') {
	// 		// goto(detail.path)
	// 		menu.set({ active: detail.id })
	// 	}
	// };
</script>
<div class="page-container">
	<h2>NavMenu 导航菜单</h2>
	<p>为网站提供导航功能的菜单。</p>
	<h3>基础用法</h3>
<!--	<div style='width: 240px;'>-->
<!--		<div>-->
<!--			<BeButton on:click={toggleCollapse1}>切换 collapse</BeButton>-->
<!--			<BeButton on:click={changeActive}>changeActive</BeButton>-->
<!--		</div>-->
<!--		{active}-->
<!--		<BeMenu bind:this={BeMenuDom} on:change={menuChange} data={menus} bind:active={active} mode="vertical" trigger="click" bind:collapse={$menu.collapse}>-->
<!--			<NavMenu {menus}/>-->
<!--		</BeMenu>-->
<!--	</div>-->
	<DemoBlock
		code={`
<BeMenu class="be-menu-demo" active="1" mode="horizontal" bind:this={MenuDom} on:change={changeMenu}>
	<BeMenuItem id="1">处理中心</BeMenuItem>
	<BeSubMenu id="2">
		<div slot="title">我的工作台</div>
		<BeMenuItem id="2-1">选项1</BeMenuItem>
		<BeMenuItem id="2-2">选项2</BeMenuItem>
		<BeMenuItem id="2-3">选项3</BeMenuItem>
		<BeSubMenu id="2-4">
			<div slot="title">选项4</div>
			<BeMenuItem id="2-4-1">选项1</BeMenuItem>
			<BeMenuItem id="2-4-2">选项2</BeMenuItem>
			<BeMenuItem id="2-4-3">选项3</BeMenuItem>
		</BeSubMenu>
	</BeSubMenu>
	<BeMenuItem id="3" disabled>消息中心</BeMenuItem>
	<BeMenuItem id="4">订单管理</BeMenuItem>
</BeMenu>
`} js={`
let MenuDom: NavMenu
let setMenuActive = (key) => MenuDom.setMenuActive(key)
const changeMenu = (evt) => console.log('changeMenu', evt.detail)
`}>
		<div slot="source">
			<BeButton on:click={() => setMenuActive('2-1')}>设置 我的工作台 选项1</BeButton>
			<div class="demo-list">
				<BeMenu class="be-menu-demo" data={data1} active="1" mode="horizontal" trigger="hover" bind:this={MenuDom}
				        on:change={changeMenu}>
					<BeMenuItem id="1">处理中心</BeMenuItem>
					<BeSubMenu id="2">
						<div slot="title">我的工作台</div>
						<BeMenuItem id="2-1">选项1</BeMenuItem>
						<BeMenuItem id="2-2">选项2</BeMenuItem>
						<BeMenuItem id="2-3">选项3</BeMenuItem>
						<BeSubMenu id="2-4">
							<div slot="title">选项4</div>
							<BeMenuItem id="2-4-1">选项1</BeMenuItem>
							<BeMenuItem id="2-4-2">选项2</BeMenuItem>
							<BeMenuItem id="2-4-3">选项3</BeMenuItem>
						</BeSubMenu>
					</BeSubMenu>
					<BeMenuItem id="3" disabled>消息中心</BeMenuItem>
					<BeMenuItem id="4">订单管理</BeMenuItem>
				</BeMenu>
			</div>
		</div>
		<div slot="description">
			<ol>
				<li>data1 为菜单数据 id: 必须 title: 必须</li>
				<li>bind:this={MenuDom} 绑定菜单DOM</li>
				<li>active: 当前选中菜单的index</li>
				<li>使用 setMenuActive 方法可设置选中数据。</li>
				<li>使用 change 方法可监听菜单改变。</li>
			</ol>
		</div>
	</DemoBlock>
	<h2>侧栏</h2>
	<p>垂直菜单，可内嵌子菜单。</p>
	<DemoBlock
		code={`
<div style="width: 200px;min-height: 200px;">
	<BeMenu class="be-menu-demo" data={data1} active="2-1" mode="vertical" trigger="click">
		<BeMenuItem id="1">处理中心</BeMenuItem>
		<BeSubMenu id="2">
			<div slot="icon">
				<BeIcon name="app" />
			</div>
			<div slot="title">我的工作台</div>
			<BeMenuItem id="2-1">
				<div slot="icon">
					<BeIcon name="app" />
				</div>
				选项1
			</BeMenuItem>
			<BeMenuItem id="2-2">选项2</BeMenuItem>
			<BeMenuItem id="2-3">选项3</BeMenuItem>
			<BeSubMenu id="2-4">
				<div slot="title">选项4</div>
				<BeMenuItem id="2-4-1">选项1</BeMenuItem>
				<BeMenuItem id="2-4-2">选项2</BeMenuItem>
				<BeMenuItem id="2-4-3">选项3</BeMenuItem>
			</BeSubMenu>
		</BeSubMenu>
		<BeMenuItem id="3" disabled>消息中心</BeMenuItem>
		<BeMenuItem id="4">订单管理</BeMenuItem>
	</BeMenu>
</div>
`} js={`
`}>
		<div slot="source">
			<div class="demo-list">
				<div style="width: 200px;min-height: 200px;">
					<BeMenu class="be-menu-demo" data={data1} active="2-1" mode="vertical" trigger="click">
						<BeMenuItem id="1">处理中心</BeMenuItem>
						<BeSubMenu id="2">
							<div slot="icon">
								<BeIcon name="app" />
							</div>
							<div slot="title">我的工作台</div>
							<BeMenuItem id="2-1">
								<div slot="icon">
									<BeIcon name="app" />
								</div>
								选项1
							</BeMenuItem>
							<BeMenuItem id="2-2">选项2</BeMenuItem>
							<BeMenuItem id="2-3">选项3</BeMenuItem>
							<BeSubMenu id="2-4">
								<div slot="title">选项4</div>
								<BeMenuItem id="2-4-1">选项1</BeMenuItem>
								<BeMenuItem id="2-4-2">选项2</BeMenuItem>
								<BeMenuItem id="2-4-3">选项3</BeMenuItem>
							</BeSubMenu>
						</BeSubMenu>
						<BeMenuItem id="3" disabled>消息中心</BeMenuItem>
						<BeMenuItem id="4">订单管理</BeMenuItem>
					</BeMenu>
				</div>
			</div>
		</div>
		<div slot="description">
			<ol>
				<li>存在多个Menu时 使用key:string 绑定菜单</li>
				<li>mode 模式 string horizontal / vertical vertical</li>
				<li>trigger 子菜单打开的触发方式(只在 mode 为 horizontal 时有效) string hover / click hover</li>
				<li>mode为vertical时 trigger只能为click</li>
			</ol>
		</div>
	</DemoBlock>
	<h2>折叠</h2>
	<DemoBlock
		code={`
<BeButton on:click={toggleCollapse}>切换 collapse</BeButton>
<div style="width: 200px;min-height: 200px;">
	<BeMenu class="be-menu-demo" data={data1} active="1" mode="vertical" trigger="hover" {collapse}>
		<BeMenuItem id="1">
			<div slot="icon">
				<BeIcon name="chart-bubble" />
			</div>
			处理中心
		</BeMenuItem>
		<BeSubMenu id="2">
			<div slot="icon">
				<BeIcon name="app" />
			</div>
			<div slot="title">我的工作台</div>
			<BeMenuItem id="2-1">
				<div slot="icon">
					<BeIcon name="app" />
				</div>
				选项1
			</BeMenuItem>
			<BeMenuItem id="2-2">选项2</BeMenuItem>
			<BeMenuItem id="2-3">选项3</BeMenuItem>
			<BeSubMenu id="2-4">
				<div slot="title">选项4</div>
				<BeMenuItem id="2-4-1">选项1</BeMenuItem>
				<BeMenuItem id="2-4-2">选项2</BeMenuItem>
				<BeMenuItem id="2-4-3">选项3</BeMenuItem>
			</BeSubMenu>
		</BeSubMenu>
		<BeMenuItem id="3" disabled>
			<div slot="icon">
				<BeIcon name="gift" />
			</div>
			消息中心
		</BeMenuItem>
		<BeMenuItem id="4">
			<div slot="icon">
				<BeIcon name="desktop" />
			</div>
			订单管理
		</BeMenuItem>
	</BeMenu>
</div>
`} js={`
let collapse = true;
const toggleCollapse = () => collapse = !collapse
`}>
		<div slot="source">
			<div>
				<BeButton on:click={toggleCollapse}>切换 collapse</BeButton>
			</div>
			<div class="demo-list">
				<div style="width: 200px;min-height: 200px;">
					<BeMenu class="be-menu-demo" data={data1} active="2-1" mode="vertical" trigger="hover" {collapse}>
						<BeMenuItem id="1">
							<div slot="icon">
								<BeIcon name="chart-bubble" />
							</div>
							处理中心
						</BeMenuItem>
						<BeSubMenu id="2">
							<div slot="icon">
								<BeIcon name="app" />
							</div>
							<div slot="title">我的工作台</div>
							<BeMenuItem id="2-1">
								<div slot="icon">
									<BeIcon name="app" />
								</div>
								选项1
							</BeMenuItem>
							<BeMenuItem id="2-2">选项2</BeMenuItem>
							<BeMenuItem id="2-3">选项3</BeMenuItem>
							<BeSubMenu id="2-4">
								<div slot="title">选项4</div>
								<BeMenuItem id="2-4-1">选项1</BeMenuItem>
								<BeMenuItem id="2-4-2">选项2</BeMenuItem>
								<BeMenuItem id="2-4-3">选项3</BeMenuItem>
							</BeSubMenu>
						</BeSubMenu>
						<BeMenuItem id="3" disabled>
							<div slot="icon">
								<BeIcon name="gift" />
							</div>
							消息中心
						</BeMenuItem>
						<BeMenuItem id="4">
							<div slot="icon">
								<BeIcon name="desktop" />
							</div>
							订单管理
						</BeMenuItem>
					</BeMenu>
				</div>
			</div>
		</div>
		<div slot="description">
			<ol>
				<li>collapse 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用） boolean — false</li>
			</ol>
		</div>
	</DemoBlock>
</div>
