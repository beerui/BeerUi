export default class CheckStore {
	optionList = [];
	private dispatch: <EventKey extends Extract<keyof any, string>>(type: EventKey, detail?: any) => void;

	constructor(options) {
		this.optionList = options.checked;
		this.dispatch = options.dispatch;
		console.log('options', options);
	}

	subscribeHandle(cb) {
		cb(this.optionList)
	}

	setSelectList(arr) {
		console.log('setSelectList', arr);
		if (arr.length === 0) {
			this.clearList();
			return
		}
		this.optionList = [...this.optionList, ...arr]
		console.log('this.optionList', this.optionList);
	}

	setChecked(label) {
		if (this.isChecked(label)) {
			this.deleteChecked(label)
		} else {
			this.optionList.push(label)
		}
	}

	isChecked(label) {
		return this.optionList.some(el => el === label);
	}

	deleteChecked(label) {
		const index = this.optionList.findIndex(el => label === el)
		console.log('deleteChecked', index);
		this.optionList.splice(index, 1)
		this.dispatch('change', this.optionList);
	}

	clearList() {
		this.optionList = [];
	}
}
