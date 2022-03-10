<script>
	import BeIcon from './../be-icon/BeIcon.svelte';
	import { BeerPS } from "$lib/utils/beerui";
	import { getContext } from "svelte";
  export let menu
  export let value
	const key = getContext("cascaderChangeKey");
  const clickNodes = (item) => {
    BeerPS.publish(key, item)
  }
</script>

<div class="be-cascader-menu">
  <ul class="be-cascader-menu__list">
    {#each menu as item, index}
    <li class="be-cascader-node" tabindex="-1" class:in-active-path={value == item.value} on:click={() => clickNodes(item)}>
      {#if (!item.children || !item.children.length) && value == item.value}
      <div class="be-cascader-node__prefix"><BeIcon name="check" color="#409eff" width="16" height="16"/></div>
      {/if}
      <span class="be-cascader-node__label">{item.label}</span>
      {#if item.children && item.children.length}
      <BeIcon name="chevron-right" color="{value == item.value ? '#409eff' : '#606266'}" width="18" height="18"/>
      {/if}
    </li>
    {/each}
  </ul>
</div>