import { genKey } from '$lib/utils/beerui';
import { deepClone } from '$lib/utils';

export default class MenuStore {
	subscribe: Function[] = []; // 订阅方法
	public active: string;
	public mode: string = 'vertical';
	public isOnlyOne: boolean = false;
	public nodesMap: any = {};
	public root: {
		children: [];
		store: any;
		data: any[];
	};
	private _collapse: boolean;
	private _trigger: string;
	public data: any[];

	constructor(options) {
		this.active = options.active
		this.mode = options.mode
		this.data = deepClone(options.data)
		this.isOnlyOne = options.isOnlyOne
		this._collapse = options.collapse
		this._trigger = options.trigger

		this.root = {
			data: this.data,
			store: this,
			children: []
		}
		// 竖向 未缩起来 触发被用户设置为hover => 强制转为click
		if (this.mode === 'vertical' && this.collapse) {
			this._trigger = 'click';
		}
		this.initTree()
	}
	get trigger() {
		return this._trigger
	}
	get collapse() {
		return this._collapse
	}
	set collapse(v) {
		this._collapse = v
		this.closeNode(this.root.children)
		this.publishHandle({ status: 'close', data: this.nodesMap })
		if (this.mode === 'vertical') {
			this._trigger = 'click';
			if (this._collapse) this._trigger = 'hover'
		}
	}
	convertToTree(tree, list, pid, keys, init?) {
		keys.push(pid)
		const result = [];
		for (const key in list) {
			if (list[key].pid === pid) {
				const item = list[key]
				item.parent = init ? null : tree
				result.push(item);
			}
		}
		tree['children'] = result
		for (const key in list) {
			if (!keys.includes(list[key].id)) this.convertToTree(list[key], list, list[key].id, keys)
		}
	}
	computedNodesMap(list, parent) {
		list.forEach(el => {
			el.level = parent.level
			if (el.children && el.children.length > 0) {
				++el.level
				el.type = 'submenu'
				this.computedNodesMap(el.children, { id: el.id, level: el.level })
			}
			this.nodesMap[el.id] = {
				id: el.id,
				path: el.path,
				title: el.title,
				icon: el.icon,
				type: el.children.length > 0 ? 'submenu' : '',
				children: el.children,
				level: parent.level,
				open: false,
				active: false,
				pid: parent.id
			}
		})
	}
	initTree() {
		this.computedNodesMap(this.root.data, {
			level: 1,
			id: -1
		})
		this.convertToTree(this.root, this.nodesMap, -1, [], true)
		this.publishHandle({ status: 'done', data: this.nodesMap })
		this.setActiveKey(this.active)
	}
	// initTree(els) {
	// 	if (!els) return
	// 	const key = genKey(4)
	// 	this.root.key = key
	// 	this.convertToMap(els, this.root)
	// 	this.convertToTree(this.root, this.nodesMap, key, [])
	// 	this.publishHandle({ status: 'done', data: this.nodesMap })
	// 	this.setActiveKey(this.active)
	// }
	// 转为树
	// convertToTree(tree, list, pkey, keys) {
	// 	keys.push(pkey)
	// 	const result = [];
	// 	for (const key in list) {
	// 		if (list[key].pkey === pkey) {
	// 			const item = list[key]
	// 			item.parent = tree
	// 			result.push(item);
	// 		}
	// 	}
	// 	tree['children'] = result
	// 	for (const key in list) {
	// 		if (!keys.includes(list[key].key)) this.convertToTree(list[key], list, list[key].key, keys)
	// 	}
	// }
	// // 清洗数据
	// convertToMap(els: Element, parent) {
	// 	Object.entries(els.children).forEach(el => {
	// 		const _item = el[1];
	// 		const key = this.getAttr(_item, 'key')
	// 		const index = this.getAttr(_item, 'index')
	// 		const type = this.getAttr(_item, 'data-type')
	// 		const child = {
	// 			key: key || parent.key,
	// 			index,
	// 			level: parent.level,
	// 			pid: parent.id,
	// 			open: false,
	// 			active: false,
	// 			type: type || 'menuitem',
	// 			pkey: parent.key
	// 		}
	// 		if (key) {
	// 			child['level'] = ++child.level;
	// 			child['id'] = ++this.nodeIdSeed;
	// 		}
	// 		if (_item && _item.children.length > 0) {
	// 			this.convertToMap(_item, child)
	// 		}
	// 		if (key) this.nodesMap[key] = child
	// 	});
	// }
	// getAttr(el: Element, value: string) {
	// 	return el.getAttribute(value)
	// }
	// 根据用户index来设置选中
	setActiveKey(id) {
		for (const key in this.nodesMap) {
			if (this.nodesMap[key].id === id) {
				this.setActive(this.nodesMap[key])
				return
			}
		}
	}
	// 设置选中
	setActive(node) {
		this.active = node.id
		this.setTreeActive(node)
		this.publishHandle({ status: 'update', data: this.nodesMap, menu: this.nodesMap[node.id] })
	}
	// 设置选中状态
	setTreeActive(node) {
		const nodes = []
		// 有下拉 设置open
		if (node.type === 'submenu') {
			node.open = !node.open
			return;
		}
		this.closeMenu()
		node.active = true;
		nodes.push(node)
		this.clearNodeStatus(this.root.children, nodes)
		if (node.level === 1) return
		this.changeParentNode(node.parent, nodes)
		this.clearNodeStatus(this.root.children, nodes)
	}
	// 改变父级的状态 是否打开
	changeParentNode(parent, keys) {
		parent.active = true
		keys.push(parent)
		// 设置默认选中时 菜单的展开
		if (parent.type === 'submenu' && this.mode === 'vertical' && !this.collapse && !parent.open) {
			parent.open = true
		}
		if (parent.level > 1) this.changeParentNode(parent.parent, keys)
	}
	// 清除选中
	clearNodeStatus(list, nodes) {
		list.forEach(el => {
			if (!nodes.includes(el)) {
				el.active = false
				// 打开一个 收起其它
				if (el.type === 'submenu' && this.isOnlyOne) el.open = false
			}
			if (el.children.length > 0) {
				this.clearNodeStatus(el.children, nodes)
			}
		})
	}
	changeType(id) {
		if (this.nodesMap[id]) this.nodesMap[id].type = 'submenu'
	}
	closeMenu() {
		if (this.mode === 'vertical' && !this.collapse) return;
		this.closeNode(this.root.children)
		this.publishHandle({ status: 'close', data: this.nodesMap })
	}
	// 关闭所有节点
	closeNode(list) {
		list.forEach(el => {
			if (el.open) el.open = false
			if (el.children.length > 0) this.closeNode(el.children)
		})
	}
	getNode(key) {
		return this.nodesMap[key]
	}
	// 设置mode
	setMode(item) {
		this.mode = item
	}

	// 通知集合改变
	publishHandle(item) {
		this.subscribe.forEach(cb => cb(item))
	}
}
