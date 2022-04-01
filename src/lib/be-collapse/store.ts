export default class CollapseStore {
	optionList = new Map(); // 数据集合
	subscribe: Function[] = []; // 订阅方法
	private accordion: boolean = false;
	value: string | string[]  = [''];

	constructor(options) {
		for (let option in options) {
			if (options.hasOwnProperty(option)) {
				this[option] = options[option];
			}
		}
	}
	creatNode(props) {
		let len = this.optionList.size;
		const node = {
			...props,
			name: props.name,
			title: props.title,
			disabled: props.disabled,
			index: ++len,
			active: this.isActive(props.name)
		};
		this.subscribe.push(props.handler)
		this.optionList.set(props.name, node);
		return this.optionList.get(props.name);
	}
	getNode(name) {
		return this.optionList.get(name)
	}
	isActive(name) {
		if (this.accordion) {
			return name === this.value
		}
		return this.value.includes(name)
	}
	clickNode(node) {
		if (node.disabled) return;
		if (this.accordion) {
			let _active = node.active
			this.optionList.forEach(el => el.active = false)
			this.value = ''
			if (!_active) {
				this.value = node.name
				node.active = this.isActive(node.name)
			}
			this.publishHandle()
			return
		}
		if (this.value.includes(node.name)) {
			const index = (<string[]>this.value).findIndex(el => el === node.name);
			(<string[]>this.value).splice(index, 1)
		} else {
			(<string[]>this.value).push(node.name)
		}
		node.active = this.isActive(node.name)
		this.publishHandle()
	}
	// 通知集合改变
	publishHandle() {
		this.subscribe.forEach(cb => cb(this.value));
	}
}
