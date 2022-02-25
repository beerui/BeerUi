export default class SelectStore {
  option:object = {}
  optionList = new Map()
  private currentNode: null;
  private currentNodeKey: null;
  private value: null;
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
        console.log('this[option]', option, this[option]);
      }
    }
    console.log('option', this);
  }
  creatNode(props) {
    let len = this.optionList.size
    const node = {
      label: props.label,
      value: props.value,
      index: ++len,
      key: props.key,
      cb: props.cb
    }
    this.optionList.set(props.key , node)
    return this.optionList.get(props.key)
  }
  getNodeByKey(key) {
    console.log('this.optionList.get(key)', this.optionList.get(key), key);
    return this.optionList.get(key)
  }
  setCurrent(node) {
    this.currentNode = node
    this.currentNodeKey = node.key
    this.value = node.value
    this.optionList.forEach(el => el.cb({ label: node.label, value: node.value, currentNode: node, currentNodeKey: node.key }))
  }
  clearList() {
    this.optionList.clear()
  }
}
