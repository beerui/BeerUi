export default class RadioStore {
	private readonly dispatch: <EventKey extends Extract<keyof any, string>>(type: EventKey, detail?: any) => void;
	subscribe: Function[] = []; // 订阅方法
	current: string;

	constructor(options) {
		this.current = options.checked;
		this.dispatch = options.dispatch;
		this.subscribe = options.subscribe || [];
	}

	// 设置选中
	setChecked(item) {
		this.current = item
		this.publishHandle()
	}

	// 是否选中
	isChecked(label) {
		return this.current === label;
	}

	// 通知集合改变
	publishHandle() {
		this.subscribe.forEach(cb => cb(this.current))
		this.dispatch('change', this.current)
	}
	// 清空
	clear() {
		this.current = '';
		this.publishHandle()
	}
}
