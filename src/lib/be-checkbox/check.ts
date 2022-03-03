export default class CheckStore {
	optionList = [];
	private readonly dispatch: <EventKey extends Extract<keyof any, string>>(type: EventKey, detail?: any) => void;
	private subscribe: Function[] = []; // 订阅方法

	constructor(options) {
		this.optionList = options.checked;
		this.dispatch = options.dispatch;
		this.subscribe = options.subscribe || [];
	}

	// 设置选中多个
	setCheckedList(arr) {
		if (arr.length === 0) {
			this.clearList();
			return
		}
		this.optionList = [...new Set([...this.optionList, ...arr])]
		this.publishHandle()
	}

	// 设置单个选中
	setChecked(label) {
		if (this.isChecked(label)) {
			this.deleteChecked(label)
		} else {
			this.optionList.push(label)
		}
		this.publishHandle()
	}

	// 是否选中
	isChecked(label) {
		return this.optionList.some(el => el === label);
	}

	deleteChecked(label) {
		const index = this.optionList.findIndex(el => label === el)
		this.optionList.splice(index, 1)
	}

	// 通知集合改变
	publishHandle() {
		this.subscribe.forEach(el => el(this.optionList))
		this.dispatch('change', this.optionList)
	}
	// 清空
	clearList() {
		this.optionList = [];
		this.publishHandle()
	}
}
