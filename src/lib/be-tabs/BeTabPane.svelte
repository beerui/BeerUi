<script lang="ts">
export let active:string
export let key:string
$: isActive = (key === active)
</script>
<div class='be-tabs__content' class:hidden={!isActive} class:block={isActive}>
	<slot></slot>
</div>
<style>
  .be-tabs__content {position: relative;}
  .hidden {display: none;}
  .block {display: block;}
</style>
