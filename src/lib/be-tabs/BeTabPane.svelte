<script lang="ts">
export let active:string
export let key:string
$: isActive = (key === active)
</script>
<div class='be-tabs__content hidden' class:block={isActive}>
	<slot></slot>
</div>

<style lang="scss">
  .be-tabs__content {overflow: hidden;position: relative;}
  .hidden {display: none;}
  .block {display: block;}
</style>
