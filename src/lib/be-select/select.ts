export type NodeType = {
	label: string
	value: string
}
export type ArrayValue = Array<string | number>
export default class SelectStore {
	optionList = new Map(); // 数据集合
	subscribe: Function[] = []; // 订阅方法
	sizeSubscribe: Function[] = []; // 订阅方法
	public value: string | number | ArrayValue; // 当前选中的值
	public multipleValue: NodeType[] = []; // 当前选中的值
	public isChange: boolean = true;
	multiple: boolean = false;
	private multipleLimit: number = 0;
	constructor(options) {
		for (let option in options) {
			if (options.hasOwnProperty(option)) {
				this[option] = options[option];
			}
		}
		console.log(this);
	}

	// 创建Node并存储
	creatNode(props) {
		let len = this.optionList.size;
		const node = {
			label: props.label,
			value: props.value,
			disabled: props.disabled,
			index: ++len,
			key: props.key,
			isChecked: false,
			hover: props.hover,
			disabledCb: props.disabledCb
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
	isLimit() {
		return this.multipleLimit !== 0
	}
	isExcced() {
		let i = 0
		this.optionList.forEach(el => {
			if (el.isChecked) i++
		})
		return i >= this.multipleLimit
	}
	// 设置value
	setMultipleCurrentValue() {
		console.log('setMultipleCurrentValue');
		const _value = []
		this.optionList.forEach(el => {
			el.isChecked = (this.value as ArrayValue).includes(el.value)
			if (el.isChecked) _value.push({ ...el, isChecked: true });
		})
		this.multipleValue = _value;
		this.value = this.multipleValue.map(el => el.value)
		this.publishHandle(this.value)
		this.setDisabledList()
	}
	// 获取当前Node
	getCurrent(key) {
		// if (!key) {
		// 	this.value = ''
		// 	this.publishHandle({ label: '', value: '' })
		// 	return false
		// }
		return this.optionList.get(key);
	}

	// 设置当前Node
	setCurrent(node) {
		// 判断选中了相同项
		this.isChange = !(this.value == node.value);
		this.value = node.value;
		this.publishHandle({ label: node.label, value: this.value })
	}
	setDisabledList() {
		this.optionList.forEach(el => {
			el.disabled = false
			el.disabledCb(el.disabled)
		})
		if (this.isLimit() && this.isExcced()) {
			this.optionList.forEach(el => {
				if (!el.isChecked) {
					el.disabled = true
					el.disabledCb(el.disabled)
				}
			})
		}
	}
	// 移除多选中的一项
	toggleMultiple(node) {
		console.log('toggleMultiple');
		const _value = []
		this.optionList.forEach(el => {
			if (el.value === node.value) el.isChecked = !el.isChecked
			if (el.isChecked) _value.push({ label: el.label, value: el.value, isChecked: el.isChecked });
		})
		this.multipleValue = _value;
		this.value = this.multipleValue.map(el => el.value)
		this.publishHandle(this.value)
		this.setDisabledList()
	}
	clearList() {
		this.optionList.clear();
	}
	// 通知集合改变
	publishHandle(item) {
		console.log('publishHandle');
		this.subscribe.forEach(cb => cb(item));
	}
	sizeHandle(size) {
		this.sizeSubscribe.forEach(cb => cb(size));
	}
}
