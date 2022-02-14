<script lang="ts">
import { BeerPS } from "$lib/utils/beerui";

export let index:String = ''

let submenu = null
let hovered = true
let isOpen = false
let isActive = false
let timeout = null

BeerPS.subscribe('MenuActiveChange', (item) => {
  if (item.split('-').length > index.split('-').length) isActive = item.indexOf(index) > -1
  else isActive = false
})

const enterMenu = () => {
  let isFlag: boolean = false
  if (hovered) isFlag = true
  changeActive(isFlag)
}
const leaveMenu = () => {
  let isFlag: boolean = true
  if (hovered) isFlag = false
  changeActive(isFlag)
}

const changeActive = (isFlag: boolean, handleTime: number = 300) => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    isOpen = isFlag
  }, handleTime)
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
    {index}
>
	<div class="be-submenu__title">
		<slot name="title"></slot>
	</div>
	<ul class="be-submenu__content" style:display={isOpen ? 'block' : 'none'}>
		<slot></slot>
	</ul>
</li>
