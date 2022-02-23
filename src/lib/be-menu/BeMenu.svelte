<script lang="ts">
import { BeerPS } from "$lib/utils/beerui";
import { createEventDispatcher, onMount, setContext } from "svelte";
import clickOutside from '$lib/_actions/clickOutside';

export let active:string = ''
export let mode:string = 'vertical'
export let trigger:string = 'hover'
export let collapse:boolean = false
export let key:string = '1'
const dispatch = createEventDispatcher()

if (trigger === 'click' || mode === 'vertical') trigger = 'click'
setContext('MenuTrigger', trigger)
setContext('MenuCollapse', collapse)
setContext('MenuTriggerKey', key)
$: {
  // 发起展开或收起的状态
  BeerPS.publish(`MenuCollapse_${key}`, collapse)
}
// 设置选中
export const setMenuActive = (key) => BeerPS.publish('MenuActiveChange', key)
BeerPS.subscribe('MenuActiveChange', item => {
  active = item
  dispatch('change', active)
})
onMount(() => {
  // 初始化
  setMenuActive(active)
})

const clickMenuOutside = () => {
  if (mode !== 'vertical') BeerPS.publish(`MenuCloseAll_${key}`)
}
</script>
<svelte:options accessors/>
<ul role="menubar" class='be-menu be-menu--{mode}' class:be-menu--collapse={collapse} use:clickOutside={{ cb: clickMenuOutside }}>
	<slot></slot>
</ul>
