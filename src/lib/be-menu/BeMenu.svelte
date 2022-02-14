<script lang="ts">
import { BeerPS } from "$lib/utils/beerui";
import { createEventDispatcher, onMount } from "svelte";
export let active:string = ''
const dispatch = createEventDispatcher()

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
</script>
<svelte:options accessors/>
<ul role="menubar" class='be-menu be-menu--horizontal'>
	<slot></slot>
</ul>
