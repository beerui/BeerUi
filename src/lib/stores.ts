import { writable } from 'svelte/store';
import { GET_MENU_ACTIVE, getToken, SET_MENU_ACTIVE, setToken } from '$utils/auth';
import { browser } from '$app/env';

export const token = writable(browser ? getToken() : '');
export const userInfo = writable('');

export const menu = writable(GET_MENU_ACTIVE());
menu.subscribe(items => SET_MENU_ACTIVE(items))
const router = [
	{
		path: '/admin',
		id: '1',
		title: '首页',
		icon: 'home',
		children: []
	},
	{
		path: '/admin/water/river',
		title: '水域管理',
		id: '2',
		icon: 'water',
		redirect: true,
		children: [
			{
				path: '/admin/water/river',
				title: '河道管理',
				id: '2-1',
				icon: '',
				meta: {},
				children: [{
					path: '/admin/water/river/detail',
					title: '河道详情',
					id: '2-1-1',
					icon: '',
					hidden: true,
					meta: {},
					children: []
				}]
			},
			{
				path: '/admin/water/lakeChief',
				title: '河湖长管理',
				id: '2-2',
				icon: '',
				meta: {},
				children: []
			},
			{
				path: '/admin/water/riverTour',
				title: '巡河管理',
				id: '2-3',
				icon: '',
				meta: {},
				children: []
			},
			{
				path: '/admin/water/waterLevel',
				title: '水位管理',
				id: '2-4',
				icon: '',
				meta: {},
				children: []
			},
			{
				path: '/admin/water/waterQuality',
				title: '水质管理',
				id: '2-5',
				icon: '',
				meta: {},
				children: []
			}
		]
	},
	{
		path: '/admin/problem',
		id: '3',
		title: '问题管理',
		icon: 'problem',
		children: [
			{
				path: '/admin/problem/management',
				title: '问题管理',
				id: '3-1',
				icon: '',
				meta: {},
				children: []
			}
		]
	},
	{
		path: '/admin/pollution',
		id: '4',
		title: '污水零直排区',
		icon: 'pollution',
		children: [
			{
				path: '/admin/pollution/engineering',
				title: '工程信息管理',
				id: '4-1',
				icon: '',
				meta: {},
				children: []
			}
		]
	},
	{
		path: '/admin/pump',
		id: '5',
		title: '泵闸站',
		icon: 'pump',
		children: [
			{
				path: '/admin/pump/pumpStation',
				title: '泵站管理',
				id: '5-1',
				icon: '',
				meta: {},
				children: []
			},
			{
				path: '/admin/pump/sluiceGateStation',
				title: '闸站管理',
				id: '5-2',
				icon: '',
				meta: {},
				children: []
			},
			{
				path: '/admin/pump/waterWorks',
				title: '水厂管理',
				id: '5-3',
				icon: '',
				meta: {},
				children: []
			},
			{
				path: '/admin/pump/operation',
				title: '运维管理',
				id: '5-4',
				icon: '',
				meta: {},
				children: []
			}
		]
	},
	{
		path: '/admin/send',
		id: '6',
		title: '传感设备',
		icon: 'send',
		children: [
			{
				path: '/admin/send/monitoring',
				title: '视频监控',
				id: '6-1',
				icon: '',
				meta: {},
				children: []
			},
			{
				path: '/admin/send/airport',
				title: '无人机机场管理',
				id: '6-2',
				icon: '',
				meta: {},
				children: [
					{
						path: '/admin/send/airport/airport',
						title: '机场管理',
						id: '6-2-1',
						icon: '',
						meta: {},
						children: []
					},
					{
						path: '/admin/send/airport/airline',
						title: '航线查看',
						id: '6-2-2',
						icon: '',
						meta: {},
						children: []
					}
				]
			},
			{
				path: '/admin/send/waterLevel',
				title: '水位传感设备',
				id: '6-3',
				icon: '',
				meta: {},
				children: []
			},
		]
	},
	{
		path: '/admin/adjust',
		id: '7',
		title: '调度管理',
		icon: 'adjust',
		hidden: true,
		children: []
	},
	{
		path: '/admin/system',
		title: '系统管理',
		id: '8',
		icon: 'system',
		hidden: true,
		children: [
			{
				path: '/admin/system/menu',
				title: '菜单管理',
				id: '8-1',
				icon: '',
				children: []
			},
			{
				path: '/admin/system/interface',
				title: '接口管理',
				id: '8-2',
				icon: '',
				children: []
			},
			{
				path: '/admin/system/user',
				title: '用户管理',
				id: '8-3',
				icon: '',
				children: []
			},
			{
				path: '/admin/system/role',
				title: '角色管理',
				id: '8-4',
				icon: '',
				children: []
			},
			{
				path: '/admin/system/project',
				title: '项目管理',
				id: '8-5',
				icon: '',
				children: []
			}
		]
	}
]
export const routers = writable(router)
export const routerMap = {}
const computedRouter = (list, parent = null) => {
	list.forEach(el => {
		if (el.children && el.children.length > 0) computedRouter(el.children, el)
		routerMap[el.id] = Object.assign(el, { parent })
	})
}
computedRouter(router)
if (browser) {
	token.subscribe(value => setToken(value))
}

export const userName = writable(browser && (localStorage.getItem('userName') || ''))

userName.subscribe(value => {
	browser && (localStorage.userName = value)
})

// 活水调度左侧菜单 展示隐藏
export const IsShowWaterNavBar = writable({ key: 'left_nav', value: false });
