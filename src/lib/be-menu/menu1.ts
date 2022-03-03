import { genKey, hasClass } from '$lib/utils/beerui';

export default class MenuStore {
	private readonly dispatch: <EventKey extends Extract<keyof any, string>>(type: EventKey, detail?: any) => void;
	subscribe: Function[] = []; // 订阅方法
	public active: string;
	public mode: string = 'vertical';
	public trigger: string = 'hover';
	public collapse: boolean = false;
	public nodesMap: any = {};
	public root: Node;

	constructor(options) {
		for (const option in options) {
			if (options.hasOwnProperty(option)) {
				this[option] = options[option];
			}
		}

		this.root = new Node({
			level: 0,
			store: this,
			parent: null,
			pid: null
		});
	}

	initTree(els) {
		if (!els) return
		const key = genKey()
		this.root.key = key
		this.convertToMap(els, this.root)
		this.convertToTree(this.root, key, [])
		console.log('this.root', this.root);
	}

	// 转为树
	convertToTree(tree, pkey, keys) {
		keys.push(pkey)
		const result = [];
		for (const key in this.nodesMap) {
			if (this.nodesMap[key].pkey === pkey) {
				const _node = new Node({
					...this.nodesMap[key],
					store: this.root.store
				})
				result.push(_node);
			}
		}
		console.log('tree', tree);
		console.log('result', result);
		tree['children'] = result
		for (const key in this.nodesMap) {
			if (!keys.includes(this.nodesMap[key].key)) {
				this.convertToTree(this.nodesMap[key], this.nodesMap[key].key, keys);
			}
		}
	}
	// 清洗数据
	convertToMap(els: Element, parent) {
		Object.entries(els.children).forEach(el => {
			const _item = el[1];
			const key = this.getAttr(_item, 'key')
			const index = this.getAttr(_item, 'index')
			const child = {
				key: key || parent.key,
				level: parent.level,
				index,
				pkey: parent.key
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

	isMenu(els: Element) {
		return hasClass(els, 'be-menu-item') || hasClass(els, 'be-submenu')
	}
	// 设置选中
	setActive(item) {
		this.active = item
		this.publishHandle()
	}
	// 设置选中
	setMode(item) {
		this.active = item
		this.publishHandle()
	}

	// 通知集合改变
	publishHandle() {
		this.subscribe.forEach(cb => cb(this))
		this.dispatch('change', this)
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

let nodeIdSeed = 0;
class Node {
	private parent: any;
	private id: number;
	private level: any;
	store: any;
	key: string;
	pid: string;
	private pNode: any;
	constructor(options) {
		this.id = nodeIdSeed++;
		this.level = 0;
		for (const name in options) {
			if (options.hasOwnProperty(name)) {
				this[name] = options[name];
			}
		}

		if (this.pNode) {
			this.level = this.pNode.level + 1;
		}

		const store = this.store;
		if (!store) {
			throw new Error('[Node]store is required!');
		}
		store.registerNode(this);
	}
}
