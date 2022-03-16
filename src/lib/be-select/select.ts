export default class SelectStore {
  option:object = {}
  optionList = new Map()
  private currentNode: null;
  private currentNodeKey: null;
  public value: null;
  public isChange: boolean = true
  constructor(options) {
    // this.option = options
    // this.label = options.label
    // this.value = options.value
    // this.select = options.select
    this.currentNode = null;
    this.currentNodeKey = null;
    this.value = null;
    for (let option in options) {
      if (options.hasOwnProperty(option)) {
        this[option] = options[option];
      }
    }
  }
  creatNode(props) {
    // console.log(props);

    let len = this.optionList.size
    const node = {
      label: props.label,
      value: props.value,
      disabled: props.disabled,
      index: ++len,
      key: props.key,
      change: props.change,
      hover: props.hover
    }
    this.optionList.set(props.key , node)
    return this.optionList.get(props.key)
  }
  setHover(value) {
    this.optionList.forEach(el => {
      if(el.key == value) {
        el.hover(true)
      } else {
        el.hover(false)
      }
    })
  }
  getCurrent(key) {
    return this.optionList.get(key)
  }
  setCurrent(node) {
    this.currentNode = node
    this.currentNodeKey = node.key
    this.isChange = !(this.value == node.value)
    this.value = node.value
    this.optionList.forEach(el => el.change({ label: node.label, value: node.value, currentNode: node, currentNodeKey: node.key }))
  }
  clearList() {
    this.optionList.clear()
  }
}
