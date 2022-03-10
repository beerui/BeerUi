export default class Store {
  subscribe: Function[] = []; // 订阅方法
  options: Array<object> = []
  level: number = 0
  hasChildren: boolean = true
  defaultValue : Array<any> = []
  value: Array<any> = []
  label: Array<any> = []
  menus: Array<object> = []
  constructor(data, defaultValue) {
    this.options = data;
    if(defaultValue && defaultValue.length) {
      this.defaultValue = defaultValue
      this.initLabel(this.options)
    }
    this.setMenu(data)
  }
  initLabel(arrs, level = 0) {
    for(let i = 0; i < arrs.length; i++) { 
      const item = arrs[i]
      if(item.value == this.defaultValue[level]) {
        this.label.push(item.label)
        if(item.children && item.children.length) {
          this.initLabel(item.children, ++level)
        } else {
          return
        }
      }
    }
  }
  // changeSelect(items) {
  //   this.publishHandle(items)
  // }
  flatten(arr, level = 1) {
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
    // 废弃代码(与下列代码结果相同)
    // this.value = this.value.slice(0, this.level - step)
    // this.label = this.label.slice(0, this.level - step)
    // this.value.push(items.value)
    // this.label.push(items.label)
    this.value.splice(this.level - step, this.value.length - 1, items.value)
    this.label.splice(this.level - step, this.label.length - 1, items.label)
  }
  clear() {
    this.value = []
    this.label = []
    this.level = 0
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