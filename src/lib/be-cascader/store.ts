export default class Store {
  options: Array<object> = []
  level: number = 0
  hasChildren: boolean = true
  value: Array<any> = []
  label: Array<any> = []
  menus: Array<object> = []
  constructor(data, config) {
    this.options = data;
    this.initNodes(data);
  }
  initNodes(data) {
    this.setMenu(data)
  }

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
    this.value.splice(this.level - step, this.value.length - this.level + 1, items.value)
    this.label.splice(this.level - step, this.label.length - this.level + 1, items.label)
  }
  setMenu(data) {
    this.menus = this.menus.slice(0, this.level)
    data = this.flatten(data, ++this.level)
    this.menus.push(data)
  }
  getMenus() {
    return this.menus
  }
}