export default class RadioStore {
	private readonly dispatch: <EventKey extends Extract<keyof any, string>>(type: EventKey, detail?: any) => void;
	subscribe: Function[] = []; // 订阅方法
	current: string;
	private size: string;
	private disabled: boolean;
	private textColor: string;
	private fill: string;

	constructor(options) {
		for (let option in options) {
			if (options.hasOwnProperty(option)) {
				this[option] = options[option];
			}
		}
		console.log(this);

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
	}
	// 清空
	clear() {
		this.current = '';
		this.publishHandle()
	}
}
