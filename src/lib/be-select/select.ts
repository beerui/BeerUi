export default class SelectStore {
	optionList = new Map(); // 数据集合
	subscribe: Function[] = []; // 订阅方法
	sizeSubscribe: Function[] = []; // 订阅方法
	public value: string | number | string[] | number[]; // 当前选中的值
	public isChange: boolean = true;
	constructor(options) {
		this.value = null;
		for (let option in options) {
			if (options.hasOwnProperty(option)) {
				this[option] = options[option];
			}
		}
	}

	// 创建Node并存储
	creatNode(props) {
		let len = this.optionList.size;
		const node = {
			label: props.label,
			value: String(props.value),
			disabled: props.disabled,
			index: ++len,
			key: String(props.key),
			hover: props.hover
		};
		this.optionList.set(node.key, node);
		this.sizeHandle(this.optionList.size)
		return this.optionList.get(node.key);
	}

	setHover(value) {
		this.optionList.forEach(el => {
			if (el.key == value) {
				el.hover(true);
			} else {
				el.hover(false);
			}
		});
	}

	// 获取当前Node
	getCurrent(key) {
		if (!String(key)) {
			this.value = ''
			this.publishHandle({ label: '', value: '' })
			return false
		}
		return this.optionList.get(key);
	}

	// 设置当前Node
	setCurrent(node) {
		// 判断选中了相同项
		this.isChange = !(this.value == node.value);
		this.value = node.value;
		this.publishHandle({ label: node.label, value: this.value })
	}

	clearList() {
		this.optionList.clear();
	}
	// 通知集合改变
	publishHandle(item) {
		this.subscribe.forEach(cb => cb(item));
	}
	sizeHandle(size) {
		this.sizeSubscribe.forEach(cb => cb(size));
	}
}
