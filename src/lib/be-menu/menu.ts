import { genKey, hasClass } from '$lib/utils/beerui';

export default class MenuStore {
	private readonly dispatch: <EventKey extends Extract<keyof any, string>>(type: EventKey, detail?: any) => void;
	subscribe: Function[] = []; // 订阅方法
	public active: string;
	public nodeIdSeed: number = 0;
	public mode: string = 'vertical';
	public trigger: string = 'hover';
	public collapse: boolean = false;
	public isOnlyOne: boolean = false;
	public nodesMap: any = {};
	public root: {
		children: [];
		key: string;
		parent: null;
		level: number;
		store: any
	};

	constructor(options) {
		for (let option in options) {
			if (options.hasOwnProperty(option)) {
				this[option] = options[option];
			}
		}
		this.nodeIdSeed = 0
		this.root = {
			level: 0,
			key: '',
			children: [],
			store: this,
			parent: null
		};
	}
	initTree(els) {
		if (!els) return
		const key = genKey()
		this.root.key = key
		this.convertToMap(els, this.root)
		this.convertToTree(this.root, this.nodesMap, key, [])
		this.publishHandle({ status: 'done', data: this.nodesMap })
	}
	// 转为树
	convertToTree(tree, list, pkey, keys) {
		keys.push(pkey)
		const result = [];
		for (const key in list) {
			if (list[key].pkey === pkey) {
				const item = list[key]
				item.parent = tree
				result.push(item);
			}
		}
		tree['children'] = result
		for (const key in list) {
			if (!keys.includes(list[key].key)) this.convertToTree(list[key], list, list[key].key, keys)
		}
	}
	// 清洗数据
	convertToMap(els: Element, parent) {
		Object.entries(els.children).forEach(el => {
			const _item = el[1];
			const key = this.getAttr(_item, 'key')
			const index = this.getAttr(_item, 'index')
			const type = this.getAttr(_item, 'data-type')
			const child = {
				key: key || parent.key,
				index,
				level: parent.level,
				pid: parent.id,
				open: false,
				active: false,
				type: type || 'menuitem',
				pkey: parent.key
			}
			if (key) {
				child['level'] = ++child.level;
				child['id'] = ++this.nodeIdSeed;
			}
			if (_item && _item.children.length > 0) {
				this.convertToMap(_item, child)
			}
			if (key) this.nodesMap[key] = child
		});
	}
	getAttr(el: Element, value: string) {
		return el.getAttribute(value)
	}
	// 设置选中
	setActive(node) {
		this.active = node.key
		this.setTreeActive(node)
		this.publishHandle({ status: 'update', data: this.nodesMap })
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
		if (parent.level > 1) this.changeParentNode(parent.parent, keys)
	}
	// 清除选中
	clearNodeStatus(list, nodes) {
		list.forEach(el => {
			if (!nodes.includes(el)) {
				el.active = false
				if (el.type === 'submenu' && this.isOnlyOne) el.open = false
			}
			if (el.children.length > 0) {
				this.clearNodeStatus(el.children, nodes)
			}
		})
	}
	closeMenu() {
		this.closeNode(this.root.children)
		this.publishHandle({ status: 'close', data: this.nodesMap })
	}
	// 关闭所有节点
	closeNode(list) {
		list.forEach(el => {
			if (el.open)  el.open = false
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
	registerNode(node) {
		const key = node.key;
		if (!key || !node || !node.data) return;

		const nodeKey = node.key;
		if (nodeKey !== undefined) this.nodesMap[node.key] = node;
	}

	deregisterNode(node) {
		const key = node.key;
		if (!key || !node || !node.data) return;

		node.childNodes.forEach(child => {
			this.deregisterNode(child);
		});

		delete this.nodesMap[node.key];
	}
}
