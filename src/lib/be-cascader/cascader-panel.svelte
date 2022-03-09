<script>
import CascaderMenu from "./cascader-menu.svelte";
import { BeerPS, genKey } from "$lib/utils/beerui";
import Store from "./store";
import { createEventDispatcher, setContext } from "svelte";
const dispatch = createEventDispatcher()
export let options = []
export let visible = false
const store = new Store(options)
let menus = store.getMenus()
let value = store.value
$:if(visible) {
  console.log(Array.isArray(menus), menus, value)
}
const key = `cascaderChange_${ genKey() }`
setContext('cascaderChangeKey', key)

BeerPS.subscribe(key, items => {
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
    dispatch('change', {value: store.value, label: store.label})
  }
})
</script>


<div class='be-cascader-panel' class:visible={visible}>
  {#each menus as menu, index}
  <CascaderMenu {menu} value = {value[index]}/>
  {/each}
  <div class="popper__arrow"></div>
</div>