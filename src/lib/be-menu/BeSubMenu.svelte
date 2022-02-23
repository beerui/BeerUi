<script lang="ts">
import { BeerPS, hasClass } from "$lib/utils/beerui";
import BeIcon from "$lib/be-icon/BeIcon.svelte";
import { getContext, onMount, tick } from "svelte";

export let index:String = ''
const trigger = getContext('MenuTrigger')
const key = getContext('MenuTriggerKey')
let collapse = getContext('MenuCollapse')

let submenu = null
let subMenuContent = null
let hovered = trigger === 'hover'
let isOpen = false
let isActive = false
let timeout = null

BeerPS.subscribe('MenuActiveChange', (item) => {
  if (item.split('-').length > index.split('-').length) isActive = item.indexOf(index) > -1
  else isActive = false
})

// 点击外部关闭子集弹框
BeerPS.subscribe(`MenuCloseAll_${key}`, () => isOpen = false)
// 接收展开或收起的状态
BeerPS.subscribe(`MenuCollapse_${key}`, _collapse => {
  collapse = _collapse;
  changeActive(false, 0)
})

const enterMenu = () => {
  let isFlag: boolean = false
  if (hovered || collapse) {
    isFlag = true;
	changeActive(isFlag)
  }
}
const leaveMenu = () => {
  let isFlag: boolean = true
  if (hovered || collapse) {
    isFlag = false;
    changeActive(isFlag);
  }
}

const changeActive = (isFlag: boolean, handleTime: number = 300) => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    isOpen = isFlag
  }, handleTime)
}
// 计算层级
let level = 1
const computedLevel = (els, _level = 1) => {
  if (hasClass(els.parentElement, 'be-submenu__content')) _level++
  if (!hasClass(els.parentElement, 'be-menu')) return computedLevel(els.parentElement, _level)
  return _level
}
onMount(() => {
  level = computedLevel(submenu)
})
let subMenuContentHeight
const triggerMenu = () => {
  isOpen = !isOpen;
  subMenuContentHeight = subMenuContent.children.length * 50 + 10 + 'px'
  subMenuContent.animate([
	    { height: '0px' },
	    { height: subMenuContentHeight }
	  ], {
	    duration: 60
	  });
  setTimeout(() => {
    subMenuContentHeight = 'auto'
  }, 60)
}
</script>
<li role="menuitem"
    aria-haspopup="true"
    class="be-submenu"
    class:is_active={isActive}
    class:is_opened={isOpen}
    bind:this={submenu}
    on:mouseenter={enterMenu}
    on:mouseleave={leaveMenu}
    on:click|stopPropagation={triggerMenu}
    {index}
    {level}
>
	<div class="be-submenu__title" style:padding-left={level*20 + 'px'}>
		{#if collapse && level === 1}
			<slot name="icon"></slot>
		{:else}
			<div class="be-menu__icon">
			<span class="icon-left">
				<slot name="icon"></slot>
			</span>
				<slot name="title"></slot>
			</div>
			<div class="icon-right">
				<BeIcon name="chevron-down" />
			</div>
		{/if}
	</div>
	<ul class="be-submenu__content be-submenu__{level}" bind:this={subMenuContent} style:display={isOpen ? 'block' : 'none'}>
		<slot></slot>
	</ul>
</li>
