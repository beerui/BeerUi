export default class SelectStore {
  option:object = {}
  optionList: any[] = []
  constructor(options) {
    this.option = options
    // this.label = options.label 
    // this.value = options.value
    // this.select = options.select
  }
  setOption(data) {
    this.option = data
  }
  setOptionList(data) {
    this.optionList.push(data)
  }
  clearList() {
    this.optionList = []
  }
}
  