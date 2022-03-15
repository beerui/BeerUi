<script>
import CascaderMenu from "./cascader-menu.svelte";
import { createEventDispatcher, getContext } from "svelte";
const dispatch = createEventDispatcher()
export let options = []
export let visible = false
export let checkStrictly
export let showAllLevels
export let expandTrigger
// const store = new Store(options, $$props)
const store = getContext('store')
let menus = []
let value = []
let cascaderRect
let popperArrow
let cascaderWidth
let selectValue = Array.isArray(store.defaultValue) ? store.defaultValue[store.defaultValue.length - 1] : store.defaultValue
$:if(visible) {
   menus = store.getMenus()
   value = store.value
}
$: {
  // 处理右边边界问题
  const clientWidth = document.body.clientWidth
  const clientRect = cascaderRect && cascaderRect.getBoundingClientRect()
  if(clientRect && cascaderWidth) {
    const left = cascaderRect.offsetLeft + clientWidth - clientRect.right
    cascaderRect.style.left = (left < 0 ? left : 0) + 'px'
    popperArrow.style.left = (left < 0 ? 35 - left : 35) + 'px'
  }
}
const subscribeHandle = items =>{
  if(items.disabled) return
  if(items.children && items.children.length) {
    store.level = items.level
    store.setMenu(items.children)
    menus = store.getMenus()
    store.setCurrent(items)
    value = store.value
  } else {
    store.setCurrent(items)
    value = store.value
    menus = store.menus.slice(0, items.level)
    let params = {
      value: store.value,
      label: store.label,
      store: store
    }
    if(!checkStrictly) dispatch('change', params)
  }
  if(checkStrictly && items.type == 'radio') {
    selectValue = items.value
    dispatch('change', {selectValue, value: store.value, label: store.label, store: store})
  }
}
store.subscribe.push(subscribeHandle)
// const key = `cascaderChange_${ genKey() }`
// setContext('cascaderChangeKey', key)
// BeerPS.subscribe(key, items => {
//   if(items.children && items.children.length) {
//     store.level = items.level
//     store.setMenu(items.children)
//     menus = store.getMenus()
//     store.setCurrent(items)
//     value = store.value
//   } else {
//     store.setCurrent(items)
//     value = store.value
//     menus = store.menus.slice(0, items.level)
//     dispatch('change', {value: store.value, label: store.label, store: store})
//   }
// })
</script>


<div class='be-cascader-panel' bind:this={cascaderRect} bind:clientWidth={cascaderWidth} class:visible={visible}>
  {#each menus as menu, index}
  <CascaderMenu {expandTrigger} {selectValue} {menu} {checkStrictly} value = { value[index] || selectValue } {store}/>
  {/each}
  <div class="popper__arrow" bind:this={popperArrow}></div>
</div>
