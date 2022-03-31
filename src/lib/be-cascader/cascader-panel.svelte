<script>
import CascaderMenu from "./cascader-menu.svelte";
import { createEventDispatcher, getContext } from "svelte";
const dispatch = createEventDispatcher()
export let options = []
export let visible = false
export let checkStrictly
export let showAllLevels
export let expandTrigger
export let config
export let left
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
      const distance =  left + cascaderWidth - clientWidth + 10
      if(distance > 0) {
        const curleft = left - distance
        cascaderRect.style.left = curleft + 'px'
        popperArrow.style.left = distance + 35 + 'px'
      } else {
        cascaderRect.style.left = left + 'px'
        popperArrow.style.left = '35px'
      }
  }
}
const subscribeHandle = items =>{
  if(items.disabled) return
  if(items[config.children] && items[config.children].length) {
    store.level = items.level
    store.setMenu(items[config.children])
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
    selectValue = items[config.value]
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
  {#if menus && menus.length > 0}
  {#each menus as menu, index}
  <CascaderMenu {expandTrigger} {selectValue} {config} {menu} {checkStrictly} value = { value[index] || selectValue } {store}/>
  {/each}
  {:else}
  <div class="be-cascader-dropdown__empty">暂无数据</div>
  {/if}
  <div class="popper__arrow" bind:this={popperArrow}></div>
</div>
