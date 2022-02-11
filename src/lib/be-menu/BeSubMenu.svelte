<script lang="ts">
import { onMount } from "svelte";
import { BeerPS } from "$lib/utils/beerui";

export let index:String = ''

let hovered = true;
let isOpen = false;
let isActive = false;

BeerPS.subscribe('MenuActiveChange', (item) => {
  console.log('isSameLevel', index.split('-').length > item.split('-').length);
  if (item.split('-').length > index.split('-').length) isActive = item.indexOf(index) > -1;
  else isActive = false
})

const enterMenu = () => {
  if (hovered) {
    isOpen = true
  }
};
const leaveMenu = () => {
  if (hovered) {
    isOpen = false
  }
};

let submenu = null
onMount(() => {
  // console.log(submenu);
})
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
	<ul class="be-submenu__content">
		<slot></slot>
	</ul>
</li>
