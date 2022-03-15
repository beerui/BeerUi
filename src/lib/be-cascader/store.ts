export default class Store {
	subscribe: Function[] = []; // 订阅方法
	options: Array<object> = []
	level: number = 0
	// hasChildren: boolean = true
	defaultValue : Array<any> = []
	value: Array<any> = []
	label: Array<any> = []
	menus: Array<object> = []
  checkStrictly: boolean = false
  showAllLevels: boolean = true
	constructor(data, props) {
		this.options = data;
		this.defaultValue = props.value
    // this.value = props.defaultValue
    console.log(this.defaultValue);
    
		if(this.defaultValue && this.defaultValue.length) {
      if(Array.isArray(this.defaultValue)) {
        this.initMenuByPath(this.options, this.defaultValue[this.defaultValue.length - 1])
      } else {
        this.initMenuByPath(this.options, this.defaultValue)
      }
		} else {
      this.setMenu(data)
    }
    this.checkStrictly = props.checkStrictly
	}
  initMenuByPath(list, val) {
    const level = ++this.level
    if(!list || list.length === 0) return false
    for(let i = 0; i < list.length; i++) {
      const item = list[i]
      if(item.value === val) {
        this.label.push(item.label)
        this.value.push(item.value)
				this.menus.push(this.flatten(list, level))
        return true
      }
      if(this.initMenuByPath(item.children, val)) {
				this.label.unshift(item.label)
        this.value.unshift(item.value)
				this.menus.unshift(this.flatten(list, level))
        return true
      }
    }
    return false
  }
	flatten(arr, level) {
		let result = [];
		for(let i = 0; i < arr.length; i++) {
			const item = arr[i]
			item.level = level
			result.push(item)
		}
		return result
	}
	setCurrent(items) {
		const step = items.level !== this.level ? 2 : 1
		this.value = this.value.slice(0, this.level - step)
		this.label = this.label.slice(0, this.level - step)
		this.value.push(items.value)
		this.label.push(items.label)
    // console.log(this.level - step, this.value, items.value);
		// this.value.splice(this.level - step, this.value.length - 1, items.value)
		// this.label.splice(this.level - step, this.label.length - 1, items.label)
    // console.log(this.label, this.value);
    
	}
	clear() {
		this.value = []
		this.label = []
		this.level = 0
    this.defaultValue = []
		this.setMenu(this.options)
	}
	setMenu(data) {
    this.menus = this.menus.slice(0, this.level)
		data = this.flatten(data, ++this.level)
		this.menus.push(data)
	}
	getMenus() {
		return this.menus
	}
	// 通知集合改变
	publishHandle(item) {
		this.subscribe.forEach(cb => cb(item))
	}
}
